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
        mc: {
          grass: '#5CB85C',
          'grass-dark': '#3d7a3d',
          dirt: '#8B5A2B',
          stone: '#7B7B7B',
          'stone-dark': '#555555',
          diamond: '#5FB3F9',
          'diamond-dark': '#3d8ec7',
          gold: '#F0B22B',
          'gold-dark': '#c48f1a',
          redstone: '#E74C3C',
          'redstone-dark': '#b03a2e',
          night: '#07070f',
          'night-mid': '#0e0e1e',
          'night-light': '#16162e',
          'ui-dark': '#1c1c2e',
          'ui-mid': '#262638',
          'ui-light': '#303048',
          nether: '#7B2FBE',
          'nether-light': '#9d4fe0',
          creeper: '#61CC3C',
          'text-bright': '#FFFFFF',
          'text-dim': '#9999BB',
          'text-gold': '#FFCC00',
        },
      },
      fontFamily: {
        pixel: ['var(--font-pixel)', 'monospace'],
        vt: ['var(--font-vt)', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'star-twinkle': 'starTwinkle 2s ease-in-out infinite',
        'number-pop': 'numberPop 0.25s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'portal-pulse': 'portalPulse 3s ease-in-out infinite',
        'xp-fill': 'xpFill 1.5s ease-out forwards',
        'achievement-slide': 'achievementSlide 0.4s ease-out',
        'plane-fly': 'planeFly 6s ease-in-out infinite',
        'message-fade': 'messageFade 0.5s ease-in-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': {
            textShadow: '0 0 8px rgba(95, 179, 249, 0.4), 0 0 16px rgba(95, 179, 249, 0.2)',
          },
          '50%': {
            textShadow: '0 0 16px rgba(95, 179, 249, 0.9), 0 0 32px rgba(95, 179, 249, 0.5), 0 0 48px rgba(95, 179, 249, 0.2)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        starTwinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.1', transform: 'scale(0.5)' },
        },
        numberPop: {
          '0%': { transform: 'scale(1.4)', color: '#FFCC00' },
          '100%': { transform: 'scale(1)', color: 'inherit' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        portalPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(123, 47, 190, 0.5), inset 0 0 20px rgba(123, 47, 190, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(123, 47, 190, 0.9), inset 0 0 40px rgba(123, 47, 190, 0.4)',
          },
        },
        xpFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--xp-width)' },
        },
        achievementSlide: {
          '0%': { opacity: '0', transform: 'translateX(120%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        planeFly: {
          '0%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(-10px)' },
        },
        messageFade: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'mc-block': 'inset -3px -3px 0px #1a1a2a, inset 3px 3px 0px rgba(255,255,255,0.15)',
        'mc-inset': 'inset 3px 3px 0px #1a1a2a, inset -3px -3px 0px rgba(255,255,255,0.1)',
        'mc-glow-blue': '0 0 20px rgba(95, 179, 249, 0.5), 0 0 40px rgba(95, 179, 249, 0.2)',
        'mc-glow-green': '0 0 20px rgba(92, 184, 92, 0.5), 0 0 40px rgba(92, 184, 92, 0.2)',
        'mc-glow-gold': '0 0 20px rgba(240, 178, 43, 0.5), 0 0 40px rgba(240, 178, 43, 0.2)',
        'mc-glow-red': '0 0 20px rgba(231, 76, 60, 0.5), 0 0 40px rgba(231, 76, 60, 0.2)',
        'mc-glow-nether': '0 0 30px rgba(123, 47, 190, 0.6), 0 0 60px rgba(123, 47, 190, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
