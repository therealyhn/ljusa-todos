import { useEffect } from 'react';
import MashupList from './MashupList';

export default function MashupListModal({ isOpen, onClose, tracks, currentIndex, onSelect }) {
    useEffect(() => {
        if (!isOpen) return undefined;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow || '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col animate-in fade-in duration-300">
            {/* Ambient Background Glow */}
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" /> */}

            {/* Main Container */}
            <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto relative overflow-hidden h-full">

                {/* Visual Overlays (Studio Grade) */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.01)_0%,transparent_70%)]" />

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-8 border-b border-white/10 relative z-10 bg-[#080808]/50">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                            <p className="text-secondary/60 text-[9px] uppercase tracking-[0.4em] font-mono leading-none">Reference: XTY WORK</p>
                        </div>
                        <h3 className="text-3xl font-heading font-bold text-white uppercase tracking-tighter leading-none mt-2">
                            Mashup & Edits Archive
                        </h3>
                    </div>

                    <button
                        className="group/close relative w-12 h-12 flex items-center justify-center border border-white/10 hover:border-white/30 transition-all rounded-full overflow-hidden"
                        onClick={onClose}
                        aria-label="Close archive"
                    >
                        <div className="absolute inset-0 bg-white scale-0 group-hover/close:scale-100 transition-transform duration-300 opacity-5" />
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 flex flex-col min-h-0 relative z-10">
                    <div className="absolute inset-y-0 left-0 w-px bg-white/5" />
                    <div className="absolute inset-y-0 right-0 w-px bg-white/5" />

                    <div className="flex-1 overflow-hidden flex flex-col">
                        <MashupList
                            tracks={tracks}
                            currentIndex={currentIndex}
                            onSelect={(index) => {
                                onSelect(index);
                                onClose();
                            }}
                        />
                    </div>
                </div>

                {/* Footer Metadata */}
                <div className="px-6 py-4 flex justify-between items-center border-t border-white/5 bg-[#080808]/50 relative z-10">
                    <span className="text-[7px] font-mono tracking-[0.3em] text-white/20 uppercase">Session_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                    <span className="text-[7px] font-mono tracking-[0.3em] text-white/20 uppercase">Link_Status: Encrypted</span>
                </div>
            </div>
        </div>
    );
}
