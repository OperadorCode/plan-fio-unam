import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * MapErrorBoundary:
 * Captura errores específicos dentro del mapa de correlatividades (React Flow).
 * Permite reintentar sin romper toda la aplicación.
 */
class MapErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[Map Error]:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-[700px] w-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-red-200 dark:border-red-900/50 overflow-hidden shadow-inner relative flex items-center justify-center">
          <div className="max-w-md p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-red-500" size={32} />
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
              Error al cargar el mapa
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Hubo un problema al generar el grafo de correlatividades. Esto
              puede deberse a datos inconsistentes o un error de visualización.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-900 rounded text-left overflow-auto max-h-32">
                <code className="text-[10px] text-red-600 dark:text-red-400 font-mono block">
                  {this.state.error.message}
                </code>
              </div>
            )}

            <button
              onClick={this.handleRetry}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 transition-all mx-auto"
            >
              <RotateCcw size={18} />
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MapErrorBoundary;
