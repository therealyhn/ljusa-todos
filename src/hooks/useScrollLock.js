import { useEffect } from 'react';

export default function useScrollLock(locked) {
    useEffect(() => {
        if (!locked) return;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow || '';
        };
    }, [locked]);
}
