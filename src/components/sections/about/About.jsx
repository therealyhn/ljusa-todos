import { useEffect, useState } from 'react';
import Container from '../../ui/Container';
import { sanityClient, urlFor } from '../../../lib/sanityClient';

const About = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "about"][0]`).then(setData).catch(console.error);
    }, []);

    return (
        <section id="about" className="py-24 md:py-40 bg-black relative overflow-hidden">
            <Container className="relative z-10">
                {!data ? (
                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-6">
                            <div className="relative aspect-[4/5] w-full max-w-[480px] mx-auto lg:mx-0 animate-pulse bg-white/5 border border-white/10" />
                        </div>
                        <div className="lg:col-span-6 space-y-10">
                            <div className="space-y-4">
                                <div className="h-2.5 w-28 animate-pulse bg-white/10" />
                                <div className="space-y-3">
                                    <div className="h-12 w-3/4 animate-pulse bg-white/10" />
                                    <div className="h-12 w-1/2 animate-pulse bg-white/10" />
                                </div>
                            </div>
                            <div className="space-y-3 pl-8 border-l border-white/10">
                                <div className="h-4 w-full animate-pulse bg-white/10" />
                                <div className="h-4 w-5/6 animate-pulse bg-white/10" />
                                <div className="h-4 w-4/6 animate-pulse bg-white/10" />
                            </div>
                            <div className="grid grid-cols-2 gap-12 pt-10 mt-10 border-t border-white/5">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="h-10 w-16 animate-pulse bg-white/10" />
                                        <div className="h-2.5 w-20 animate-pulse bg-white/10" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">

                        {/* Left: Asymmetric Imagery */}
                        <div className="lg:col-span-6 relative">
                            <div className="relative aspect-[4/5] w-full max-w-[480px] mx-auto lg:mx-0">
                                <div className="absolute inset-0 border border-white/10 overflow-hidden animate__animated animate__fadeInLeft">
                                    {data.imageFront && (
                                        <img
                                            src={urlFor(data.imageFront).width(1200).url()}
                                            alt="LJUSA x TODOS Main"
                                            width={1200}
                                            height={1500}
                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    )}
                                </div>

                                <div className="absolute -bottom-12 -right-8 md:-right-16 w-1/2 aspect-square border border-white/20 shadow-2xl overflow-hidden z-20 animate__animated animate__fadeInUp animate__delay-1s group">
                                    {data.imageBack && (
                                        <img
                                            src={urlFor(data.imageBack).width(600).url()}
                                            alt="LJUSA x TODOS Detail"
                                            width={600}
                                            height={600}
                                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-white/20 -z-10" />
                            </div>
                        </div>

                        {/* Right: The Narrative */}
                        <div className="lg:col-span-6 space-y-10">
                            <div className="space-y-4 animate__animated animate__fadeInRight">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black block">Behind the Sound</span>
                                <h2 className="text-4xl md:text-7xl font-heading font-black tracking-tighter text-white leading-[0.9] uppercase italic">
                                    {data.heading} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/5">{data.subheading}</span>
                                </h2>
                            </div>

                            <div className="space-y-10 animate__animated animate__fadeInUp animate__delay-1s">
                                <div className="relative pl-8 border-l border-white/10">
                                    <p className="text-secondary/60 text-lg leading-relaxed whitespace-pre-line max-w-xl italic font-light">
                                        "{data.description}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-12 pt-10 mt-10 border-t border-white/5">
                                    {data.stats?.map((stat, idx) => (
                                        <div key={idx} className="group cursor-default">
                                            <div className="text-3xl md:text-4xl font-heading font-black text-white mb-2 group-hover:text-transparent group-hover:[-webkit-text-stroke:1px_white] transition-all duration-300">
                                                {stat.value}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-4 h-[1px] bg-white/20 group-hover:w-8 group-hover:bg-white transition-all duration-500" />
                                                <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-black">{stat.label}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </Container>
        </section>
    );
};

export default About;
