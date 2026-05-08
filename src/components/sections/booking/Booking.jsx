import { useState } from 'react';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import BookingModal from './BookingModal';

const bookingOptions = [
    {
        _id: 'club-cafe',
        title: 'Klub / Kafic',
        description: 'Intenzivna energija i set prilagodjen vrhuncu plesnog podijuma.',
        duration: '3 - 6 sati',
        priceRange: 'Cena na upit',
    },
    {
        _id: 'festival',
        title: 'Festival',
        description: 'Nastup sa energicnim setom i hitovima za veliku publiku.',
        duration: '1 - 4 sata',
        priceRange: 'Cena na upit',
    },
];

export default function Booking() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (option) => {
        setSelectedOption(option);
        setIsOpen(true);
    };

    return (
        <section id="booking" className="bg-background py-14 md:py-20">
            <Container>
                <div className="mb-8 text-center md:mb-10">
                    <p className="text-[10px] uppercase tracking-[0.36em] text-white/40">Booking</p>
                    <h2 className="mt-2 text-4xl font-heading font-bold uppercase tracking-tight text-white md:text-6xl">
                        Rezervisi XTY
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-xs uppercase tracking-[0.2em] text-secondary/80">
                        Izaberi format, proveri slobodan datum u kalendaru i posalji upit bez dugacke forme na stranici.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 max-w-[1000px] mx-auto">
                    {bookingOptions.map((option) => (
                        <article key={option._id} className="border border-white/10 bg-white/[0.02] p-5 md:p-6">
                            <h3 className="text-2xl font-heading font-semibold uppercase tracking-tight text-white">
                                {option.title}
                            </h3>
                            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-secondary/85">
                                {option.description}
                            </p>

                            <div className="mt-6 grid gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70">
                                <p>
                                    <span className="text-white/45">Trajanje:</span> {option.duration}
                                </p>
                                <p>
                                    <span className="text-white/45">Cena:</span> {option.priceRange}
                                </p>
                            </div>

                            <Button
                                type="button"
                                variant="primary"
                                size="md"
                                className="mt-6 w-full"
                                onClick={() => openModal(option)}
                            >
                                Book this format
                            </Button>
                        </article>
                    ))}
                </div>

                <div className="mt-6 mx-auto flex w-full max-w-[700px] flex-col items-center justify-center gap-4 border border-white/10 bg-[#09090B] px-5 py-4 md:flex-row md:justify-center">
                    <p className="text-center text-xs uppercase tracking-[0.2em] text-white/70">
                        Direktan kontakt: booking@xty-music.com
                    </p>
                    <a
                        href="mailto:booking@xty-music.com"
                        className="border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white transition hover:border-white/40 hover:bg-white/5"
                    >
                        Posalji email
                    </a>
                </div>
            </Container>

            <BookingModal
                isOpen={isOpen}
                selectedOption={selectedOption}
                onClose={() => setIsOpen(false)}
            />
        </section>
    );
}
