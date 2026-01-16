import { useState } from 'react';

export default function MashupList({ tracks, currentIndex, onSelect }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    if (!tracks?.length) {
        return (
            <div className="text-secondary/50 text-center py-20 uppercase tracking-widest text-xs border-y border-white/10">
                No tracks currently available.
            </div>
        );
    }

    return (
        <div
            className="w-full flex flex-col min-h-0"
            onMouseLeave={() => setHoveredIndex(null)}
        >
            <div className="flex pb-4 mb-4 text-[10px] uppercase tracking-widest text-secondary/30 font-medium px-4">
                <span className="w-12">No.</span>
                <span className="flex-1">Title</span>
            </div>

            <div
                className="flex-1 border-y border-white/10 overflow-y-auto pr-2 custom-scrollbar overscroll-contain touch-pan-y"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                {tracks.map((track, index) => {
                    const isActive = index === currentIndex;
                    // Focus logic: if something is hovered, dim others. If nothing hovered, all normal.
                    const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

                    return (
                        <div
                            key={track.id}
                            className={`group relative flex items-center py-6 px-4 border-b border-white/10 transition-all duration-300 cursor-pointer
                                ${isDimmed ? 'opacity-30 blur-[1px]' : 'opacity-100'}
                                ${isActive ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'}
                            `}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onClick={() => onSelect(index)}
                        >
                            {/* Active Indicator Line */}
                            <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300 ${isActive ? 'bg-white' : 'bg-transparent group-hover:bg-white/50'}`} />

                            {/* Index */}
                            <span className={`w-12 text-xs font-mono tracking-wider transition-colors ${isActive ? 'text-white' : 'text-secondary/40'}`}>
                                {String(index + 1).padStart(2, '0')}
                            </span>

                            {/* Track Info */}
                            <div className="flex-1 flex flex-col gap-0.5 pr-4">
                                <span className={`text-[15px] md:text-base uppercase tracking-tight font-bold transition-all duration-300 ${isActive ? 'text-white pl-2' : 'text-white/80 group-hover:text-white group-hover:pl-2'}`}>
                                    {track.title}
                                </span>
                                <span className={`text-[9px] uppercase tracking-[0.2em] font-mono transition-all duration-300 ${isActive ? 'text-secondary/80 pl-2' : 'text-secondary/40 group-hover:pl-2'}`}>
                                    {track.artist}
                                </span>
                            </div>

                            {/* Duration / Playing Animation */}
                            <div className="w-32 flex justify-end items-center">
                                {isActive ? (
                                    <div className="flex items-end gap-[2px] h-3">
                                        <div className="w-[2px] bg-white animate-[equalizer_0.5s_infinite_ease-in-out]" style={{ animationDelay: '0s' }} />
                                        <div className="w-[2px] bg-white animate-[equalizer_0.5s_infinite_ease-in-out]" style={{ animationDelay: '0.2s' }} />
                                        <div className="w-[2px] bg-white animate-[equalizer_0.5s_infinite_ease-in-out]" style={{ animationDelay: '0.4s' }} />
                                    </div>
                                ) : (
                                    <span className="text-xs font-mono text-secondary/40 group-hover:text-white transition-colors">
                                        {track.duration || ''}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
