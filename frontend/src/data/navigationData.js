/**
 * ============================================================================
 * SK PRECAST INDUSTRIES - NAVIGATION & TRANSLATION DATA
 * ============================================================================
 */

export const productUrlMap = {
  "Cement Boundary Wall": "/cement-boundary-wall.htm",
  "Concrete Boundary Wall": "/concrete-boundary-wall.htm",
  "Concrete Folding Compound Wall": "/concrete-folding-compound-wall.htm",
  "Concrete Precast Single Panel Wall": "/concrete-precast-single-panel-wall.htm",
  "Concrete Prestressed Boundary Walls": "/concrete-prestressed-boundary-walls.htm",
  "Factory Boundary Wall": "/factory-boundary-wall.htm",
  "Farm House Boundary Wall": "/farm-house-boundary-wal.htm",
  "Farm House Boundary Wal": "/farm-house-boundary-wal.htm",
  "Heavy Readymade Boundary Wall": "/heavy-readymade-boundary-wall.htm",
  "Industrial Boundary Wall": "/industrial-boundary-wall.htm",
  "Industrial Compound Wall": "/industrial-compound-wall.htm",
  "Panel Build RCC Compound Wall": "/compound-wall.htm",
  "Panel Build RCC Precast Compound Wall": "/compound-wall.htm",
  "Pre Fabricated Cement Wall": "/pre-fabricated-cement-wall.htm",
  "Precast Boundary Wall": "/precast-boundary-wall.htm",
  "Precast Compound Walls": "/compound-wall.htm",
  "Precast Concrete Wall": "/precast-concerete-wall.htm",
  "Precast Heavy Duty Boundary Wall": "/boundary-wall.htm",
  "Precast Heavy Duty Compound Wall": "/compound-wall.htm",
  "Precast Wall": "/precast-wall.htm",
  "Precast Wall Panels": "/precast-wall-panels.htm",
  "Prefab RCC Readymade Precast Compound Wall": "/compound-wall.htm",
  "RCC Boundary Wall": "/rcc-boundary-wall.htm",
  "RCC Cement Wall": "/rcc-cement-wall.htm",
  "RCC Compound Wall": "/compound-wall.htm",
  "RCC Folding Compound Wall": "/compound-wall.htm",
  "RCC Folding Wall": "/rcc-folding-wall.htm",
  "RCC Industrial One Piece Compound Wall": "/compound-wall.htm",
  "RCC Precast Columns": "/rcc-precast-columns.htm",
  "RCC Readymade Compound Wall": "/compound-wall.htm",
  "RCC Wall": "/rcc-wall.htm",
  "Readymade Boundary Wall": "/readymade-boundary-wall.htm",
  "Readymade Compound Wall": "/compound-wall.htm",
  "Readymade Walls": "/readymade-walls.htm",
  "Single Mould RCC Precast Compound Wall": "/compound-wall.htm",
  "Solar Plant Boundary Wall": "/solar-plant-boundary-wall.htm"
};

export const getProductUrl = (productName) => {
  return productUrlMap[productName] || `/products.htm`;
};

export const headerNavLinks = [
  { name: 'Home', path: '/', key: 'home' },
  { name: 'About Us', path: '/about-us', key: 'about' },
  { name: 'Products', path: '/products', key: 'products', hasDropdown: true },
  { name: 'Catalogues', path: '/catalogues.htm', key: 'catalogues' },
  { name: 'Blog', path: '/blog', key: 'blog' },
  { name: 'Contact Us', path: '/contact-us.htm', key: 'contact' }
];

export const allLanguages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
  { code: 'mr', name: 'Marathi (मराठी)' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' },
  { code: 'bn', name: 'Bengali (বাংলা)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
  { code: 'ml', name: 'Malayalam (മലയാളം)' },
  { code: 'ur', name: 'Urdu (اردو)' },
  { code: 'ar', name: 'Arabic (العربية)' },
  { code: 'fr', name: 'French (Français)' },
  { code: 'de', name: 'German (Deutsch)' },
  { code: 'es', name: 'Spanish (Español)' },
  { code: 'pt', name: 'Portuguese (Português)' },
  { code: 'ru', name: 'Russian (Русский)' },
  { code: 'zh', name: 'Chinese (中文)' },
  { code: 'ja', name: 'Japanese (日本語)' },
  { code: 'ko', name: 'Korean (한국어)' },
  { code: 'it', name: 'Italian (Italiano)' },
  { code: 'nl', name: 'Dutch (Nederlands)' },
  { code: 'tr', name: 'Turkish (Türkçe)' },
  { code: 'vi', name: 'Vietnamese (Tiếng Việt)' },
  { code: 'th', name: 'Thai (ไทย)' },
  { code: 'id', name: 'Indonesian (Bahasa Indonesia)' },
  { code: 'ms', name: 'Malay (Bahasa Melayu)' },
  { code: 'fa', name: 'Persian (فارسی)' },
  { code: 'pl', name: 'Polish (Polski)' },
  { code: 'uk', name: 'Ukrainian (Українська)' },
  { code: 'el', name: 'Greek (Ελληνικά)' },
  { code: 'sv', name: 'Swedish (Svenska)' },
  { code: 'da', name: 'Danish (Dansk)' },
  { code: 'fi', name: 'Finnish (Suomi)' },
  { code: 'no', name: 'Norwegian (Norsk)' },
  { code: 'cs', name: 'Czech (Čeština)' },
  { code: 'ro', name: 'Romanian (Română)' },
  { code: 'hu', name: 'Hungarian (Magyar)' },
  { code: 'he', name: 'Hebrew (עברית)' },
  { code: 'fil', name: 'Filipino (Tagalog)' }
];
