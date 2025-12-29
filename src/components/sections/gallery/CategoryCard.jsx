export default function CategoryCard({ category, onClick, className = "" }) {
    const imageUrl =
        category.image || "https://placehold.co/900x600?text=Category";

    return (
        <li className={className}>
            <button
                type="button"
                onClick={onClick}
                className="group block w-full overflow-hidden rounded-sm bg-surface text-left border border-white/5"
            >
                <div className="relative">
                    <img
                        src={imageUrl}
                        alt={category.alt || category.title}
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                        loading="lazy"
                    />
                </div>

                <div className="p-5">
                    <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-secondary mb-2">
                        Category
                    </span>
                    <h3 className="text-lg font-heading font-semibold text-white">
                        {category.title}
                    </h3>
                    {category.description && (
                        <p className="mt-2 text-xs text-secondary/70 line-clamp-2">
                            {category.description}
                        </p>
                    )}
                </div>
            </button>
        </li>
    );
}
