import { useEffect, useState } from 'react';
import Container from '../../ui/Container';
import { sanityClient } from '../../../lib/sanityClient';
import Button from '../../ui/Button';

const Hero = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "siteSettings"][0]{
            heroTitle,
            heroSubtitle,
            heroDescription
        }`).then(setData).catch(console.error);
    }, []);

    if (!data) return null; // Or a loading spinner

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

            {/* Background Gradient Spot - subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/20 rounded-full blur-[120px] pointer-events-none" />

            <Container className="relative z-10 text-center">
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 leading-[0.9] md:leading-tight">
                    <span className="block text-white animate__animated animate__fadeInLeft">{data.heroTitle}</span>
                    <span className="block text-secondary animate__animated animate__fadeInRight">{data.heroSubtitle}</span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-secondary/80 mb-10 leading-relaxed whitespace-pre-line 
                animate__animated animate__fadeInUp animate__delay-1s">
                    {data.heroDescription}
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Button href="#" variant="outline" size="md" className="animate__animated animate__fadeInLeft animate__delay-1s">
                        Check Mashups
                    </Button>
                    <Button href="#" variant="secondary" size="md" className="animate__animated animate__fadeInRight animate__delay-1s">
                        Listen to Mixes
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default Hero;