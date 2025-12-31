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
        <section id="mashups" className="md:min-h-screen bg-black md:py-24 py-10 relative overflow-hidden">
            <div className="absolute top-[80%] left-[5%] -translate-y-1/2 -rotate-90 origin-left text-[9vw] font-heading font-black text-white/[0.03] uppercase select-none pointer-events-none whitespace-nowrap leading-none tracking-tighter hidden lg:block animate__animated animate__fadeIn">
                Mashups
            </div>
            {/* Ambient Background */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter text-white uppercase opacity-90">
                        Mashups
                    </h2>
                    <div className="h-1 w-20 bg-white/20 mx-auto mt-6 mb-6"></div>
                    <p className="max-w-xl mx-auto text-secondary text-sm uppercase tracking-widest">
                        Exclusive edits & bootlegs for the dancefloor.
                    </p>
                </div>

                <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_1fr] items-start relative">
                    <div className="lg:sticky lg:top-24 z-20 bg-black/50 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none -mx-4 px-4 py-6 lg:p-0 border-b border-white/10 lg:border-none">
                        <MashupPlayer
                            track={currentTrack}
                            onNext={handleNext}
                            onPrev={handlePrev}
                        />
                    </div>
                    <div className="pt-0 lg:pt-4 px-0 md:px-0 pb-12">
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
