export default function CategoryCard({ category, onClick, className = "" }) {
    const imageUrl =
        category.image || "https://placehold.co/900x600?text=Category";

    return (
        <div className={className}>
            <button
                type="button"
                onClick={onClick}
                className="group relative block h-[320px] w-full overflow-hidden bg-black text-left md:h-[380px]"
            >
                {/* Image Background */}
                <img
                    src={imageUrl}
                    alt={category.alt || category.title}
                    className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                    loading="lazy"
                    decoding="async"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-500" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-tighter shadow-black drop-shadow-lg">
                        {category.title}
                    </h3>
                    {category.description && (
                        <p className="mt-4 max-w-sm text-sm text-secondary/80 line-clamp-2 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                            {category.description}
                        </p>
                    )}

                    {/* Decorative Line */}
                    <div className="mt-6 h-px w-0 bg-white/30 transition-all duration-700 group-hover:w-full" />
                </div>
            </button>
        </div>
    );
}
