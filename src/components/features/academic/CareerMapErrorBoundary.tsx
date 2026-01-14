import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw, Map } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary específico para CareerMap.
 * Proporciona un fallback visual que permite reintentar sin perder contexto.
 */

export class CareerMapErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("CareerMap Error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-[700px] w-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-inner relative flex items-center justify-center">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-100 dark:border-gray-700 mx-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-red-500" size={32} />
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Error en el Mapa de Correlatividades
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              Ocurrió un error al renderizar el grafo. Intentá recargar la
              visualización.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleRetry}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw size={18} /> Reintentar
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-sm"
              >
                <Map size={16} /> Volver al Plan de Estudios
              </button>
            </div>

            {this.state.error && (
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-900 rounded text-left overflow-auto max-h-24">
                <code className="text-[10px] text-gray-500 font-mono block">
                  {this.state.error.toString()}
                </code>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
