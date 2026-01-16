import { useEffect, useState } from 'react';
import Container from '../../ui/Container';
import MashupPlayer from './MashupPlayer';
import MashupList from './MashupList';
import MashupListModal from './MashupListModal';
import { sanityClient } from '../../../lib/sanityClient';

export default function Mashups() {
    const [mashups, setMashups] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isListOpen, setIsListOpen] = useState(false);
    const currentTrack = mashups[currentIndex];

    useEffect(() => {
        let isMounted = true;

        sanityClient
            .fetch(`*[_type == "mashupLibrary"][0]{
                items[]{
                    _key,
                    title,
                    artist,
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
                const mapped = (data?.items || []).map((item) => ({
                    id: item._key,
                    title: item.title,
                    artist: item.artist || 'LJUSA x TODOS',
                    duration: item.duration,
                    src: item.audioFile?.asset?.url || '',
                    tags: item.tags || [],
                }));
                setMashups(mapped);
                setCurrentIndex(0);
            })
            .catch((err) => {
                console.error('Mashups fetch error:', err);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const handleNext = () => {
        if (!mashups.length) return;
        setCurrentIndex((i) => (i + 1) % mashups.length);
    };

    const handlePrev = () => {
        if (!mashups.length) return;
        setCurrentIndex((i) => (i - 1 + mashups.length) % mashups.length);
    };

    return (
        <section id="mashups" className="min-h-screen lg:h-screen bg-black py-16 lg:py-20 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

            <Container className="relative z-10 lg:h-full">
                <div className="flex flex-col lg:h-full lg:flex-row gap-12 lg:gap-24">
                    {/* Left Side: Sticky Title & Player */}
                    <div className="lg:w-[40%] lg:sticky lg:top-10 self-center space-y-8 items-center text-center lg:items-start lg:text-left">
                        <div>
                            <p className="text-secondary/60 text-[10px] uppercase tracking-[0.4em] mb-4 pl-1">Music Library</p>
                            <h2 className="text-6xl md:text-7xl font-heading font-bold text-white uppercase tracking-tighter leading-[0.9]">
                                Mashups<br />& Edits
                            </h2>
                        </div>
                        <div className="lg:hidden">
                            <button
                                className="w-full border border-white/10 text-white uppercase tracking-widest text-xs py-3 hover:border-white/30 hover:bg-white/5 transition"
                                onClick={() => setIsListOpen(true)}
                            >
                                Open Mashup List
                            </button>
                        </div>
                        <div className="hidden lg:block h-px w-20 bg-white/10" />

                        {/* Player Component */}
                        <div>
                            <MashupPlayer
                                track={currentTrack}
                                onNext={handleNext}
                                onPrev={handlePrev}
                            />
                        </div>
                    </div>

                    {/* Right Side: Scrollable List */}
                    <div className="hidden lg:flex lg:w-[60%] flex-col pt-4 min-h-0">
                        <MashupList
                            tracks={mashups}
                            currentIndex={currentIndex}
                            onSelect={setCurrentIndex}
                        />
                    </div>
                </div>
            </Container>

            <div className="lg:hidden">
                <MashupListModal
                    isOpen={isListOpen}
                    onClose={() => setIsListOpen(false)}
                    tracks={mashups}
                    currentIndex={currentIndex}
                    onSelect={setCurrentIndex}
                />
            </div>
        </section>
    );
}
