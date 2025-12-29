import { useState } from 'react';
import Container from '../../ui/Container';
import CategoryCard from './CategoryCard';
import CategoryModal from './CategoryModal';
import ImageGalleryModal from './ImageGalleryModal';

const categories = [
    {
        id: 'solo',
        title: 'Solo',
        description: 'Single-artist sets and curated sonic journeys.',
        image: 'https://placehold.co/900x1200?text=Solo',
        items: [
            { id: 's1', title: 'Neon Pulse', image: 'https://placehold.co/1200x1600?text=Solo+01' },
            { id: 's2', title: 'Glass Room', image: 'https://placehold.co/1200x1600?text=Solo+02' },
            { id: 's3', title: 'Signal / Noise', image: 'https://placehold.co/1200x1600?text=Solo+03' },
        ],
    },
    {
        id: 'b2b',
        title: 'B2B',
        description: 'Shared energy, live blends, and kinetic edits.',
        image: 'https://placehold.co/900x1200?text=B2B',
        items: [
            { id: 'b1', title: 'Midnight Alloy', image: 'https://placehold.co/1200x1600?text=B2B+01' },
            { id: 'b2', title: 'Voltage Mix', image: 'https://placehold.co/1200x1600?text=B2B+02' },
            { id: 'b3', title: 'Parallel', image: 'https://placehold.co/1200x1600?text=B2B+03' },
        ],
    },
    {
        id: 'studio',
        title: 'Studio',
        description: 'Behind-the-scenes shots, sessions, and edits.',
        image: 'https://placehold.co/900x1200?text=Studio',
        items: [
            { id: 'st1', title: 'Deep Cut', image: 'https://placehold.co/1200x1600?text=Studio+01' },
            { id: 'st2', title: 'Low Light', image: 'https://placehold.co/1200x1600?text=Studio+02' },
            { id: 'st3', title: 'Darkroom', image: 'https://placehold.co/1200x1600?text=Studio+03' },
        ],
    },
];

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(null);

    const itemsForActiveCategory = activeCategory ? activeCategory.items : [];

    const openCategory = (category) => {
        setActiveCategory(category);
        setActiveImageIndex(null);
    };

    const closeCategory = () => {
        setActiveCategory(null);
        setActiveImageIndex(null);
    };

    const closeImage = () => {
        setActiveImageIndex(null);
    };

    const handlePrevImage = () => {
        if (activeImageIndex == null || itemsForActiveCategory.length === 0) return;
        setActiveImageIndex((prev) => (prev - 1 + itemsForActiveCategory.length) % itemsForActiveCategory.length);
    };

    const handleNextImage = () => {
        if (activeImageIndex == null || itemsForActiveCategory.length === 0) return;
        setActiveImageIndex((prev) => (prev + 1) % itemsForActiveCategory.length);
    };

    return (
        <section id="gallery" className="py-20 md:py-28 bg-background">
            <Container>
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-5xl md:text-6xl font-heading font-bold tracking-tighter text-white">Gallery</h2>
                    <p className="mt-4 max-w-2xl text-secondary">
                        Explore curated categories and open each one for the full set.
                    </p>
                </div>

                <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onClick={() => openCategory(category)}
                        />
                    ))}
                </ul>
            </Container>

            {activeCategory && activeImageIndex == null && (
                <CategoryModal
                    category={activeCategory}
                    items={itemsForActiveCategory}
                    onClose={closeCategory}
                    onItemClick={(index) => setActiveImageIndex(index)}
                />
            )}

            {activeCategory && activeImageIndex != null && (
                <ImageGalleryModal
                    items={itemsForActiveCategory}
                    activeIndex={activeImageIndex}
                    onClose={closeImage}
                    onPrev={handlePrevImage}
                    onNext={handleNextImage}
                />
            )}
        </section>
    );
}
