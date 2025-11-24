import React, { useState } from 'react';
import { EXPERIENCE } from '../constants';
import { Flag, ArrowDown } from 'lucide-react';
import MiniGame from './MiniGame';

const Experience: React.FC = () => {
  const [showGame, setShowGame] = useState(false);

  return (
    <section className="py-24 px-4 bg-[#f8e0b0] relative overflow-hidden">
      {/* Background Decor - Hills */}
      <div className="absolute bottom-0 left-0 w-full">
         <svg viewBox="0 0 1440 320" className="w-full h-auto opacity-50">
           <path fill="#00a800" fillOpacity="1" d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,224C840,245,960,267,1080,261.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
         </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="font-pixel text-2xl md:text-4xl text-black mb-16 text-center pixel-text-shadow text-white">
          <span className="text-game-coin mr-4">WORLD 1-3</span>
          ADVENTURE LOG
        </h2>

        <div className="space-y-0">
          {EXPERIENCE.map((job, idx) => (
            <div key={job.id} className="flex flex-col md:flex-row gap-0 md:gap-8 group">
              {/* The Path Visualization */}
              <div className="hidden md:flex flex-col items-center min-w-[80px]">
                <div className={`w-6 h-6 rounded-full border-4 border-black z-10 ${idx === 0 ? 'bg-game-coin animate-pulse' : 'bg-black'}`}></div>
                <div className="flex-1 w-2 bg-black h-full min-h-[150px] -mt-2 mb-[-8px]">
                   <div className="w-full h-full bg-white/20 dashed"></div>
                </div>
              </div>

              {/* The Card */}
              <div className="flex-1 pb-12">
                <div className="bg-white border-4 border-black p-6 shadow-pixel group-hover:-translate-y-1 transition-transform relative">
                   {idx === 0 && (
                     <div className="absolute -right-4 -top-6 text-game-brick animate-bounce">
                        <Flag className="w-8 h-8 fill-current" />
                     </div>
                   )}
                   
                   <div className="flex flex-wrap justify-between items-start gap-4 mb-4 border-b-4 border-black/10 pb-4">
                      <div>
                        <h3 className="font-pixel text-sm md:text-base text-game-blue mb-1">{job.role}</h3>
                        <div className="font-retro text-xl font-bold">{job.company}</div>
                      </div>
                      <div className="bg-black text-white font-pixel text-[10px] px-2 py-1 rounded">
                        {job.period}
                      </div>
                   </div>

                   <ul className="space-y-3 font-retro text-xl text-gray-700">
                      {job.description.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-game-coin mt-1 text-xs">●</span>
                          {point}
                        </li>
                      ))}
                   </ul>
                </div>
              </div>
            </div>
          ))}
          
          {/* Start Point / Bonus Level Trigger */}
           <div className="flex flex-col items-center min-w-[80px] md:pl-0">
               {/* S Node */}
               <div className="hidden md:flex w-8 h-8 bg-green-500 border-4 border-black z-10 rounded-full items-center justify-center font-bold text-xs mb-8">S</div>
               
               {/* Warp Pipe */}
               <div className="relative group cursor-pointer" onClick={() => setShowGame(true)}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-pixel text-[10px] whitespace-nowrap bg-black text-game-coin px-2 py-1 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:-translate-y-4">
                    BONUS LEVEL!
                    <ArrowDown className="w-4 h-4 mx-auto animate-bounce mt-1 text-white" />
                  </div>

                  {/* Pipe Top */}
                  <div className="w-24 h-12 border-4 border-black relative z-10" style={{ background: 'linear-gradient(90deg, #00a800 10%, #4cd14c 50%, #00a800 90%)' }}></div>
                  {/* Pipe Body */}
                  <div className="w-20 h-16 mx-auto border-x-4 border-b-4 border-black" style={{ background: 'linear-gradient(90deg, #00a800 10%, #4cd14c 50%, #00a800 90%)' }}></div>
               </div>
           </div>
        </div>
      </div>

      {showGame && <MiniGame onClose={() => setShowGame(false)} />}
    </section>
  );
};

export default Experience;