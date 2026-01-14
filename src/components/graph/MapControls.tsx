/**
 * Componente de controles de navegación para el grafo.
 * Proporciona las herramientas estándar de React Flow y un botón personalizado
 * para alternar el modo de pantalla completa.
 *
 * @param {boolean} isFullscreen - Estado actual de la vista (pantalla completa o no).
 * @param {() => void} onToggleFullscreen - Función callback para cambiar el estado de pantalla completa.
 */

import React from "react";
import { Controls, ControlButton } from "reactflow";
import { Maximize2, Minimize2 } from "lucide-react";

interface MapControlsProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <Controls
      position="bottom-right"
      showInteractive={false}
      showFitView={false}
      className="!bg-white dark:!bg-gray-800 !border-gray-200 dark:!border-gray-700 !shadow-md !bottom-32 !right-8 !z-50"
    >
      <ControlButton
        onClick={onToggleFullscreen}
        title={
          isFullscreen ? "Salir de Pantalla Completa" : "Pantalla Completa"
        }
        aria-label={
          isFullscreen ? "Salir de Pantalla Completa" : "Pantalla Completa"
        }
      >
        {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
      </ControlButton>
    </Controls>
  );
};
