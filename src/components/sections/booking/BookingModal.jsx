import { useState, useEffect } from 'react';
import useEscapeKey from '../../../hooks/useEscapeKey';
import useScrollLock from '../../../hooks/useScrollLock';
import { createBooking } from '../../../lib/api/booking';
import AvailabilityCalendar from './AvailabilityCalendar';


export default function BookingModal({ isOpen, selectedOption, onClose }) {
    const [formData, setFormData] = useState({
        eventType: '',
        artist: 'b2b',
        name: '',
        email: '',
        phone: '',
        city: '',
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
                artist: 'b2b'
            }));
        }
    }, [selectedOption]);

    useEffect(() => {
        if (!isOpen) {
            setStatus({ type: '', message: '' });
        }
    }, [isOpen]);

    useEscapeKey(onClose, isOpen);
    useScrollLock(isOpen);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: 'info', message: 'Saljemo zahtev...' });

        const payload = {
            clientName: formData.name,
            clientEmail: formData.email,
            clientPhone: formData.phone,
            eventType: formData.eventType,
            eventDate: formData.date,
            city: formData.city,
            country: 'Serbia',
            message: [
                `Artist: ${formData.artist}`,
                `Trajanje: ${formData.duration}`,
                `Detalji: ${formData.details}`,
            ].join('\n'),
        };

        try {
            await createBooking(payload);
            setStatus({ type: 'success', message: 'Zahtev poslat, javljamo se uskoro!' });
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.message || 'Doslo je do greske, pokusajte ponovo.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateSelect = (date) => {
        setFormData(prev => ({ ...prev, date }));
        if (status.type === 'error') {
            setStatus({ type: '', message: '' });
        }
    };

    const isSubmitted = status.type === 'success';

    return (
        <div className="fixed inset-0 z-[80] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 animate__animated animate__fadeIn animate__faster">
            <div className="absolute inset-0" onClick={onClose} />
            <div
                className="relative w-full max-w-5xl bg-[#0a0a0c] border border-white/10 rounded-sm overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] animate__animated animate__zoomIn animate__faster"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/60">Booking Forma</p>
                        <h3 className="mt-2 text-xl font-heading font-bold text-white uppercase tracking-tight">
                            Detalji
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

                {isSubmitted ? (
                    <div className="p-12 text-center">
                        <h4 className="text-2xl font-heading font-semibold text-white uppercase tracking-tight">
                            Zahtev poslat
                        </h4>
                        <p className="mt-4 text-secondary text-sm uppercase tracking-widest">
                            Javicemo se uskoro sa detaljima.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-8 bg-white text-black px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-[#e0e0e0] transition-colors"
                        >
                            Zatvori
                        </button>
                    </div>
                ) : (
                    <form className="p-6 md:p-8 grid gap-8 max-h-[75vh] overflow-y-auto custom-scrollbar" onSubmit={handleSubmit}>
                        {status.message && (
                            <div className={`p-4 text-[10px] font-bold uppercase tracking-[0.2em] text-center ${status.type === 'error' ? 'bg-red-500/10 text-red-500' :
                                status.type === 'info' ? 'bg-white/5 text-white/70' :
                                    'bg-white/5 text-white/70'
                                }`}>
                                {status.message}
                            </div>
                        )}

                        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                            <AvailabilityCalendar
                                selectedDate={formData.date}
                                onSelectDate={handleDateSelect}
                            />

                            <div className="grid gap-8">
                                <div className="grid gap-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Tip Eventa</label>
                                    <div className="w-full bg-white/[0.02] border border-white/5 px-4 py-4 text-white/40 cursor-not-allowed text-[11px] uppercase tracking-[0.15em] font-medium">
                                        {formData.eventType}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="grid gap-3">
                                        <label className="text-[14px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Ime</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Unesi ime"
                                            className="bg-transparent border-b italic border-white/10 px-0 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors tracking-wider placeholder:text-white/25"
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <label className="text-[14px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Unesi email"
                                            className="bg-transparent border-b italic border-white/10 px-0 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors tracking-wider placeholder:text-white/25"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="grid gap-3">
                                        <label className="text-[14px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Telefon</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+381 6..."
                                            className="bg-transparent border-b italic border-white/10 px-0 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors tracking-wider placeholder:text-white/25"
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <label className="text-[14px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Grad</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Na primer: Beograd"
                                            className="bg-transparent border-b italic border-white/10 px-0 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors tracking-wider placeholder:text-white/25"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="grid gap-3">
                                        <label className="text-[14px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Izabrani Datum</label>
                                        <input
                                            type="text"
                                            name="date"
                                            value={formData.date}
                                            placeholder="Izaberi datum iz kalendara"
                                            className="bg-transparent border-b border-white/10 px-0 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors italic tracking-wider placeholder:text-white/25"
                                            readOnly
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <label className="text-[14px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Vreme Trajanja</label>
                                        <input
                                            type="text"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            placeholder="Na primer: 3 sata"
                                            className="bg-transparent border-b border-white/10 px-0 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors italic tracking-wider placeholder:text-white/25"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-secondary/50 font-bold">Dodatni Detalji</label>
                                    <textarea
                                        name="details"
                                        value={formData.details}
                                        onChange={handleChange}
                                        rows="2"
                                        placeholder="Recite nam nesto o atmosferi, mestu i zahtevima..."
                                        className="bg-transparent border-b border-white/10 px-0 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors h-24 resize-none italic tracking-wider leading-relaxed placeholder:text-white/25"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-6 pt-10 border-t border-white/5">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors disabled:opacity-50"
                            >
                                Otkazi
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-white text-black px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                            >
                                {isSubmitting ? 'Processing...' : 'Posalji'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
