import { useEffect, useState } from 'react';
import { sanityClient } from './lib/sanityClient';

function App() {
  const [sanityStatus, setSanityStatus] = useState('Checking connection...');

  useEffect(() => {
    // Simple query to test connection
    sanityClient.fetch('*').then(() => {
      setSanityStatus('Connected ✅');
    }).catch((err) => {
      console.error(err);
      setSanityStatus('Error ❌ check console');
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 p-8 bg-background text-primary">
      <div className="max-w-2xl w-full space-y-8">

        {/* Typography & Branding Check */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            LJUSA x TODOS
          </h1>
          <p className="text-xl text-secondary">System Check & Design Verification</p>
        </div>

        {/* Status Card */}
        <div className="bg-surface border border-white/5 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          <div className="grid gap-6">

            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-secondary">Sanity Connection</span>
              <span className="font-mono font-bold bg-white/5 px-3 py-1 rounded text-accent-blue">
                {sanityStatus}
              </span>
            </div>

            <div className="space-y-4">
              <span className="text-secondary block">Color Palette Test</span>
              <div className="grid grid-cols-5 gap-4">
                <div className="space-y-2 text-center">
                  <div className="w-full aspect-square rounded-full bg-background border border-white/10 shadow-inner"></div>
                  <span className="text-xs text-secondary">bg</span>
                </div>
                <div className="space-y-2 text-center">
                  <div className="w-full aspect-square rounded-full bg-surface shadow-lg"></div>
                  <span className="text-xs text-secondary">surface</span>
                </div>
                <div className="space-y-2 text-center">
                  <div className="w-full aspect-square rounded-full bg-accent"></div>
                  <span className="text-xs text-secondary">accent</span>
                </div>
                <div className="space-y-2 text-center">
                  <div className="w-full aspect-square rounded-full bg-accent-blue"></div>
                  <span className="text-xs text-secondary">blue</span>
                </div>
                <div className="space-y-2 text-center">
                  <div className="w-full aspect-square rounded-full bg-primary ring-2 ring-white/20"></div>
                  <span className="text-xs text-secondary">primary</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-accent">If you see this dark interface with clean fonts, Tailwind is verified.</p>
        </div>

      </div>
    </div>
  );
}

export default App;
