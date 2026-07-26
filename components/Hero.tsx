import React from 'react';
import { RESUME_DATA } from '../constants';
import { Cloud, Play, Sparkles } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface HeroProps {
  onStart: () => void;
  gameStarted: boolean;
}

const Hero: React.FC<HeroProps> = ({ onStart, gameStarted }) => {
  const { playSound } = useSound();

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden pt-16 pb-36 px-4">
      
      {/* Dynamic Sky Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-white/80 animate-float opacity-80">
          <Cloud size={64} fill="white" />
        </div>
        <div className="absolute top-32 right-20 text-white/80 animate-float opacity-80" style={{ animationDelay: '1s' }}>
          <Cloud size={80} fill="white" />
        </div>
        <div className="absolute top-10 left-1/2 text-white/80 animate-float opacity-60" style={{ animationDelay: '2s' }}>
          <Cloud size={48} fill="white" />
        </div>
      </div>

      <div className="z-10 text-center space-y-6 max-w-3xl px-2 flex flex-col items-center">
        
        {/* Top Badge */}
        <button 
          onClick={onStart}
          onMouseEnter={() => playSound('hover')}
          className="inline-flex items-center gap-2 bg-game-coin border-4 border-black px-4 py-2 rotate-1 shadow-pixel mb-1 hover:scale-105 transition-transform cursor-pointer"
        >
           <Sparkles className="w-4 h-4 text-black animate-spin" />
           <span className="font-pixel text-xs md:text-sm text-black uppercase font-bold">Press Start / Insert Coin</span>
        </button>

        {/* Character Avatar */}
        <div 
          className="relative group cursor-pointer animate-float my-2"
          onClick={() => { playSound('click'); onStart(); }}
        >
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white shadow-pixel relative z-10 bg-game-dark">
                <img 
                    src={RESUME_DATA.avatar} 
                    alt={RESUME_DATA.name} 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://github.com/shadow-dawg.png';
                    }}
                    className="w-full h-full object-cover contrast-125 saturate-150 brightness-110"
                />
            </div>
            {/* Crown Effect */}
            <div className="absolute -top-6 -right-4 text-4xl animate-bounce z-20" style={{ animationDelay: '0.5s' }}>
                👑
            </div>
        </div>

        {/* Big Pixel Headline */}
        <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white pixel-text-shadow">
          IT'S ME, <br className="sm:hidden"/>
          <span className="text-game-coin">{RESUME_DATA.name.split(' ')[0]}!</span>
        </h1>

        {/* Dialog Card - Solid High-Contrast Background */}
        <div className="bg-black/90 border-4 border-white p-5 md:p-8 rounded-2xl shadow-pixel max-w-2xl w-full text-center">
          <p className="font-retro text-2xl md:text-4xl text-game-coin font-bold tracking-wider mb-2">
            ⚔️ {RESUME_DATA.title}
          </p>
          <p className="font-pixel text-xs md:text-sm text-gray-100 leading-relaxed">
            {RESUME_DATA.tagline}
          </p>
        </div>

        {/* Highly Visible Start / Let's Go Button */}
        <div className={`flex flex-col gap-4 justify-center items-center pt-4 w-full max-w-xs transition-all duration-700 ${gameStarted ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100'}`}>
          <button 
            onClick={onStart}
            onMouseEnter={() => playSound('hover')}
            className="w-full group relative bg-game-coin hover:bg-yellow-400 text-black border-4 border-black px-8 py-5 font-pixel text-sm md:text-base uppercase shadow-pixel hover:translate-y-1 hover:shadow-none transition-all active:translate-y-2 cursor-pointer animate-pulse flex items-center justify-center gap-3 font-bold"
          >
            <Play className="w-5 h-5 fill-black" />
            <span>LET'S GO! 🚀</span>
          </button>
          <span className="font-pixel text-[10px] text-white/90 bg-black/60 px-3 py-1 border border-white/40 rounded">
            Click to enter Kartikey's Backend World
          </span>
        </div>
      </div>

      {/* Ground Decoration - Clean CSS Brick Grid */}
      <div className="absolute bottom-12 w-full h-12 bg-[repeating-linear-gradient(45deg,#c84c0c,#c84c0c_16px,#b73229_16px,#b73229_32px)] border-t-4 border-black z-20"></div>
      <div className="absolute bottom-0 w-full h-12 bg-game-pipe border-t-4 border-black z-10 flex items-center justify-center">
        <span className="font-pixel text-[10px] text-white/90">WORLD 1-1 • KARTIKEY ROSHAN</span>
      </div>
    </section>
  );
};

export default Hero;
