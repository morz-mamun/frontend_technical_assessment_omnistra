

import IntegrationsSection from './components/integrations/IntegrationsSection';
import { Navbar } from './components/navbar/Navbar';


export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
      <Navbar />

      {/* Hero Filler Section - dark theme like Chargeflow */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden pt-32">

        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(30,90,241,0.2) 0%, transparent 100%)"
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "4rem 4rem",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 0%, transparent 100%)"
          }}
        />

        <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm font-medium backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
            Scroll down to see navbar transitions
          </div>
          <h1 className="text-7xl md:text-8xl lg:text-[110px] bg-white text-transparent bg-clip-text font-black tracking-tighter leading-[0.95] mb-6">
            Recover <span className="bg-gradient-to-r from-[#4A72FF] to-[#6c5bfe] text-transparent bg-clip-text">Disputes</span>.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-10 font-medium tracking-tight">
            The world's first automated chargeback management platform.
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-[15px] hover:bg-zinc-200 transition-colors transform hover:scale-105 active:scale-95">
              GET STARTED
            </button>
            <button className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-[15px] hover:bg-white/20 transition-colors transform hover:scale-105 active:scale-95 backdrop-blur-sm">
              BOOK DEMO
            </button>
          </div>
        </div>
      </section>

      {/* The Domu Integrations Section - light theme */}
      <IntegrationsSection />
    </main>
  );
}
