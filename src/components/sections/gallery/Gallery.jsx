import { useEffect, useMemo, useState } from 'react';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import CategoryCard from './CategoryCard';
import CategoryModal from './CategoryModal';
import GalleryCatalogModal from './GalleryCatalogModal';
import Lightbox from './Lightbox';
import { sanityClient, urlFor } from '../../../lib/sanityClient';

export default function Gallery({ mode = 'preview', previewCount = 3 }) {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(null);
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);

    const isPreviewMode = mode === 'preview';

    useEffect(() => {
        let isMounted = true;

        sanityClient
            .fetch(
                `*[_type == "galleryCategory"] | order(order asc){
                    _id,
                    title,
                    description,
                    coverImage,
                    items[]{
                        _key,
                        title,
                        image,
                        video{
                            asset->{
                                url
                            }
                        },
                        alt
                    }
                }`
            )
            .then((data) => {
                if (!isMounted) return;

                const mappedCategories = (data || []).map((cat) => ({
                    id: cat._id,
                    title: cat.title,
                    description: cat.description,
                    image: cat.coverImage
                        ? urlFor(cat.coverImage).width(1000).fit('max').quality(70).auto('format').url()
                        : null,
                    items: (cat.items || []).map((item, index) => ({
                        id: item._key || `${cat._id}-${index}`,
                        title: item.title,
                        thumb: item.image
                            ? urlFor(item.image).width(800).fit('max').quality(70).auto('format').url()
                            : null,
                        full: item.image
                            ? urlFor(item.image).width(1800).fit('max').quality(75).auto('format').url()
                            : null,
                        videoUrl: item.video?.asset?.url || null,
                        alt: item.alt || item.title,
                    })),
                }));

                setCategories(mappedCategories);
            })
            .catch((error) => {
                console.error('Gallery fetch error:', error);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const itemsForActiveCategory = activeCategory ? activeCategory.items : [];
    const previewCategories = useMemo(
        () => categories.slice(0, previewCount),
        [categories, previewCount]
    );
    const visibleCategories = isPreviewMode ? previewCategories : categories;

    const openCategory = (category) => {
        setActiveCategory(category);
        setActiveImageIndex(null);
    };

    const closeCategory = () => {
        setActiveCategory(null);
        setActiveImageIndex(null);
    };

    const handleSelectFromCatalog = (category) => {
        setIsCatalogOpen(false);
        openCategory(category);
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
        <section id="gallery" className="bg-surface py-12 md:py-16">
            <Container>
                <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.36em] text-white/40">Visuals</p>
                        <h2 className="mt-2 text-4xl font-heading font-bold uppercase tracking-tight text-white md:text-6xl">
                            Gallery
                        </h2>
                        <p className="mt-3 max-w-xl text-xs uppercase tracking-[0.2em] text-secondary/80">
                            Highlight selekcija nastupa. Celu galeriju otvaras iz jednog mesta.
                        </p>
                    </div>
                    {isPreviewMode && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsCatalogOpen(true)}
                            className="w-full md:w-auto"
                        >
                            Otvori celu galeriju
                        </Button>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {visibleCategories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onClick={() => openCategory(category)}
                        />
                    ))}
                </div>
            </Container>

            <GalleryCatalogModal
                isOpen={isCatalogOpen}
                onClose={() => setIsCatalogOpen(false)}
                categories={categories}
                onSelectCategory={handleSelectFromCatalog}
            />

            {activeCategory && activeImageIndex == null && (
                <CategoryModal
                    category={activeCategory}
                    items={itemsForActiveCategory}
                    onClose={closeCategory}
                    onItemClick={(index) => setActiveImageIndex(index)}
                />
            )}

            {activeCategory && activeImageIndex != null && (
                <Lightbox
                    items={itemsForActiveCategory}
                    activeIndex={activeImageIndex}
                    onClose={() => setActiveImageIndex(null)}
                    onPrev={handlePrevImage}
                    onNext={handleNextImage}
                />
            )}
        </section>
    );
}
