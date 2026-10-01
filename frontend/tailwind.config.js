import { themeColors } from './src/styles/themeColors.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Central Theme Tokens mapped from src/styles/themeColors.js
        theme: {
          amber: 'var(--color-primary-amber, #f59e0b)',
          gold: 'var(--color-primary-gold, #fbbf24)',
          yellow: 'var(--color-primary-brand-yellow, #dfb722)',
          darkAmber: 'var(--color-primary-dark-amber, #d97706)',
          deepAmber: 'var(--color-primary-deep-amber, #b45309)',
          lightAmber: 'var(--color-primary-light, #fffbeb)',
          softYellow: 'var(--color-primary-soft-yellow, #fef3c7)',
          iconGloss: 'var(--color-primary-icon-gloss, #f3f0ed)',
          
          heroNavy: 'var(--color-dark-hero-navy, #0b1220)',
          heroNavyMid: 'var(--color-dark-hero-navy-mid, #111c33)',
          midnight: 'var(--color-dark-midnight, #020617)',
          footerBg: 'var(--color-dark-footer-bg, #0f172a)',
          cardDark: 'var(--color-dark-card-dark, #1e293b)',
          
          pageBg: 'var(--color-surface-page-bg, #f8fafc)',
          cardBg: 'var(--color-surface-card-bg, #ffffff)',
          lightGray: 'var(--color-surface-light-gray, #f1f5f9)',
          
          heading: 'var(--color-text-heading, #0f172a)',
          subheading: 'var(--color-text-subheading, #1e293b)',
          body: 'var(--color-text-body, #334155)',
          muted: 'var(--color-text-muted, #64748b)',
          caption: 'var(--color-text-caption, #94a3b8)',
          light: 'var(--color-text-light, #ffffff)',
          lightMuted: 'var(--color-text-light-muted, #cbd5e1)',
          
          cardBorder: 'var(--color-border-card, #e2e8f0)',
          subtleBorder: 'var(--color-border-subtle, #f1f5f9)',
          
          whatsapp: 'var(--color-utility-whatsapp, #16a34a)',
          whatsappLight: 'var(--color-utility-whatsapp-light, #25D366)',
          whatsappMid: 'var(--color-utility-whatsapp-mid, #1ea952)',
          whatsappDark: 'var(--color-utility-whatsapp-dark, #128c7e)',
          danger: 'var(--color-utility-danger, #ef4444)',
          facebook: 'var(--color-utility-facebook, #1877F2)',
        },
        brand: {
          gold: '#d49b00',
          yellow: '#e5a912',
          amber: '#d97706',
          accent: '#f59e0b',
          light: '#fffbeb',
          border: '#fde68a',
        },
        dark: {
          DEFAULT: '#212121',
          bg: '#191919',
          card: '#1e2638',
          border: '#333333',
        }
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
