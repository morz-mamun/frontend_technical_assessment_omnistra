import { Navbar } from './components/navbar/Navbar';
// import { IntegrationsSection } from './components/integrations/IntegrationsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
      <Navbar />

      {/* Hero Filler Section - dark theme like Chargeflow */}
      <section className="relative w-full h-[120vh] flex flex-col items-center justify-center bg-black overflow-hidden pt-32">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,90,241,0.15),transparent_60%)] pointer-events-none" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%) opacity-30 pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm font-medium backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
            Scroll down to see navbar transitions
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            Recover <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-600">Disputes</span>.
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
      {/* <IntegrationsSection /> */}

    </main>
  );
}
