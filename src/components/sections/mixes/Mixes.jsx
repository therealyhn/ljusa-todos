import { useEffect, useMemo, useState } from 'react';
import Container from '../../ui/Container';
import MixCard from './MixCard';
import MixModal from './MixModal';
import Button from '../../ui/Button';
import { sanityClient, urlFor } from '../../../lib/sanityClient';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const INITIAL_VISIBLE = 6;
const MOBILE_VISIBLE = 3;

export default function Mixes() {
    const [filters, setFilters] = useState([]);
    const [mixes, setMixes] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
    const [activeMix, setActiveMix] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        let isMounted = true;

        Promise.all([
            sanityClient.fetch(`*[_type == "mixFilter"] | order(order asc){
                _id,
                title
            }`),
            sanityClient.fetch(`*[_type == "mixLibrary"][0]{
                items[]{
                    _key,
                    title,
                    djName,
                    youtubeUrl,
                    filters[]->{
                        _id,
                        title
                    }
                }
            }`),
        ])
            .then(([filterData, libraryData]) => {
                if (!isMounted) return;

                const mappedFilters = (filterData || []).map((filter) => ({
                    id: filter._id,
                    title: filter.title,
                }));

                const mappedMixes = (libraryData?.items || []).map((item) => ({
                    id: item._key,
                    title: item.title,
                    djName: item.djName,
                    youtubeUrl: item.youtubeUrl,
                    filters: (item.filters || []).map((filter) => filter._id),
                }));

                setFilters(mappedFilters);
                setMixes(mappedMixes);
            })
            .catch((err) => {
                console.error('Mixes fetch error:', err);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const media = window.matchMedia('(max-width: 767px)');
        const update = () => setIsMobile(media.matches);
        update();
        if (media.addEventListener) {
            media.addEventListener('change', update);
        } else {
            media.addListener(update);
        }
        return () => {
            if (media.removeEventListener) {
                media.removeEventListener('change', update);
            } else {
                media.removeListener(update);
            }
        };
    }, []);

    useEffect(() => {
        setVisibleCount(isMobile ? MOBILE_VISIBLE : INITIAL_VISIBLE);
    }, [isMobile]);

    const filteredMixes = useMemo(() => {
        if (activeFilter === 'all') return mixes;
        return mixes.filter((mix) => mix.filters.includes(activeFilter));
    }, [mixes, activeFilter]);

    const visibleMixes = filteredMixes.slice(0, visibleCount);
    const canLoadMore = !isMobile && visibleCount < filteredMixes.length;

    const handleFilterChange = (slug) => {
        setActiveFilter(slug);
        setVisibleCount(isMobile ? MOBILE_VISIBLE : INITIAL_VISIBLE);
    };

    return (
        <section id="mixes" className="md:min-h-screen bg-background md:py-24 py-10 relative overflow-hidden">
            <div className="absolute top-[80%] left-[5%] -translate-y-1/2 -rotate-90 origin-left text-[9vw] font-heading font-black text-white/[0.03] uppercase select-none pointer-events-none whitespace-nowrap leading-none tracking-tighter hidden lg:block animate__animated animate__fadeIn">
                Mixes
            </div>
            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter text-white uppercase opacity-90">
                        Mixes
                    </h2>
                    <div className="h-1 w-20 bg-white/20 mx-auto mt-6 mb-6"></div>
                    <p className="max-w-xl mx-auto text-secondary text-sm uppercase tracking-widest">
                        Curated mixes from live sets and studio sessions.
                    </p>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <button
                        onClick={() => handleFilterChange('all')}
                        className={`text-[10px] md:text-xs uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300 ${activeFilter === 'all'
                            ? 'text-white border-b border-white'
                            : 'text-secondary/60 hover:text-white border-b border-transparent hover:border-white/40'
                            }`}
                    >
                        All
                    </button>
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => handleFilterChange(filter.id)}
                            className={`text-[10px] md:text-xs uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300 ${activeFilter === filter.id
                                ? 'text-white border-b border-white'
                                : 'text-secondary/60 hover:text-white border-b border-transparent hover:border-white/40'
                                }`}
                        >
                            {filter.title}
                        </button>
                    ))}
                </div>

                {isMobile ? (
                    <div className="mt-12 px-4 -mx-4 mixes-mobile-swiper">
                        <Swiper
                            modules={[Navigation]}
                            navigation={true}
                            slidesPerView={1.15}
                            centeredSlides={true}
                            spaceBetween={20}
                            loop={filteredMixes.length > 2}
                        >  {filteredMixes.map((mix) => (
                            <SwiperSlide key={mix.id}>
                                <MixCard mix={mix} onOpen={() => setActiveMix(mix)} />
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
                ) : (
                    <div className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                        {visibleMixes.map((mix) => (
                            <MixCard key={mix.id} mix={mix} onOpen={() => setActiveMix(mix)} />
                        ))}
                    </div>
                )}

                {canLoadMore && (
                    <div className="mt-20 flex justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setVisibleCount((prev) => prev + INITIAL_VISIBLE)}
                            className="border-white/20 hover:bg-white/10 uppercase tracking-widest text-xs"
                        >
                            Load More
                        </Button>
                    </div>
                )}
            </Container>

            {activeMix && (
                <MixModal
                    mix={activeMix}
                    onClose={() => setActiveMix(null)}
                />
            )}
        </section>
    );
}
