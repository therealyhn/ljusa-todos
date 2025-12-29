import { useState } from 'react';
import Container from '../../ui/Container';
import MashupPlayer from './MashupPlayer';
import MashupList from './MashupList';

const mashups = [
    {
        id: 'm1',
        title: 'Neon Circuit',
        artist: 'LJUSA x TODOS',
        duration: '3:24',
        src: '',
    },
    {
        id: 'm2',
        title: 'Midnight Alloy',
        artist: 'LJUSA x TODOS',
        duration: '4:02',
        src: '',
    },
    {
        id: 'm3',
        title: 'Glass Room',
        artist: 'LJUSA x TODOS',
        duration: '3:11',
        src: '',
    },
    {
        id: 'm4',
        title: 'Voltage',
        artist: 'LJUSA x TODOS',
        duration: '5:08',
        src: '',
    },
    {
        id: 'm5',
        title: 'Parallel',
        artist: 'LJUSA x TODOS',
        duration: '4:36',
        src: '',
    },
];

export default function Mashups() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentTrack = mashups[currentIndex];

    const handleNext = () => {
        setCurrentIndex((i) => (i + 1) % mashups.length);
    };

    const handlePrev = () => {
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
