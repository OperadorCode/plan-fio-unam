import React from 'react';

export const LoadingScreen: React.FC<{ message?: string }> = ({ message = "Cargando aplicación..." }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 w-full h-[400px] bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm backdrop-blur-sm">
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-12 h-12 border-4 border-blue-100 dark:border-blue-900/50 rounded-full">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                </div>
            </div>
            <h3 className="text-gray-900 dark:text-white font-medium text-sm mb-1">
                Planificador FIO
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs animate-pulse">
                {message}
            </p>
        </div>
    );
};
