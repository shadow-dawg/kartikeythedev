import React, { useState } from 'react';
import { RESUME_DATA } from '../constants';
import { ChevronRight, Star } from 'lucide-react';
import { useSound } from '../hooks/useSound';

const TechStack: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const { playSound } = useSound();

  // Active skill is either hovered or selected (hover takes precedence)
  const activeSkillName = hoveredSkill || selectedSkill;
  const activeSkill = RESUME_DATA.skills.find(s => s.name === activeSkillName);

  const handleSkillClick = (skillName: string) => {
    playSound('click');
    setSelectedSkill(prev => prev === skillName ? null : skillName);
  };

  return (
    <section id="world-1-1" className="py-24 px-4 bg-game-dark relative overflow-hidden">
      {/* Dark Grid Background */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: `
                linear-gradient(to right, #444 1px, transparent 1px),
                linear-gradient(to bottom, #444 1px, transparent 1px)
             `,
             backgroundSize: '40px 40px'
           }}>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="font-pixel text-2xl md:text-4xl text-white mb-2 pixel-text-shadow">
            <span className="text-game-coin mr-4">WORLD 1-1</span>
            INVENTORY
          </h2>
          <p className="font-retro text-xl text-gray-400">Select an item to view stats.</p>
        </div>

        {/* RPG Menu Container */}
        <div className="bg-game-blue border-4 border-white rounded-lg shadow-[0_0_0_4px_black,0_20px_50px_rgba(0,0,0,0.5)] max-w-4xl mx-auto overflow-hidden relative">
          
          {/* Decorative Corner Screws */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-white/50 shadow-sm"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-white/50 shadow-sm"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/50 shadow-sm"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/50 shadow-sm"></div>

          {/* Inner Content */}
          <div className="p-4 md:p-8">
            
            {/* Header Stats */}
            <div className="flex flex-wrap justify-between items-end border-b-2 border-white/30 pb-4 mb-6 font-pixel text-white text-xs md:text-sm">
               <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">LVL</span>
                    <span>99</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">HP</span>
                    <div className="w-20 h-3 bg-red-900 border border-white/50 relative">
                       <div className="absolute inset-0 bg-red-500 w-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 hidden sm:flex">
                    <span className="text-blue-400">EXP</span>
                    <span>MAX</span>
                  </div>
               </div>
               <div className="text-game-coin animate-pulse mt-2 sm:mt-0">
                  PLAYER: KARTIKEY
               </div>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {RESUME_DATA.skills.map((skill, idx) => {
                const isActive = hoveredSkill === skill.name || selectedSkill === skill.name;
                return (
                  <div 
                    key={idx}
                    onClick={() => handleSkillClick(skill.name)}
                    onMouseEnter={() => {
                        setHoveredSkill(skill.name);
                        playSound('hover');
                    }}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`
                      relative aspect-square border-4 transition-all duration-100 cursor-pointer group
                      ${isActive
                          ? 'bg-blue-900 border-yellow-400 translate-y-[-4px] shadow-[0_8px_0_rgba(0,0,0,0.5)]' 
                          : 'bg-black/40 border-gray-600 hover:border-gray-400'
                      }
                    `}
                  >
                      {/* Hover Hand Cursor */}
                      {isActive && (
                          <div className="absolute -left-2 top-1/2 -translate-x-full -translate-y-1/2 z-20 hidden md:block">
                              <ChevronRight className="w-8 h-8 text-white animate-bounce-slow" strokeWidth={3} />
                          </div>
                      )}

                      <div className="absolute top-1 left-2 font-pixel text-[8px] text-white/50">
                          {String(idx + 1).padStart(2, '0')}
                      </div>

                      <div className="h-full flex flex-col items-center justify-center gap-2 p-2">
                          <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100 grayscale-[0.3]'}`}>
                              <div className="text-white w-10 h-10 md:w-12 md:h-12 [&>svg]:w-full [&>svg]:h-full">
                                  {skill.icon}
                              </div>
                          </div>
                          <span className={`font-pixel text-[10px] text-center leading-tight ${isActive ? 'text-yellow-400' : 'text-gray-400'}`}>
                              {skill.name}
                          </span>
                      </div>
                  </div>
                );
              })}
            </div>

            {/* Description Footer */}
            <div className="mt-8 border-t-2 border-white/30 pt-4 min-h-[80px]">
                {activeSkill ? (
                    <div className="animate-float flex gap-4 items-start">
                        <Star className="w-6 h-6 text-yellow-400 shrink-0 mt-1" fill="currentColor" />
                        <div>
                            <h4 className="font-pixel text-yellow-400 text-sm mb-1">{activeSkill.name}</h4>
                            <p className="font-retro text-lg text-white leading-tight max-w-2xl">
                                {activeSkill.description}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="text-white/50 font-retro text-lg italic flex items-center gap-2">
                        <div className="w-2 h-2 bg-white/50 animate-pulse"></div>
                        Select or hover over an item to inspect stats...
                    </div>
                )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
