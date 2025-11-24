import React from 'react';
import { SOCIALS } from '../constants';
import { Heart } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-black text-white border-t-4 border-white">
      <div className="max-w-2xl mx-auto text-center space-y-12">
        
        <div className="space-y-4">
          <h2 className="font-pixel text-4xl text-game-brick animate-pulse">GAME OVER?</h2>
          <p className="font-retro text-2xl text-gray-400">
            CONTINUE? &nbsp; <span className="animate-blink text-white">9</span>
          </p>
        </div>

        <p className="font-pixel text-xs md:text-sm leading-loose max-w-lg mx-auto text-gray-300">
          Ready to unlock the next level of your infrastructure? 
          <br/>
          Insert coin (send an email) to start a new game.
        </p>

        <div className="flex justify-center gap-6">
          {SOCIALS.map((social) => (
            <a 
              key={social.platform}
              href={social.url}
              className="group p-4 bg-game-blue border-4 border-white hover:bg-white hover:border-game-blue transition-colors shadow-pixel hover:shadow-none hover:translate-y-1"
              aria-label={social.platform}
            >
              <div className="text-white group-hover:text-game-blue">
                {social.icon}
              </div>
            </a>
          ))}
        </div>

        <div className="pt-20 font-retro text-lg text-gray-600 flex items-center justify-center gap-2">
           Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by Kartikey • React • Tailwind • Gemini
        </div>
      </div>
    </section>
  );
};

export default Contact;