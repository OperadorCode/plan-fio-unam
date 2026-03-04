import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ChevronLeft, Menu } from "lucide-react";

interface SidebarHeaderProps {
  isOpen: boolean;
  toggle: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isOpen,
  toggle,
}) => {
  return (
    <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
          >
            <div
              className={`p-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30`}
            >
              <GraduationCap size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 dark:text-white leading-tight">
                Planificador
              </span>
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                FIO • UNaM
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggle}
        className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 flex items-center gap-1.5 ${!isOpen ? "mx-auto" : ""
          }`}
        aria-label="Alternar menú lateral"
      >
        {isOpen && <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Menú</span>}
        {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
      </button>
    </div>
  );
};
