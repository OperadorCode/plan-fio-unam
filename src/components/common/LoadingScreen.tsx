import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingScreen: React.FC<{ message?: string }> = ({ message = "Cargando..." }) => {
    return (
        <div className="flex flex-col items-center justify-center h-[400px] w-full bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 animate-pulse">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
            <span className="text-gray-400 font-medium text-sm tracking-wide uppercase">{message}</span>
        </div>
    );
};
