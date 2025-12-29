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
        <section id="mashups" className="min-h-screen bg-surface py-24">
            <Container>
                <div className="text-center">
                    <h2 className="text-5xl md:text-6xl font-heading font-bold tracking-tighter text-white">
                        Mashups
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-secondary">
                        A curated library of custom edits and DJ mashups.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <MashupPlayer
                        track={currentTrack}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                    <MashupList
                        tracks={mashups}
                        currentIndex={currentIndex}
                        onSelect={setCurrentIndex}
                    />
                </div>
            </Container>
        </section>
    );
}
