import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * CommandPaletteErrorBoundary:
 * Captura errores en el Command Palette y permite cerrarlo sin romper la app.
 */
class CommandPaletteErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[CommandPalette Error]:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[1100] flex items-start justify-center pt-[20vh] px-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={this.props.onClose}
          />

          <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-red-200 dark:border-red-700 overflow-hidden animate-fade-in p-8 text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-red-500" size={24} />
            </div>

            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              Error en la búsqueda
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Hubo un problema al buscar materias. Cerrá esta ventana e intentá
              nuevamente.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-900 rounded text-left overflow-auto max-h-24">
                <code className="text-[10px] text-red-600 dark:text-red-400 font-mono block">
                  {this.state.error.message}
                </code>
              </div>
            )}

            <button
              onClick={this.props.onClose}
              className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CommandPaletteErrorBoundary;
