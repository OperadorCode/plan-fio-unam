/**
 * Componente encargado de gestionar el flujo de instalación de la PWA.
 * Captura el evento `beforeinstallprompt`, persiste el objeto de evento diferido
 * y renderiza una interfaz de usuario personalizada para invocar el prompt nativo del navegador.
 */

import React, { useEffect, useState } from "react";
import { Download, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { BeforeInstallPromptEvent } from "../../types";

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const promptEvent = e as BeforeInstallPromptEvent;
      promptEvent.preventDefault();
      setDeferredPrompt(promptEvent);
      setIsInstallable(true);

      setTimeout(() => setShowPrompt(true), 3000);
    };

    const installedHandler = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt || !isInstallable) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 z-50 flex justify-center pointer-events-none"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-indigo-100 dark:border-indigo-900 p-4 max-w-md w-full pointer-events-auto flex items-start gap-4 ring-1 ring-black/5">
          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
            <Download size={24} />
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1">
              Instalar Aplicación
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
              Instalá el Planificador FIO en tu dispositivo para acceder más
              rápido y usarlo
              <span className="font-semibold text-indigo-600 dark:text-indigo-400 mx-1">
                sin conexión
              </span>
              . Es seguro y ocupa muy poco espacio.
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Instalar
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className="px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Ahora no
              </button>
            </div>

            <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
              <ShieldCheck size={10} />
              <span>Verificado por Google Chrome</span>
            </div>
          </div>

          <button
            onClick={() => setShowPrompt(false)}
            aria-label="Cerrar"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
