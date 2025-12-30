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
        <div className="relative">
            {/* Current Track Info */}
            <div className="flex flex-col gap-4 md:gap-6 text-center mb-6 md:mb-10">
                <div className="flex flex-col gap-2 md:gap-3">
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-accent-blue animate-pulse">Now Playing</p>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-white uppercase leading-none tracking-tight px-2">
                        {track.title}
                    </h3>
                    <p className="text-xs md:text-base text-secondary/80 uppercase tracking-widest">{track.artist}</p>

                    {track.tags?.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 pt-1 md:pt-2 opacity-50">
                            {track.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[9px] uppercase tracking-widest text-secondary border border-white/10 px-2 py-1"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* CONTROLS */}
                <div className="flex items-center justify-center gap-8 py-4">
                    <button
                        className="text-white/40 hover:text-white transition-colors hover:scale-110 active:scale-95 duration-200"
                        onClick={onPrev}
                        aria-label="Previous"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                            <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
                        </svg>
                    </button>

                    <button
                        className="group relative flex items-center justify-center w-20 h-20 bg-white rounded-full text-black hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                        onClick={togglePlay}
                        disabled={!track.src}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 ml-1">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>

                    <button
                        className="text-white/40 hover:text-white transition-colors hover:scale-110 active:scale-95 duration-200"
                        onClick={onNext}
                        aria-label="Next"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                            <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
                        </svg>
                    </button>
                </div>

                {/* SEEK BAR */}
                <div className="px-4 md:px-12">
                    <div
                        className="relative h-1 w-full rounded-sm bg-white/10 cursor-pointer group py-1" // increased trigger area
                        onClick={handleSeek}
                    >
                        {/* Actual Visible Line */}
                        <div className="absolute top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-100"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Thumb */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ left: `${progress}%` }}
                        />
                    </div>
                    <div className="mt-2 flex justify-between text-[10px] font-mono tracking-widest text-secondary/40">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>

            <audio ref={audioRef} src={track.src} preload="metadata" />
        </div>
    );
}
