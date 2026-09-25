import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: '#F5F7F9',
        charcoal: '#111827',
        'text-secondary': '#5B6472',
        border: '#E5E7EB',
        teal: {
          DEFAULT: '#0B8A8C',
          text: '#096B6D',
          tint: '#E6F6F2',
        },
        yellow: {
          DEFAULT: '#FFC247',
          dark: '#F2AE1F',
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        sans: ['"Poppins"', 'sans-serif'],
        serif: ['"Poppins"', 'sans-serif'],
        mono: ['"Montserrat"', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
} satisfies Config
