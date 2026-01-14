import { motion, AnimatePresence } from "framer-motion";

interface SidebarFooterProps {
  isOpen: boolean;
}

/**
 * Footer del sidebar - espacio reservado para futuras funcionalidades.
 * La opción de reiniciar se encuentra en el menú de configuración del header.
 */
export const SidebarFooter: React.FC<SidebarFooterProps> = ({ isOpen }) => {
  return (
    <div className="p-4 border-t border-gray-100 dark:border-gray-800">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[10px] text-gray-400 dark:text-gray-500 text-center"
          >
            Planificador FIO v1.0
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
