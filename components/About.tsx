import React from 'react';
import { RESUME_DATA } from '../constants';
import { Brain, Coffee, Zap, Shield, Heart } from 'lucide-react';
import { useSound } from '../hooks/useSound';

const StatBar = ({ label, value, icon, color, max = 100 }: { label: string, value: number, icon: React.ReactNode, color: string, max?: number }) => {
  const width = `${(value / max) * 100}%`;
  
  return (
    <div className="group">
      <div className="flex justify-between text-white font-pixel text-[10px] mb-1">
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        <span>{value}/{max}</span>
      </div>
      <div className="h-3 bg-black/50 border-2 border-white/30 relative overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 group-hover:brightness-125 relative`} 
          style={{ width }}
        >
             {/* Shine effect */}
             <div className="absolute top-0 right-0 h-full w-1 bg-white/50 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const TraitBadge = ({ label }: { label: string }) => (
  <span className="font-pixel text-[10px] bg-game-dark text-game-coin px-2 py-1 border border-white/30 rounded hover:border-white transition-colors cursor-help select-none" title={`Special Ability: ${label}`}>
    {label}
  </span>
);

const About: React.FC = () => {
    const { playSound } = useSound();

  return (
    <section id="about" className="py-24 px-4 bg-[#202028] relative border-b-4 border-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" 
           style={{ 
             backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
             backgroundSize: '20px 20px'
           }}>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Main Window */}
        <div 
            className="bg-game-blue border-4 border-white shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] p-1 relative"
            onMouseEnter={() => playSound('hover')}
        >
          {/* Inner Border for that double-border RPG look */}
          <div className="border-2 border-white/50 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
            
            {/* Left Column: Portrait & Basic Data */}
            <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
                <div className="relative group cursor-pointer" onClick={() => playSound('click')}>
                    <div className="w-40 h-40 border-4 border-white bg-black relative overflow-hidden shadow-lg">
                        <img 
                            src={RESUME_DATA.avatar} 
                            alt={RESUME_DATA.name}
                            className="w-full h-full object-cover contrast-125 saturate-150" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-600 text-white font-pixel text-[8px] px-2 py-0.5 border border-white whitespace-nowrap animate-bounce">
                        PLAYER 1
                    </div>
                </div>

                <div className="w-full bg-black/40 p-3 border border-white/20 text-center space-y-1">
                    <h2 className="font-pixel text-xl text-yellow-400 pixel-text-shadow">{RESUME_DATA.name.split(' ')[0]}</h2>
                    <div className="font-retro text-white text-lg opacity-80">{RESUME_DATA.title}</div>
                    <div className="flex justify-center gap-1 mt-2">
                        {[1,2,3].map(i => <Heart key={i} className="w-4 h-4 text-red-500 fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s`}} />)}
                    </div>
                </div>
            </div>

            {/* Right Column: Stats & Biography */}
            <div className="w-full md:w-2/3 space-y-6">
                
                <div className="space-y-2">
                    <div className="flex justify-between items-end border-b-2 border-white/20 pb-1 mb-2">
                        <h3 className="font-pixel text-lg text-white">BIOGRAPHY</h3>
                        <span className="font-pixel text-[10px] text-gray-400">ID: #001</span>
                    </div>
                    <p className="font-retro text-xl text-white/90 leading-relaxed tracking-wide">
                        "{RESUME_DATA.about}"
                    </p>
                </div>

                {/* Attributes Grid */}
                <div className="space-y-3">
                     <h3 className="font-pixel text-lg text-white border-b-2 border-white/20 pb-1 mb-2">ATTRIBUTES</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                        <StatBar label="BACKEND SORCERY" value={99} icon={<Zap className="w-3 h-3 text-yellow-400" />} color="bg-yellow-500" />
                        <StatBar label="BUG RESISTANCE" value={95} icon={<Shield className="w-3 h-3 text-green-400" />} color="bg-green-500" />
                        <StatBar label="LOGIC" value={98} icon={<Brain className="w-3 h-3 text-blue-400" />} color="bg-blue-500" />
                        <StatBar label="CAFFEINE LEVEL" value={100} icon={<Coffee className="w-3 h-3 text-orange-400" />} color="bg-orange-500" />
                     </div>
                </div>

                {/* Traits / Perks */}
                <div>
                    <h3 className="font-pixel text-lg text-white border-b-2 border-white/20 pb-1 mb-2">SPECIAL TRAITS</h3>
                    <div className="flex flex-wrap gap-2">
                        <TraitBadge label="Clean Code" />
                        <TraitBadge label="System Design" />
                        <TraitBadge label="Microservices" />
                        <TraitBadge label="Fast Typer" />
                        <TraitBadge label="Video Editor" />
                    </div>
                </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;