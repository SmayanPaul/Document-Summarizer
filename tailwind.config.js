/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        workstation: {
          bg: '#080808',
          panel: '#0f0f0f',
          border: '#202020',
          text: '#f5f5f5',
          muted: '#7a7a7a',
        },
        accent: {
          DEFAULT: '#ff6b2c',
          hover: '#ff7d47',
        },
      },
    },
  },
  plugins: [],
};
