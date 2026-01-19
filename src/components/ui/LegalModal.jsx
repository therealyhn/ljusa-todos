import { useEffect } from 'react';
import useEscapeKey from '../../hooks/useEscapeKey';
import useScrollLock from '../../hooks/useScrollLock';
import "animate.css";

export default function LegalModal({ isOpen, type, onClose }) {
    useEscapeKey(onClose, isOpen);
    useScrollLock(isOpen);

    if (!isOpen) return null;

    const content = {
        privacy: {
            title: "Privacy Policy",
            sections: [
                {
                    h: "Information We Collect",
                    p: "We only collect information that you voluntarily provide through our booking form, such as your name, email address, and event details."
                },
                {
                    h: "How We Use Your Information",
                    p: "Your information is used solely to respond to your booking inquiries and coordinate event details. We do not sell or share your personal data with third parties."
                },
                {
                    h: "Data Security",
                    p: "We implement standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure."
                },
                {
                    h: "Cookies",
                    p: "Our website may use essential cookies to improve your browsing experience. These do not track personal identification info."
                }
            ]
        },
        terms: {
            title: "Terms of Service",
            sections: [
                {
                    h: "Content Ownership",
                    p: "All content on this website, including music, photos, and branding, is the property of X T Y (YHN & TODOS) and is protected by copyright laws."
                },
                {
                    h: "Booking Requests",
                    p: "Submitting a booking inquiry does not guarantee an engagement. All bookings are subject to availability and formal contract signing."
                },
                {
                    h: "External Links",
                    p: "We are not responsible for the content or privacy practices of external sites linked from our platform (e.g., SoundCloud, YouTube)."
                },
                {
                    h: "Liability",
                    p: "X T Y is not liable for any technical issues resulting from the use of this website."
                }
            ]
        }
    };

    const activeContent = content[type] || content.privacy;

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate__animated animate__fadeIn animate__faster">
            <div className="absolute inset-0" onClick={onClose} />
            <div
                className="relative w-full max-w-2xl bg-[#0a0a0c] border border-white/10 rounded-sm shadow-2xl animate__animated animate__zoomIn animate__faster"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/60 font-bold">Legal Information</p>
                        <h3 className="mt-2 text-xl font-heading font-bold text-white uppercase tracking-tight">
                            {activeContent.title}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/30 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-8">
                    {activeContent.sections.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                            <h4 className="text-[11px] uppercase tracking-[0.2em] font-black text-white">{section.h}</h4>
                            <p className="text-secondary/60 text-sm leading-relaxed">{section.p}</p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-white/5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-white text-black px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-black hover:bg-[#e0e0e0] transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
