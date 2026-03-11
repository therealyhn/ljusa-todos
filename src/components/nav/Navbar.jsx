import Container from '../ui/Container';
import BurgerMenu from '../ui/BurgerMenu';
import Button from '../ui/Button';
import logo from '../../assets/logo.png';

const Navbar = () => {
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/75 backdrop-blur-xl">
            <Container>
                <div className="flex h-20 items-center justify-between">
                    <a href="#home" className="relative z-50">
                        <img
                            src={logo}
                            alt="XTY logo"
                            className="h-12 w-auto object-contain md:h-16"
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                        />
                    </a>

                    <div className="hidden items-center gap-7 text-xs uppercase tracking-[0.22em] text-secondary md:flex">
                        <a href="#mashups" className="transition-colors hover:text-white">Mashups</a>
                        <a href="#mixes" className="transition-colors hover:text-white">Mixes</a>
                        <a href="#gallery" className="transition-colors hover:text-white">Gallery</a>
                        <a
                            href="https://svizapultom.xty-music.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-white"
                        >
                            Svi za pultom
                        </a>
                        <Button as="a" href="#booking" variant="primary" size="sm" className="px-5 py-2.5">
                            Book now
                        </Button>
                    </div>

                    <BurgerMenu />
                </div>
            </Container>
        </nav>
    );
};

export default Navbar;
