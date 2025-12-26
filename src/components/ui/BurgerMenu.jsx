import React, { useState, useEffect } from 'react';

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <div className="md:hidden">
            {/* Hamburger Button - z-index higher than overlay */}
            <button
                onClick={toggleMenu}
                className={`text-white focus:outline-none p-2 ${isOpen ? 'fixed top-5 right-5 z-[10000]' : 'relative z-[70]'}`}
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Full Screen Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[9999] bg-black flex flex-col px-8 pt-24 pb-10 h-[100vh] overflow-y-auto">
                    {/* Navigation Links */}
                    <nav className="flex flex-col space-y-5">
                        <a href="#home" onClick={toggleMenu} className="text-4xl font-heading font-bold text-white hover:text-secondary transition-colors uppercase tracking-tight">
                            Home
                        </a>
                        <a href="#about" onClick={toggleMenu} className="text-4xl font-heading font-bold text-white hover:text-secondary transition-colors uppercase tracking-tight">
                            About
                        </a>
                        <a href="#gallery" onClick={toggleMenu} className="text-4xl font-heading font-bold text-white hover:text-secondary transition-colors uppercase tracking-tight">
                            Gallery
                        </a>
                        <a href="#mashups" onClick={toggleMenu} className="text-4xl font-heading font-bold text-white hover:text-secondary transition-colors uppercase tracking-tight">
                            Mashups
                        </a>
                        <a href="#mixes" onClick={toggleMenu} className="text-4xl font-heading font-bold text-white hover:text-secondary transition-colors uppercase tracking-tight">
                            Mixes
                        </a>
                        <a href="#booking" onClick={toggleMenu} className="text-4xl font-heading font-bold text-white hover:text-secondary transition-colors uppercase tracking-tight">
                            Booking
                        </a>
                    </nav>

                    {/* Divider */}
                    <div className="mt-10 h-px w-16 bg-white/10"></div>

                    {/* Socials */}
                    <div className="mt-8 space-y-8">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-secondary/70 mb-3">LJUSA</p>
                            <div className="flex flex-col gap-3">
                                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Instagram</a>
                                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">SoundCloud</a>
                                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">YouTube</a>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-secondary/70 mb-3">TODOS</p>
                            <div className="flex flex-col gap-3">
                                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Instagram</a>
                                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">SoundCloud</a>
                                <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">YouTube</a>
                            </div>
                        </div>
                    </div>

                    {/* Decoration / Context */}
                    <div className="mt-auto pt-8 text-white/20 text-xs uppercase tracking-widest">
                        LJUSA x TODOS 2025
                    </div>
                </div>
            )}
        </div>
    );
};

export default BurgerMenu;
