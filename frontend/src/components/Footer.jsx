import React, { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaLocationDot, FaRss, FaChevronUp, FaChevronDown } from 'react-icons/fa6';
import { GB, FR, DE, IN } from 'country-flag-icons/react/3x2';
import { navigateTo } from '../utils/navigation';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [isGeneralLinksOpen, setIsGeneralLinksOpen] = useState(true);
  const [isProductsOpen, setIsProductsOpen] = useState(true);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detect active language from Google Translate cookie on mount
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };
    
    const googTrans = getCookie('googtrans');
    if (googTrans) {
      const lang = googTrans.split('/').filter(Boolean).pop();
      if (lang) setSelectedLang(lang);
    }
  }, []);

  // Handle live translation when a language is selected
  const handleLanguageChange = (langCode) => {
    setSelectedLang(langCode);

    // 1. Set Google Translate cookie for current host & domain
    const host = window.location.hostname;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    if (host !== 'localhost' && !host.match(/^\d+\.\d+\.\d+\.\d+$/)) {
      document.cookie = `googtrans=/en/${langCode}; domain=.${host}; path=/;`;
    }

    // 2. Trigger Google Translate dropdown change
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
    } else {
      // If combo not ready, trigger a reload so the cookie translates the page
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Comprehensive list of all world & Indian languages
  const allLanguages = [
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

  return (
    <footer className="relative mt-auto bg-theme-heroNavy text-slate-300 font-sans border-t border-amber-500/30 overflow-hidden shadow-2xl">
      {/* Architectural Dot Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.22] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Ambient Gradient Glows (Stylish Multi-tone Lighting) */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 right-10 w-96 h-96 bg-blue-600/12 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-600/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Top Gold Gradient Glow Bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent relative z-10 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />

      <div className="max-w-[1260px] mx-auto px-5 sm:px-6 pt-10 sm:pt-14 pb-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. DESKTOP LAYOUT (lg: and above - 1024px+) */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-[1.1fr_2fr_1fr_1.1fr] lg:gap-8 xl:gap-12 items-start">
          
          {/* Col 1: Brand Info */}
          <div className="w-full flex flex-col gap-3.5 items-start text-left">
            <a href="/" onClick={(e) => navigateTo('/', e)} className="inline-block">
              <img 
                src="/assets/images/sk-logo.png" 
                alt="SK Precast Industries" 
                className="h-16 w-auto object-contain block drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              />
            </a>
            <p className="text-[0.865rem] leading-relaxed text-slate-300/90 max-w-[280px]">
              India's Trusted Precast Concrete Wall Manufacturer & Infrastructure Supplier.
            </p>
            
            {/* Social Media Rounded Buttons */}
            <div className="flex items-center justify-start gap-3 mt-1">
              <span className="text-[0.845rem] font-bold text-slate-200">Follow Us :</span>
              
              {/* Facebook Button */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 inline-flex items-center justify-center hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 cursor-pointer drop-shadow-md shrink-0" 
                title="Facebook"
              >
                <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
                  <circle cx="18" cy="18" r="18" fill="#1877F2"/>
                  <path d="M24.5 18h-4.3v13.5h-5.6V18h-2.7v-4.7h2.7v-3.1c0-2.2 1-5.7 5.7-5.7l4.2.02v4.6h-3c-.5 0-1.2.25-1.2 1.3v2.9h4.3l-.4 4.7z" fill="#FFFFFF"/>
                </svg>
              </a>

              {/* Instagram Button */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 inline-flex items-center justify-center hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 cursor-pointer drop-shadow-md shrink-0" 
                title="Instagram"
              >
                <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
                  <defs>
                    <linearGradient id="ig-grad-footer-desktop" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f09433"/>
                      <stop offset="25%" stopColor="#e6683c"/>
                      <stop offset="50%" stopColor="#dc2743"/>
                      <stop offset="75%" stopColor="#cc2366"/>
                      <stop offset="100%" stopColor="#bc1888"/>
                    </linearGradient>
                  </defs>
                  <rect width="32" height="32" rx="9" fill="url(#ig-grad-footer-desktop)"/>
                  <circle cx="16" cy="16" r="4.3" stroke="#FFFFFF" strokeWidth="2.1"/>
                  <circle cx="22.5" cy="9.5" r="1.2" fill="#FFFFFF"/>
                  <rect x="6.5" y="6.5" width="19" height="19" rx="5" stroke="#FFFFFF" strokeWidth="2.1"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: General Links */}
          <div className="w-full flex flex-col pl-4 xl:pl-8">
            <h4 className="text-[0.95rem] font-bold text-white mb-4 tracking-wide relative inline-flex items-center">
              <span>General Links</span>
              <span className="ml-2 w-8 h-[2px] bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
            </h4>

            <div className="grid grid-cols-2 gap-6 xl:gap-8">
              {/* Sub-column 1 */}
              <ul className="list-none flex flex-col gap-2.5">
                <li>
                  <a href="/blog" onClick={(e) => navigateTo('/blog', e)} className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer">
                    <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                    <span>Blog</span>
                  </a>
                </li>
                <li>
                  <a href="/about-us" onClick={(e) => navigateTo('/about-us', e)} className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                    <span>About Us</span>
                  </a>
                </li>
                <li>
                  <a href="/gallery.htm" onClick={(e) => navigateTo('/gallery.htm', e)} className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer">
                    <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                    <span>Gallery</span>
                  </a>
                </li>
                <li>
                  <a href="/wall-manufacturing-unit.htm" onClick={(e) => navigateTo('/wall-manufacturing-unit.htm', e)} className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group whitespace-nowrap cursor-pointer">
                    <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                    <span>Manufacturing Unit</span>
                  </a>
                </li>
                <li>
                  <a href="/sitemap.htm" onClick={(e) => navigateTo('/sitemap.htm', e)} className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer">
                    <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                    <span>Site Map</span>
                  </a>
                </li>
              </ul>

              {/* Sub-column 2 */}
              <ul className="list-none flex flex-col gap-2.5">
                <li>
                  <a href="/" onClick={(e) => navigateTo('/', e)} className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/products.htm" 
                    onClick={(e) => {
                      navigateTo('/products.htm', e);
                      window.history.pushState({}, '', '/products.htm');
                      window.dispatchEvent(new Event('app-navigate'));
                    }} 
                    className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                    <span>Products</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/catalogues.htm" 
                    onClick={(e) => navigateTo('/catalogues.htm', e)}
                    className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                    <span>Catalogues</span>
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                    <span>Testimonials</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact-us.htm" 
                    onClick={(e) => navigateTo('/contact-us.htm', e)} 
                    className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                    <span>Contact Us</span>
                  </a>
                </li>
                <li className="pt-0.5">
                  <a 
                    href="#rss" 
                    className="inline-flex items-center gap-1 bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white text-[0.7rem] font-bold px-2 py-0.5 rounded shadow-sm hover:scale-105 transition-all"
                    title="RSS Feed"
                  >
                    <FaRss size={10} /> RSS
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: Products */}
          <div className="w-full flex flex-col">
            <h4 className="text-[0.95rem] font-bold text-white mb-4 tracking-wide relative inline-flex items-center">
              <span>Products</span>
              <span className="ml-2 w-8 h-[2px] bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
            </h4>

            <ul className="list-none flex flex-col gap-2.5">
              <li>
                <a 
                  href="/compound-wall.htm" 
                  onClick={(e) => navigateTo('/compound-wall.htm', e)} 
                  className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                  <span>Compound Wall</span>
                </a>
              </li>
              <li>
                <a 
                  href="/boundary-wall.htm" 
                  onClick={(e) => navigateTo('/boundary-wall.htm', e)} 
                  className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                  <span>Boundary Wall</span>
                </a>
              </li>
              <li>
                <a 
                  href="/cement-wall.htm" 
                  onClick={(e) => navigateTo('/cement-wall.htm', e)} 
                  className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                  <span>Cement Wall</span>
                </a>
              </li>
              <li>
                <a 
                  href="/other-products.htm" 
                  onClick={(e) => navigateTo('/other-products.htm', e)} 
                  className="text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                  <span>Other Products</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Select Language */}
          <div className="w-full flex flex-col items-start text-left">
            <h4 className="text-[0.95rem] font-bold text-white mb-4 tracking-wide relative inline-flex items-center">
              <span>Select Language</span>
              <span className="ml-2 w-8 h-[2px] bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
            </h4>
            
            {/* Flags and Dropdown side by side */}
            <div className="flex items-center justify-start gap-2 sm:gap-2.5 flex-nowrap relative" ref={langDropdownRef}>
              {/* 4 Quick Flag Buttons */}
              <div className="flex items-center gap-1.5 bg-slate-800/90 p-1.5 rounded-lg border border-slate-700/60 shadow-inner shrink-0">
                <button 
                  type="button" 
                  className={`w-6 h-4 rounded-[3px] overflow-hidden cursor-pointer hover:scale-115 transition-all shadow-sm ${selectedLang === 'en' ? 'ring-2 ring-amber-400 scale-105 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'opacity-85 hover:opacity-100'}`}
                  onClick={() => handleLanguageChange('en')}
                  title="English"
                >
                  <GB className="w-full h-full object-cover" />
                </button>
                <button 
                  type="button" 
                  className={`w-6 h-4 rounded-[3px] overflow-hidden cursor-pointer hover:scale-115 transition-all shadow-sm ${selectedLang === 'fr' ? 'ring-2 ring-amber-400 scale-105 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'opacity-85 hover:opacity-100'}`}
                  onClick={() => handleLanguageChange('fr')}
                  title="French"
                >
                  <FR className="w-full h-full object-cover" />
                </button>
                <button 
                  type="button" 
                  className={`w-6 h-4 rounded-[3px] overflow-hidden cursor-pointer hover:scale-115 transition-all shadow-sm ${selectedLang === 'de' ? 'ring-2 ring-amber-400 scale-105 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'opacity-85 hover:opacity-100'}`}
                  onClick={() => handleLanguageChange('de')}
                  title="German"
                >
                  <DE className="w-full h-full object-cover" />
                </button>
                <button 
                  type="button" 
                  className={`w-6 h-4 rounded-[3px] overflow-hidden cursor-pointer hover:scale-115 transition-all shadow-sm ${selectedLang === 'hi' ? 'ring-2 ring-amber-400 scale-105 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'opacity-85 hover:opacity-100'}`}
                  onClick={() => handleLanguageChange('hi')}
                  title="Hindi"
                >
                  <IN className="w-full h-full object-cover" />
                </button>
              </div>

              {/* Custom Language Dropdown Menu */}
              <div className="relative min-w-[130px] max-w-[160px]">
                <button
                  type="button"
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="w-full bg-slate-900/95 text-slate-100 border border-slate-700 hover:border-amber-500/60 focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-xs font-semibold flex items-center justify-between shadow-lg transition-colors cursor-pointer gap-1"
                  aria-haspopup="listbox"
                  aria-expanded={isLangDropdownOpen}
                >
                  <span className="truncate text-[12.5px]">
                    {allLanguages.find(l => l.code === selectedLang)?.name || 'English'}
                  </span>
                  <FaChevronDown className={`w-3 h-3 text-amber-400 shrink-0 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu List (Opens Downwards on Desktop) */}
                {isLangDropdownOpen && (
                  <div className="absolute top-full mt-2 right-0 w-60 sm:w-64 bg-slate-900/98 backdrop-blur-md border border-slate-700 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.65),0_0_15px_rgba(245,158,11,0.2)] z-50 overflow-hidden">
                    <div className="max-h-56 sm:max-h-60 overflow-y-auto py-1.5 custom-scrollbar">
                      {allLanguages.map((lang) => {
                        const isSelected = selectedLang === lang.code;
                        return (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => {
                              handleLanguageChange(lang.code);
                              setIsLangDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-[13.5px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500/20 text-amber-300 font-semibold border-l-2 border-amber-400'
                                : 'text-slate-200 hover:bg-slate-800/90 hover:text-amber-400'
                            }`}
                          >
                            <span className="truncate">{lang.name}</span>
                            {isSelected && (
                              <span className="text-amber-400 text-xs ml-1.5 font-bold">✓</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Full-Width Glassy "Get in Touch" Ribbon */}
        <div className="hidden lg:flex mt-10 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-700/60 backdrop-blur-md flex-row justify-between items-center text-sm shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
          <div className="font-extrabold text-white text-xs tracking-wider uppercase flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
            Get In Touch
          </div>
          <div className="flex items-center justify-center flex-wrap gap-x-5 text-xs font-medium text-slate-300">
            <a href="tel:+918238902687" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <FaPhone size={12} className="text-amber-400 shrink-0" />
              <span>+91 8238902687</span>
            </a>
            <span className="text-slate-600">•</span>
            <a href="tel:+919896908099" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <FaPhone size={12} className="text-amber-400 shrink-0" />
              <span>+91 9896908099</span>
            </a>
            <span className="text-slate-600">•</span>
            <a href="mailto:info@skprecast-industries.com" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <FaEnvelope size={13} className="text-amber-400 shrink-0" />
              <span>info@skprecast-industries.com</span>
            </a>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <FaLocationDot size={13} className="text-amber-400 shrink-0" />
              <span>Palwal, Haryana</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MOBILE & TABLET LAYOUT (< lg: / under 1024px) */}
        {/* ========================================================================= */}
        <div className="lg:hidden flex flex-col gap-5 sm:gap-6">
          
          {/* Centered Brand Info */}
          <div className="w-full flex flex-col gap-3 sm:gap-3.5 items-center text-center">
            <a href="/" onClick={(e) => navigateTo('/', e)} className="inline-block">
              <img 
                src="/assets/images/sk-logo.png" 
                alt="SK Precast Industries" 
                className="h-14 sm:h-16 w-auto object-contain block drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mx-auto"
              />
            </a>
            <p className="text-[0.85rem] sm:text-[0.865rem] leading-relaxed text-slate-300/90 max-w-[340px] sm:max-w-[450px] mx-auto">
              India's Trusted Precast Concrete Wall Manufacturer & Infrastructure Supplier.
            </p>
            
            {/* Social Media Rounded Buttons */}
            <div className="flex items-center justify-center gap-3 mt-1">
              <span className="text-[0.825rem] sm:text-[0.845rem] font-bold text-slate-200">Follow Us :</span>
              
              {/* Facebook Button */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-6.5 h-6.5 sm:w-7 sm:h-7 inline-flex items-center justify-center hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 cursor-pointer drop-shadow-md shrink-0" 
                title="Facebook"
              >
                <svg viewBox="0 0 36 36" className="w-6.5 h-6.5 sm:w-7 sm:h-7" fill="none">
                  <circle cx="18" cy="18" r="18" fill="#1877F2"/>
                  <path d="M24.5 18h-4.3v13.5h-5.6V18h-2.7v-4.7h2.7v-3.1c0-2.2 1-5.7 5.7-5.7l4.2.02v4.6h-3c-.5 0-1.2.25-1.2 1.3v2.9h4.3l-.4 4.7z" fill="#FFFFFF"/>
                </svg>
              </a>

              {/* Instagram Button */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-6.5 h-6.5 sm:w-7 sm:h-7 inline-flex items-center justify-center hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 cursor-pointer drop-shadow-md shrink-0" 
                title="Instagram"
              >
                <svg viewBox="0 0 32 32" className="w-6.5 h-6.5 sm:w-7 sm:h-7" fill="none">
                  <defs>
                    <linearGradient id="ig-grad-footer-mobile" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f09433"/>
                      <stop offset="25%" stopColor="#e6683c"/>
                      <stop offset="50%" stopColor="#dc2743"/>
                      <stop offset="75%" stopColor="#cc2366"/>
                      <stop offset="100%" stopColor="#bc1888"/>
                    </linearGradient>
                  </defs>
                  <rect width="32" height="32" rx="9" fill="url(#ig-grad-footer-mobile)"/>
                  <circle cx="16" cy="16" r="4.3" stroke="#FFFFFF" strokeWidth="2.1"/>
                  <circle cx="22.5" cy="9.5" r="1.2" fill="#FFFFFF"/>
                  <rect x="6.5" y="6.5" width="19" height="19" rx="5" stroke="#FFFFFF" strokeWidth="2.1"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Centered Accordions: General Links & Products */}
          <div className="w-full max-w-[340px] sm:max-w-[450px] mx-auto flex flex-col gap-4">
            
            {/* General Links Accordion */}
            <div className="w-full flex flex-col border-b border-slate-700/60 pb-2.5">
              <button
                type="button"
                onClick={() => setIsGeneralLinksOpen(!isGeneralLinksOpen)}
                className="w-full flex items-center justify-between text-left cursor-pointer py-1 group select-none"
              >
                <h4 className="text-[0.925rem] sm:text-[0.95rem] font-bold text-white tracking-wide relative inline-flex items-center">
                  <span>General Links</span>
                  <span className="ml-2 w-8 h-[2px] bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
                </h4>
                <span className="text-amber-400 p-1 group-hover:scale-110 transition-transform">
                  <FaChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isGeneralLinksOpen ? 'rotate-180' : ''}`} />
                </span>
              </button>

              <div className={`${isGeneralLinksOpen ? 'block' : 'hidden'} pt-2.5 pb-1 transition-all duration-300`}>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {/* Sub-column 1 */}
                  <ul className="list-none flex flex-col gap-2 sm:gap-2.5">
                    <li>
                      <a href="/blog" onClick={(e) => navigateTo('/blog', e)} className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer">
                        <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                        <span>Blog</span>
                      </a>
                    </li>
                    <li>
                      <a href="/about-us" onClick={(e) => navigateTo('/about-us', e)} className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                        <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                        <span>About Us</span>
                      </a>
                    </li>
                    <li>
                      <a href="/gallery.htm" onClick={(e) => navigateTo('/gallery.htm', e)} className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer">
                        <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                        <span>Gallery</span>
                      </a>
                    </li>
                    <li>
                      <a href="/wall-manufacturing-unit.htm" onClick={(e) => navigateTo('/wall-manufacturing-unit.htm', e)} className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group whitespace-nowrap cursor-pointer">
                        <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                        <span>Manufacturing Unit</span>
                      </a>
                    </li>
                    <li>
                      <a href="/sitemap.htm" onClick={(e) => navigateTo('/sitemap.htm', e)} className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer">
                        <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                        <span>Site Map</span>
                      </a>
                    </li>
                  </ul>

                  {/* Sub-column 2 */}
                  <ul className="list-none flex flex-col gap-2 sm:gap-2.5">
                    <li>
                      <a href="/" onClick={(e) => navigateTo('/', e)} className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                        <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                        <span>Home</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/products.htm" 
                        onClick={(e) => {
                          navigateTo('/products.htm', e);
                          window.history.pushState({}, '', '/products.htm');
                          window.dispatchEvent(new Event('app-navigate'));
                        }} 
                        className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                        <span>Products</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/catalogues.htm" 
                        onClick={(e) => navigateTo('/catalogues.htm', e)}
                        className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer"
                      >
                        <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                        <span>Catalogues</span>
                      </a>
                    </li>
                    <li>
                      <a href="#testimonials" className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group">
                        <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                        <span>Testimonials</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/contact-us.htm" 
                        onClick={(e) => navigateTo('/contact-us.htm', e)} 
                        className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer"
                      >
                        <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                        <span>Contact Us</span>
                      </a>
                    </li>
                    <li className="pt-0.5">
                      <a 
                        href="#rss" 
                        className="inline-flex items-center gap-1 bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white text-[0.7rem] font-bold px-2 py-0.5 rounded shadow-sm hover:scale-105 transition-all"
                        title="RSS Feed"
                      >
                        <FaRss size={10} /> RSS
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Products Accordion */}
            <div className="w-full flex flex-col border-b border-slate-700/60 pb-2.5">
              <button
                type="button"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="w-full flex items-center justify-between text-left cursor-pointer py-1 group select-none"
              >
                <h4 className="text-[0.925rem] sm:text-[0.95rem] font-bold text-white tracking-wide relative inline-flex items-center">
                  <span>Products</span>
                  <span className="ml-2 w-8 h-[2px] bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
                </h4>
                <span className="text-amber-400 p-1 group-hover:scale-110 transition-transform">
                  <FaChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                </span>
              </button>

              <div className={`${isProductsOpen ? 'block' : 'hidden'} pt-2.5 pb-1 transition-all duration-300`}>
                <ul className="list-none flex flex-col gap-2 sm:gap-2.5">
                  <li>
                    <a 
                      href="/compound-wall.htm" 
                      onClick={(e) => navigateTo('/compound-wall.htm', e)} 
                      className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                      <span>Compound Wall</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/boundary-wall.htm" 
                      onClick={(e) => navigateTo('/boundary-wall.htm', e)} 
                      className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                      <span>Boundary Wall</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/cement-wall.htm" 
                      onClick={(e) => navigateTo('/cement-wall.htm', e)} 
                      className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                      <span>Cement Wall</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/other-products.htm" 
                      onClick={(e) => navigateTo('/other-products.htm', e)} 
                      className="text-[0.825rem] sm:text-[0.835rem] text-slate-300 font-medium hover:text-amber-400 hover:translate-x-1 transition-all inline-flex items-center gap-1.5 group cursor-pointer"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-400/0 group-hover:bg-amber-400 transition-colors shrink-0" />
                      <span>Other Products</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom Section on Mobile & Tablet: Select Language (Center) & Get in Touch Below It */}
          <div className="mt-1 sm:mt-1.5 pt-1.5 sm:pt-2 flex flex-col items-center justify-center gap-3 sm:gap-3.5 w-full max-w-[1100px] mx-auto">
            {/* 1. Center: Select Language */}
            <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap shrink-0">
              <h4 className="text-[0.875rem] sm:text-[0.925rem] font-bold text-white tracking-wide relative inline-flex items-center gap-2 whitespace-nowrap">
                <span>Select Language :</span>
              </h4>
              
              {/* Flags and Dropdown side by side */}
              <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap relative">
                <div className="flex items-center gap-1.5 bg-slate-800/90 p-1.5 rounded-lg border border-slate-700/60 shadow-inner shrink-0">
                  <button 
                    type="button" 
                    className={`w-5.5 h-3.5 sm:w-6 sm:h-4 rounded-[2px] sm:rounded-[3px] overflow-hidden cursor-pointer hover:scale-115 transition-all shadow-sm ${selectedLang === 'en' ? 'ring-2 ring-amber-400 scale-105 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'opacity-85 hover:opacity-100'}`}
                    onClick={() => handleLanguageChange('en')}
                    title="English"
                  >
                    <GB className="w-full h-full object-cover" />
                  </button>
                  <button 
                    type="button" 
                    className={`w-5.5 h-3.5 sm:w-6 sm:h-4 rounded-[2px] sm:rounded-[3px] overflow-hidden cursor-pointer hover:scale-115 transition-all shadow-sm ${selectedLang === 'fr' ? 'ring-2 ring-amber-400 scale-105 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'opacity-85 hover:opacity-100'}`}
                    onClick={() => handleLanguageChange('fr')}
                    title="French"
                  >
                    <FR className="w-full h-full object-cover" />
                  </button>
                  <button 
                    type="button" 
                    className={`w-5.5 h-3.5 sm:w-6 sm:h-4 rounded-[2px] sm:rounded-[3px] overflow-hidden cursor-pointer hover:scale-115 transition-all shadow-sm ${selectedLang === 'de' ? 'ring-2 ring-amber-400 scale-105 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'opacity-85 hover:opacity-100'}`}
                    onClick={() => handleLanguageChange('de')}
                    title="German"
                  >
                    <DE className="w-full h-full object-cover" />
                  </button>
                  <button 
                    type="button" 
                    className={`w-5.5 h-3.5 sm:w-6 sm:h-4 rounded-[2px] sm:rounded-[3px] overflow-hidden cursor-pointer hover:scale-115 transition-all shadow-sm ${selectedLang === 'hi' ? 'ring-2 ring-amber-400 scale-105 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'opacity-85 hover:opacity-100'}`}
                    onClick={() => handleLanguageChange('hi')}
                    title="Hindi"
                  >
                    <IN className="w-full h-full object-cover" />
                  </button>
                </div>

                {/* Custom Language Dropdown Menu */}
                <div className="relative min-w-[125px] sm:min-w-[135px] max-w-[155px] sm:max-w-[170px]">
                  <button
                    type="button"
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="w-full bg-slate-900/95 text-slate-100 border border-slate-700 hover:border-amber-500/60 focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-xs font-semibold flex items-center justify-between shadow-lg transition-colors cursor-pointer gap-1"
                    aria-haspopup="listbox"
                    aria-expanded={isLangDropdownOpen}
                  >
                    <span className="truncate text-[12.5px]">
                      {allLanguages.find(l => l.code === selectedLang)?.name || 'English'}
                    </span>
                    <FaChevronDown className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu List */}
                  {isLangDropdownOpen && (
                    <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 w-60 sm:w-64 bg-slate-900/98 backdrop-blur-md border border-slate-700 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.65),0_0_15px_rgba(245,158,11,0.2)] z-50 overflow-hidden">
                      <div className="max-h-60 overflow-y-auto py-1.5 custom-scrollbar">
                        {allLanguages.map((lang) => {
                          const isSelected = selectedLang === lang.code;
                          return (
                            <button
                              key={lang.code}
                              type="button"
                              onClick={() => {
                                handleLanguageChange(lang.code);
                                setIsLangDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3.5 py-2 text-[13.5px] sm:text-[14px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-500/20 text-amber-300 font-semibold border-l-2 border-amber-400'
                                  : 'text-slate-200 hover:bg-slate-800/90 hover:text-amber-400'
                              }`}
                            >
                              <span className="truncate">{lang.name}</span>
                              {isSelected && (
                                <span className="text-amber-400 text-xs ml-1.5 font-bold">✓</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Below: Get In Touch Ribbon centered */}
            <div className="py-2.5 px-4 sm:px-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-700/60 backdrop-blur-md flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-slate-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              <div className="font-extrabold text-white text-xs tracking-wider uppercase flex items-center gap-2 shrink-0">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
                Get In Touch
              </div>
              <a href="tel:+918238902687" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <FaPhone size={12} className="text-amber-400 shrink-0" />
                <span>+91 8238902687</span>
              </a>
              <span className="hidden sm:inline text-slate-600">•</span>
              <a href="tel:+919896908099" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <FaPhone size={12} className="text-amber-400 shrink-0" />
                <span>+91 9896908099</span>
              </a>
              <span className="hidden sm:inline text-slate-600">•</span>
              <a href="mailto:info@skprecast-industries.com" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <FaEnvelope size={13} className="text-amber-400 shrink-0" />
                <span>info@skprecast-industries.com</span>
              </a>
              <span className="hidden sm:inline text-slate-600">•</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <FaLocationDot size={13} className="text-amber-400 shrink-0" />
                <span>Palwal, Haryana</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. COPYRIGHT (All screen sizes) */}
        {/* ========================================================================= */}
        <div className="mt-6 sm:mt-7 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            © {new Date().getFullYear()} <strong className="text-slate-200 font-semibold">SK Precast Industries</strong>. All Rights Reserved. Developed & Managed By <a href="https://kurminfotech.in/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">Kurm Infotech</a>
          </p>
        </div>
      </div>

      {/* Unique Floating Actions: WhatsApp & Scroll To Top (Compact & Sleek) */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col items-end gap-2.5 sm:gap-3 z-50">
        {/* Pure 3D Circular WhatsApp Button with 3D Waving Hand Peek-a-boo Animation */}
        <div className="relative flex items-center justify-center">
          
          {/* 3D Waving Hand Emoji peeking from behind the circle */}
          <div className="absolute -top-1.5 -left-1.5 lg:-top-3 lg:-left-3 z-0 pointer-events-none select-none animate-peek-hand">
            <div className="text-xl sm:text-2xl lg:text-4xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]">
              👋
            </div>
          </div>

          {/* Pure 3D WhatsApp Circular Button (Larger on Large Screens) */}
          <a 
            href="https://wa.me/918238902687?text=Hi%20SK%20Precast%20Industries,%20I%20would%20like%20to%20inquire%20about%20your%20precast%20products."
            target="_blank" 
            rel="noreferrer" 
            className="relative z-10 w-12 h-12 sm:w-13 sm:h-13 lg:w-[66px] lg:h-[66px] rounded-full bg-whatsapp-3d flex items-center justify-center text-white shadow-[0_6px_22px_rgba(0,0,0,0.38),0_4px_12px_rgba(37,211,102,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.75),inset_0_-2px_2.5px_rgba(0,0,0,0.25)] border-2 border-emerald-400/90 hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
            title="Chat on WhatsApp (+91-8238902687)"
          >
            {/* Live Green Online Beacon (Small & Subtle) */}
            <span className="absolute top-0.5 right-0.5 lg:top-1 lg:right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5 bg-emerald-400 border-[1.5px] border-slate-900 shadow-[0_0_6px_#34d399]" />
            </span>

            {/* Crisp 3D WhatsApp Icon */}
            <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-[34px] lg:h-[34px] text-white drop-shadow-md group-hover:rotate-12 transition-transform duration-300" />
          </a>
        </div>

        {/* Unique Scroll To Top Button */}
        <button 
          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#fef08a] via-[#fde047] to-[#facc15] hover:from-[#fde047] hover:to-[#eab308] text-slate-950 flex items-center justify-center shadow-[0_6px_20px_rgba(250,204,21,0.35)] border border-yellow-300/80 transition-all duration-300 ${
            showScrollTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
          } hover:-translate-y-1 hover:scale-105 cursor-pointer`}
          onClick={scrollToTop}
          title="Back to Top"
          aria-label="Back to Top"
        >
          <FaChevronUp size={14} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
