/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        cosmos: {
          void: '#00000F',
          deep: '#020817',
          nebula: '#0a0a2e',
          pulse: '#1a0a3e',
        },
        star: {
          white: '#F8F4FF',
          gold: '#FFD700',
          blue: '#87CEEB',
          red: '#FF6B6B',
          cyan: '#00FFFF',
        },
        genre: {
          electronic: '#00F5FF',
          jazz: '#FFB347',
          classical: '#DDA0DD',
          rock: '#FF4500',
          ambient: '#7DF9FF',
          hiphop: '#FF69B4',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px #00F5FF, 0 0 20px #00F5FF' },
          '100%': { textShadow: '0 0 20px #00F5FF, 0 0 40px #00F5FF, 0 0 60px #00F5FF' },
        }
      }
    },
  },
  plugins: [],
};
