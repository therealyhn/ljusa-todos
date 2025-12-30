import Button from '../../ui/Button';

export default function MashupList({ tracks, currentIndex, onSelect }) {
    if (!tracks?.length) {
        return (
            <div className="text-secondary/50 text-center py-12 uppercase tracking-widest text-sm">
                No tracks loaded
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-white/40 text-xs uppercase tracking-[0.2em] mb-6 pl-2">Up Next</h3>
            <div className="h-[420px] md:h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {tracks.map((track, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <div
                            key={track.id}
                            className={`group flex items-center justify-between py-4 px-2 border-b border-white/5 cursor-pointer transition-all duration-300 ${isActive ? 'bg-white/5 pl-4' : 'hover:pl-4 hover:bg-white/[0.02]'}`}
                            onClick={() => onSelect(index)}
                        >
                            <div className="flex items-center gap-4 overflow-hidden">
                                <span className={`text-xs font-mono w-6 ${isActive ? 'text-white' : 'text-white/20'}`}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="flex flex-col min-w-0">
                                    <span className={`text-sm md:text-base font-medium uppercase tracking-wide truncate transition-colors ${isActive ? 'text-white' : 'text-secondary group-hover:text-white'}`}>
                                        {track.title}
                                    </span>
                                    <span className="text-[10px] md:text-xs text-secondary/60 uppercase tracking-wider truncate">
                                        {track.artist}
                                    </span>
                                </div>
                            </div>

                            {/* Tags or Duration */}
                            <div className="hidden md:flex items-center gap-2">
                                {track.tags?.slice(0, 2).map((tag) => (
                                    <span key={tag} className="text-[9px] uppercase tracking-widest text-secondary/40 border border-white/5 px-1.5 py-0.5 whitespace-nowrap">
                                        {tag}
                                    </span>
                                ))}
                                {isActive && (
                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse ml-2" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
