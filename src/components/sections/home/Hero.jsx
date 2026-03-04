import { useEffect, useState } from 'react';
import Container from '../../ui/Container';
import { sanityClient } from '../../../lib/sanityClient';
import Button from '../../ui/Button';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source);
}

const Hero = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "siteSettings"][0]{
            heroTitle,
            heroSubtitle,
            heroDescription,
            heroImage
        }`).then(setData).catch(console.error);
    }, []);

    if (!data) return null;

    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-28 lg:pt-20 bg-black">

            {/* Background Editorial Text */}
            <div className="absolute top-[90%] left-[10%] -translate-y-1/2 -rotate-90 origin-left text-[20vw] font-heading font-black text-white/[0.03] uppercase select-none pointer-events-none whitespace-nowrap leading-none tracking-tighter hidden lg:block animate__animated animate__fadeIn">
                X T Y
            </div>

            <Container className="relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

                    {/* Image Section (First on Mobile) */}
                    <div className="lg:col-span-5 relative order-1 flex justify-center lg:justify-end">
                        <div className="relative w-full aspect-[4/5] max-w-[320px] md:max-w-[400px] lg:max-w-[450px] animate__animated animate__fadeInRight">
                            {/* Glow Effect */}
                            <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-full" />

                            <div className="relative h-full w-full overflow-hidden border border-white/10 group lg:grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                                {data.heroImage ? (
                                    <img
                                        src={urlFor(data.heroImage).width(800).url()}
                                        alt="X T Y Duo"
                                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-[2s]"
                                        loading="eager"
                                        decoding="async"
                                        fetchPriority="high"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-surface flex items-center justify-center">
                                        <p className="text-secondary/20 text-[10px] uppercase tracking-[0.2em]">Image Placeholder</p>
                                    </div>
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 flex items-center gap-2 lg:gap-3">
                                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white rounded-full animate-pulse" />
                                    <span className="text-[8px] lg:text-[10px] uppercase tracking-[0.4em] font-black text-white">X T Y</span>
                                </div>
                            </div>

                            {/* Floating Counter-Weight Element */}
                            <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 w-24 h-24 lg:w-32 lg:h-32 border border-white/5 flex items-center justify-center p-4 hidden md:flex">
                                <span className="text-[6px] lg:text-[8px] text-white/20 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">est. 2022</span>
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="lg:col-span-7 text-center lg:text-left order-2 mt-4 lg:mt-0">
                        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-[8px] lg:text-[10px] uppercase tracking-[0.4em] text-white/40 font-black mb-6 lg:mb-8 animate__animated animate__fadeInDown">
                            X T Y
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-[120px] font-heading font-black tracking-tighter mb-6 lg:mb-8 leading-[0.85] lg:leading-[0.8] uppercase italic">
                            <span className="block text-white animate__animated animate__fadeInLeft drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                {data.heroTitle}
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white/60 to-white/10 animate__animated animate__fadeInLeft animate__delay-1s">
                                {data.heroSubtitle}
                            </span>
                        </h1>

                        <p className="max-w-md mx-auto lg:mx-0 text-[15px] lg:text-lg text-secondary/60 mb-10 lg:mb-12 leading-relaxed animate__animated animate__fadeInUp animate__delay-2s lg:border-l-2 lg:border-white/10 lg:pl-6">
                            {data.heroDescription}
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 lg:gap-10 animate__animated animate__fadeInUp animate__delay-2s">
                            <a href="#mashups" className="group flex items-center gap-3 lg:gap-b4 text-[10px] uppercase tracking-[0.3em] font-black text-white hover:text-white/70 transition-all">
                                <span>Check Mashups</span>
                                <div className="w-8 lg:w-12 h-[1px] bg-white/20 group-hover:w-16 lg:group-hover:w-20 group-hover:bg-white transition-all duration-500"></div>
                            </a>
                            <a href="#mixes" className="group flex items-center gap-3 lg:gap-4 text-[10px] uppercase tracking-[0.3em] font-black text-white/40 hover:text-white transition-all">
                                <span>Listen to Mixes</span>
                                <div className="w-6 lg:w-8 h-[1px] bg-white/10 group-hover:w-12 lg:group-hover:w-16 group-hover:bg-white transition-all duration-500"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>

        </section>
    );
};

export default Hero;
