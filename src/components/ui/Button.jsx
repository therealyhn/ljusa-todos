const base =
    'inline-flex items-center justify-center gap-2 rounded-sm font-semibold uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-accent-blue/40 focus:ring-offset-2 focus:ring-offset-background';

const variants = {
    primary:
        'bg-white text-black hover:bg-transparent hover:text-white transition duration-500',
    secondary:
        'bg-surface text-white border border-white/10 hover:border-white/30 hover:bg-white/5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.06)] transition duration-500',
    outline:
        'border border-white/25 text-white hover:bg-white hover:text-black hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)] transition duration-500',
    ghost:
        'text-white/80 hover:text-white hover:tracking-wider transition duration-500',
};

const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
};

const Button = ({
    variant = 'primary',
    size = 'md',
    className = '',
    as: Tag = 'button',
    ...props
}) => {
    return (
        <Tag
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        />
    );
};

export default Button;
