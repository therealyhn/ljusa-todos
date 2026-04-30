import useEscapeKey from '../../hooks/useEscapeKey';
import useScrollLock from '../../hooks/useScrollLock';


export default function LegalModal({ isOpen, type, onClose }) {
    useEscapeKey(onClose, isOpen);
    useScrollLock(isOpen);

    if (!isOpen) return null;

    const content = {
        privacy: {
            title: "Politika Privatnosti",
            sections: [
                {
                    h: "Informacije koje prikupljamo",
                    p: "Prikupljamo isključivo informacije koje nam dobrovoljno dostavite putem naše booking forme, kao što su vaše ime, e-mail adresa i detalji o događaju."
                },
                {
                    h: "Kako koristimo vaše informacije",
                    p: "Vaše informacije koristimo isključivo za odgovaranje na vaše upite za rezervaciju i koordinaciju detalja događaja. Ne prodajemo niti delimo vaše lične podatke sa trećim stranama."
                },
                {
                    h: "Sigurnost podataka",
                    p: "Preduzimamo standardne mere bezbednosti kako bismo zaštitili vaše lične podatke. Međutim, imajte na umu da nijedan metod prenosa preko interneta nije 100% siguran."
                },
                {
                    h: "Kolačići",
                    p: "Naš sajt može koristiti osnovne kolačiće (cookies) radi poboljšanja vašeg korisničkog iskustva. Ovi kolačići ne prate lične identifikacione informacije."
                }
            ]
        },
        terms: {
            title: "Uslovi Korišćenja",
            sections: [
                {
                    h: "Vlasništvo nad sadržajem",
                    p: "Sav sadržaj na ovom sajtu, uključujući muziku, fotografije i brendiranje, vlasništvo je X T Y (YHN & TODOS) i zaštićen je zakonima o autorskim pravima."
                },
                {
                    h: "Zahtevi za rezervaciju",
                    p: "Slanje upita za rezervaciju ne garantuje angažman. Sve rezervacije podležu dostupnosti i potpisivanju zvaničnog ugovora."
                },
                {
                    h: "Eksterni linkovi",
                    p: "Nismo odgovorni za sadržaj ili prakse privatnosti eksternih sajtova linkovanih sa naše platforme (npr. SoundCloud, YouTube)."
                },
                {
                    h: "Odgovornost",
                    p: "X T Y nije odgovoran za bilo kakve tehničke probleme koji nastanu korišćenjem ovog sajta."
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
                        <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/60 font-bold">Pravne Informacije</p>
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
                        Zatvori
                    </button>
                </div>
            </div>
        </div>
    );
}
