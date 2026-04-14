import Container from '../../ui/Container';

const quickLinks = [
    { title: 'Mashups & Edits', href: '#mashups', external: false },
    { title: 'Mixes', href: '#mixes', external: false },
    { title: 'Gallery', href: '#gallery', external: false },
    { title: 'Booking', href: '#booking', external: false },
    { title: 'Svi za pultom', href: 'https://svizapultom.xty-music.com', external: true },
];

export default function QuickAccessStrip() {
    return (
        <section className="relative bg-black/10 py-4">
            <Container>
                <div className="mx-auto max-w-[980px] border border-white/10 bg-black/70 backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center border-b border-white/10 px-4 py-3 text-center">
                        <span className="text-[10px] uppercase tracking-[0.28em] text-white/45">Quick Access</span>
                        <span className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/30">XTY Ecosystem</span>
                    </div>

                    <ul className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0 lg:p-0">
                        {quickLinks.map((item) => (
                            <li key={item.title} className="min-w-0">
                                <a
                                    href={item.href}
                                    target={item.external ? '_blank' : undefined}
                                    rel={item.external ? 'noopener noreferrer' : undefined}
                                    className="group flex h-full items-center justify-center gap-2 border border-white/10 px-3 py-3 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-white/78 transition hover:border-white/30 hover:bg-white/[0.04] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black lg:border-y-0 lg:border-l-0 lg:px-4 lg:py-4 lg:first:border-l-0"
                                >
                                    <span className="truncate">{item.title}</span>
                                    <span className="text-white/35 transition-transform duration-300 group-hover:translate-x-1">
                                        {item.external ? '↗' : '→'}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    );
}
