import React, { useState, useEffect } from "react";
import {
  X,
  Download,
  MousePointer2,
  Save,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenWelcome_v2");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        if (!localStorage.getItem("hasSeenWelcome_v2")) {
          setIsOpen(true);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenWelcome_v2", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <Sparkles className="mx-auto mb-3 text-yellow-300" size={32} />
              <h2 className="text-2xl font-bold">
                ¡Bienvenido al Planificador!
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Gestión de cursada y correlatividades
              </p>

              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <FeatureRow
                icon={<Download className="text-blue-500" size={24} />}
                title="Modo Offline"
                desc="Podés instalar esta web como una App en tu celular o PC para usarla sin internet."
              />

              <FeatureRow
                icon={<MousePointer2 className="text-purple-500" size={24} />}
                title="Mapa Interactivo"
                desc="Consultá tus cursos y correlatividades en un solo lugar."
              />

              <FeatureRow
                icon={<Save className="text-green-500" size={24} />}
                title="Guardado Automático"
                desc="Los cambios se conservan automáticamente en el navegador."
              />
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                Comenzar <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const FeatureRow: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
}> = ({ icon, title, desc }) => (
  <div className="flex gap-4 items-start">
    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-gray-800 dark:text-gray-100">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);
