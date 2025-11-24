import React from 'react';
import { RESUME_DATA } from '../constants';
import { Cloud } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface HeroProps {
  onStart: () => void;
  gameStarted: boolean;
}

const Hero: React.FC<HeroProps> = ({ onStart, gameStarted }) => {
  const { playSound } = useSound();

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden pt-20 pb-40">
      
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

      <div className="z-10 text-center space-y-6 max-w-4xl px-4 flex flex-col items-center">
        {/* Coin / Start Trigger */}
        <button 
          onClick={onStart}
          onMouseEnter={() => playSound('hover')}
          className="inline-block bg-game-coin border-4 border-black px-4 py-2 rotate-2 shadow-pixel mb-4 animate-bounce-slow hover:scale-110 transition-transform cursor-pointer"
        >
           <span className="font-pixel text-xs md:text-sm text-black uppercase">Insert Coin to Start</span>
        </button>

        {/* Character Avatar */}
        <div 
          className="relative mb-4 group cursor-pointer animate-float"
          onClick={() => playSound('click')}
        >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-pixel relative z-10 bg-game-sky">
                <img 
                    src={RESUME_DATA.avatar} 
                    alt={RESUME_DATA.name} 
                    className="w-full h-full object-cover contrast-125 saturate-150 brightness-110"
                />
            </div>
            {/* Crown or Hat Effect */}
            <div className="absolute -top-6 -right-4 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>
                👑
            </div>
        </div>

        <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl leading-tight text-white pixel-text-shadow">
          IT'S ME,<br/>
          <span className="text-game-coin">{RESUME_DATA.name.split(' ')[0]}!</span>
        </h1>

        <div className="bg-black/20 backdrop-blur-sm p-6 border-4 border-white rounded-xl inline-block">
          <p className="font-retro text-2xl md:text-3xl text-white mb-2">
            {RESUME_DATA.title}
          </p>
          <p className="font-pixel text-xs md:text-sm text-white/90 max-w-xl leading-relaxed">
            {RESUME_DATA.tagline}
          </p>
        </div>

        <div className={`flex flex-col md:flex-row gap-6 justify-center items-center pt-8 transition-all duration-1000 ${gameStarted ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100'}`}>
          <button 
            onClick={onStart}
            onMouseEnter={() => playSound('hover')}
            className="group relative bg-game-brick border-4 border-black px-8 py-4 font-pixel text-white text-sm uppercase shadow-pixel hover:translate-y-1 hover:shadow-none transition-all active:translate-y-2"
          >
            Start Game
          </button>
        </div>
      </div>

      {/* Ground Decoration */}
      <div className="absolute bottom-0 w-full h-16 bg-[url('https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/90e572e42426875.png')] bg-repeat-x z-20" style={{ backgroundSize: '64px' }}></div>
      <div className="absolute bottom-16 w-full h-8 bg-green-500 border-t-4 border-black z-10"></div>
    </section>
  );
};

export default Hero;