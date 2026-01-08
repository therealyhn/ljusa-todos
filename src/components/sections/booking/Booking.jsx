import { useState, useEffect } from 'react';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import BookingModal from './BookingModal';
import { sanityClient } from '../../../lib/sanityClient';

export default function Booking() {
    const [bookingOptions, setBookingOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "bookingOption"] | order(order asc)`)
            .then(data => setBookingOptions(data))
            .catch(console.error);
    }, []);

    const openModal = (option) => {
        setSelectedOption(option);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <section id="booking" className="min-h-screen/2 bg-background py-24 relative overflow-hidden">
            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter text-white uppercase opacity-90">
                        Booking
                    </h2>
                    <div className="h-1 w-20 bg-white/20 mx-auto mt-6 mb-6"></div>
                    <p className="max-w-xl mx-auto text-secondary text-sm uppercase tracking-widest">
                        Choose a booking option and send a request directly.
                    </p>
                </div>

                <div className="mt-12 flex flex-col md:flex-row justify-center gap-8 max-w-6xl mx-auto">
                    {bookingOptions.map((option) => (
                        <div
                            key={option._id}
                            className={`relative flex-1 min-w-[320px] bg-[#0c0c0e] border rounded-sm p-10 flex flex-col gap-8 transition-all duration-500 group ${option.isPopular
                                ? 'border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.03)]'
                                : 'border-white/5 hover:border-white/10 hover:-translate-y-1'
                                }`}
                        >
                            {option.isPopular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-xl z-20">
                                    Most Popular
                                </div>
                            )}

                            {/* Background Glow for Popular item */}
                            {option.isPopular && (
                                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                            )}

                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-tight leading-none">
                                    {option.title}
                                </h3>
                                <div className="h-px w-12 bg-white/10 mt-6 mb-6"></div>
                                <p className="text-secondary/70 text-sm leading-relaxed min-h-[60px]">
                                    {option.description}
                                </p>
                            </div>

                            {option.features && (
                                <ul className="space-y-4 mb-4 relative z-10">
                                    {option.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-[13px] text-white/60 group-hover:text-white/80 transition-colors">
                                            <svg className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="mt-auto pt-8 border-t border-white/5 grid gap-5 relative z-10">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-secondary/40">Duration</span>
                                    <span className="text-white font-medium text-lg">{option.duration || 'TBD'}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-secondary/40">Starting at</span>
                                    <span className="text-white font-medium text-lg">{option.priceRange || 'On Request'}</span>
                                </div>

                                <Button
                                    variant={option.isPopular ? 'primary' : 'outline'}
                                    className="w-full mt-4 py-6 border-white/10 hover:border-white/30 text-xs uppercase tracking-[0.15em] font-bold"
                                    onClick={() => openModal(option)}
                                >
                                    Book Now
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>

            <BookingModal
                isOpen={isOpen}
                selectedOption={selectedOption}
                onClose={closeModal}
                options={bookingOptions}
            />
        </section>
    );
}
