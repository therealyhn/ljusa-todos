import Container from '../ui/Container';
import BurgerMenu from '../ui/BurgerMenu';
import Button from '../ui/Button';
import logo from '../../assets/logo.png';
import szplogo from '../../assets/szp.png';

const Navbar = () => {
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/75 backdrop-blur-xl">
            <Container>
                <div className="flex h-20 items-center justify-between">
                    <div className="relative z-50 flex items-center gap-2 md:gap-3">

                        <a href="#home">
                            <img
                                src={logo}
                                alt="XTY logo"
                                className="h-12 w-auto object-contain md:h-16"
                                loading="eager"
                                decoding="async"
                                fetchPriority="high"
                            />
                        </a>
                        <a
                            href="https://svizapultom.xty-music.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex"
                            aria-label="Open Svi za pultom"
                        >
                            <img
                                src={szplogo}
                                alt="Svi za pultom logo"
                                className="h-12 w-12 rounded-full object-contain [animation:spin_12s_linear_infinite] transition duration-300 group-hover:border-white/40 md:h-16 md:w-16"
                                loading="eager"
                                decoding="async"
                            />
                        </a>
                    </div>

                    <div className="hidden items-center gap-7 text-xs uppercase tracking-[0.22em] text-secondary md:flex">
                        <a href="#mashups" className="transition-colors hover:text-white">Our Work</a>
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
