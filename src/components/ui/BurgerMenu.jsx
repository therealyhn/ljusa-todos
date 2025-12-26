import React, { useState, useEffect } from 'react';

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    const toggleMenu = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setShouldRender(true);
            setIsOpen(true);
        }
    };

    const handleAnimationEnd = () => {
        if (!isOpen) setShouldRender(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Mashups', href: '#mashups' },
        { name: 'Mixes', href: '#mixes' },
        { name: 'Booking', href: '#booking' },
    ];

    return (
        <div className="md:hidden">
            <button
                onClick={toggleMenu}
                className={`text-white focus:outline-none p-2 transition-all duration-300 ${isOpen ? 'fixed top-5 right-5 z-[10000]' : 'relative z-[70]'}`}
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <svg className="w-8 h-8 animate__animated animate__rotateIn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {shouldRender && (
                <div
                    onAnimationEnd={handleAnimationEnd}
                    className={`fixed inset-0 z-[9999] bg-black flex flex-col px-8 pt-20 pb-2 h-[100vh] overflow-y-auto animate__animated ${isOpen ? 'animate__fadeInDown' : 'animate__fadeOutUp animate__fast'}`}
                >
                    <nav className="flex flex-col space-y-5">
                        {navLinks.map((link, i) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={toggleMenu}
                                style={{ animationDelay: isOpen ? `${i * 0.1}s` : '0s' }}
                                className={`text-4xl font-heading font-bold text-white hover:text-secondary transition-colors uppercase tracking-tight animate__animated ${isOpen ? 'animate__fadeInLeft' : 'animate__fadeOutLeft animate__faster'}`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    <div className="mt-10 h-px w-16 bg-white/10"></div>

                    <div className="mt-8 space-y-8">
                        {['LJUSA', 'TODOS'].map((brand, i) => (
                            <div
                                key={brand}
                                className={`animate__animated ${isOpen ? 'animate__fadeInUp' : 'animate__fadeOutDown animate__faster'}`}
                                style={{ animationDelay: isOpen ? `${0.6 + (i * 0.1)}s` : '0s' }}
                            >
                                <p className="text-xs uppercase tracking-widest text-secondary/70 mb-3">{brand}</p>
                                <div className="flex flex-col gap-3">
                                    <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Instagram</a>
                                    <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">SoundCloud</a>
                                    <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">YouTube</a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        className={`mt-auto pt-8 text-white/20 text-xs uppercase tracking-widest animate__animated ${isOpen ? 'animate__fadeIn' : 'animate__fadeOut animate__faster'}`}
                        style={{ animationDelay: isOpen ? '0.9s' : '0s' }}
                    >
                        LJUSA x TODOS 2025
                    </div>
                </div>
            )}
        </div>
    );
};

export default BurgerMenu;
