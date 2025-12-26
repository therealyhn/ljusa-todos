import Container from '../ui/Container';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
            <Container>
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="#" className="text-2xl font-heading font-bold tracking-tighter text-white">
                        LJUSA <span className="text-accent-blue">x</span> TODOS
                    </a>

                    {/* Desktop Nav - Hidden on mobile for now */}
                    <div className="hidden md:flex items-center space-x-8 text-sm uppercase font-medium text-secondary">
                        <a href="#about" className="hover:text-primary transition-colors">About</a>
                        <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
                        <a href="#mashups" className="hover:text-primary transition-colors">Mashups</a>

                        {/* CTA Button */}
                        <button className="bg-white text-black px-6 py-2.5 rounded-sm font-semibold hover:bg-gray-200 uppercase transition-colors">
                            Book Now
                        </button>
                    </div>
                </div>
            </Container>
        </nav>
    );
};

export default Navbar;