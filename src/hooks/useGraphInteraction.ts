import { useCallback, useEffect, useRef, useState } from "react";
import { type Edge, MarkerType, type Node, useReactFlow } from "reactflow";

export const useGraphInteraction = (
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
) => {
  const { getEdges } = useReactFlow();
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const updateHighlight = useCallback(
    (targetId: string | null) => {
      const currentEdges = getEdges();
      const activeId = targetId;

      if (!activeId) {
        setNodes((nds) =>
          nds.map((n) => {
            if (
              !n.data.isDimmed &&
              !n.data.isHighlighted &&
              !n.data.isSelected &&
              n.zIndex === 10
            )
              return n;
            return {
              ...n,
              zIndex: 10,
              data: {
                ...n.data,
                isDimmed: false,
                isHighlighted: false,
                isSelected: false,
              },
            };
          })
        );
        setEdges((eds) =>
          eds.map((e) => {
            if (e.style?.opacity === 0 && !e.animated) return e;
            return {
              ...e,
              animated: false,
              style: { stroke: "#9ca3af", strokeWidth: 2, opacity: 0 },
              zIndex: 0,
              markerEnd: { type: MarkerType.ArrowClosed, color: "#9ca3af" },
            };
          })
        );
        return;
      }

      const relatedNodeIds = new Set<string>();
      const relatedEdgeIds = new Set<string>();
      relatedNodeIds.add(activeId);

      currentEdges.forEach((edge) => {
        if (edge.source === activeId) {
          relatedNodeIds.add(edge.target);
          relatedEdgeIds.add(edge.id);
        } else if (edge.target === activeId) {
          relatedNodeIds.add(edge.source);
          relatedEdgeIds.add(edge.id);
        }
      });

      setNodes((nds) =>
        nds.map((n) => {
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
              isSelected: shouldSelect,
            },
          };
        })
      );

      setEdges((eds) =>
        eds.map((e) => {
          const isRelated = relatedEdgeIds.has(e.id);
          if (
            !!e.animated === isRelated &&
            e.style?.opacity === (isRelated ? 1 : 0)
          )
            return e;

          const strokeColor =
            e.data?.type === "approved" ? "#22c55e" : "#3b82f6";
          const strokeDasharray = e.data?.type === "approved" ? "0" : "5 5";

          return {
            ...e,
            animated: isRelated,
            style: {
              stroke: isRelated ? strokeColor : "#9ca3af",
              strokeWidth: isRelated ? 3 : 2,
              opacity: isRelated ? 1 : 0,
              strokeDasharray: isRelated ? strokeDasharray : "0",
            },
            zIndex: isRelated ? 5 : 0,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: isRelated ? strokeColor : "transparent",
            },
          };
        })
      );
    },
    [setNodes, setEdges, getEdges]
  );

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const onNodeMouseEnter = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (selectedNodeId) return;

      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredNodeId(node.id);
        updateHighlight(node.id);
      }, 40);
    },
    [selectedNodeId, updateHighlight]
  );

  const onNodeMouseLeave = useCallback(() => {
    if (selectedNodeId) return;

    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredNodeId(null);
      updateHighlight(null);
    }, 40);
  }, [selectedNodeId, updateHighlight]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (selectedNodeId === node.id) {
        setSelectedNodeId(null);
        setHoveredNodeId(node.id);
        updateHighlight(node.id);
      } else {
        setSelectedNodeId(node.id);
        updateHighlight(node.id);
      }
    },
    [selectedNodeId, updateHighlight]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setHoveredNodeId(null);
    updateHighlight(null);
  }, [updateHighlight]);

  return {
    hoveredNodeId,
    selectedNodeId,
    onNodeMouseEnter,
    onNodeMouseLeave,
    onNodeClick,
    onPaneClick,
  };
};
