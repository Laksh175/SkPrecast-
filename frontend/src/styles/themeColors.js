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
    light: '#fffbeb',        // Light pill badge backgrounds (Amber-50)
    softYellow: '#fef3c7',   // Icon circle soft background (Amber-100)
    iconGloss: '#f3f0ed',    // 3D icon gradient bottom highlight
  },

  // 2. Dark Navy & Slate Theme Colors (Hero Banners, Lightbox, Footer)
  dark: {
    heroNavy: '#0b1220',     // Top hero banner & footer dark navy background
    heroNavyMid: '#111c33',  // Hero ambient gradient middle tone
    midnight: '#020617',     // Lightbox modal background (Slate-950)
    footerBg: '#0b1220',     // Footer background (Original Deep Navy)
    cardDark: '#1e293b',     // Secondary dark controls & cards (Slate-800)
  },

  // 3. Surface & Light Background Colors
  surface: {
    pageBg: '#f8fafc',       // Main website page background (Slate-50)
    cardBg: '#ffffff',       // Product & content cards background (Pure White)
    lightGray: '#f1f5f9',    // Table alternate rows & inputs (Slate-100)
  },

  // 4. Typography / Font Colors (Headings, Body Text, Muted Text)
  text: {
    heading: '#0f172a',      // Main Page Titles, H1, H2 headings (Slate-900)
    subheading: '#1e293b',   // Card titles, bold text (Slate-800)
    body: '#334155',         // Paragraph text, specifications (Slate-700)
    muted: '#64748b',        // Subtitles, dates, captions (Slate-500)
    caption: '#94a3b8',      // Small uppercase labels e.g. "ADDRESS" (Slate-400)
    light: '#ffffff',        // White text on dark hero & footer backgrounds
    lightMuted: '#cbd5e1',   // Subtitle text on dark hero & footer (Slate-300)
  },

  // 5. Border & Divider Colors
  border: {
    card: '#e2e8f0',         // Card borders, product box outlines (Slate-200)
    subtle: '#f1f5f9',       // Subtle line dividers inside cards (Slate-100)
    goldGlow: 'rgba(245, 158, 11, 0.2)', // Amber glowing border on dark backgrounds
    goldRing: 'rgba(252, 211, 77, 0.5)', // Ring border for 3D icons (Amber-300/50)
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
