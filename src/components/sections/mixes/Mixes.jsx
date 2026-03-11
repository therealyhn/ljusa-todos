import { useEffect, useMemo, useState } from 'react';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import MixCard from './MixCard';
import MixModal from './MixModal';
import MixesLibraryModal from './MixesLibraryModal';
import { sanityClient, urlFor } from '../../../lib/sanityClient';

export default function Mixes({ mode = 'preview', previewCount = 3 }) {
    const [filters, setFilters] = useState([]);
    const [mixes, setMixes] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeMix, setActiveMix] = useState(null);
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const isPreviewMode = mode === 'preview';

    useEffect(() => {
        let isMounted = true;

        Promise.all([
            sanityClient.fetch(`*[_type == "mixFilter"] | order(order asc){ _id, title }`),
            sanityClient.fetch(`*[_type == "mixLibrary"][0]{
                items[]{
                    _key,
                    title,
                    djName,
                    platform,
                    mixUrl,
                    filters[]->{
                        _id,
                        title
                    },
                    thumbnail
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
                    platform: item.platform || 'youtube',
                    mixUrl: item.mixUrl,
                    filters: (item.filters || []).map((filter) => filter._id),
                    thumbnail: item.thumbnail
                        ? urlFor(item.thumbnail).width(800).fit('max').quality(70).auto('format').url()
                        : null,
                }));

                setFilters(mappedFilters);
                setMixes(mappedMixes);
            })
            .catch((error) => {
                console.error('Mixes fetch error:', error);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const media = window.matchMedia('(max-width: 767px)');
        const onChange = () => setIsMobile(media.matches);
        onChange();

        if (media.addEventListener) {
            media.addEventListener('change', onChange);
        } else {
            media.addListener(onChange);
        }

        return () => {
            if (media.removeEventListener) {
                media.removeEventListener('change', onChange);
            } else {
                media.removeListener(onChange);
            }
        };
    }, []);

    const filteredMixes = useMemo(() => {
        if (activeFilter === 'all') return mixes;
        return mixes.filter((mix) => mix.filters.includes(activeFilter));
    }, [mixes, activeFilter]);

    const previewMixes = useMemo(
        () => mixes.slice(0, previewCount),
        [mixes, previewCount]
    );

    const listMixes = isPreviewMode ? previewMixes : filteredMixes;

    const openMixFromLibrary = (mix) => {
        setIsLibraryOpen(false);
        setActiveMix(mix);
    };

    return (
        <section id="mixes" className="bg-background py-12 md:py-16">
            <Container>
                <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.36em] text-white/40">Watch</p>
                        <h2 className="mt-2 text-4xl font-heading font-bold uppercase tracking-tight text-white md:text-6xl">
                            Mixes
                        </h2>
                        <p className="mt-3 max-w-xl text-xs uppercase tracking-[0.2em] text-secondary/80">
                            Kurirani setovi za brzi pregled. Kompletna kolekcija je dostupna jednim klikom.
                        </p>
                    </div>
                    {isPreviewMode && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsLibraryOpen(true)}
                            className="w-full md:w-auto"
                        >
                            Otvori sve mikseve
                        </Button>
                    )}
                </div>

                {!isPreviewMode && (
                    <div className="mb-8 flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveFilter('all')}
                            className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] transition ${
                                activeFilter === 'all'
                                    ? 'border-white/40 bg-white/10 text-white'
                                    : 'border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                            }`}
                        >
                            All
                        </button>
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                type="button"
                                onClick={() => setActiveFilter(filter.id)}
                                className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] transition ${
                                    activeFilter === filter.id
                                        ? 'border-white/40 bg-white/10 text-white'
                                        : 'border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                                }`}
                            >
                                {filter.title}
                            </button>
                        ))}
                    </div>
                )}

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {listMixes.map((mix) => (
                        <MixCard key={mix.id} mix={mix} onOpen={() => setActiveMix(mix)} />
                    ))}
                </div>
            </Container>

            <MixesLibraryModal
                isOpen={isLibraryOpen}
                onClose={() => setIsLibraryOpen(false)}
                filters={filters}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                mixes={filteredMixes}
                isMobile={isMobile}
                onOpenMix={openMixFromLibrary}
            />

            {activeMix && <MixModal mix={activeMix} onClose={() => setActiveMix(null)} />}
        </section>
    );
}
