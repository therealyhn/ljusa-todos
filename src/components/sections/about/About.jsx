import { useEffect, useState } from 'react';
import Container from '../../ui/Container';
import { sanityClient, urlFor } from '../../../lib/sanityClient';

const About = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "about"][0]`).then(setData).catch(console.error);
    }, []);

    if (!data) return null;

    return (
        <section id="about" className="py-24 md:py-32 bg-surface relative overflow-hidden">
            <Container>
                <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

                    {/* Left: The Visual (Duo Image) */}
                    <div className="relative group cursor-pointer [perspective:1000px]">
                        {/* Decorative offset frame */}
                        <div className="absolute inset-0 bg-accent-blue/10 translate-x-4 translate-y-4 rounded-sm -z-10 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5" />

                        {/* Actual Image Container with Flip Effect */}
                        <div className="relative aspect-[3/4] w-full transition-transform duration-[1s] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                            {/* Front Side */}
                            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-sm overflow-hidden border border-white/5">
                                {data.imageFront && (
                                    <img
                                        src={urlFor(data.imageFront).width(1200).height(1600).url()}
                                        alt="LJUSA x TODOS"
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>

                            {/* Back Side */}
                            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-sm overflow-hidden border border-white/5">
                                {data.imageBack && (
                                    <img
                                        src={urlFor(data.imageBack).width(1200).height(1600).url()}
                                        alt="LJUSA x TODOS - Alternate"
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: The Story */}
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                            {data.heading} <br />
                            <span className="text-secondary">{data.subheading}</span>
                        </h2>

                        <div className="space-y-6 text-secondary text-lg leading-relaxed whitespace-pre-line">
                            <p>{data.description}</p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/5">
                                {data.stats?.map((stat, idx) => (
                                    <div key={idx}>
                                        <span className="block text-3xl font-bold text-white mb-1">{stat.value}</span>
                                        <span className="text-sm uppercase tracking-wider text-accent">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default About;