import { useState } from 'react';
import Container from '../ui/Container';
import LegalModal from '../ui/LegalModal';
import logo from '../../assets/logo.png';

export default function Footer() {
    const [legalType, setLegalType] = useState(null);

    return (
        <footer className="border-t border-white/10 bg-black py-8 md:py-10">
            <Container>
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-3">
                        <a href="#home" className="w-fit">
                            <img
                                src={logo}
                                alt="XTY logo"
                                className="h-12 w-auto object-contain opacity-85"
                                loading="lazy"
                                decoding="async"
                            />
                        </a>
                        <p className="text-xs uppercase tracking-[0.18em] text-secondary/80">
                            Balkanski mashup duo za klubove, festivale i premium event noc.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.22em]">
                        <a href="#mashups" className="text-white/70 transition hover:text-white">Our Work</a>
                        <a href="#mixes" className="text-white/70 transition hover:text-white">Mixes</a>
                        <a href="#gallery" className="text-white/70 transition hover:text-white">Gallery</a>
                        <a href="#booking" className="text-white/70 transition hover:text-white">Booking</a>
                        <a
                            href="https://svizapultom.xty-music.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/70 transition hover:text-white"
                        >
                            Svi za pultom
                        </a>
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.18em] text-white/45 md:flex-row md:items-center md:justify-between">
                    <p>(c) {new Date().getFullYear()} XTY. All rights reserved.</p>
                    <div className="flex flex-wrap gap-4">
                        <a href="https://www.instagram.com/xty.music/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
                            Instagram
                        </a>
                        <a href="https://www.youtube.com/@xty-music" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
                            YouTube
                        </a>
                        <a href="https://www.tiktok.com/@xtymusic" target="_blank" rel="noopener noreferrer" className="hover:text-white/80">
                            TikTok
                        </a>
                        <a href="mailto:booking@xty-music.com" className="hover:text-white/80">
                            Email
                        </a>
                    </div>
                    <div className="flex gap-4">
                        <button type="button" onClick={() => setLegalType('privacy')} className="hover:text-white/80">
                            Politika privatnosti
                        </button>
                        <button type="button" onClick={() => setLegalType('terms')} className="hover:text-white/80">
                            Uslovi koriscenja
                        </button>
                    </div>
                </div>
            </Container>

            <LegalModal
                isOpen={!!legalType}
                type={legalType}
                onClose={() => setLegalType(null)}
            />
        </footer>
    );
}
