import Navbar from './components/nav/Navbar';
import Hero from './components/sections/home/Hero';

function App() {
  return (
    <main className="bg-background min-h-screen text-primary selection:bg-accent-blue selection:text-white">
      <Navbar />
      <Hero />

      {/* Placeholder for future sections to allow scrolling */}
      <div className="h-screen"></div>
    </main>
  );
}

export default App;