import useEscapeKey from '../../../hooks/useEscapeKey';
import useScrollLock from '../../../hooks/useScrollLock';
import MixCard from './MixCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export default function MixesLibraryModal({
    isOpen,
    onClose,
    filters,
    activeFilter,
    onFilterChange,
    mixes,
    isMobile,
    onOpenMix,
}) {
    useEscapeKey(onClose, isOpen);
    useScrollLock(isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[75] bg-black/95 p-4 backdrop-blur-md md:p-6">
            <div className="absolute inset-0" onClick={onClose} />

            <div
                role="dialog"
                aria-modal="true"
                className="relative mx-auto flex max-h-[92vh] w-full max-w-6xl flex-col border border-white/10 bg-[#0b0b0d]"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Full library</p>
                        <h3 className="mt-1 text-2xl font-heading font-bold uppercase tracking-tight text-white md:text-3xl">
                            Mixes
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-white/20 p-2 text-white/60 transition hover:border-white/40 hover:text-white"
                        aria-label="Close mixes library"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="border-b border-white/10 px-5 py-4 md:px-7">
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => onFilterChange('all')}
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
                                onClick={() => onFilterChange(filter.id)}
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
                </div>

                <div className="overflow-y-auto px-5 py-6 md:px-7">
                    {isMobile ? (
                        <div className="mixes-mobile-swiper">
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                slidesPerView={1.15}
                                centeredSlides
                                spaceBetween={18}
                                loop={mixes.length > 2}
                            >
                                {mixes.map((mix) => (
                                    <SwiperSlide key={mix.id}>
                                        <MixCard mix={mix} onOpen={() => onOpenMix(mix)} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {mixes.map((mix) => (
                                <MixCard key={mix.id} mix={mix} onOpen={() => onOpenMix(mix)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
