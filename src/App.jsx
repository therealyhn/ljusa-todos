import Navbar from './components/nav/Navbar';
import Hero from './components/sections/home/Hero';
import About from './components/sections/about/About';
import Gallery from './components/sections/gallery/Gallery';
import Mashups from './components/sections/mashups/Mashups';
import Mixes from './components/sections/mixes/Mixes';
import Booking from './components/sections/booking/Booking';

function App() {
  return (
    <main className="bg-background min-h-screen text-primary selection:bg-accent-blue selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Mashups />
      <Mixes />
      <Gallery />
      <Booking />
    </main>
  );
}

export default App;
