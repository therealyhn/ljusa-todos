import { useState } from 'react';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import BookingModal from './BookingModal';

export default function Booking() {
    // Static options as requested
    const bookingOptions = [
        {
            _id: 'club/bar',
            title: 'Club / Bar',
            description: 'Intense energy and driving rhythms designed for peak-time dancefloors.',
            duration: '3 - 6 Hours',
            priceRange: '200 - 400€'
        },
        {
            _id: 'festival',
            title: 'Festival',
            description: 'High-impact performance showcasing signature sounds for large crowds.',
            duration: '1 - 4 Hours',
            priceRange: 'Price upon request'
        }
    ];

    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (option) => {
        setSelectedOption(option);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <section id="booking" className="min-h-screen/2 bg-background py-32 relative overflow-hidden">
            <Container className="relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    {/* Sticky Sidebar / Title Area */}
                    <div className="lg:w-1/3 lg:sticky lg:top-32 self-start space-y-8">
                        <div>
                            <p className="text-secondary/60 text-[10px] uppercase tracking-[0.4em] mb-4 pl-1">B2B Booking</p>
                            <h2 className="text-6xl md:text-8xl font-heading font-bold text-white uppercase tracking-tighter leading-[0.9]">
                                Select<br />Format
                            </h2>
                        </div>
                        <p className="text-secondary/70 text-sm uppercase tracking-widest max-w-[300px] leading-relaxed pl-1">
                            Club, bar, or festival — select a format and send a request for a full B2B set.
                        </p>

                        <div className="hidden lg:block h-px w-20 bg-white/10 mt-12 mb-8" />

                        <div className="hidden lg:block text-xs uppercase tracking-[0.3em] text-secondary/50 font-medium pl-1">
                            Tailored Energy • Custom Edits
                        </div>
                    </div>

                    {/* Right Side: List Layout */}
                    <div className="lg:w-2/3 flex flex-col">
                        {bookingOptions.map((option) => (
                            <div
                                key={option._id}
                                className="group relative border-t border-white/10 hover:border-white/40 transition-colors duration-500"
                            >
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500" />

                                <div className="relative py-12 md:py-16 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-8 md:gap-6 items-baseline md:items-center px-4 md:px-6">
                                    {/* Title & Description */}
                                    <div className="space-y-3">
                                        <h3 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                                            {option.title}
                                        </h3>
                                        <p className="text-secondary/50 text-xs md:text-sm uppercase tracking-wider max-w-[240px] leading-relaxed">
                                            {option.description}
                                        </p>
                                    </div>

                                    {/* Duration */}
                                    <div className="flex flex-col md:items-center">
                                        <span className="block md:hidden text-[10px] uppercase tracking-widest text-secondary/30 mb-2 font-bold">Duration</span>
                                        <span className="text-secondary/80 text-sm uppercase tracking-widest font-medium">
                                            {option.duration}
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex flex-col md:items-center">
                                        <span className="block md:hidden text-[10px] uppercase tracking-widest text-secondary/30 mb-2 font-bold">Starting At</span>
                                        <span className="text-secondary/80 text-sm uppercase tracking-widest font-medium">
                                            {option.priceRange}
                                        </span>
                                    </div>

                                    {/* Action */}
                                    <div className="mt-4 md:mt-0 flex md:justify-end">
                                        <button
                                            onClick={() => openModal(option)}
                                            className="group/btn flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white font-bold hover:text-white transition-colors"
                                        >
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">Request</span>
                                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-white group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-white/10" />
                    </div>
                </div>
            </Container>

            <BookingModal
                isOpen={isOpen}
                selectedOption={selectedOption}
                onClose={closeModal}
            />
        </section>
    );
}
