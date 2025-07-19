// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
      exo: ['"Exo 2"', 'sans-serif'],
    },
      colors: {
        'neon-pink': '#ff4ecb',
        'neon-green': '#39ff14',
        'neon-cyan': '#00ffff',
        'dark-bg': '#111827', // comfy dark background
      },
      boxShadow: {
        'neon-pulse': '0 0 10px #39ff14, 0 0 20px #39ff14',
      },
      animation: {
        glow: 'glow 1.6s ease-in-out infinite alternate',
        pulseSlow: 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 4px #ff4ecb, 0 0 8px #ff4ecb' },
          '100%': { textShadow: '0 0 12px #ff4ecb, 0 0 24px #ff4ecb' },
        },
      },
    },
  },
  plugins: [],
};
