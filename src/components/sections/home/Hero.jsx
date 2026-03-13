import { useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import { sanityClient } from '../../../lib/sanityClient';
import MediaKitModal from './MediaKitModal';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
    return builder.image(source);
}

export default function Hero() {
    const [data, setData] = useState(null);
    const [isMediaKitOpen, setIsMediaKitOpen] = useState(false);

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == "siteSettings"][0]{
                heroTitle,
                heroSubtitle,
                heroDescription,
                heroImage
            }`)
            .then(setData)
            .catch(console.error);
    }, []);

    if (!data) return null;

    return (
        <section id="home" className="relative overflow-hidden bg-black pb-12 pt-28 md:pb-16 md:pt-32">
            <Container className="relative z-10">
                <div className="grid items-center gap-10 lg:min-h-[82vh] lg:grid-cols-12 lg:gap-12">
                    <div className="space-y-7 lg:col-span-7">
                        <span className="inline-flex border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.34em] text-white/50">
                            XTY
                        </span>

                        <h1 className="text-5xl font-heading font-black uppercase leading-[0.84] tracking-tight text-white md:text-7xl lg:text-[96px]">
                            <span className="block">{data.heroTitle}</span>
                            <span className="block text-white/50">{data.heroSubtitle}</span>
                        </h1>

                        <p className="max-w-2xl border-l border-white/15 pl-4 text-sm uppercase leading-relaxed tracking-[0.18em] text-secondary/90 md:text-base">
                            {data.heroDescription}
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <Button as="a" href="#mashups" variant="primary" size="md" className="w-full sm:w-auto">
                                Our Work
                            </Button>
                            <Button as="a" href="#booking" variant="outline" size="md" className="w-full sm:w-auto">
                                Booking
                            </Button>
                            <Button
                                as="a"
                                href="https://svizapultom.xty-music.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="ghost"
                                size="md"
                                className="w-full border border-white/15 sm:w-auto"
                            >
                                Svi Za Pultom App
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            <a
                                href="https://www.youtube.com/@xty-music"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/70 transition hover:border-white/30 hover:text-white"
                            >
                                YouTube
                            </a>
                            <a
                                href="https://www.instagram.com/xty.music/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/70 transition hover:border-white/30 hover:text-white"
                            >
                                Instagram
                            </a>
                            <a
                                href="https://www.tiktok.com/@xty.music"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/70 transition hover:border-white/30 hover:text-white"
                            >
                                TikTok
                            </a>
                            <a
                                href="mailto:booking@xty-music.com"
                                className="border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/70 transition hover:border-white/30 hover:text-white"
                            >
                                booking@xty-music.com
                            </a>
                        </div>

                        <div className="pt-2">
                            <div className="border max-w-lg border-white/10 bg-white/[0.02] p-4 md:p-5">
                                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">Press / Booking</p>
                                        <h3 className="mt-1 text-2xl font-heading font-bold uppercase tracking-tight text-white md:text-3xl">
                                            XTY Media Kit
                                        </h3>
                                        <p className="mt-2 max-w-lg text-xs uppercase tracking-[0.16em] text-secondary/85">
                                            Pregled koji sadrzi biografiju, press fotografije, tech rider i osnovne booking informacije za organizatore.
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="md"
                                        className="w-full md:w-auto"
                                        onClick={() => setIsMediaKitOpen(true)}
                                    >
                                        Otvori Media Kit
                                    </Button>
                                </div>
                                {/* 
                                <div className="mt-4 grid gap-2 text-[10px] uppercase tracking-[0.16em] text-white/70 sm:grid-cols-2 lg:grid-cols-4">
                                    <span className="border border-white/10 px-3 py-2">Biography</span>
                                    <span className="border border-white/10 px-3 py-2">Press Photos</span>
                                    <span className="border border-white/10 px-3 py-2">Tech Rider</span>
                                    <span className="border border-white/10 px-3 py-2">Booking Snapshot</span>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 hidden md:block">
                        <div className="relative overflow-hidden border border-white/10 bg-white/[0.02]">
                            {data.heroImage ? (
                                <img
                                    src={urlFor(data.heroImage).width(1000).auto('format').quality(80).url()}
                                    alt="XTY duo"
                                    className="aspect-[4/5] w-full object-cover grayscale transition duration-700 hover:grayscale-0"
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority="high"
                                />
                            ) : (
                                <div className="aspect-[4/5] w-full bg-surface" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 flex items-center gap-3 border border-white/20 bg-black/50 px-3 py-2">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white">Live / Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <MediaKitModal
                isOpen={isMediaKitOpen}
                onClose={() => setIsMediaKitOpen(false)}
            />
        </section>
    );
}
