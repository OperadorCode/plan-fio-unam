/**
 * HoverContext: Manejo de estado de hover para highlight de correlativas.
 *
 * Este Context reemplaza el uso de hoveredCourseId en el store global,
 * permitiendo que el estado de hover sea local a la UI sin persistir en localStorage.
 */

import React, { createContext, useContext, useState, useCallback } from "react";

interface HoverContextType {
  hoveredCourseId: string | null;
  setHoveredCourseId: (id: string | null) => void;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export const HoverProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hoveredCourseId, setHoveredCourseIdState] = useState<string | null>(
    null
  );

  const setHoveredCourseId = useCallback((id: string | null) => {
    setHoveredCourseIdState(id);
  }, []);

  return (
    <HoverContext.Provider value={{ hoveredCourseId, setHoveredCourseId }}>
      {children}
    </HoverContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useHoverContext = () => {
  const context = useContext(HoverContext);
  if (context === undefined) {
    throw new Error("useHoverContext must be used within a HoverProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useHoveredCourse = () => {
  const { hoveredCourseId } = useHoverContext();
  return hoveredCourseId;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSetHoveredCourse = () => {
  const { setHoveredCourseId } = useHoverContext();
  return setHoveredCourseId;
};
