import React, { useState, useRef, useEffect } from 'react';
import { streamChatResponse } from '../services/geminiService';
import { Message } from '../types';
import { RESUME_DATA } from '../constants';
import { MessageSquare, X, Send, Gamepad2, Sparkles, ChevronRight } from 'lucide-react';
import { useSound } from '../hooks/useSound';

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "It's dangerous to go alone! Ask me anything about Alex's backend skills." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const { playSound } = useSound();
  
  // Autocomplete State
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Command and Skill List for Autocomplete
  const COMMANDS = ['help', 'projects', 'experience', 'contact', 'resume', 'about'];
  const SKILLS = RESUME_DATA.skills.map(s => s.name);
  const AUTOCOMPLETE_SOURCE = [...COMMANDS, ...SKILLS];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    const words = val.split(' ');
    const lastWord = words[words.length - 1];

    if (lastWord.length > 0) {
      const matches = AUTOCOMPLETE_SOURCE.filter(item => 
        item.toLowerCase().startsWith(lastWord.toLowerCase()) &&
        item.toLowerCase() !== lastWord.toLowerCase()
      ).slice(0, 5); // Limit to 5 suggestions
      
      setSuggestions(matches);
      setActiveSuggestion(0);
    } else {
      setSuggestions([]);
    }
  };

  const applySuggestion = (suggestion: string) => {
    playSound('click');
    const words = input.split(' ');
    words.pop();
    words.push(suggestion);
    setInput(words.join(' ') + ' ');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length > 0) {
      if (e.key === 'Tab') {
        e.preventDefault();
        applySuggestion(suggestions[activeSuggestion]);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestion(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
        playSound('hover');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestion(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
        playSound('hover');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        applySuggestion(suggestions[activeSuggestion]);
      } else if (e.key === 'Escape') {
        setSuggestions([]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestions([]); 
    
    if (!input.trim() || isLoading) return;

    playSound('coin');
    const userMsg = input.trim();
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      setMessages(prev => [...prev, { role: 'model', text: '', isStreaming: true }]);

      const stream = await streamChatResponse(history, userMsg);
      
      let fullText = '';
      
      for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          setMessages(prev => {
            const newArr = [...prev];
            const lastMsg = newArr[newArr.length - 1];
            if (lastMsg.role === 'model') {
              lastMsg.text = fullText;
            }
            return newArr;
          });
        }
      }
      
      setMessages(prev => {
         const newArr = [...prev];
         const lastMsg = newArr[newArr.length - 1];
         lastMsg.isStreaming = false;
         return newArr;
      });

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Connection lost... verify cartridge is inserted correctly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => { setIsOpen(true); playSound('expand'); }}
        aria-label="Open Terminal"
        onMouseEnter={() => playSound('hover')}
        className="fixed bottom-6 right-6 bg-game-coin border-4 border-black p-4 shadow-pixel hover:-translate-y-1 hover:shadow-none transition-all z-50 group animate-bounce-slow"
      >
        <Gamepad2 className="w-8 h-8 text-black" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 border-2 border-black animate-ping rounded-full"></div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] z-50 flex flex-col font-pixel text-xs md:text-sm">
      
      {/* Dialogue Box Container */}
      <div className="bg-game-blue border-4 border-white shadow-2xl p-1 relative rounded-lg">
        <div className="border-2 border-white/50 p-1 rounded">
          
          {/* Header */}
          <div className="bg-black/20 p-2 flex justify-between items-center mb-2 border-b-2 border-white/20">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>GAME GUIDE</span>
            </div>
            <button 
              onClick={() => { setIsOpen(false); playSound('click'); }} 
              className="text-white hover:text-red-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Area */}
          <div 
            ref={scrollRef}
            className="h-64 overflow-y-auto p-2 space-y-4 mb-2 scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-3 border-2 ${
                  msg.role === 'user' 
                    ? 'bg-white text-black border-black rounded-tl-xl rounded-br-xl rounded-bl-xl' 
                    : 'bg-black/40 text-white border-white rounded-tr-xl rounded-br-xl rounded-bl-xl'
                }`}>
                  <span className="font-retro text-lg leading-tight">{msg.text}</span>
                  {msg.isStreaming && <span className="inline-block w-2 h-4 bg-white align-middle ml-1 animate-blink"></span>}
                </div>
              </div>
            ))}
            {isLoading && !messages[messages.length - 1].isStreaming && (
               <div className="text-white/50 animate-pulse pl-2 font-retro text-lg">Thinking...</div>
            )}
          </div>

          {/* Input & Autocomplete */}
          <form onSubmit={handleSubmit} className="flex gap-2 border-t-2 border-white/20 pt-2 relative">
            
            {/* Autocomplete Popup */}
            {suggestions.length > 0 && (
              <div className="absolute bottom-full left-0 mb-2 w-full max-w-[70%] bg-game-blue border-2 border-white shadow-pixel z-50 flex flex-col overflow-hidden">
                {suggestions.map((s, idx) => (
                  <div 
                    key={s} 
                    className={`px-3 py-2 cursor-pointer font-retro text-lg flex items-center justify-between border-b border-white/10 last:border-0 ${
                      idx === activeSuggestion ? 'bg-game-coin text-black' : 'text-white hover:bg-white/10'
                    }`}
                    onClick={() => applySuggestion(s)}
                  >
                     <span>{s}</span>
                     {idx === activeSuggestion && <ChevronRight className="w-4 h-4" />}
                  </div>
                ))}
                <div className="bg-black/40 text-[10px] text-white/70 px-2 py-1 font-pixel text-right">
                   [TAB] to Select
                </div>
              </div>
            )}

            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              className="flex-1 bg-black/30 border-2 border-white/30 text-white px-2 py-2 outline-none focus:border-white font-retro text-lg placeholder-white/40"
              autoComplete="off"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="bg-game-coin text-black border-2 border-white p-2 hover:bg-white transition-colors disabled:opacity-50"
              onMouseEnter={() => playSound('hover')}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
