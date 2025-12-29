import { useEffect, useState } from 'react';
import Container from '../../ui/Container';
import CategoryCard from './CategoryCard';
import CategoryModal from './CategoryModal';
import Lightbox from './Lightbox';
import { sanityClient, urlFor } from '../../../lib/sanityClient';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

export default function Gallery() {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(null);

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
                        alt,
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
                        caption: item.caption,
                        thumb: item.image
                            ? urlFor(item.image).width(800).fit('max').quality(70).auto('format').url()
                            : null,
                        full: item.image
                            ? urlFor(item.image).width(1800).fit('max').quality(75).auto('format').url()
                            : null,
                        alt: item.alt || item.title,
                    })),
                }));

                setCategories(mappedCategories);
            })
            .catch((err) => {
                console.error('Gallery fetch error:', err);
            });

        return () => {
            isMounted = false;
        };
    }, []);

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

                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={24}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="mt-12 gallery-swiper"
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <CategoryCard
                                category={category}
                                onClick={() => openCategory(category)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
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
                <Lightbox
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
