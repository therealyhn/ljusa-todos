import { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';

const formatTime = (time) => {
    if (!time || Number.isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const spectrumBars = [
    32, 46, 58, 72, 64, 76, 52, 68, 84, 60, 74, 54,
    70, 82, 62, 78, 56, 66, 80, 48, 72, 60, 76, 52,
];

export default function MashupPlayer({ track, onNext, onPrev }) {
    const audioRef = useRef(null);
    const volumeRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [showVolume, setShowVolume] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            const nextProgress = (audio.currentTime / audio.duration) * 100 || 0;
            setProgress(nextProgress);
            setCurrentTime(audio.currentTime);
        };

        const setAudioDuration = () => {
            setDuration(audio.duration || 0);
            setCurrentTime(audio.currentTime || 0);
            setProgress(0);
        };
        const handleEnded = () => onNext?.();

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', setAudioDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', setAudioDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [track, onNext]);

    // Auto-play when track changes
    useEffect(() => {
        if (track && audioRef.current) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        }
    }, [track]);

    // Volume sync
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Close volume popup on outside click
    useOutsideClick(volumeRef, () => setShowVolume(false), showVolume);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio || !track?.src) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
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

    const handleSeekPointer = (e) => {
        const audio = audioRef.current;
        if (!audio || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clampedX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
        const newTime = (clampedX / rect.width) * duration;
        audio.currentTime = newTime;
    };

    const handleVolumePointer = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clampedY = Math.min(Math.max(e.clientY - rect.top, 0), rect.height);
        const newVolume = Math.min(Math.max(1 - (clampedY / rect.height), 0), 1);
        setVolume(newVolume);
    };

    if (!track) {
        return (
            <div className="border border-white/10 p-6 rounded-sm bg-white/[0.02]">
                <p className="text-secondary/50 text-xs uppercase tracking-widest text-center">Select a track</p>
            </div>
        );
    }

    return (
        <div className="relative group/player mx-auto w-full max-w-full select-none overflow-x-hidden md:max-w-none">
            {/* Main Controller Frame */}
            <div className="bg-[#050505] border-[1.5px] border-white/10 p-1 lg:p-1.5 overflow-hidden shadow-2xl">

                {/* Inner Display Area */}
                <div className="relative bg-[#080808] border border-white/5 p-8 lg:p-12 overflow-hidden">

                    {/* Visual Overlays */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

                    {/* Top Status Bar */}
                    <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-start mb-10 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'bg-white/20'}`} />
                                {isPlaying && <div className="absolute inset-0 w-2 h-2 rounded-full bg-white animate-ping opacity-40" />}
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-[9px] uppercase tracking-[0.2em] font-mono leading-none ${isPlaying ? 'text-green-500' : 'text-white/30'}`}>
                                    {isPlaying ? 'System Active' : 'Standby Mode'}
                                </span>
                                <span className="text-[8px] text-white/20 font-mono tracking-widest mt-1">REF: XTY </span>
                            </div>
                        </div>

                        {/* Animated Spectrum (Small version) */}
                        <div className="flex items-end gap-[1px] h-4">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-[2px] bg-white transition-all duration-300 ${isPlaying ? 'animate-[equalizer_0.6s_infinite_ease-in-out]' : 'h-[2px] opacity-20'}`}
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Main Display: Title & Meta */}
                    <div className="mb-12 relative z-10 text-center lg:text-left">
                        <div className="flex items-baseline gap-2 mb-2 justify-center lg:justify-start">
                            <span className="text-[10px] font-mono text-white/20">NOW_PLAYING:</span>
                            <div className="h-px w-12 bg-white/10 lg:flex-1" />
                        </div>

                        <h3 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter leading-[0.85] mb-4">
                            {track.title}
                        </h3>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <p className="text-xs text-white/60 uppercase tracking-[0.2em] font-mono">
                                {track.artist}
                            </p>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <div className="flex gap-2">
                                {track.tags?.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-[9px] uppercase tracking-widest text-white/30 border border-white/10 px-1.5 py-0.5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center Section: Animated VU / Spectrum */}
                    <div className="mb-12 flex justify-between items-end h-16 border-b border-white/10 pb-6 relative z-10">
                        <div className="flex-1 flex items-end gap-1.5 h-full">
                            {spectrumBars.map((barHeight, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 bg-white/5 relative overflow-hidden transition-all duration-500`}
                                    style={{
                                        height: `${isPlaying ? barHeight : 10}%`,
                                        opacity: isPlaying ? 0.3 + (i / 24) * 0.4 : 0.1,
                                    }}
                                >
                                    {isPlaying && (
                                        <div
                                            className="absolute inset-0 bg-white animate-[equalizer_0.8s_infinite_ease-in-out]"
                                            style={{ animationDelay: `${(i % 5) * 0.1}s` }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="hidden md:flex ml-8 flex-col justify-between h-full py-1 text-right">
                            <span className="text-[10px] font-mono text-white/40 tracking-tighter">-6db</span>
                            <span className="text-[10px] font-mono text-white/40 tracking-tighter">-12db</span>
                            <span className="text-[10px] font-mono text-white/20 tracking-tighter">-∞</span>
                        </div>
                    </div>

                    {/* Progress Control */}
                    <div className="mb-10 relative z-10">
                        <div
                            className="h-10 flex flex-col justify-center cursor-pointer group/seek"
                            onClick={handleSeek}
                            onPointerDown={(e) => {
                                e.currentTarget.setPointerCapture(e.pointerId);
                                handleSeekPointer(e);
                            }}
                            onPointerMove={(e) => {
                                if (e.buttons === 1) handleSeekPointer(e);
                            }}
                            onPointerUp={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
                        >
                            {/* Time Display */}
                            <div className="flex justify-between text-[11px] font-mono tracking-[0.2em] mb-3 transition-colors group-hover/seek:text-white">
                                <span className="text-white">{formatTime(currentTime)}</span>
                                <span className="text-white/30">/ {formatTime(duration)}</span>
                            </div>

                            {/* Progress Bar with Segments */}
                            <div className="w-full h-[3px] bg-white/10 relative overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-200 ease-linear"
                                    style={{ width: `${progress}%` }}
                                />
                                {/* Scanning line */}
                                {isPlaying && (
                                    <div className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[scan_2s_infinite_linear]" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Controls Area */}
                    <div className="flex w-full flex-col items-center gap-6 md:flex-row md:items-center md:justify-between relative z-10">
                        {/* Controls Row */}
                        <div className="flex items-center justify-center gap-6 md:justify-start">
                            <button
                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all active:scale-90"
                                onClick={onPrev}
                                title="Previous Track"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                                </svg>
                            </button>

                            <button
                                className="group/play relative rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white text-black hover:scale-[1.05] active:scale-[0.95] transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                                onClick={togglePlay}
                            >
                                <div className="absolute inset-0 bg-black scale-0 group-hover/play:scale-100 transition-transform duration-300 origin-center opacity-5" />

                                {isPlaying ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6" stroke="currentColor" strokeWidth="6" strokeLinecap="square" aria-hidden="true">
                                        <path d="M5 5L19 19" />
                                        <path d="M19 5L5 19" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 ml-1">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>

                            <button
                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all active:scale-90"
                                onClick={onNext}
                                title="Next Track"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                                    <path d="M6 18l8.5-6L6 6zM16 6h2v12h-2z" />
                                </svg>
                            </button>
                        </div>

                        {/* Volume HUD */}
                        <div ref={volumeRef} className="relative h-20 flex flex-col justify-center items-center md:items-end min-w-0">
                            {/* Volume Info (Always visible) */}
                            <button
                                type="button"
                                className="flex flex-col items-center md:items-end gap-1.5 cursor-pointer rounded-xl px-3 py-2 hover:bg-white/5 transition"
                                onClick={() => setShowVolume((prev) => !prev)}
                                aria-expanded={showVolume}
                                aria-label="Toggle volume control"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">Gain:</span>
                                    <span className="text-[9px] font-mono text-white tracking-widest">{Math.round(volume * 100)}%</span>
                                </div>

                                <div className="w-16 h-[2px] bg-white/10 relative overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
                                        style={{ width: `${volume * 100}%` }}
                                    />
                                </div>
                                <span className="text-[12px] font-mono tracking-widest text-white/20 mt-1 uppercase">VOLUME</span>
                            </button>

                            {/* Volume Slider Popup (Click) */}
                            <div
                                className={`absolute bottom-[calc(100%-10px)] right-0 mb-4 transition-all duration-300 ${showVolume ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-2'}`}
                            >
                                <div className="bg-[#0a0a0a] border border-white/10 p-4 shadow-2xl backdrop-blur-md rounded-xl">
                                    <div
                                        className="h-32 w-8 flex flex-col items-center justify-end cursor-pointer group/vslider"
                                        onClick={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const clickY = e.clientY - rect.top;
                                            const newVolume = Math.min(Math.max(1 - (clickY / rect.height), 0), 1);
                                            setVolume(newVolume);
                                        }}
                                        onPointerDown={(e) => {
                                            e.currentTarget.setPointerCapture(e.pointerId);
                                            handleVolumePointer(e);
                                        }}
                                        onPointerMove={(e) => {
                                            if (e.buttons === 1) handleVolumePointer(e);
                                        }}
                                        onPointerUp={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
                                    >
                                        <div className="w-[2px] h-full bg-white/5 relative">
                                            <div
                                                className="absolute bottom-0 left-0 w-full bg-white transition-all duration-200"
                                                style={{ height: `${volume * 100}%` }}
                                            />
                                            {/* Slider thumb */}
                                            <div
                                                className="absolute left-1/2 -translate-x-1/2 w-3 h-1 bg-white shadow-glow"
                                                style={{ bottom: `${volume * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-[8px] font-mono text-white/30 text-center mt-3 tracking-widest">VOL</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <audio ref={audioRef} src={track.src} preload="auto" />
        </div>
    );
}
