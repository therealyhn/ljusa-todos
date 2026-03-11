import useEscapeKey from '../../../hooks/useEscapeKey';
import useScrollLock from '../../../hooks/useScrollLock';
import CategoryCard from './CategoryCard';

export default function GalleryCatalogModal({ isOpen, onClose, categories, onSelectCategory }) {
    useEscapeKey(onClose, isOpen);
    useScrollLock(isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[72] bg-black/95 p-4 backdrop-blur-md md:p-6">
            <div className="absolute inset-0" onClick={onClose} />

            <div
                role="dialog"
                aria-modal="true"
                className="relative mx-auto flex max-h-[92vh] w-full max-w-6xl flex-col border border-white/10 bg-[#0b0b0d]"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Full catalog</p>
                        <h3 className="mt-1 text-2xl font-heading font-bold uppercase tracking-tight text-white md:text-3xl">
                            Gallery
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-white/20 p-2 text-white/60 transition hover:border-white/40 hover:text-white"
                        aria-label="Close gallery catalog"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="overflow-y-auto px-5 py-6 md:px-7">
                    <div className="grid gap-6 md:grid-cols-2">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                onClick={() => onSelectCategory(category)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
