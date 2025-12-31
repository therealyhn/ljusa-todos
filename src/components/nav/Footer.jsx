import { useState } from 'react';
import Container from '../ui/Container';
import LegalModal from '../ui/LegalModal';
import logo from '../../assets/logo.png';

export default function Footer() {
    const [legalType, setLegalType] = useState(null);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-black border-t border-white/5 pt-20 pb-10 overflow-hidden">
            {/* Background Text */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[20vw] font-heading font-black text-white/[0.02] uppercase select-none pointer-events-none whitespace-nowrap leading-none">
                X T Y
            </div>

            <Container className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="md:col-span-4 flex flex-col items-start gap-6">
                        <img src={logo} alt="X T Y Logo" className="h-12 md:h-16 w-auto object-contain opacity-80" />
                        <p className="text-secondary/60 text-sm leading-relaxed max-w-xs">
                            Elevating the night through a unique blend of sound, visuals, and premium energy.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300">
                                <span className="sr-only">SoundCloud</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.44 12c0 1.95 2.1 3.53 4.69 3.53 2.59 0 4.69-1.58 4.69-3.53s-2.1-3.53-4.69-3.53c-2.59 0-4.69 1.58-4.69 3.53zm-10.45-1.55c-1.1 0-1.99.71-1.99 1.58 0 .88.89 1.59 1.99 1.59s1.99-.71 1.99-1.59c0-.87-.89-1.58-1.99-1.58zm3.26-1.47c-1.1 0-1.99.71-1.99 1.58 0 .88.89 1.59 1.99 1.59s1.99-.71 1.99-1.59c0-.87-.89-1.58-1.99-1.58zm3.26-.74c-1.1 0-1.99.71-1.99 1.58 0 .88.89 1.59 1.99 1.59s1.99-.71 1.99-1.59c0-.87-.89-1.58-1.99-1.58zm3.26-.55c-1.1 0-1.99.71-1.99 1.58 0 .88.89 1.59 1.99 1.59s1.99-.71 1.99-1.59c0-.87-.89-1.58-1.99-1.58z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300">
                                <span className="sr-only">YouTube</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/40">Navigation</h4>
                        <ul className="flex flex-col gap-3">
                            <li><a href="#about" className="text-secondary/50 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 inline-block">About</a></li>
                            <li><a href="#mashups" className="text-secondary/50 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 inline-block">Mashups</a></li>
                            <li><a href="#mixes" className="text-secondary/50 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 inline-block">Mixes</a></li>
                            <li><a href="#gallery" className="text-secondary/50 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 inline-block">Gallery</a></li>
                        </ul>
                    </div>

                    {/* Booking */}
                    <div className="md:col-span-3 flex flex-col gap-6">
                        <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/40">Inquiries</h4>
                        <ul className="flex flex-col gap-3">
                            <li className="text-sm text-secondary/50">For worldwide bookings:</li>
                            <li><a href="mailto:booking@xty.com" className="text-white text-sm hover:underline">booking@xty.com</a></li>
                            <li>
                                <a href="#booking" className="mt-4 inline-block bg-white/5 border border-white/10 px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-black hover:bg-white hover:text-black transition-all duration-500">
                                    Book Now
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Scroll to Top */}
                    <div className="md:col-span-3 flex md:justify-end items-start mt-8 md:mt-0">
                        <button
                            onClick={scrollToTop}
                            className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all duration-300"
                        >
                            <span>Back to top</span>
                            <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white/40 transition-all">
                                <svg className="w-4 h-4 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/20">
                    <p>© {new Date().getFullYear()} X T Y (YHN & TODOS). ALL RIGHTS RESERVED.</p>
                    <p>DESIGNED & DEVELOPED BY <a href="https://jovanljusic.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">Jovan Ljusic (YHN)</a></p>
                    <div className="flex gap-8">
                        <button onClick={() => setLegalType('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
                        <button onClick={() => setLegalType('terms')} className="hover:text-white transition-colors">Terms of Service</button>
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
