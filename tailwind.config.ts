import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50:  '#fdf4f1',
          100: '#fbe6df',
          200: '#f7cebe',
          300: '#f0ac95',
          400: '#e5836a',
          500: '#C86A4A',
          600: '#b55a3a',
          700: '#964830',
          800: '#7c3d2d',
          900: '#67352b',
        },
        ochre: {
          50:  '#fdf9ef',
          100: '#faf0d3',
          200: '#f5dfa3',
          300: '#efc76a',
          400: '#e8ad3f',
          500: '#D4944A',
          600: '#c07c30',
          700: '#9f622a',
          800: '#834f29',
          900: '#6c4326',
        },
        navy: {
          50:  '#f0f3f9',
          100: '#dce4f0',
          200: '#bfcde3',
          300: '#94aed0',
          400: '#638ab8',
          500: '#4870a2',
          600: '#385888',
          700: '#2e476f',
          800: '#283d5c',
          900: '#1E2D4A',
          950: '#141d30',
        },
        cream: {
          50:  '#FFFCF9',
          100: '#FAF7F2',
          200: '#F5EEE3',
          300: '#EDE2CF',
          400: '#DFD0B7',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'correct-glow': 'correctGlow 0.6s ease-out forwards',
        'wrong-shake': 'wrongShake 0.4s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'phase-in': 'phaseIn 0.4s ease-out forwards',
      },
      keyframes: {
        correctGlow: {
          '0%': { boxShadow: '0 0 0 0 rgba(74, 163, 102, 0.4)', backgroundColor: 'transparent' },
          '50%': { boxShadow: '0 0 0 8px rgba(74, 163, 102, 0)', backgroundColor: 'rgba(74, 163, 102, 0.08)' },
          '100%': { boxShadow: '0 0 0 0 rgba(74, 163, 102, 0)', backgroundColor: 'transparent' },
        },
        wrongShake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        phaseIn: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
