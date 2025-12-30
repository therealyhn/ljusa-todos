import { useEffect } from 'react';
import "animate.css";

const getEmbedUrl = (url) => {
    if (!url) return '';
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
    );
    if (!match) return url;
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&modestbranding=1&rel=0`; // Added autoplay and clean params
};

export default function MixModal({ mix, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!mix) return null;

    const embedUrl = getEmbedUrl(mix.youtubeUrl);

    return (
        <div className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate__animated animate__fadeIn animate__faster">
            <div className="absolute inset-0" onClick={onClose} />

            <div
                className="relative w-full max-w-6xl flex flex-col gap-6 animate__animated animate__zoomIn animate__faster pointer-events-none"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Actions */}
                <div className="flex justify-between items-end pointer-events-auto px-1">
                    <div className="flex flex-col">
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-white uppercase tracking-wider">
                            {mix.title}
                        </h3>
                        {mix.djName && (
                            <p className="text-xs uppercase tracking-[0.3em] text-secondary">
                                {mix.djName}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Video Player */}
                <div className="aspect-video w-full bg-black rounded-sm overflow-hidden shadow-2xl shadow-blue-900/10 pointer-events-auto border border-white/10">
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            title={mix.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-secondary/50 uppercase tracking-widest text-sm">
                            Video Unavailable
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
