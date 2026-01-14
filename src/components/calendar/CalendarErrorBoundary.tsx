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
 * CalendarErrorBoundary:
 * Captura errores específicos dentro del widget de calendario para no romper toda la app.
 */
class CalendarErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Calendar Error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });

    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-red-200 dark:border-red-900/50 p-6 flex flex-col items-center text-center animate-fade-in">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4 text-red-600 dark:text-red-400">
            <AlertTriangle size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
            Falló el calendario
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 max-w-xs">
            Hubo un problema procesando las fechas. Puede ser un error de
            configuración.
          </p>

          {import.meta.env.DEV && this.state.error && (
            <pre className="text-xs bg-gray-100 dark:bg-black p-2 rounded mb-4 overflow-auto max-w-full text-left font-mono">
              {this.state.error.message}
            </pre>
          )}

          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm text-sm font-medium"
          >
            <RotateCcw size={16} />
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CalendarErrorBoundary;
