// -----------------------------------------------------------------------------
// Tooltip.tsx
// Componente Tooltip reutilizable con posicionamiento inteligente y soporte móvil
// -----------------------------------------------------------------------------
//
// Este componente muestra un tooltip flotante sobre cualquier elemento hijo.
// - Posiciona automáticamente el tooltip arriba y centrado respecto al trigger.
// - Ajusta la posición para evitar desbordes de pantalla.
// - Soporta visibilidad forzada (para mobile/touch).
// - Usa portal para renderizar fuera del flujo normal del DOM.
// -----------------------------------------------------------------------------

import React, { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Props del Tooltip
 * @property content Contenido a mostrar en el tooltip
 * @property children Elemento trigger (hover/click)
 * @property className Clases extra para el trigger
 * @property forceVisible Fuerza la visibilidad 
 */
interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  forceVisible?: boolean;
}

/**
 * Tooltip reutilizable.
 * - Hover en desktop, visibilidad forzada en mobile.
 * - Posicionamiento automático y prevención de desbordes.
 * - Portal para evitar problemas de stacking/contexto.
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className = '',
  forceVisible = false
}) => {
  // Estado para Desktop (Hover)
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ left: 0, top: 0 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const isVisible = isHovered || forceVisible;

  /**
   * Calcula la posición óptima del tooltip respecto al trigger,
   * ajustando para evitar desbordes laterales.
   */
  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      const top = rect.top + scrollY - 6;
      let left = rect.left + scrollX + (rect.width / 2);

      if (tooltipRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const padding = 10;

        if (left + (tooltipRect.width / 2) > windowWidth - padding) {
          left = windowWidth - (tooltipRect.width / 2) - padding;
        }
        if (left - (tooltipRect.width / 2) < padding) {
          left = (tooltipRect.width / 2) + padding;
        }
      }
      setCoords({ top, left });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useLayoutEffect(() => {
    if (isVisible) {
      updatePosition();

      requestAnimationFrame(updatePosition);

      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible, content]);

  return (
    <>
      {/* Trigger del tooltip */}
      <div
        ref={triggerRef}
        className={`inline-block ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {isVisible && createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          style={{
            top: coords.top,
            left: coords.left,
            transform: 'translate(-50%, -100%)',
          }}
          className="absolute z-[9999] pointer-events-none mb-1 w-72 animate-fade-in"
        >
          <div className="bg-gray-900/95 backdrop-blur-sm text-white text-xs rounded-xl p-3 shadow-2xl border border-gray-700/50">
            {content}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Tooltip;