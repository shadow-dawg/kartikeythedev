import React, { useEffect, useState } from 'react';
import { RESUME_DATA } from '../constants';

const GameProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) return;

      const scrollPercent = scrollTop / docHeight;
      // Clamp between 0 and 1
      const safePercent = Math.min(Math.max(scrollPercent, 0), 1);
      setProgress(safePercent);
    };

    window.addEventListener('scroll', updateProgress);
    // Initial call to set position
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 h-[60vh] w-4 z-40 hidden md:flex flex-col items-center pointer-events-none">
        
        {/* Track / Vine */}
        <div className="w-2 h-full bg-[#00a800] border-2 border-black relative shadow-pixel-sm">
            {/* Leaves decoration - alternating sides */}
            {[10, 30, 50, 70, 90].map((pos) => (
                <React.Fragment key={pos}>
                    <div className="absolute -left-3 w-4 h-2 bg-[#00a800] border-2 border-black rounded-l-full" style={{ top: `${pos}%` }}></div>
                    <div className="absolute -right-3 w-4 h-2 bg-[#00a800] border-2 border-black rounded-r-full" style={{ top: `${pos + 10}%` }}></div>
                </React.Fragment>
            ))}
        </div>

        {/* Start Marker */}
        <div className="absolute -top-8 bg-black text-white font-pixel text-[10px] px-2 py-1 border-2 border-white">
            START
        </div>

        {/* End Marker */}
        <div className="absolute -bottom-8 bg-game-brick text-white font-pixel text-[10px] px-2 py-1 border-2 border-black animate-bounce">
            GOAL
        </div>

        {/* Moving Character Indicator */}
        <div 
            className="absolute left-1/2 -translate-x-1/2 w-12 h-12 transition-all duration-150 ease-out z-20"
            style={{ top: `${progress * 100}%`, marginTop: '-24px' }} 
        >
            <div className="relative group pointer-events-auto cursor-help">
                {/* User Avatar as Mario */}
                <div className="w-10 h-10 border-2 border-white shadow-pixel hover:scale-125 transition-transform overflow-hidden rounded-md bg-game-sky">
                    <img 
                        src={RESUME_DATA.avatar} 
                        alt="Player" 
                        className="w-full h-full object-cover contrast-125 saturate-150 brightness-110"
                    />
                </div>
                
                {/* Percentage Tooltip */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] font-pixel px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border-2 border-white shadow-pixel">
                    Level {(progress * 100).toFixed(0)}%
                </div>
            </div>
        </div>
    </div>
  );
};

export default GameProgress;