import { useEffect } from 'react';

type KeyCombo = string;
type Handler = (e: KeyboardEvent) => void;

interface Shortcut {
    combo: KeyCombo;
    handler: Handler;
    preventDefault?: boolean;
}

/**
 * Hook para manejar atajos de teclado de manera centralizada y mantenible.
 * @param shortcuts Array de objetos con la combinación de teclas y su handler.
 */
export const useKeyboardShortcuts = (shortcuts: Shortcut[]) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            shortcuts.forEach(({ combo, handler, preventDefault = true }) => {
                const keys = combo.toLowerCase().split('+');
                const mainKey = keys[keys.length - 1];
                const needsCtrl = keys.includes('ctrl');
                const needsMeta = keys.includes('meta');
                const needsCmd = keys.includes('cmd');
                const needsShift = keys.includes('shift');
                const needsAlt = keys.includes('alt');

                const isCtrlPressed = e.ctrlKey;
                const isMetaPressed = e.metaKey;
                const isShiftPressed = e.shiftKey;
                const isAltPressed = e.altKey;

                if (needsCtrl && !isCtrlPressed) return;
                if ((needsMeta || needsCmd) && !isMetaPressed) return;
                if (needsShift && !isShiftPressed) return;
                if (needsAlt && !isAltPressed) return;
                if (e.key.toLowerCase() === mainKey) {
                    if (preventDefault) e.preventDefault();
                    handler(e);
                }
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts]);
};
