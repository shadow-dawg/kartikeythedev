/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'retro': ['"VT323"', 'monospace'],
      },
      colors: {
        'game-sky': '#5c94fc',     // Classic SMB sky
        'game-ground': '#c84c0c',  // Ground brick
        'game-pipe': '#00a800',    // Pipe green
        'game-brick': '#b73229',   // Brick red
        'game-coin': '#f8b800',    // Coin gold
        'game-dark': '#111111',
        'game-blue': '#0000bc',    // Darker blue
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0,0,0,1)',
        'pixel-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    }
  },
  plugins: [],
}