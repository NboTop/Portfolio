/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brutal-bg': 'rgb(var(--color-bg) / <alpha-value>)',
        'brutal-card': 'rgb(var(--color-card) / <alpha-value>)',
        'brutal-text': 'rgb(var(--color-text) / <alpha-value>)',
        'brutal-gray': 'rgb(var(--color-gray) / <alpha-value>)',
        'accent': 'rgb(var(--color-accent) / <alpha-value>)',
        'void': '#000000',
        'cream': '#E6E3D8',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Archivo Black"', 'sans-serif'],
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'soft-hover': 'var(--shadow-hover)',
        'glow': 'var(--shadow-glow)',
      },
      animation: {
        'marquee': 'marquee 60s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
