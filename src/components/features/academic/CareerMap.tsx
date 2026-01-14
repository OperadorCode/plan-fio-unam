/**
 * Componente de visualización interactiva de rutas profesionales basado en React Flow.
 * Gestiona la renderización de grafos dirigidos, estados de nodos de habilidades y la lógica de navegación espacial del mapa de carrera.
 */

import React, { useEffect, useState, memo } from "react";
import { createPortal } from "react-dom";
import ReactFlow, {
  Background,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

import { useAppStore } from "../../../store/useAppStore";
import type { Course } from "../../../types";
import { useCareerGraph } from "../../../hooks/useCareerGraph";
import { useGraphInteraction } from "../../../hooks/useGraphInteraction";

import { CourseNode } from "../../graph/CourseNode";
import { MapLegend } from "../../graph/MapLegend";
import { MapControls } from "../../graph/MapControls";
import { CareerMapErrorBoundary } from "./CareerMapErrorBoundary";

interface CareerMapProps {
  courses: Record<string, Course[]>;
}

const CareerMapContent: React.FC<CareerMapProps> = ({
  courses: initialCoursesData,
}) => {
  const careerId = useAppStore((state) => state.careerId);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const nodeTypes = React.useMemo(
    () => ({
      courseNode: CourseNode,
    }),
    []
  );

  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    effectiveCoursesData,
  } = useCareerGraph(initialCoursesData);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const { fitView } = useReactFlow();

  const {
    hoveredNodeId,
    selectedNodeId,
    onNodeMouseEnter,
    onNodeMouseLeave,
    onNodeClick,
    onPaneClick,
  } = useGraphInteraction(setNodes, setEdges);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isFullscreen]);

  useEffect(() => {
    if (nodes.length === 0) {
      setIsLayoutReady(false);
      return;
    }

    const timer = setTimeout(() => {
      fitView({ duration: 800 });
      setIsLayoutReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [isFullscreen, fitView, careerId, effectiveCoursesData, nodes.length]);

  const containerClasses = isFullscreen
    ? "fixed inset-0 z-[9999] h-screen w-screen bg-gray-50 dark:bg-gray-900"
    : "h-[700px] w-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-inner relative";

  if (!isLayoutReady && nodes.length > 0) {
    return (
      <div className="h-[700px] w-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-inner relative flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Generando mapa de correlatividades...
          </p>
        </div>
      </div>
    );
  }

  const mapComponent = (
    <div className={containerClasses}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        proOptions={{ hideAttribution: true }}
        onlyRenderVisibleElements={true}
      >
        <Background gap={40} size={1} color="#e5e7eb" />

        <MapControls
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        />

        <MapLegend
          hoveredNodeId={hoveredNodeId}
          selectedNodeId={selectedNodeId}
        />
      </ReactFlow>
    </div>
  );

  if (isFullscreen) {
    return createPortal(mapComponent, document.body);
  }

  return mapComponent;
};

const CareerMap: React.FC<CareerMapProps> = memo(({ courses }) => (
  <CareerMapErrorBoundary>
    <ReactFlowProvider>
      <CareerMapContent courses={courses} />
    </ReactFlowProvider>
  </CareerMapErrorBoundary>
));

export default CareerMap;
