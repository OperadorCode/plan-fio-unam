
/**
 * Componente de visualización interactiva de rutas profesionales basado en React Flow.
 * Gestiona la renderización de grafos dirigidos, estados de nodos de habilidades y la lógica de navegación espacial del mapa de carrera.
 */


import React, { useEffect, useCallback, useState, memo } from 'react';
import { createPortal } from 'react-dom';
import ReactFlow, {
    Background,
    MarkerType,
    ReactFlowProvider,
    useReactFlow,
    type Node,
} from 'reactflow';

import 'reactflow/dist/style.css';

import { useAppStore } from '../store/useAppStore';
import type { Course } from '../types';
import { useCareerGraph } from '../hooks/useCareerGraph';

import { CourseNode } from './graph/CourseNode';
import { MapLegend } from './graph/MapLegend';
import { MapControls } from './graph/MapControls';

interface CareerMapProps {
    courses: Record<string, Course[]>;
}

const nodeTypes = {
    courseNode: CourseNode,
};

const CareerMapContent: React.FC<CareerMapProps> = ({ courses: initialCoursesData }) => {
    const careerId = useAppStore(state => state.careerId);
    const {
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        effectiveCoursesData
    } = useCareerGraph(initialCoursesData);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const { getEdges, fitView } = useReactFlow();

    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            fitView({ duration: 800 });
        }, 100);
        return () => clearTimeout(timer);
    }, [isFullscreen, fitView, careerId, effectiveCoursesData]);

    const updateHighlight = useCallback((targetId: string | null) => {
        const currentEdges = getEdges();
        const activeId = targetId;

        if (!activeId) {
            setNodes((nds) => nds.map(n => {
                if (!n.data.isDimmed && !n.data.isHighlighted && !n.data.isSelected && n.zIndex === 10) return n;
                return {
                    ...n,
                    zIndex: 10,
                    data: { ...n.data, isDimmed: false, isHighlighted: false, isSelected: false }
                };
            }));
            setEdges((eds) => eds.map(e => {
                if (e.style?.opacity === 0 && !e.animated) return e;
                return {
                    ...e,
                    animated: false,
                    style: { stroke: '#9ca3af', strokeWidth: 2, opacity: 0 },
                    zIndex: 0,
                    markerEnd: { type: MarkerType.ArrowClosed, color: '#9ca3af' }
                };
            }));
            return;
        }

        const relatedNodeIds = new Set<string>();
        const relatedEdgeIds = new Set<string>();
        relatedNodeIds.add(activeId);

        currentEdges.forEach(edge => {
            if (edge.source === activeId) {
                relatedNodeIds.add(edge.target);
                relatedEdgeIds.add(edge.id);
            } else if (edge.target === activeId) {
                relatedNodeIds.add(edge.source);
                relatedEdgeIds.add(edge.id);
            }
        });

        setNodes((nds) => nds.map((n) => {
            const isRelated = relatedNodeIds.has(n.id);
            const shouldHighlight = isRelated;
            const shouldSelect = n.id === activeId;
            const shouldDim = !isRelated;

            if (
                n.data.isHighlighted === shouldHighlight &&
                n.data.isSelected === shouldSelect &&
                n.data.isDimmed === shouldDim
            ) {
                return n;
            }

            return {
                ...n,
                zIndex: isRelated ? 20 : 10,
                data: {
                    ...n.data,
                    isDimmed: shouldDim,
                    isHighlighted: shouldHighlight,
                    isSelected: shouldSelect
                }
            };
        }));

        setEdges((eds) => eds.map((e) => {
            const isRelated = relatedEdgeIds.has(e.id);
            if (!!e.animated === isRelated && e.style?.opacity === (isRelated ? 1 : 0)) return e;

            const strokeColor = e.data?.type === 'approved' ? '#22c55e' : '#3b82f6';
            const strokeDasharray = e.data?.type === 'approved' ? '0' : '5 5';

            return {
                ...e,
                animated: isRelated,
                style: {
                    stroke: isRelated ? strokeColor : '#9ca3af',
                    strokeWidth: isRelated ? 3 : 2,
                    opacity: isRelated ? 1 : 0,
                    strokeDasharray: isRelated ? strokeDasharray : '0'
                },
                zIndex: isRelated ? 5 : 0,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: isRelated ? strokeColor : 'transparent'
                }
            };
        }));
    }, [setNodes, setEdges, getEdges]);

    const onNodeMouseEnter = useCallback((_: React.MouseEvent, node: Node) => {
        if (!selectedNodeId) {
            setHoveredNodeId(node.id);
            updateHighlight(node.id);
        }
    }, [selectedNodeId, updateHighlight]);

    const onNodeMouseLeave = useCallback(() => {
        if (!selectedNodeId) {
            setHoveredNodeId(null);
            updateHighlight(null);
        }
    }, [selectedNodeId, updateHighlight]);

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        if (selectedNodeId === node.id) {
            setSelectedNodeId(null);
            setHoveredNodeId(node.id);
            updateHighlight(node.id);
        } else {
            setSelectedNodeId(node.id);
            updateHighlight(node.id);
        }
    }, [selectedNodeId, updateHighlight]);

    const onPaneClick = useCallback(() => {
        setSelectedNodeId(null);
        setHoveredNodeId(null);
        updateHighlight(null);
    }, [updateHighlight]);

    const containerClasses = isFullscreen
        ? "fixed inset-0 z-[9999] h-screen w-screen bg-gray-50 dark:bg-gray-900"
        : "h-[700px] w-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-inner relative";

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
    <ReactFlowProvider>
        <CareerMapContent courses={courses} />
    </ReactFlowProvider>
));

export default CareerMap;