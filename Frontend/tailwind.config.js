/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        exo: ['"Exo 2"', 'sans-serif'],
      },
      // tailwind.config.js

      // animation: {

      //   'spin-slow': 'spin 60s linear infinite',
      //   'pulse-slow': 'pulse 6s ease-in-out infinite',

      // },
      backgroundImage: {
        'radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },

      colors: {
        // Shared neon colors
        'neon-pink': '#ff4ecb',
        'neon-green': '#39ff14',
        'neon-cyan': '#00ffff',

        // Dark mode backgrounds
        'dark-bg': '#111827',

        // Light mode custom additions
        'light-bg': '#f3f4f6',
        'light-card': '#ffffff',
        'light-border': '#d1d5db',
        'light-text': '#1f2937',
      },
      boxShadow: {
        'neon-pulse': '0 0 10px #39ff14, 0 0 20px #39ff14',
        'light-soft': '0 2px 10px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        glow: 'glow 1.6s ease-in-out infinite alternate',
        pulseSlow: 'pulse 3s ease-in-out infinite',
        pulse: 'pulse 6s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'spin-slow-reverse': 'spin-reverse 45s linear infinite',
        slowPan: 'slowPan 120s linear infinite',
        lightningPulse: 'lightningPulse 5s ease-in-out infinite',

      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 4px #ff4ecb, 0 0 8px #ff4ecb' },
          '100%': { textShadow: '0 0 12px #ff4ecb, 0 0 24px #ff4ecb' },
        },
        shimmer: {
          '0%': { opacity: 0.2 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 0.2 },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        slowPan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
        lightningPulse: {
          '0%, 97%, 100%': { opacity: 0 },
          '98%': { opacity: 0.5 },
          '99%': { opacity: 0 },
        },

      },

    },
  },
  plugins: [],
};
