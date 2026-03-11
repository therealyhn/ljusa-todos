import useEscapeKey from '../../../hooks/useEscapeKey';
import useScrollLock from '../../../hooks/useScrollLock';
import "animate.css";

const getEmbedUrl = (url, platform) => {
    if (!url) return '';
    if (platform === 'soundcloud') {
        return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%2309090b&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
    }
    if (platform === 'mixcloud') {
        return `https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${encodeURIComponent(url)}`;
    }
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
    );
    if (!match) return url;
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&modestbranding=1&rel=0`;
};

export default function MixModal({ mix, onClose }) {
    useEscapeKey(onClose, Boolean(mix));
    useScrollLock(Boolean(mix));

    if (!mix) return null;

    const embedUrl = getEmbedUrl(mix.mixUrl, mix.platform);

    return (
        <div className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate__animated animate__fadeIn animate__faster">
            <div className="absolute inset-0" onClick={onClose} />

            <div
                className="relative w-full max-w-6xl animate__animated animate__zoomIn animate__faster"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-surface border border-white/10 rounded-sm p-6 md:p-8 flex flex-col gap-6">
                    {/* Header Actions */}
                    <div className="flex justify-between items-end">
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

                    {/* Player */}
                    <div className="aspect-video w-full bg-black rounded-sm overflow-hidden shadow-2xl shadow-blue-900/10 border border-white/10">
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
        </div>
    );
}
