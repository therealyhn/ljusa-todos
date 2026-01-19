import { useEffect } from 'react';

export default function useEscapeKey(onEscape, enabled = true) {
    useEffect(() => {
        if (!enabled) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onEscape();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onEscape, enabled]);
}
