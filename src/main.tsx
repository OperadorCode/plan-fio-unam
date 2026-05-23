// main.tsx
// Punto de entrada principal de la aplicación React.
// Este archivo monta el componente raíz <App /> en el elemento con id 'root'.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PlanProvider } from "./context/PlanContext";
import { HoverProvider } from "./context/HoverContext";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error('No se encontró el elemento con id "root" en el HTML.');
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <PlanProvider>
          <HoverProvider>
            <App />
          </HoverProvider>
        </PlanProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

