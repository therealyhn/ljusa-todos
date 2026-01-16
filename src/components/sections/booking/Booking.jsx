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
    const [hoveredOption, setHoveredOption] = useState(null);

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
                    <div className="lg:w-1/3 lg:sticky lg:top-12 self-start space-y-8">
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
                    <div className="lg:w-2/3 flex flex-col pt-4">
                        <div
                            className="group/list border-t border-white/10"
                            onMouseLeave={() => setHoveredOption(null)}
                        >
                            {bookingOptions.map((option) => (
                                <div
                                    key={option._id}
                                    className={`group/item relative border-b border-white/10 transition-all duration-500 ease-in-out px-4 lg:px-12
                                    ${hoveredOption && hoveredOption !== option._id ? 'md:opacity-30 md:blur-[2px]' : 'opacity-100'}
                                    ${hoveredOption === option._id ? 'bg-white/[0.03]' : ''}
                                `}
                                    onMouseEnter={() => setHoveredOption(option._id)}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white transform scale-y-0 group-hover/item:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />

                                    <div className="relative py-8 md:py-0 md:h-[240px] grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-6 md:gap-0 items-center">
                                        {/* Title & Description */}
                                        <div className="flex flex-col justify-center h-full pr-6 transition-all duration-500">
                                            <div className="transform transition-transform duration-500 will-change-transform md:group-hover/item:-translate-y-4">
                                                <h3 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase tracking-tighter md:group-hover/item:text-shadow-glow transition-all duration-300">
                                                    {option.title}
                                                </h3>
                                                <div className={`overflow-hidden transition-all duration-500 ease-out origin-top 
                                                    max-h-24 opacity-100 mt-3 md:mt-0 
                                                    ${hoveredOption === option._id ? 'md:max-h-24 md:opacity-100 md:mt-4' : 'md:max-h-0 md:opacity-0 md:mt-0'}
                                                `}>
                                                    <p className="text-secondary text-xs uppercase tracking-wider max-w-[300px] leading-relaxed font-medium">
                                                        {option.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Duration */}
                                        <div className="flex flex-col md:items-start md:pl-4 border-l border-white/0 md:border-white/5 md:group-hover/item:border-white/10 transition-colors duration-500 h-full justify-center">
                                            <span className="block md:hidden text-[10px] uppercase tracking-widest text-secondary/30 mb-1 font-bold">Duration</span>
                                            <span className="text-white/80 group-hover/item:text-white text-sm uppercase tracking-[0.15em] font-medium tabular-nums transition-colors duration-300">
                                                {option.duration}
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="flex flex-col md:items-start md:pl-8 border-l border-white/0 md:border-white/5 md:group-hover/item:border-white/10 transition-colors duration-500 h-full justify-center">
                                            <span className="block md:hidden text-[10px] uppercase tracking-widest text-secondary/30 mb-1 font-bold">Starting At</span>
                                            <span className="text-white/80 group-hover/item:text-white text-sm uppercase tracking-[0.15em] font-medium tabular-nums transition-colors duration-300">
                                                {option.priceRange}
                                            </span>
                                        </div>

                                        {/* Action */}
                                        <div className="mt-2 md:mt-0 md:pl-8 flex justify-start md:justify-end">
                                            <button
                                                onClick={() => openModal(option)}
                                                className="group/btn relative overflow-hidden bg-white/0 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-black transition-all duration-500 w-full md:w-auto"
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    Request
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
