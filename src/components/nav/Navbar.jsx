import Container from '../ui/Container';
import BurgerMenu from '../ui/BurgerMenu';
import Button from '../ui/Button';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
            <Container>
                <div className="flex items-center justify-between h-20 animate__animated animate__fadeIn animate__slower">
                    {/* Logo */}
                    <a href="#" className="text-2xl font-heading font-bold tracking-tighter text-white z-50 relative">
                        LJUSA <span className="text-accent-blue">x</span> TODOS
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8 text-md uppercase font-medium text-secondary">
                        <a href="#about" className="hover:text-primary transition-colors">About</a>
                        <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
                        <a href="#mashups" className="hover:text-primary transition-colors">Mashups</a>
                        <Button variant="primary" size="md" className="hover:bg-gray-200 uppercase transition-colors">
                            Book Now
                        </Button>
                    </div>
                    {/* Mobile Nav Component */}
                    <BurgerMenu />
                </div>

            </Container>

        </nav>
    );
};

export default Navbar;