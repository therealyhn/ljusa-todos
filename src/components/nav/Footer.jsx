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
                    <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left gap-6">
                        <img src={logo} alt="X T Y Logo" className="h-14 md:h-16 w-auto object-contain opacity-80" />
                        <p className="text-secondary/80 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                            Elevating the night through a unique blend of sound, visuals, and premium energy.
                        </p>
                        <div className="flex gap-6 justify-center md:justify-start">
                            <a href="https://www.instagram.com/xty.music/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300">
                                    <span className="sr-only">XTY Instagram</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z" /></svg>
                                </div>
                                <span className="text-[8px] uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">XTY</span>
                            </a>
                            <a href="https://www.youtube.com/@xty-music" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300">
                                    <span className="sr-only">XTY Youtbe</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.99 2.99 0 0 0-2.104-2.12C19.66 3.5 12 3.5 12 3.5s-7.66 0-9.394.566a2.99 2.99 0 0 0-2.104 2.12A31.37 31.37 0 0 0 0 12a31.37 31.37 0 0 0 .502 5.814 2.99 2.99 0 0 0 2.104 2.12C4.34 20.5 12 20.5 12 20.5s7.66 0 9.394-.566a2.99 2.99 0 0 0 2.104-2.12A31.37 31.37 0 0 0 24 12a31.37 31.37 0 0 0-.502-5.814ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" /></svg>
                                </div>
                                <span className="text-[8px] uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">XTY</span>
                            </a>
                            <a href="mailto:booking@xty-music.com" className="group flex flex-col items-center gap-2">
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300">
                                    <span className="sr-only">XTY Email</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7.5l9 6 9-6M4.5 6h15a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0119.5 18h-15A1.5 1.5 0 013 16.5v-9A1.5 1.5 0 014.5 6z" />
                                    </svg>
                                </div>
                                <span className="text-[8px] uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">Email</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-2 flex flex-col items-center md:items-start gap-6">
                        <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/60">Navigation</h4>
                        <ul className="flex flex-col gap-3">
                            <li><a href="#about" className="text-white/60 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 inline-block">About</a></li>
                            <li><a href="#mashups" className="text-white/60 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 inline-block">Mashups</a></li>
                            <li><a href="#mixes" className="text-white/60 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 inline-block">Mixes</a></li>
                            <li><a href="#gallery" className="text-white/60 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 inline-block">Gallery</a></li>
                        </ul>
                    </div>

                    {/* Booking */}
                    <div className="md:col-span-3 flex flex-col items-center md:items-start gap-6">
                        <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/60">Inquiries</h4>
                        <ul className="flex flex-col gap-3">
                            <li className="text-sm text-white/40 font-medium">Contact for booking:</li>
                            <li><a href="mailto:booking@xty-music.com" className="text-white text-sm hover:underline font-medium">booking@xty-music.com</a></li>
                            <li>
                                <a href="#booking" className="mt-4 inline-block bg-white/5 border border-white/10 px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-black hover:bg-white hover:text-black transition-all duration-500">
                                    Book Now
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Scroll to Top */}
                    <div className="md:col-span-3 flex justify-center md:justify-end items-start mt-8 md:mt-0">
                        <button
                            onClick={scrollToTop}
                            className="group flex flex-col md:flex-row items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all duration-300"
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
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40 text-center md:text-left">
                    <p>© {new Date().getFullYear()} X T Y. ALL RIGHTS RESERVED.</p>
                    <p>DESIGNED & DEVELOPED BY <br className="md:hidden" /> <a href="https://jovanljusic.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Jovan Ljusic (YHN)</a></p>
                    <div className="flex flex-wrap justify-center gap-8">
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
