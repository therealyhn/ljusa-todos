import Container from '../../ui/Container';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

            {/* Background Gradient Spot - subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/20 rounded-full blur-[120px] pointer-events-none" />

            <Container className="relative z-10 text-center">
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6">
                    <span className="block text-white">ELEVATE</span>
                    <span className="block text-secondary">THE VIBE</span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-secondary/80 mb-10 leading-relaxed">
                    Premium DJ services for exclusive events, weddings, and parties.
                    <br className="hidden md:block" />
                    Where sound meets sophistication.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <button className="w-full md:w-auto px-8 py-4 bg-white text-black font-bold uppercase tracking-wide rounded-sm hover:scale-105 transition-transform duration-300">
                        Check Availability
                    </button>
                    <button className="w-full md:w-auto px-8 py-4 border border-white/10 text-white font-medium uppercase tracking-wide rounded-sm hover:bg-white/5 transition-colors">
                        Listen to Mixes
                    </button>
                </div>
            </Container>
        </section>
    );
};

export default Hero;