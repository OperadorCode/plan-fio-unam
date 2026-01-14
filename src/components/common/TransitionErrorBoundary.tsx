import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * TransitionErrorBoundary:
 * Captura errores específicos dentro del dashboard de transición para no romper toda la app.
 * Permite al usuario volver a la vista principal sin perder su progreso.
 */

class TransitionErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[Transition Error]:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleGoBack = () => {
    window.dispatchEvent(
      new CustomEvent("navigate-to-tab", { detail: { tab: "table" } })
    );
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-2xl mx-auto p-8 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-red-200 dark:border-red-900/50 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-red-500" size={32} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              Error en el Plan de Transición
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Ocurrió un problema al procesar los datos de transición. Podés
              intentar recargar esta sección o volver al plan de estudios.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-left overflow-auto max-h-40">
                <p className="text-xs font-mono text-red-600 dark:text-red-400 mb-2">
                  {this.state.error.message}
                </p>
                <pre className="text-[10px] text-gray-500 font-mono">
                  {this.state.error.stack}
                </pre>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleGoBack}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl font-semibold transition-colors"
              >
                <ArrowLeft size={18} />
                Volver al Plan
              </button>

              <button
                onClick={this.handleRetry}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 transition-all"
              >
                <RotateCcw size={18} />
                Reintentar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default TransitionErrorBoundary;
