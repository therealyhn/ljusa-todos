import { useEffect, useMemo, useState } from 'react';
import useEscapeKey from '../../../hooks/useEscapeKey';
import useScrollLock from '../../../hooks/useScrollLock';
import { sanityClient, urlFor } from '../../../lib/sanityClient';
import logo from '../../../assets/svizapultom.png';

const FALLBACK_DATA = {
    title: 'XTY Media Kit',
    subtitle: 'Brzi pregled za klubove, festivale i event organizatore.',
    bioPrimary:
        'XTY je DJ duo fokusiran na energicne mashup i open-format setove. Repertoar je prilagodjen publici i formatu dogadjaja, od klubskih veceri do festivalskih stage-eva.',
    bioSecondary:
        'Fokus je na jasnoj dinamici seta, prepoznatljivom potpisu i brzom prilagodjavanju energiji dancefloor-a.',
    stats: [
        { label: 'Aktivan od', value: '2022' },
        { label: 'Formati', value: 'Club / Festival' },
        { label: 'Platforme', value: 'YouTube / IG / TikTok' },
        { label: 'Booking', value: 'On demand' },
    ],
    pressPhotos: [
        { title: 'Promo 1', alt: 'XTY promo photo 1', imageUrl: '/img/about.jpg' },
        { title: 'Promo 2', alt: 'XTY promo photo 2', imageUrl: '/img/about2.jpg' },
        { title: 'Promo 3', alt: 'XTY promo photo 3', imageUrl: '/img/todos1.JPG' },
    ],
    techRider: [
        { title: 'Pioneer setup', detail: '2x CDJ + 1x DJM mikser (NXS2/A9 ili ekvivalent).' },
        { title: 'Booth monitoring', detail: 'Stabilan monitor signal sa nezavisnom kontrolom.' },
        { title: 'Mic support', detail: '1x vokalni mikrofon po potrebi dogadjaja.' },
        { title: 'Tech check', detail: 'Kratak sound-check pre otvaranja nastupa.' },
    ],
};

const getDownloadName = (photo, index) => {
    const base = (photo?.title || `xty-photo-${index + 1}`)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    return `${base || `xty-photo-${index + 1}`}.jpg`;
};

export default function MediaKitModal({ isOpen, onClose }) {
    const [data, setData] = useState(FALLBACK_DATA);

    useEscapeKey(onClose, isOpen);
    useScrollLock(isOpen);

    useEffect(() => {
        if (!isOpen) return;

        let isMounted = true;

        sanityClient
            .fetch(`*[_type == "mediaKit"][0]{
                title,
                subtitle,
                bioPrimary,
                bioSecondary,
                stats[]{
                    label,
                    value
                },
                pressPhotos[]{
                    title,
                    alt,
                    image
                },
                techRider[]{
                    title,
                    detail
                }
            }`)
            .then((result) => {
                if (!isMounted || !result) return;

                const mappedPhotos = (result.pressPhotos || [])
                    .filter((item) => item?.image)
                    .map((item) => ({
                        title: item.title || 'Press photo',
                        alt: item.alt || item.title || 'XTY press photo',
                        imageUrl: urlFor(item.image).width(2200).fit('max').quality(85).auto('format').url(),
                    }));

                setData({
                    title: result.title || FALLBACK_DATA.title,
                    subtitle: result.subtitle || FALLBACK_DATA.subtitle,
                    bioPrimary: result.bioPrimary || FALLBACK_DATA.bioPrimary,
                    bioSecondary: result.bioSecondary || FALLBACK_DATA.bioSecondary,
                    stats: result.stats?.length ? result.stats : FALLBACK_DATA.stats,
                    pressPhotos: mappedPhotos.length ? mappedPhotos : FALLBACK_DATA.pressPhotos,
                    techRider: result.techRider?.length ? result.techRider : FALLBACK_DATA.techRider,
                });
            })
            .catch((error) => {
                console.error('Media kit fetch error:', error);
            });

        return () => {
            isMounted = false;
        };
    }, [isOpen]);

    const [mainPhoto, secondPhoto, thirdPhoto] = useMemo(
        () => data.pressPhotos.slice(0, 3),
        [data.pressPhotos]
    );

    const handleDownloadImage = async (url, fileName) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[90] bg-black/95 p-2 backdrop-blur-md sm:p-3 md:p-6">
            <div className="absolute inset-0" onClick={onClose} />

            <div
                role="dialog"
                aria-modal="true"
                className="relative mx-auto flex h-[96dvh] w-full max-w-[1800px] flex-col overflow-hidden border border-white/10 bg-[#0a0a0c] sm:h-[94dvh] sm:w-[96vw] md:w-[92vw]"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-start justify-between border-b border-white/10 px-4 py-4 sm:px-5 md:px-7">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">Press / Booking</p>
                        <h2 className="mt-1 text-2xl font-heading font-bold uppercase tracking-tight text-white sm:text-3xl md:text-4xl">
                            {data.title}
                        </h2>
                        <p className="mt-2 max-w-[52ch] text-[10px] uppercase tracking-[0.18em] text-secondary/80 sm:text-xs sm:tracking-[0.2em]">
                            {data.subtitle}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-white/20 p-2 text-white/60 transition hover:border-white/40 hover:text-white"
                        aria-label="Close media kit"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 sm:px-4 md:px-5 lg:overflow-hidden lg:py-5 lg:pr-0">
                    <div className="grid gap-3 lg:h-full lg:grid-cols-12 lg:gap-4">
                        <div className="flex min-h-0 min-w-0 flex-col gap-3 lg:col-span-4 lg:h-full lg:gap-4 lg:pr-4">
                            <article className="border border-white/10 bg-white/[0.02] p-4">
                                <h3 className="text-xl font-heading font-semibold uppercase tracking-tight text-white">
                                    Biography
                                </h3>
                                <p className="mt-3 text-[13px] leading-relaxed tracking-[0.04em] text-secondary/85">
                                    {data.bioPrimary}
                                </p>
                                {data.bioSecondary ? (
                                    <p className="mt-2 text-[13px] leading-relaxed tracking-[0.04em] text-secondary/85">
                                        {data.bioSecondary}
                                    </p>
                                ) : null}
                            </article>

                            <div className="grid grid-cols-2 gap-2">
                                {data.stats.map((stat, index) => (
                                    <article key={`${stat.label}-${index}`} className="border border-white/10 bg-white/[0.02] px-3 py-2.5 text-center">
                                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white">{stat.value}</p>
                                        <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-secondary/75">{stat.label}</p>
                                    </article>
                                ))}
                            </div>

                            <div className="grid min-h-0 grid-cols-1 gap-2 sm:grid-cols-2">
                                <article className="border border-white/10 bg-white/[0.02] p-4">
                                    <h3 className="text-lg font-heading font-semibold uppercase tracking-tight text-white">
                                        Tech rider
                                    </h3>
                                    <ul className="mt-3 space-y-2.5">
                                        {data.techRider.slice(0, 4).map((item, index) => (
                                            <li key={`${item.title}-${index}`}>
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white">{item.title}</p>
                                                <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-secondary/80">{item.detail}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </article>

                                <article className="border border-white/10 bg-white/[0.02] p-4">
                                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Assets</h3>
                                    <div className="mt-3 flex flex-col gap-2">
                                        <a href={logo} target="_blank" rel="noopener noreferrer" className="border border-white/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white transition hover:border-white/40 hover:bg-white/5">
                                            Open logo
                                        </a>
                                        <a href="mailto:booking@xty-music.com" className="border border-white/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white transition hover:border-white/40 hover:bg-white/5">
                                            Booking contact
                                        </a>
                                        <a href="https://svizapultom.xty-music.com" target="_blank" rel="noopener noreferrer" className="border border-white/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white transition hover:border-white/40 hover:bg-white/5">
                                            Open Svi za pultom
                                        </a>
                                    </div>
                                </article>
                            </div>
                        </div>

                        <div className="min-w-0 lg:col-span-8 lg:min-h-0">
                            <article className="border border-white/10 bg-white/[0.02] p-2 sm:p-3 lg:mr-4 lg:flex lg:h-full lg:flex-col">
                                <div className="mb-2 flex items-center justify-between px-2 py-1">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Press photos</span>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Ready to use</span>
                                </div>

                                <div className="grid gap-3 md:grid-cols-[1.35fr_1fr] lg:min-h-0 lg:flex-1">
                                    <div className="relative h-[240px] w-full border border-white/10 bg-black/55 sm:h-[320px] md:h-[520px] lg:h-full lg:min-h-0">
                                        <img
                                            src={mainPhoto?.imageUrl || FALLBACK_DATA.pressPhotos[0].imageUrl}
                                            alt={mainPhoto?.alt || FALLBACK_DATA.pressPhotos[0].alt}
                                            className="h-full w-full object-contain"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDownloadImage(
                                                    mainPhoto?.imageUrl || FALLBACK_DATA.pressPhotos[0].imageUrl,
                                                    getDownloadName(mainPhoto || FALLBACK_DATA.pressPhotos[0], 0)
                                                )
                                            }
                                            className="absolute right-2 top-2 border border-white/20 bg-black/60 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-white transition hover:border-white/40 hover:bg-black/80"
                                        >
                                            Download
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 md:grid-cols-1 lg:min-h-0 lg:grid-rows-2">
                                        <div className="relative h-[140px] w-full border border-white/10 bg-black/55 sm:h-[170px] md:h-[252px] lg:h-full lg:min-h-0">
                                            <img
                                                src={secondPhoto?.imageUrl || FALLBACK_DATA.pressPhotos[1].imageUrl}
                                                alt={secondPhoto?.alt || FALLBACK_DATA.pressPhotos[1].alt}
                                                className="h-full w-full object-contain"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDownloadImage(
                                                        secondPhoto?.imageUrl || FALLBACK_DATA.pressPhotos[1].imageUrl,
                                                        getDownloadName(secondPhoto || FALLBACK_DATA.pressPhotos[1], 1)
                                                    )
                                                }
                                                className="absolute right-2 top-2 border border-white/20 bg-black/60 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-white transition hover:border-white/40 hover:bg-black/80"
                                            >
                                                Download
                                            </button>
                                        </div>
                                        <div className="relative h-[140px] w-full border border-white/10 bg-black/55 sm:h-[170px] md:h-[252px] lg:h-full lg:min-h-0">
                                            <img
                                                src={thirdPhoto?.imageUrl || FALLBACK_DATA.pressPhotos[2].imageUrl}
                                                alt={thirdPhoto?.alt || FALLBACK_DATA.pressPhotos[2].alt}
                                                className="h-full w-full object-contain"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDownloadImage(
                                                        thirdPhoto?.imageUrl || FALLBACK_DATA.pressPhotos[2].imageUrl,
                                                        getDownloadName(thirdPhoto || FALLBACK_DATA.pressPhotos[2], 2)
                                                    )
                                                }
                                                className="absolute right-2 top-2 border border-white/20 bg-black/60 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-white transition hover:border-white/40 hover:bg-black/80"
                                            >
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
