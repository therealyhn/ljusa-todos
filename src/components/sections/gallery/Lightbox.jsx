import { useEffect } from "react";
import "animate.css";

export default function Lightbox({ items, activeIndex, onClose, onPrev, onNext }) {
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
            className="fixed inset-0 z-[60] bg-zinc-950/98 flex items-center justify-center animate__animated animate__fadeIn animate__faster backdrop-blur-3xl"
            onClick={onClose}
        >
            {/* CLOSE BUTTON */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-20 hover:rotate-90 duration-300"
                aria-label="Close"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* PREV BUTTON */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 md:left-12 text-black/50 hover:text-black md:text-white/50 hover:md:text-white transition-colors z-20 group"
                aria-label="Previous"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 transform group-hover:-translate-x-2 transition-transform drop-shadow-lg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* NEXT BUTTON */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 md:right-12 text-black/50 hover:text-black md:text-white/50 hover:md:text-white transition-colors z-20 group"
                aria-label="Next"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 transform group-hover:translate-x-2 transition-transform drop-shadow-lg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* MAIN IMAGE */}
            <div
                className="relative w-full h-full p-4 md:p-20 flex items-center justify-center pointer-events-none"
                onClick={(e) => e.stopPropagation()}
            >
                {current.videoUrl ? (
                    <video
                        src={current.videoUrl}
                        controls
                        playsInline
                        className="max-w-full max-h-full object-contain drop-shadow-2xl shadow-black animate__animated animate__zoomIn pointer-events-auto select-none"
                    />
                ) : (
                    <img
                        src={current.full || current.image}
                        alt={current.alt || current.title}
                        className="max-w-full max-h-full object-contain drop-shadow-2xl shadow-black animate__animated animate__zoomIn pointer-events-auto select-none"
                    />
                )}

                {/* CAPTION & COUNTER - Elegant Bottom Style */}
                <div className="absolute bottom-6 md:bottom-12 left-0 w-full text-center pointer-events-none">
                    <div className="inline-block bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                        <span className="text-white/40 text-xs font-mono tracking-widest mr-4 border-r border-white/10 pr-4">
                            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                        </span>
                        <span className="text-white text-sm font-medium tracking-wider uppercase">
                            {current.title || 'Untitled'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
