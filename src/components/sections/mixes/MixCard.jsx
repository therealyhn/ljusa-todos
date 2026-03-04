import { useState } from 'react';

const getYoutubeThumbnail = (url) => {
    if (!url) return '';
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
    );
    if (!match) return '';
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
};

export default function MixCard({ mix, onOpen }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group cursor-pointer flex flex-col gap-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onOpen}
        >
            {/* Thumbnail Wrapper */}
            <div className="relative aspect-video w-full overflow-hidden bg-white/5 rounded-sm">
                {mix.platform === 'youtube' && getYoutubeThumbnail(mix.mixUrl) ? (
                    <img
                        src={getYoutubeThumbnail(mix.mixUrl)}
                        alt={mix.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        loading="lazy"
                        decoding="async"
                    />
                ) : mix.thumbnail ? (
                    <img
                        src={mix.thumbnail}
                        alt={mix.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black" />
                )}
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-110 bg-white/20' : 'scale-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white ml-1">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1">
                <h3 className="text-lg md:text-xl font-heading font-medium text-white uppercase tracking-wide group-hover:text-accent-blue transition-colors">
                    {mix.title}
                </h3>
                {mix.djName && (
                    <p className="text-[12px] md:text-[14px] uppercase tracking-[0.25em] text-secondary/60">
                        {mix.djName}
                    </p>
                )}
            </div>
        </div>
    );
}
