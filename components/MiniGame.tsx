import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Server, X, Play, RotateCcw, Zap, Cpu, Trophy } from 'lucide-react';

interface MiniGameProps {
  onClose: () => void;
}

type ServerStatus = 'idle' | 'critical' | 'stabilized';

const GRID_SIZE = 9;
const GAME_DURATION = 15;

const MiniGame: React.FC<MiniGameProps> = ({ onClose }) => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [servers, setServers] = useState<{status: ServerStatus, id: number}[]>(
    Array.from({ length: GRID_SIZE }, (_, i) => ({ status: 'idle', id: i }))
  );
  
  const timerRef = useRef<number | null>(null);
  const gameLoopRef = useRef<number | null>(null);

  // Sound Effect Helper
  const playSound = (type: 'fix' | 'alert' | 'gameover') => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'fix') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'alert') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'gameover') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1);
      osc.start();
      osc.stop(ctx.currentTime + 1);
    }
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setServers(Array.from({ length: GRID_SIZE }, (_, i) => ({ status: 'idle', id: i })));
    playSound('fix');
  };

  const handleServerClick = (index: number) => {
    if (gameState !== 'playing') return;

    if (servers[index].status === 'critical') {
      // Success fix
      const newServers = [...servers];
      newServers[index].status = 'stabilized';
      setServers(newServers);
      setScore(s => s + 100);
      playSound('fix');
      
      // Reset to idle after short delay
      setTimeout(() => {
        setServers(prev => {
          const reset = [...prev];
          if (reset[index].status === 'stabilized') {
            reset[index].status = 'idle';
          }
          return reset;
        });
      }, 200);
    } else if (servers[index].status === 'idle') {
      // Penalty
      setScore(s => Math.max(0, s - 50));
    }
  };

  // Game Loop
  useEffect(() => {
    if (gameState === 'playing') {
      // Timer
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('finished');
            playSound('gameover');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Random server failures
      gameLoopRef.current = window.setInterval(() => {
        setServers(prev => {
          const newServers = [...prev];
          // 30% chance to fail a random idle server
          if (Math.random() > 0.3) {
            const idleIndices = newServers
              .map((s, i) => s.status === 'idle' ? i : -1)
              .filter(i => i !== -1);
            
            if (idleIndices.length > 0) {
              const randomIdx = idleIndices[Math.floor(Math.random() * idleIndices.length)];
              newServers[randomIdx].status = 'critical';
              playSound('alert');
            }
          }
          return newServers;
        });
      }, 600); // Speed of new bugs appearing
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState]);

  const getRank = (score: number) => {
    if (score < 500) return "Intern";
    if (score < 1000) return "Junior Dev";
    if (score < 2000) return "Senior Dev";
    return "10x Engineer";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-game-blue border-4 border-white shadow-2xl w-full max-w-md relative overflow-hidden rounded-xl">
        
        {/* Header */}
        <div className="bg-black/20 p-4 border-b-4 border-black/20 flex justify-between items-center text-white font-pixel">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            <span>SERVER STABILIZER</span>
          </div>
          <button onClick={onClose} className="hover:text-red-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Game Area */}
        <div className="p-6 bg-[#2a2a3e] min-h-[300px] flex flex-col items-center justify-center relative">
          
          {gameState === 'start' && (
            <div className="text-center space-y-6 animate-float">
              <Zap className="w-16 h-16 text-yellow-400 mx-auto" />
              <div>
                <h3 className="font-pixel text-2xl text-white mb-2">SYSTEM CRITICAL!</h3>
                <p className="font-retro text-xl text-gray-300">
                  Tap the <span className="text-red-400 font-bold">RED</span> servers to reboot them before the system crashes!
                </p>
              </div>
              <button 
                onClick={startGame}
                className="bg-game-coin text-black border-4 border-black px-6 py-3 font-pixel hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
              >
                <Play className="w-4 h-4" />
                START PATCHING
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="w-full">
              <div className="flex justify-between mb-4 font-pixel text-white">
                <div className="bg-black/50 px-3 py-1 rounded border-2 border-white/20">
                  SCORE: {score}
                </div>
                <div className={`px-3 py-1 rounded border-2 border-white/20 ${timeLeft <= 5 ? 'bg-red-500 animate-pulse' : 'bg-black/50'}`}>
                  TIME: {timeLeft}s
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {servers.map((server, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleServerClick(idx)}
                    className={`
                      aspect-square rounded-lg border-4 border-black/50 flex items-center justify-center transition-all active:scale-95 relative
                      ${server.status === 'idle' ? 'bg-slate-700 hover:bg-slate-600' : ''}
                      ${server.status === 'critical' ? 'bg-red-500 animate-bounce' : ''}
                      ${server.status === 'stabilized' ? 'bg-green-500' : ''}
                    `}
                  >
                    <Server className={`w-8 h-8 ${server.status === 'idle' ? 'text-slate-400' : 'text-white'}`} />
                    {server.status === 'critical' && (
                      <div className="absolute inset-0 border-4 border-yellow-400 animate-ping opacity-50 rounded-lg"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameState === 'finished' && (
            <div className="text-center space-y-6">
              <Trophy className="w-16 h-16 text-game-coin mx-auto animate-bounce" />
              <div>
                <h3 className="font-pixel text-3xl text-white mb-2">GAME OVER</h3>
                <div className="bg-black/40 p-4 rounded-lg border-2 border-white/20 inline-block">
                  <p className="font-retro text-xl text-gray-300">Final Score: <span className="text-white">{score}</span></p>
                  <p className="font-pixel text-game-coin mt-2">Rank: {getRank(score)}</p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={startGame}
                  className="bg-game-blue text-white border-4 border-white px-4 py-2 font-pixel text-xs hover:bg-white hover:text-game-blue transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  RETRY
                </button>
                <button 
                  onClick={onClose}
                  className="bg-gray-700 text-white border-4 border-black px-4 py-2 font-pixel text-xs hover:bg-gray-600 transition-colors"
                >
                  EXIT
                </button>
              </div>
            </div>
          )}

        </div>
        
        {/* Footer decoration */}
        <div className="h-4 bg-stripes-gray w-full opacity-20"></div>
      </div>
    </div>
  );
};

export default MiniGame;