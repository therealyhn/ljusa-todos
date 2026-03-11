import { useEffect, useMemo, useRef, useState } from 'react';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import MashupPlayer from './MashupPlayer';
import MashupListModal from './MashupListModal';
import { sanityClient } from '../../../lib/sanityClient';

export default function Mashups({ mode = 'preview', previewCount = 3 }) {
    const [mashups, setMashups] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isListOpen, setIsListOpen] = useState(false);
    const [playerHeight, setPlayerHeight] = useState(0);
    const playerWrapperRef = useRef(null);

    const currentTrack = mashups[currentIndex];
    const isPreviewMode = mode === 'preview';
    const previewTracks = useMemo(
        () => mashups.slice(0, previewCount),
        [mashups, previewCount]
    );

    useEffect(() => {
        let isMounted = true;

        sanityClient
            .fetch(`*[_type == "mashupLibrary"][0]{
                items[]{
                    _key,
                    title,
                    artist,
                    order,
                    audioFile{
                        asset->{
                            url
                        }
                    },
                    duration,
                    tags
                }
            }`)
            .then((data) => {
                if (!isMounted) return;

                const sortedItems = (data?.items || [])
                    .map((item, index) => ({ ...item, originalIndex: index }))
                    .sort((a, b) => b.originalIndex - a.originalIndex);

                const mapped = sortedItems.map((item) => ({
                    id: item._key,
                    title: item.title,
                    artist: item.artist || 'XTY',
                    duration: item.duration,
                    src: item.audioFile?.asset?.url || '',
                    tags: item.tags || [],
                }));

                setMashups(mapped);
                setCurrentIndex(0);
            })
            .catch((error) => {
                console.error('Mashups fetch error:', error);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const playerNode = playerWrapperRef.current;
        if (!playerNode || typeof ResizeObserver === 'undefined') return;

        const syncHeight = () => {
            const nextHeight = Math.round(playerNode.getBoundingClientRect().height);
            if (nextHeight > 0) setPlayerHeight(nextHeight);
        };

        syncHeight();
        const observer = new ResizeObserver(syncHeight);
        observer.observe(playerNode);
        window.addEventListener('resize', syncHeight);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', syncHeight);
        };
    }, []);

    const handleNext = () => {
        if (!mashups.length) return;
        setCurrentIndex((prev) => (prev + 1) % mashups.length);
    };

    const handlePrev = () => {
        if (!mashups.length) return;
        setCurrentIndex((prev) => (prev - 1 + mashups.length) % mashups.length);
    };

    const listTracks = isPreviewMode ? previewTracks : mashups;

    const renderTrackCard = (track, isActive, isMobile = false) => {
        const trackTags = Array.isArray(track.tags) && track.tags.length > 0
            ? track.tags.slice(0, isMobile ? 2 : 3)
            : ['Balkan'];

        return (
            <button
                type="button"
                onClick={() => {
                    const globalIndex = mashups.findIndex((item) => item.id === track.id);
                    if (globalIndex >= 0) setCurrentIndex(globalIndex);
                }}
                className={`h-full w-full border text-left transition ${
                    isMobile
                        ? 'px-4 py-4'
                        : 'px-4 py-4 md:px-5 md:py-5'
                } ${isActive
                    ? 'border-white/30 bg-white/10 text-white'
                    : 'border-white/10 text-white/75 hover:border-white/25 hover:text-white'
                    }`}
            >
                <div className="flex h-full flex-col justify-between">
                    <div className="min-w-0">
                        <p className="text-[9px] uppercase tracking-[0.22em] text-white/45">
                            XTY Mashup
                        </p>
                        <h3 className="mt-2 text-base font-semibold uppercase leading-tight tracking-[0.04em] text-white md:text-lg">
                            {track.title}
                        </h3>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-secondary/80">
                            {track.artist || 'XTY'}
                        </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {trackTags.map((tag) => (
                            <span
                                key={`${track.id}-${String(tag)}`}
                                className="border border-white/15 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-white/70"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </button>
        );
    };

    return (
        <section id="mashups" className="overflow-x-hidden bg-black py-12 md:py-16">
            <Container>
                <div className="mx-auto max-w-[1040px]">
                    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.36em] text-white/40">Listen</p>
                            <h2 className="mt-2 text-4xl font-heading font-bold uppercase tracking-tight text-white md:text-6xl">
                                Mashups
                            </h2>
                            <p className="mt-3 max-w-xl text-xs uppercase tracking-[0.2em] text-secondary/80">
                                Najjaci izbor sa brzom kontrolom i instant pristupom celoj biblioteci.
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsListOpen(true)}
                            className="w-full md:w-auto"
                        >
                            Otvori celu biblioteku
                        </Button>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)]">
                        <div ref={playerWrapperRef} className="min-w-0">
                            <MashupPlayer
                                track={currentTrack}
                                onNext={handleNext}
                                onPrev={handlePrev}
                            />
                        </div>

                        <div
                            className="min-w-0 flex flex-col border border-white/10 bg-white/[0.02] p-4 lg:h-[var(--player-height)] lg:overflow-hidden"
                            style={playerHeight > 0 ? { '--player-height': `${playerHeight}px` } : undefined}
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                                    {isPreviewMode ? `Poslednja ${listTracks.length}` : 'Library'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setIsListOpen(true)}
                                    className="text-[10px] uppercase tracking-[0.24em] text-white/60 transition hover:text-white"
                                >
                                    View all
                                </button>
                            </div>

                            {!listTracks.length ? (
                                <p className="py-8 text-center text-xs uppercase tracking-[0.2em] text-secondary/60">
                                    Nema dostupnih mashupova.
                                </p>
                            ) : (
                                <>
                                    <ul className="space-y-3 lg:hidden">
                                        {listTracks.map((track) => {
                                            const globalIndex = mashups.findIndex((item) => item.id === track.id);
                                            const isActive = globalIndex === currentIndex;

                                            return (
                                                <li key={track.id}>
                                                    {renderTrackCard(track, isActive, true)}
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    <ul className="hidden lg:flex-1 lg:grid lg:grid-rows-3 lg:gap-3">
                                        {listTracks.map((track) => {
                                            const globalIndex = mashups.findIndex((item) => item.id === track.id);
                                            const isActive = globalIndex === currentIndex;

                                            return (
                                                <li key={track.id} className="h-full">
                                                    {renderTrackCard(track, isActive)}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Container>

            <MashupListModal
                isOpen={isListOpen}
                onClose={() => setIsListOpen(false)}
                tracks={mashups}
                currentIndex={currentIndex}
                onSelect={setCurrentIndex}
            />
        </section>
    );
}
