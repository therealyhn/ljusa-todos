import { useEffect, useRef, useState } from 'react';
import Button from '../../ui/Button';

const formatTime = (time) => {
    if (!time || Number.isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default function MashupPlayer({ track, onNext, onPrev }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            const nextProgress = (audio.currentTime / audio.duration) * 100 || 0;
            setProgress(nextProgress);
            setCurrentTime(audio.currentTime);
        };

        const setAudioDuration = () => setDuration(audio.duration || 0);
        const handleEnded = () => onNext?.();

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', setAudioDuration);
        audio.addEventListener('ended', handleEnded);

        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', setAudioDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [track, onNext]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio || !track?.src) return;

        if (isPlaying) audio.pause();
        else audio.play();

        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        if (!audio || !duration) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;
        audio.currentTime = newTime;
    };

    if (!track) {
        return (
            <div className="bg-background border border-white/5 rounded-sm p-8 text-secondary">
                No mashups available yet.
            </div>
        );
    }

    return (
        <div className="bg-background border border-white/5 rounded-sm p-8">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-secondary">Now Playing</p>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">
                        {track.title}
                    </h3>
                    <p className="text-sm text-secondary">{track.artist}</p>
                    {track.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {track.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] uppercase tracking-widest text-secondary border border-white/10 px-2 py-1"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="px-3 py-3 rounded-full normal-case tracking-normal hover:tracking-normal"
                        onClick={onPrev}
                        aria-label="Previous"
                    >
                        <span className="text-lg">{'<'}</span>
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        className="w-12 h-12 p-0 rounded-full normal-case tracking-normal hover:tracking-normal"
                        onClick={togglePlay}
                        disabled={!track.src}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? 'II' : '>'}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="px-3 py-3 rounded-full normal-case tracking-normal hover:tracking-normal"
                        onClick={onNext}
                        aria-label="Next"
                    >
                        <span className="text-lg">{'>'}</span>
                    </Button>
                </div>

                <div>
                    <div
                        className="relative h-2 w-full rounded-full bg-white/10 cursor-pointer"
                        onClick={handleSeek}
                    >
                        <div
                            className="absolute left-0 top-0 h-2 rounded-full bg-white"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-secondary">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>

            <audio ref={audioRef} src={track.src} preload="metadata" />
        </div>
    );
}
