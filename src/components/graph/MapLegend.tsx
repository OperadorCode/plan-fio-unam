
/**
 * Componente de leyenda para el grafo.
 * Muestra una leyenda general con los estados de las materias (aprobadas, regulares, pendientes)
 * y una leyenda de referencias de conexión que se muestra solo al interactuar con un nodo.
 * 
 * @param {string | null} hoveredNodeId - ID del nodo sobre el que se encuentra el cursor.
 * @param {string | null} selectedNodeId - ID del nodo seleccionado.
 */


import React from 'react';
import { Panel } from 'reactflow';
import { Flame } from 'lucide-react';

interface MapLegendProps {
    hoveredNodeId: string | null;
    selectedNodeId: string | null;
}


export const MapLegend: React.FC<MapLegendProps> = ({ hoveredNodeId, selectedNodeId }) => {
    return (
        <Panel position="top-right" className="flex flex-col gap-2 m-4 items-end">
            {/* Leyenda General */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-sm border border-gray-200 dark:border-gray-600 rounded-full px-4 py-2 flex flex-wrap justify-end gap-3 sm:gap-4 text-xs font-medium text-gray-600 dark:text-gray-300 pointer-events-none">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-green-600"></div> Aprobada</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-blue-600"></div> Regular</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gray-200 border-2 border-gray-400"></div> Pendiente</div>
                <div className="flex items-center gap-1.5"><Flame size={12} className="text-orange-500" /> Crítica</div>
            </div>

            {/* Referencias de Conexión (Sólo visible al interactuar) */}
            {(hoveredNodeId || selectedNodeId) && (
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-sm border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 flex flex-col gap-2 text-xs font-medium text-gray-600 dark:text-gray-300 pointer-events-none animate-fade-in">
                    <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Referencias de Conexión</p>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 border-t-2 border-blue-500 border-dashed"></div>
                        <span>Requiere Cursada (Regular)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-green-500"></div>
                        <span>Requiere Final (Aprobada)</span>
                    </div>
                </div>
            )}
        </Panel>
    );
};
