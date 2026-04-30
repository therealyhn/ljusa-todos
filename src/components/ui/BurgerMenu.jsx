import { useState } from 'react';

const navLinks = [
    { name: 'Our Work', href: '#mashups' },
    { name: 'Mixes', href: '#mixes' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Booking', href: '#booking' },
    {
        name: 'Svi za pultom',
        href: 'https://svizapultom.xty-music.com',
        external: true,
    },
];

export default function BurgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <div className="md:hidden">
            <button
                type="button"
                onClick={toggleMenu}
                className={`relative z-[10000] p-2 text-white transition-colors hover:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 ${isOpen ? 'fixed right-5 top-5' : ''
                    }`}
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
            >
                {isOpen ? (
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex h-[100vh] flex-col overflow-y-auto bg-black px-8 pb-8 pt-24">
                    <nav className="flex flex-col gap-5">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={toggleMenu}
                                target={link.external ? '_blank' : undefined}
                                rel={link.external ? 'noopener noreferrer' : undefined}
                                className="w-fit text-4xl font-heading font-bold uppercase tracking-tight text-white transition-colors hover:text-white/60"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    <div className="mt-10 h-px w-20 bg-white/10" />

                    <div className="mt-8 space-y-3 text-xs uppercase tracking-[0.24em] text-white/50">
                        <a href="https://www.instagram.com/xty.music/" target="_blank" rel="noopener noreferrer" className="block hover:text-white">
                            Instagram
                        </a>
                        <a href="https://www.youtube.com/@xty-music" target="_blank" rel="noopener noreferrer" className="block hover:text-white">
                            YouTube
                        </a>
                        <a href="https://www.tiktok.com/@xtymusic" target="_blank" rel="noopener noreferrer" className="block hover:text-white">
                            TikTok
                        </a>
                        <a href="mailto:booking@xty-music.com" className="block hover:text-white">
                            booking@xty-music.com
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
