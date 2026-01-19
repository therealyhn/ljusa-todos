import { useEffect } from 'react';

export default function useOutsideClick(ref, handler, enabled = true) {
    useEffect(() => {
        if (!enabled) return;
        const handleOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler(event);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        document.addEventListener('touchstart', handleOutside);
        return () => {
            document.removeEventListener('mousedown', handleOutside);
            document.removeEventListener('touchstart', handleOutside);
        };
    }, [ref, handler, enabled]);
}
