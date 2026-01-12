
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background with a "Video Feed" feel */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516195851888-6f1a981a8a21?auto=format&fit=crop&q=80&w=2000" 
          alt="Video Background" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-transparent to-stone-950"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-rose-600/20 border border-rose-500/30 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          <span className="text-rose-400 text-sm font-bold tracking-wider uppercase">Live Video Platform</span>
        </div>

        <h1 className="text-6xl md:text-8xl text-white font-bold mb-8 leading-[1.1] font-serif">
          Instant Face-to-Face <br/>
          <span className="text-rose-500 italic">Connections</span>
        </h1>
        
        <p className="text-xl text-stone-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          The most intimate way to connect. Start a high-definition video call instantly. No waiting, just real conversations.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="#subscriptions" className="group bg-rose-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-rose-700 transition-all shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center">
            <i className="fa-solid fa-video mr-3 group-hover:animate-pulse"></i>
            Start Free Trial
          </a>
          <a href="#gallery" className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 transition-all w-full sm:w-auto">
            Browse Profiles
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-500 flex flex-col items-center">
        <span className="text-xs uppercase tracking-[0.3em] mb-4">Explore More</span>
        <div className="w-px h-12 bg-gradient-to-b from-rose-500 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
