/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040d1a',
          900: '#071A33', // Primary background
          850: '#0A203E',
          800: '#0D2847', // Secondary background
          750: '#0F2C4F',
          700: '#102F52', // Card background
          650: '#133863', // Border / elevated card
          600: '#1B477A',
        },
        vajra: {
          gold: '#F4B400', // Vajra saffron gold
          amber: '#D97706',
          light: '#FDE68A',
        },
        cyber: {
          blue: '#1E88E5',
          cyan: '#00D2FF',
          teal: '#0D9488',
        },
        status: {
          success: '#16A34A',
          warning: '#F97316',
          danger: '#DC2626',
          info: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cyber-blue': '0 0 25px -5px rgba(30, 136, 229, 0.3)',
        'cyber-gold': '0 0 25px -5px rgba(244, 180, 0, 0.3)',
        'cyber-green': '0 0 25px -5px rgba(22, 163, 74, 0.3)',
        'cyber-red': '0 0 25px -5px rgba(220, 38, 38, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
