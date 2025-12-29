import { useEffect } from "react";
import "animate.css";

export default function ImageGalleryModal({ items, activeIndex, onClose, onPrev, onNext }) {
    const shouldShow = items && items.length > 0 && activeIndex != null;

    useEffect(() => {
        if (!shouldShow) return;

        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [shouldShow, onClose, onPrev, onNext]);

    if (!shouldShow) return null;

    const current = items[activeIndex];

    return (
        <div
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center animate__animated animate__fadeIn animate__faster"
            onClick={onClose}
        >
            {/* CLOSE BUTTON */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-20"
                aria-label="Close"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* PREV BUTTON */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 sm:left-8 text-white/70 hover:text-white transition-colors z-20 hover:scale-110 p-2"
                aria-label="Previous"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 sm:w-16 sm:h-16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* NEXT BUTTON */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 sm:right-8 text-white/70 hover:text-white transition-colors z-20 hover:scale-110 p-2"
                aria-label="Next"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 sm:w-16 sm:h-16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* MAIN IMAGE */}
            <div
                className="relative w-full h-full p-4 sm:p-12 flex items-center justify-center pointer-events-none"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={current.image}
                    alt={current.alt || current.title}
                    className="max-w-full max-h-full object-contain drop-shadow-2xl animate__animated animate__zoomIn pointer-events-auto select-none"
                />
                {/* CAPTION & COUNTER */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                    <h4 className="text-white text-lg font-medium mb-1 drop-shadow-md">{current.title}</h4>
                    <p className="text-white/50 text-sm tracking-widest">{activeIndex + 1} / {items.length}</p>
                </div>
            </div>
        </div>
    );
}
