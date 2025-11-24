import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Github, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useSound } from '../hooks/useSound';

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { playSound } = useSound();

  const toggleProject = (id: string, e: React.MouseEvent) => {
    // Prevent toggling if clicking on the GitHub link
    if ((e.target as HTMLElement).closest('a')) return;
    
    if (expandedId !== id) {
      playSound('expand');
    } else {
      playSound('click');
    }
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="projects" className="py-24 px-4 bg-game-sky relative">
      {/* Brick Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: `linear-gradient(335deg, rgba(0,0,0,0.3) 23px, transparent 23px),
        linear-gradient(155deg, rgba(0,0,0,0.3) 23px, transparent 23px),
        linear-gradient(335deg, rgba(0,0,0,0.3) 23px, transparent 23px),
        linear-gradient(155deg, rgba(0,0,0,0.3) 23px, transparent 23px)`,
        backgroundSize: '58px 58px',
        backgroundPosition: '0px 2px, 4px 35px, 29px 31px, 34px 6px'
      }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="font-pixel text-2xl md:text-4xl text-white mb-16 text-center pixel-text-shadow">
          <span className="text-game-coin mr-4">WORLD 1-2</span>
          QUEST LOG
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {PROJECTS.map((project, index) => {
            const isExpanded = expandedId === project.id;
            
            return (
              <div key={project.id} className="group relative">
                {/* The Project Card (Floating above pipe) */}
                <div 
                  onClick={(e) => toggleProject(project.id, e)}
                  onMouseEnter={() => playSound('hover')}
                  className={`bg-white border-4 border-black p-0 mb-0 md:mb-4 relative shadow-pixel transition-all cursor-pointer overflow-hidden
                    ${isExpanded ? 'z-20 scale-[1.02] -translate-y-2' : 'hover:-translate-y-4'}
                  `}
                >
                  <div className="absolute top-4 left-4 z-10 bg-game-brick text-white font-pixel text-xs px-2 py-1 border-2 border-black">
                    LVL {index + 1}
                  </div>
                  
                  {/* Thumbnail Image - Aspect Video for HD Screenshot look */}
                  {project.image && (
                    <div className="w-full aspect-video border-b-4 border-black overflow-hidden relative transition-all">
                       <img 
                         src={project.image} 
                         alt={project.title} 
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                       />
                    </div>
                  )}

                  <div className="p-6 pt-4">
                    {/* Expand Toggle Icon */}
                    <div className="absolute top-4 right-4 text-white drop-shadow-md">
                        {isExpanded ? 
                            <ChevronUp className="w-6 h-6 text-white stroke-[3]" /> : 
                            <ChevronDown className="w-6 h-6 text-white stroke-[3] group-hover:scale-110 transition-transform" />
                        }
                    </div>

                    <h3 className="font-pixel text-sm md:text-base mb-4 leading-tight min-h-[40px] pr-8 mt-2">
                      {project.title}
                    </h3>
                    
                    <p className={`font-retro text-xl text-zinc-600 mb-6 leading-tight transition-all ${isExpanded ? '' : 'line-clamp-4'}`}>
                      {project.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {project.stats?.map((stat, i) => (
                        <div key={i} className="flex justify-between items-center font-retro text-lg border-b border-dashed border-gray-300 pb-1">
                          <span className="text-gray-500 uppercase">{stat.label}</span>
                          <span className="text-game-brick font-bold">{stat.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && project.features && (
                      <div className="mb-6 pt-4 border-t-2 border-dashed border-gray-300 animate-in fade-in slide-in-from-top-2 duration-300">
                        <h4 className="font-pixel text-xs mb-3 text-game-blue">QUEST DETAILS:</h4>
                        <ul className="space-y-2 font-retro text-lg text-gray-700">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                               <span className="text-game-coin mt-1 text-[10px]">▶</span>
                               <span className="leading-tight">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2 mt-auto">
                      <div className="flex gap-2">
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-zinc-200 hover:bg-game-coin border-2 border-black transition-colors"
                            title="View Source Code"
                            onClick={() => playSound('click')}
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      {project.link ? (
                          <a 
                            href={project.link}
                            target="_blank" 
                            rel="noreferrer"
                            className="font-pixel text-[10px] bg-game-blue text-white px-2 py-1 flex items-center gap-2 hover:bg-game-brick transition-colors border-2 border-transparent hover:border-black"
                            onClick={() => playSound('click')}
                          >
                            <span>DEPLOY LINK</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                      ) : (
                          <div className="font-pixel text-[10px] bg-game-ground text-white px-2 py-1 border-2 border-black">
                             {project.tech[0]}
                          </div>
                      )}
                    </div>
                  </div>
                  
                  {!isExpanded && (
                     <div className="bg-zinc-100 py-1 text-center font-pixel text-[8px] text-gray-400 group-hover:bg-game-coin group-hover:text-black transition-colors border-t-2 border-black">
                        Click to Expand
                     </div>
                  )}
                </div>

                {/* The Pipe - Only show if not expanded to avoid layout issues or visual clutter */}
                {!isExpanded && (
                  <div className="h-16 md:h-24 w-full mx-auto max-w-[80%] bg-gradient-to-r from-[#00a800] via-[#4cd14c] to-[#00a800] border-x-4 border-black relative -z-10">
                    <div className="absolute -top-4 -left-2 w-[calc(100%+16px)] h-8 bg-gradient-to-r from-[#00a800] via-[#4cd14c] to-[#00a800] border-4 border-black"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
