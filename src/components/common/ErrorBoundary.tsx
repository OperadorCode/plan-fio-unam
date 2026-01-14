import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw, Trash2 } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleHardReset = () => {
    if (
      confirm(
        "¿Estás seguro? Se borrará todo tu progreso guardado para intentar arreglar el error."
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-red-500" size={32} />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Algo salió mal
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              Ocurrió un error inesperado en la aplicación. Intentá recargar la
              página.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReload}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw size={18} /> Recargar Página
              </button>

              <button
                onClick={this.handleHardReset}
                className="w-full py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-200 rounded-xl font-medium flex items-center justify-center gap-2 transition-all text-sm"
              >
                <Trash2 size={16} /> Borrar Datos y Recargar
              </button>
            </div>

            {this.state.error && (
              <div className="mt-6 p-3 bg-gray-100 dark:bg-gray-900 rounded text-left overflow-auto max-h-32">
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
