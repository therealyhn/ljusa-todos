import Container from '../../ui/Container';
import Button from '../../ui/Button';
import svizapultomCover from '../../../assets/svizapultom.png';

export default function SviZaPultomFeature() {
    return (
        <section id="svizapultom" className="bg-black/70 py-12 md:py-16">
            <Container>
                <div className="grid overflow-hidden bg-black/70 md:grid-cols-12">
                    <div className="relative min-h-[240px] md:col-span-5 md:min-h-[320px]">
                        <img
                            src={svizapultomCover}
                            alt="Svi za pultom portal"
                            className="h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>

                    <div className="relative flex flex-col justify-center gap-6 p-6 md:col-span-7 md:p-10">
                        <span className="text-[10px] uppercase tracking-[0.36em] text-white/40">
                            XTY Ecosystem
                        </span>
                        <h2 className="text-3xl font-heading font-bold uppercase leading-[0.95] tracking-tight text-white md:text-5xl">
                            Svi za pultom
                        </h2>
                        <p className="max-w-xl text-sm uppercase tracking-[0.2em] text-secondary/80">
                            Interaktivni portal za narucivanje pesama live u toku zurke, povezan direktno sa XTY nastupima.
                        </p>
                        <div>
                            <Button
                                as="a"
                                href="https://svizapultom.xty-music.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outline"
                                size="md"
                                className="w-full max-w-xs"
                            >
                                Otvori Svi za pultom
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
