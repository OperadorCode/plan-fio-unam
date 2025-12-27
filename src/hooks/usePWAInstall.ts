
/**
 * Hook personalizado para gestionar el ciclo de vida de instalación de una Progressive Web App (PWA).
 * 
 * Funcionalidades:
 * - Captura el evento `beforeinstallprompt` para determinar si la app es instalable.
 * - Monitorea el evento `appinstalled` para limpiar el estado tras una instalación exitosa.
 * - Expone una función `install` para disparar manualmente el prompt nativo del navegador.
 * 
 * @returns {Object}
 * - `deferredPrompt`: El evento de instalación almacenado.
 * - `isInstallable`: Booleano que indica si el prompt de instalación puede ser mostrado.
 * - `install`: Función asíncrona para ejecutar la lógica de instalación.
 */




import { useState, useEffect, useCallback } from 'react';

export const usePWAInstall = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);

        };

        window.addEventListener('beforeinstallprompt', handler);

        window.addEventListener('appinstalled', () => {
            setDeferredPrompt(null);
            setIsInstallable(false);

        });

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const install = useCallback(async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;


        setDeferredPrompt(null);
        setIsInstallable(false);
    }, [deferredPrompt]);

    return { isInstallable, install };
};
