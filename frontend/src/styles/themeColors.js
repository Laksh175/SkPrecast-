/**
 * =========================================================================
 * SK PRECAST INDUSTRIES - CENTRAL COLOR THEME CONFIGURATION
 * =========================================================================
 * All website colors are centrally defined in this single file.
 * To change any color across the whole website, simply edit the values below!
 * =========================================================================
 */

export const themeColors = {
  // 1. Primary Gold / Amber Accent Colors (Buttons, Highlights, Badges, Icons)
  primary: {
    amber: '#f59e0b',        // Primary CTA buttons, golden dots, icons (Amber-500)
    gold: '#fbbf24',         // Bright gold gradient start & hover glows (Amber-400)
    brandYellow: '#dfb722',  // Brand button yellow & classic accents
    darkAmber: '#d97706',    // Active text link hover & dark amber (Amber-600)
    deepAmber: '#b45309',    // Deep amber text (Amber-700)
    light: 'rgba(245, 158, 11, 0.15)', // Dark badge translucent background
    softYellow: 'rgba(251, 191, 36, 0.2)', // Icon circle translucent background
    iconGloss: '#1e293b',    // Icon gradient bottom highlight
  },

  // 2. Dark Navy & Slate Theme Colors (Hero Banners, Lightbox, Footer)
  dark: {
    heroNavy: '#090e1a',     // Top hero banner & main background
    heroNavyMid: '#0f172a',  // Hero ambient gradient middle tone
    midnight: '#030712',     // Deepest midnight modal background
    footerBg: '#070b14',     // Footer background (Ultra Deep Navy)
    cardDark: '#111927',     // Dark elevated cards (Slate-900)
    surfaceLight: '#162238', // Elevated dark interactive surface
  },

  // 3. Surface Background Colors (Dark Palette)
  surface: {
    pageBg: '#090e1a',       // Main website page background (Deep Slate Navy)
    cardBg: '#111927',       // Product & content cards background (Elevated Dark Slate)
    lightGray: '#162238',    // Table alternate rows & inputs background
    cardHover: '#17233d',   // Card hover elevated tone
  },

  // 4. Typography / Font Colors (High Legibility Dark Mode)
  text: {
    heading: '#f8fafc',      // Main Page Titles, H1, H2 headings (Slate-50)
    subheading: '#f1f5f9',   // Card titles, bold text (Slate-100)
    body: '#cbd5e1',         // Paragraph text, specifications (Slate-300)
    muted: '#94a3b8',        // Subtitles, dates, captions (Slate-400)
    caption: '#64748b',      // Small uppercase labels (Slate-500)
    light: '#ffffff',        // Pure white highlights
    lightMuted: '#94a3b8',   // Subtitle text (Slate-400)
  },

  // 5. Border & Divider Colors (Dark Theme Borders)
  border: {
    card: '#1e293b',         // Card borders, product box outlines (Slate-800)
    subtle: '#1e293b',       // Subtle line dividers inside cards
    active: '#334155',       // Active/hover border (Slate-700)
    goldGlow: 'rgba(245, 158, 11, 0.35)', // Amber glowing border on dark backgrounds
    goldRing: 'rgba(252, 211, 77, 0.4)', // Ring border for 3D icons
  },

  // 6. Action & Utility Colors
  utility: {
    whatsapp: '#16a34a',     // WhatsApp button green (Emerald-600)
    whatsappLight: '#25D366',// Floating WhatsApp icon green (WhatsApp Green)
    whatsappMid: '#1ea952',  // Floating WhatsApp gradient mid tone
    whatsappDark: '#128c7e', // Floating WhatsApp gradient dark tone
    danger: '#ef4444',       // Close / red alert (Red-500)
    facebook: '#1877F2',     // Facebook brand blue
  }
};

/**
 * Automatically applies theme colors as CSS custom variables to document :root
 */
export function applyTheme(colors = themeColors) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  function setCssVariables(obj, prefix = '--color') {
    for (const [key, val] of Object.entries(obj)) {
      const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        setCssVariables(val, `${prefix}-${kebabKey}`);
      } else {
        root.style.setProperty(`${prefix}-${kebabKey}`, val);
      }
    }
  }

  setCssVariables(colors);
}

// Auto-execute in browser environment immediately
if (typeof window !== 'undefined') {
  applyTheme();
}

export default themeColors;
