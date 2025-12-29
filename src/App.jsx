import Navbar from './components/nav/Navbar';
import Hero from './components/sections/home/Hero';
import About from './components/sections/about/About';
import Gallery from './components/sections/gallery/Gallery';
import Mashups from './components/sections/mashups/Mashups';

function App() {
  return (
    <main className="bg-background min-h-screen text-primary selection:bg-accent-blue selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Mashups />
      <Gallery />

      {/* Placeholder for future sections to allow scrolling */}
      <div className="h-screen"></div>
    </main>
  );
}

export default App;
