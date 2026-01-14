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
 * ExamPlannerErrorBoundary:
 * Captura errores específicos dentro del planificador de exámenes.
 */
class ExamPlannerErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ExamPlanner Error]:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-8 bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-900/50 shadow-sm">
          <div className="max-w-md mx-auto text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-red-500" size={24} />
            </div>

            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              Error en el planificador de exámenes
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              No se pudieron cargar las mesas de examen. Intentá recargar esta
              sección.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-900 rounded text-left overflow-auto max-h-24">
                <code className="text-[10px] text-red-600 dark:text-red-400 font-mono block">
                  {this.state.error.message}
                </code>
              </div>
            )}

            <button
              onClick={this.handleRetry}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-md transition-all mx-auto"
            >
              <RotateCcw size={16} />
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ExamPlannerErrorBoundary;
