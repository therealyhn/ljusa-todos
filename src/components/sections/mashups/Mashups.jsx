import { useEffect, useState } from 'react';
import Container from '../../ui/Container';
import MashupPlayer from './MashupPlayer';
import MashupList from './MashupList';
import { sanityClient } from '../../../lib/sanityClient';

export default function Mashups() {
    const [mashups, setMashups] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
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
        <section id="mashups" className="h-screen bg-black py-16 lg:py-20 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

            <Container className="relative z-10 h-full">
                <div className="flex h-full flex-col lg:flex-row gap-12 lg:gap-24">
                    {/* Left Side: Sticky Title & Player */}
                    <div className="lg:w-[40%] lg:sticky lg:top-10 self-start space-y-8">
                        <div>
                            <p className="text-secondary/60 text-[10px] uppercase tracking-[0.4em] mb-4 pl-1">Music Library</p>
                            <h2 className="text-6xl md:text-7xl font-heading font-bold text-white uppercase tracking-tighter leading-[0.9]">
                                Mashups<br />& Edits
                            </h2>
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
                    <div className="lg:w-[60%] flex flex-col pt-4 min-h-0">
                        <MashupList
                            tracks={mashups}
                            currentIndex={currentIndex}
                            onSelect={setCurrentIndex}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}
