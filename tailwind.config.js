/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // brutalist main palette
        'brutal-bg': '#0a0a0a',
        'brutal-card': '#1a1a1a',
        'brutal-text': '#f7f7f7',
        'brutal-gray': '#a0a0a0',
        'magenta': '#FF00FF',
        'magenta-dim': 'rgba(255, 0, 255, 0.1)',
        // contact page palette
        'void': '#000000',
        'cream': '#E6E3D8',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Archivo Black"', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '6px 6px 0px #FF00FF',
        'brutal-hover': '10px 10px 0px #FF00FF',
        'brutal-sm': '3px 3px 0px #FF00FF',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    }
  },
  plugins: [],
}
