import Container from '../ui/Container';
import BurgerMenu from '../ui/BurgerMenu';
import Button from '../ui/Button';
import logo from '../../assets/logo.png';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
            <Container>
                <div className="flex items-center justify-between h-20 animate__animated animate__fadeIn animate__slower">
                    {/* Logo */}
                    <a href="#" className="z-50 relative">
                        <img src={logo} alt="Logo" className="w-auto h-12 md:h-16 object-contain" />
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8 text-md uppercase font-medium text-secondary">
                        <a href="#about" className="hover:text-primary transition-colors">About</a>
                        <a href="#mashups" className="hover:text-primary transition-colors">Mashups</a>
                        <a href="#mixes" className="hover:text-primary transition-colors">Mixes</a>
                        <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
                        <Button href="#booking" variant="primary" size="md" className="hover:bg-gray-200 uppercase transition-colors">
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