/**
 * Hook personalizado para la gestión integral del grafo de la carrera utilizando React Flow.
 *
 * Responsabilidades:
 * - Transformación de datos: Procesa el plan de estudios activo y filtra materias optativas seleccionadas.
 * - Sincronización de estado: Vincula el estado visual de los nodos con el progreso académico (aprobadas/regulares) del store global.
 * - Gestión de grafos: Maneja el estado de nodos y aristas, calculando correlatividades y criticidad de materias.
 * - Reactividad: Actualiza el layout y los estilos de los nodos ante cambios en el `courseStatus` o `careerId`.
 *
 * @param initialCoursesData - Estructura inicial de materias indexada por nivel/cuatrimestre.
 * @returns {Object} Estado de `nodes` y `edges`, y manejadores `onNodesChange` / `onEdgesChange`.
 */

import { useMemo, useEffect } from "react";
import {
  useNodesState,
  useEdgesState,
  MarkerType,
  type Node,
  type Edge,
} from "reactflow";
import { useAppStore } from "../store/useAppStore";
import { careerPlans } from "../data/careers";
import type { StudyPlan, Course, GraphCourse } from "../types";
import { calculateCriticality } from "../utils/logic";
import { getRegimenOrderValue } from "../utils/courseUtils";

export const useCareerGraph = (
  initialCoursesData: Record<string, Course[]>
) => {
  const careerId = useAppStore((state) => state.careerId);
  const courseStatus = useAppStore((state) => state.courseStatus);
  const selectedElectives = useAppStore((state) => state.selectedElectives);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const effectiveCoursesData = useMemo(() => {
    const plan = careerPlans[
      careerId as keyof typeof careerPlans
    ] as unknown as StudyPlan;

    if (!initialCoursesData) return {};
    if (!plan) return initialCoursesData;

    const newMap: Record<string, GraphCourse[]> = {};

    Object.entries(initialCoursesData).forEach(([year, courses]) => {
      newMap[year] = courses.map((c) => {
        const courseYear = parseInt(year) || 0;

        if (c.isElectiveSlot && selectedElectives[c.id]) {
          const group = plan.electivesData?.[c.electiveGroup!];
          const selectedOption = group?.find(
            (o) => o.id === selectedElectives[c.id]
          );

          if (selectedOption) {
            return {
              ...selectedOption,
              id: c.id,
              realId: selectedOption.id,
              name: selectedOption.name,
              year: courseYear,
              isSelectedOption: true,
              isElectiveSlot: true,
            } as GraphCourse;
          }
        }
        return { ...c, year: courseYear } as GraphCourse;
      });
    });

    return newMap;
  }, [initialCoursesData, selectedElectives, careerId]);

  const baseGraph = useMemo(() => {
    if (!effectiveCoursesData) return { nodes: [], edges: [] };

    const COLUMN_WIDTH = 450;
    const ROW_HEIGHT = 200;
    const START_X = 50;

    const columns: Record<number, GraphCourse[]> = {};
    const allCourses: GraphCourse[] = [];

    Object.entries(effectiveCoursesData).forEach(([yearKey, yearCourses]) => {
      const year = parseInt(yearKey);
      const validYear = isNaN(year) ? 6 : year;

      if (!columns[validYear]) columns[validYear] = [];
      columns[validYear].push(...yearCourses);

      allCourses.push(...yearCourses);
    });

    const newNodes: Node[] = [];
    const sortedYears = Object.keys(columns)
      .map(Number)
      .sort((a, b) => a - b);

    sortedYears.forEach((year) => {
      const courses = columns[year];
      courses.sort((a, b) => {
        return (
          getRegimenOrderValue(a.regimen) - getRegimenOrderValue(b.regimen)
        );
      });

      courses.forEach((course, idx) => {
        const x = START_X + (year - 1) * COLUMN_WIDTH;
        const y = idx * ROW_HEIGHT + 50;
        const criticality = calculateCriticality(course.id, allCourses);

        newNodes.push({
          id: course.id,
          type: "courseNode",
          position: { x, y },
          zIndex: 10,
          data: {
            course: course,
            criticality: criticality,
            status: "pending",
            isDimmed: false,
            isHighlighted: false,
            isSelected: false,
          },
          draggable: false,
          connectable: false,
          selectable: false,
        });
      });
    });

    const newEdges: Edge[] = [];
    const nodeIds = new Set(newNodes.map((n) => n.id));

    allCourses.forEach((course) => {
      course.requiredRegularToCourse?.forEach((pid) => {
        if (nodeIds.has(pid)) {
          newEdges.push({
            id: `${pid}-${course.id}-reg`,
            source: pid,
            target: course.id,
            type: "default",
            data: { type: "regular" },
            animated: false,
            style: { stroke: "#9ca3af", strokeWidth: 2, opacity: 0 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#9ca3af" },
            focusable: false,
          });
        }
      });

      course.requiredApprovedToCourse?.forEach((pid) => {
        if (nodeIds.has(pid)) {
          newEdges.push({
            id: `${pid}-${course.id}-aprob`,
            source: pid,
            target: course.id,
            type: "default",
            data: { type: "approved" },
            animated: false,
            zIndex: 0,
            style: { stroke: "#9ca3af", strokeWidth: 2, opacity: 0 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#9ca3af" },
            focusable: false,
          });
        }
      });
    });

    return { nodes: newNodes, edges: newEdges };
  }, [effectiveCoursesData]);

  useEffect(() => {
    if (baseGraph.nodes.length === 0) return;

    let isCancelled = false;

    setNodes((prevNodes) => {
      if (isCancelled) return prevNodes;

      return baseGraph.nodes.map((baseNode) => ({
        ...baseNode,
        data: {
          ...baseNode.data,
          status: courseStatus[baseNode.id],
          isDimmed:
            prevNodes.find((n) => n.id === baseNode.id)?.data.isDimmed || false,
          isHighlighted:
            prevNodes.find((n) => n.id === baseNode.id)?.data.isHighlighted ||
            false,
          isSelected:
            prevNodes.find((n) => n.id === baseNode.id)?.data.isSelected ||
            false,
        },
      }));
    });

    setEdges((prevEdges) => {
      if (isCancelled) return prevEdges;

      const edgesChanged =
        prevEdges.length !== baseGraph.edges.length ||
        !prevEdges.every((e, i) => e.source === baseGraph.edges[i]?.source);

      if (edgesChanged || prevEdges.length === 0) {
        return baseGraph.edges;
      }
      return prevEdges;
    });

    return () => {
      isCancelled = true;
    };
  }, [baseGraph, courseStatus, setNodes, setEdges]);

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    effectiveCoursesData,
  };
};
