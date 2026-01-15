import { useEffect } from "react";
import "animate.css";

export default function CategoryModal({
    category,
    items,
    onClose,
    onItemClick,
}) {
    // Logic for closing on ESC
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!category) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm animate__animated animate__fadeIn animate__faster">

            {/* CLICK OUTSIDE TO CLOSE */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* --- WINDOW / CARD VIEW --- */}
            <div
                className="relative w-full max-w-6xl max-h-[90vh] bg-surface rounded-sm overflow-hidden shadow-2xl flex flex-col animate__animated animate__zoomIn animate__faster border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >

                {/* WINDOW HEADER / CLOSE */}
                <div className="flex justify-end p-6 absolute top-0 right-0 z-10">
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-white transition-colors bg-black/20 hover:bg-black/50 rounded-full p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* SCROLLABLE CONTENT */}
                <div className="overflow-y-auto p-8 sm:p-12">

                    {/* TITLE & DESC */}
                    <div className="text-center mb-12">
                        <h3 className="text-white font-heading uppercase tracking-[0.08em] text-[28px] sm:text-[40px] md:text-[56px]">
                            {category.title}
                        </h3>
                        {category.description && (
                            <p className="mt-4 text-white/70 text-[16px] sm:text-[18px] max-w-3xl mx-auto leading-relaxed">
                                {category.description}
                            </p>
                        )}
                    </div>

                    {/* IMAGES GRID */}
                    {items.length === 0 ? (
                        <div className="text-center text-white/50 py-10">No images yet for this category.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                            {items.map((item, index) => (
                                <div
                                    key={item.id || index}
                                    onClick={() => onItemClick(index)}
                                    className="group cursor-pointer flex flex-col gap-3"
                                >
                                    <div className="rounded-sm overflow-hidden aspect-video sm:aspect-square relative w-full bg-black/20">
                                        {item.videoUrl ? (
                                            <video
                                                src={item.videoUrl}
                                                poster={item.thumb || undefined}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                muted
                                                playsInline
                                                preload="metadata"
                                            />
                                        ) : (
                                            <img
                                                src={item.thumb || item.image}
                                                alt={item.alt || item.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                        )}
                                        {/* Overlay hint */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white drop-shadow-lg">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* TITLE BELOW IMAGE */}
                                    <div className="px-1 text-center">
                                        <h4 className="text-white/90 text-sm sm:text-base font-medium uppercase tracking-wider group-hover:text-white transition-colors">
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
