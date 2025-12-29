import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Settings, Download, Upload, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useDataManagement } from '../../hooks/useDataManagement';
import { useAppStore } from '../../store/useAppStore';

export const DataMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const { exportData, importData } = useDataManagement();
    const resetProgress = useAppStore(state => state.resetProgress);

    // Cerrar menú al hacer click fuera
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const result = await importData(file);
        setFeedback({ type: result.success ? 'success' : 'error', msg: result.message });

        setTimeout(() => setFeedback(null), 3000);

        e.target.value = '';
        setIsOpen(false);
    };

    const handleReset = () => {
        resetProgress();
        setShowResetConfirm(false);
        setIsOpen(false);
        setFeedback({ type: 'success', msg: 'Progreso reiniciado correctamente.' });
        setTimeout(() => setFeedback(null), 3000);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Gestión de Datos"
            >
                <Settings size={20} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden py-1 z-50 animate-fade-in origin-top-right">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Datos y Configuración</span>
                    </div>

                    <div className="p-1 space-y-0.5">
                        <button
                            onClick={() => { exportData(); setIsOpen(false); }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg flex items-center gap-3 transition-colors"
                        >
                            <Download size={16} className="text-blue-500" />
                            <div>
                                <span className="font-medium">Exportar Backup</span>
                                <p className="text-[10px] text-gray-400">Descargar progreso actual</p>
                            </div>
                        </button>

                        <button
                            onClick={handleImportClick}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg flex items-center gap-3 transition-colors"
                        >
                            <Upload size={16} className="text-green-500" />
                            <div>
                                <span className="font-medium">Restaurar Backup</span>
                                <p className="text-[10px] text-gray-400">Cargar archivo .json</p>
                            </div>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".json"
                            className="hidden"
                        />

                        <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />

                        <button
                            onClick={() => setShowResetConfirm(true)}
                            className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center gap-3 transition-colors"
                        >
                            <Trash2 size={16} />
                            <span>Reiniciar Progreso</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Confirmación Reset - Usando Portal */}
            {showResetConfirm && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowResetConfirm(false)} />

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 dark:border-gray-700 overflow-hidden relative z-10 animate-fade-in-up">
                        <div className="p-6 text-center">
                            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">¿Borrar todo?</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                Se perderán todas las materias aprobadas y notas guardadas. Esta acción no se puede deshacer.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => setShowResetConfirm(false)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-md transition-colors"
                                >
                                    Borrar Todo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Toast Feedback - Usando Portal */}
            {feedback && createPortal(
                <div className="fixed bottom-4 right-4 z-[9999] animate-slide-in-up">
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${feedback.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/90 dark:border-green-800 dark:text-white'
                        : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/90 dark:border-red-800 dark:text-white'
                        }`}>
                        {feedback.type === 'success' ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                        <span className="text-sm font-medium">{feedback.msg}</span>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};
