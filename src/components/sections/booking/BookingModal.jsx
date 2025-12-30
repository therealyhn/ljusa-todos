import { useState, useEffect } from 'react';
import Button from '../../ui/Button';
import "animate.css";

export default function BookingModal({ isOpen, selectedOption, onClose, options = [] }) {
    const [formData, setFormData] = useState({
        eventType: '',
        artist: 'yhn', // Default
        name: '',
        email: '',
        date: '',
        duration: '',
        details: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (selectedOption) {
            setFormData(prev => ({
                ...prev,
                eventType: selectedOption.title || 'Selected Event',
                artist: selectedOption.title?.toLowerCase().includes('b2b') ? 'both' : prev.artist || 'yhn'
            }));
        }
    }, [selectedOption]);

    useEffect(() => {
        if (!isOpen) {
            setStatus({ type: '', message: '' });
            return;
        }
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: 'info', message: 'Sending request...' });

        // Web3Forms Integration
        const formObject = {
            ...formData,
            access_key: import.meta.env.VITE_WEB3FORMS_KEY,
            subject: `New Booking Request: ${formData.eventType} - ${formData.artist}`,
            from_name: formData.name,
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formObject),
            });

            const result = await response.json();

            if (result.success) {
                setStatus({ type: 'success', message: 'Request sent successfully! We will contact you soon.' });
                setTimeout(() => {
                    onClose();
                }, 3000);
            } else {
                setStatus({ type: 'error', message: result.message || 'Something went wrong.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send request. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const artists = [
        { id: 'yhn', name: 'Yhn' },
        { id: 'todos', name: 'Todos' },
        { id: 'both', name: 'Both (B2B)' }
    ];

    return (
        <div className="fixed inset-0 z-[80] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 animate__animated animate__fadeIn animate__faster">
            <div className="absolute inset-0" onClick={onClose} />
            <div
                className="relative w-full max-w-2xl bg-[#0a0a0c] border border-white/10 rounded-sm overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] animate__animated animate__zoomIn animate__faster"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/60">Enquiry Form</p>
                        <h3 className="mt-2 text-xl font-heading font-bold text-white uppercase tracking-tight">
                            Booking Details
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/30 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form className="p-8 grid gap-8 max-h-[75vh] overflow-y-auto custom-scrollbar" onSubmit={handleSubmit}>
                    {status.message && (
                        <div className={`p-4 text-[10px] font-bold uppercase tracking-[0.2em] text-center ${status.type === 'success' ? 'bg-green-500/10 text-green-500' :
                            status.type === 'error' ? 'bg-red-500/10 text-red-500' :
                                'bg-white/5 text-white/70'
                            }`}>
                            {status.message}
                        </div>
                    )}

                    <div className="grid gap-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Event Type</label>
                        <div className="w-full bg-white/[0.02] border border-white/5 px-4 py-4 text-white/40 cursor-not-allowed text-[11px] uppercase tracking-[0.15em] font-medium">
                            {formData.eventType}
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Artist Selection</label>
                        <div className="grid grid-cols-3 gap-3">
                            {artists.map((artist) => (
                                <button
                                    key={artist.id}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, artist: artist.id }))}
                                    className={`py-4 px-2 text-[10px] uppercase tracking-[0.2em] font-black border transition-all duration-500 ${formData.artist === artist.id
                                        ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                        : 'bg-transparent text-white/30 border-white/5 hover:border-white/20'
                                        }`}
                                >
                                    {artist.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="grid gap-3">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="ENTER NAME"
                                className="bg-transparent border-b border-white/10 px-0 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors uppercase tracking-wider"
                                required
                            />
                        </div>

                        <div className="grid gap-3">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ENTER EMAIL"
                                className="bg-transparent border-b border-white/10 px-0 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors uppercase tracking-wider"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="grid gap-3">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Event Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="bg-transparent border-b border-white/10 px-0 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors uppercase tracking-wider"
                                required
                            />
                        </div>

                        <div className="grid gap-3">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Set Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="E.G. 3 HOURS"
                                className="bg-transparent border-b border-white/10 px-0 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors uppercase tracking-wider"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Additional Details</label>
                        <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            rows="2"
                            placeholder="TELL US ABOUT THE VIBE, VENUE, AND REQUIREMENTS..."
                            className="bg-transparent border-b border-white/10 px-0 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors h-24 resize-none uppercase tracking-wider leading-relaxed"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-6 pt-10 border-t border-white/5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-white text-black px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        >
                            {isSubmitting ? 'Processing...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
