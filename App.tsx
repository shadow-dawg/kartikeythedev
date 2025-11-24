import React, { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Terminal from './components/Terminal';
import GameProgress from './components/GameProgress';
import { Github, Coins } from 'lucide-react';
import { useSound } from './hooks/useSound';
import { RESUME_DATA } from './constants';

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [coins, setCoins] = useState(0);
  const { playSound } = useSound();

  const handleStartGame = () => {
    if (gameStarted) return;
    
    playSound('start');
    setGameStarted(true);
    
    // Allow React to render the new sections before scrolling
    setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCoinGet = () => {
    setCoins(prev => prev + 1);
    playSound('coin');
  };

  return (
    <main className={`min-h-screen selection:bg-game-coin selection:text-black overflow-x-hidden ${!gameStarted ? 'overflow-y-hidden h-screen' : ''}`}>
      
      {/* Navigation - Retro HUD Style */}
      <nav className="fixed top-0 left-0 w-full z-40 p-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          
          <div className="bg-black/80 border-2 border-white p-2 pointer-events-auto shadow-pixel">
            <div className="flex flex-col">
              <span className="font-pixel text-[10px] text-game-coin uppercase mb-1">Character</span>
              <span className="font-pixel text-sm text-white">KARTIKEY</span>
            </div>
          </div>

          <div className="flex gap-4 pointer-events-auto">
             <a 
               href="https://github.com/shadow-dawg" 
               target="_blank" 
               rel="noreferrer" 
               className="bg-black/80 border-2 border-white p-2 text-white hover:text-game-coin transition-colors shadow-pixel hover:shadow-none hover:translate-y-1"
               onMouseEnter={() => playSound('hover')}
               onClick={() => playSound('click')}
             >
               <Github className="w-6 h-6" />
             </a>
             <div 
               className="bg-black/80 border-2 border-white p-2 flex items-center gap-2 shadow-pixel cursor-pointer active:scale-95 transition-transform"
               onClick={handleCoinGet}
               onMouseEnter={() => playSound('hover')}
             >
               <Coins className="w-5 h-5 text-game-coin animate-pulse" />
               <span className="font-pixel text-white text-sm">x {99 + coins}</span>
             </div>
          </div>
        </div>
      </nav>

      <Hero onStart={handleStartGame} gameStarted={gameStarted} />
      
      {/* Game World Sections - Only visible after start */}
      {gameStarted && (
        <>
          <GameProgress />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Contact />
          <Terminal />
        </>
      )}
      
      {!gameStarted && (
        <div className="fixed bottom-10 left-0 w-full text-center pointer-events-none animate-pulse z-30">
          <p className="font-pixel text-white text-xs md:text-sm drop-shadow-md">© 2024 NINTENDO (JUST KIDDING, IT'S KARTIKEY)</p>
        </div>
      )}

    </main>
  );
};

export default App;