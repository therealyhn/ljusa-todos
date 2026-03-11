import { useEffect, useState } from 'react';
import Navbar from './components/nav/Navbar';
import Hero from './components/sections/home/Hero';
import QuickAccessStrip from './components/sections/home/QuickAccessStrip';
import Gallery from './components/sections/gallery/Gallery';
import Mashups from './components/sections/mashups/Mashups';
import Mixes from './components/sections/mixes/Mixes';
import SviZaPultomFeature from './components/sections/home/SviZaPultomFeature';
import Booking from './components/sections/booking/Booking';
import Footer from './components/nav/Footer';
import InitialLoader from './components/ui/InitialLoader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-background min-h-screen text-primary selection:bg-accent-blue selection:text-white">
      {isLoading && <InitialLoader />}
      <Navbar />
      <Hero />
      <QuickAccessStrip />
      <Mashups />
      <Mixes />
      <Gallery />
      <SviZaPultomFeature />
      <Booking />
      <Footer />
    </main>
  );
}

export default App;
