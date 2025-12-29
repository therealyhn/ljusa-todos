import Button from '../../ui/Button';

export default function MashupList({ tracks, currentIndex, onSelect }) {
    if (!tracks?.length) {
        return (
            <div className="bg-background border border-white/5 rounded-sm p-8 text-secondary">
                No mashups available yet.
            </div>
        );
    }

    return (
        <div className="bg-background border border-white/5 rounded-sm overflow-hidden">
            <div className="max-h-[70vh] overflow-y-auto">
                {tracks.map((track, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <Button
                            key={track.id}
                            variant="ghost"
                            size="sm"
                            onClick={() => onSelect(index)}
                            className={`w-full justify-between px-5 py-4 text-left normal-case tracking-normal hover:tracking-normal ${isActive
                                ? 'bg-white/5 text-white'
                                : 'text-secondary hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <span className="truncate uppercase">{track.title} - {track.artist}</span>
                            <div className="flex items-center gap-3">
                                {track.tags?.[0] && (
                                    <span className="text-[10px] uppercase tracking-widest text-secondary/80 border border-white/10 px-2 py-1">
                                        {track.tags[0]}
                                    </span>
                                )}
                                {track.tags?.[1] && (
                                    <span className="text-[10px] uppercase tracking-widest text-secondary/80 border border-white/10 px-2 py-1">
                                        {track.tags[1]}
                                    </span>
                                )}

                            </div>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
