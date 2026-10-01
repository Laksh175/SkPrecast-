import React, { useState, useEffect } from 'react';
import { Mail, Search, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { allProductsList } from '../data/homeData';
import { getProductUrl } from '../data/navigationData';

const Header = ({ currentRoute = 'home' }) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(currentRoute === 'about' ? 'About' : 'Home');
  const [hoveredTab, setHoveredTab] = useState(null);

  // Filter products for the search dropdown
  const filteredHeaderProducts = allProductsList.filter(item =>
    item.toLowerCase().includes((searchQuery || '').toLowerCase().trim())
  );

  // Sync activeTab when route changes
  useEffect(() => {
    if (currentRoute === 'about') {
      setActiveTab('About');
    } else if (currentRoute === 'products') {
      setActiveTab('Products');
    } else if (currentRoute === 'catalogues') {
      setActiveTab('Catalogues');
    } else if (currentRoute === 'blog') {
      setActiveTab('Blog');
    } else if (currentRoute === 'contact') {
      setActiveTab('Contact');
    } else if (currentRoute === 'home') {
      setActiveTab('Home');
    }
  }, [currentRoute]);

  // Current tab with active indicator: hovered item takes priority, otherwise active tab
  const currentIndicatorTab = hoveredTab !== null ? hoveredTab : activeTab;

  // Handle scroll effect & update header height CSS variable
  useEffect(() => {
    const updateHeaderState = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      const headerEl = document.querySelector('header');
      if (headerEl) {
        document.documentElement.style.setProperty('--header-height', `${headerEl.offsetHeight}px`);
      }
    };
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState);
    return () => {
      window.removeEventListener('scroll', updateHeaderState);
      window.removeEventListener('resize', updateHeaderState);
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.has-dropdown')) {
        setIsProductsOpen(false);
      }
      if (!event.target.closest('.search-box-container')) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const productCategories = [
    {
      title: 'COMPOUND WALL',
      categoryId: 'compound-wall',
      items: [
        { name: 'Concrete Folding Compound Wall', slug: 'concrete-folding-compound-wall' },
        { name: 'Concrete Precast Single Panel Wall', slug: 'concrete-precast-single-panel-wall' },
        { name: 'Factory Boundary Wall', slug: 'factory-boundary-wall' },
        { name: 'Heavy Readymade Boundary Wall', slug: 'heavy-readymade-boundary-wall' },
        { name: 'Industrial Compound Wall', slug: 'industrial-compound-wall' },
      ],
    },
    {
      title: 'BOUNDARY WALL',
      categoryId: 'boundary-wall',
      items: [
        { name: 'Cement Boundary Wall', slug: 'cement-boundary-wall' },
        { name: 'Concrete Boundary Wall', slug: 'concrete-boundary-wall' },
        { name: 'Concrete Prestressed Boundary Walls', slug: 'concrete-prestressed-boundary-walls' },
        { name: 'Precast Boundary Wall', slug: 'precast-boundary-wall' },
        { name: 'RCC Boundary Wall', slug: 'rcc-boundary-wall' },
        { name: 'Readymade Boundary Wall', slug: 'readymade-boundary-wall' },
        { name: 'Solar Plant Boundary Wall', slug: 'solar-plant-boundary-wall' },
      ],
    },
    {
      title: 'CEMENT WALL',
      categoryId: 'cement-wall',
      items: [
        { name: 'Pre Fabricated Cement Wall', slug: 'pre-fabricated-cement-wall' },
        { name: 'RCC Cement Wall', slug: 'rcc-cement-wall' },
      ],
    },
    {
      title: 'OTHER PRODUCTS',
      categoryId: 'other-products',
      items: [
        { name: 'Precast Concrete Wall', slug: 'precast-concerete-wall' },
        { name: 'Precast Wall Panels', slug: 'precast-wall-panels' },
        { name: 'RCC Precast Columns', slug: 'rcc-precast-columns' },
        { name: 'Industrial Boundary Wall', slug: 'industrial-boundary-wall' },
        { name: 'Farm House Boundary Wal', slug: 'farm-house-boundary-wal' },
        { name: 'Precast Wall', slug: 'precast-wall' },
        { name: 'RCC Folding Wall', slug: 'rcc-folding-wall' },
        { name: 'RCC Wall', slug: 'rcc-wall' },
        { name: 'Readymade Walls', slug: 'readymade-walls' },
      ],
    },
  ];

  return (
    <header className={`sticky top-0 left-0 w-full z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
      {/* Top Bar (Visible on both Mobile & Desktop) */}
      <div className="bg-white border-b border-gray-100 text-xs text-slate-600 py-1.5">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-6 flex justify-between items-center gap-2">
          {/* Left: Email & GST No (Stacked on Mobile, Row on Desktop) */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-[11px] sm:text-xs">
            <a href="mailto:info@skprecast-industries.com" className="flex items-center gap-1 font-medium hover:text-amber-700 transition-colors">
              <Mail size={13} className="text-amber-600 shrink-0" />
              <span>info@skprecast-industries.com</span>
            </a>
            <span className="text-slate-300 hidden md:inline">|</span>
            <div className="flex items-center text-[10px] sm:text-[0.775rem] tracking-wider">
              <span className="font-semibold text-slate-500">GST NO. :</span>
              <span className="font-bold text-amber-900 bg-amber-50/90 px-1.5 sm:px-2 py-0.5 rounded border border-amber-200/80 ml-1">
                06AEGFS8126M1ZK
              </span>
            </div>
          </div>

          {/* Right: Social Media Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 ml-auto">
            <span className="font-semibold text-slate-500 text-[11px] sm:text-xs hidden xs:inline sm:inline">Follow Us:</span>
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Facebook Official Icon */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-6 h-6 sm:w-7 sm:h-7 inline-flex items-center justify-center hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 cursor-pointer drop-shadow-sm shrink-0" 
                title="Facebook">
                <svg viewBox="0 0 36 36" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
                  <circle cx="18" cy="18" r="18" fill="#1877F2"/>
                  <path d="M24.5 18h-4.3v13.5h-5.6V18h-2.7v-4.7h2.7v-3.1c0-2.2 1-5.7 5.7-5.7l4.2.02v4.6h-3c-.5 0-1.2.25-1.2 1.3v2.9h4.3l-.4 4.7z" fill="#FFFFFF"/>
                </svg>
              </a>

              {/* Instagram Official Icon */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-6 h-6 sm:w-7 sm:h-7 inline-flex items-center justify-center hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 cursor-pointer drop-shadow-sm shrink-0" 
                title="Instagram">
                <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
                  <defs>
                    <linearGradient id="ig-grad-header" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f09433"/>
                      <stop offset="25%" stopColor="#e6683c"/>
                      <stop offset="50%" stopColor="#dc2743"/>
                      <stop offset="75%" stopColor="#cc2366"/>
                      <stop offset="100%" stopColor="#bc1888"/>
                    </linearGradient>
                  </defs>
                  <rect width="32" height="32" rx="9" fill="url(#ig-grad-header)"/>
                  <circle cx="16" cy="16" r="4.3" stroke="#FFFFFF" strokeWidth="2.1"/>
                  <circle cx="22.5" cy="9.5" r="1.2" fill="#FFFFFF"/>
                  <rect x="6.5" y="6.5" width="19" height="19" rx="5" stroke="#FFFFFF" strokeWidth="2.1"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-black/[0.03]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-2 sm:py-2.5 flex justify-between items-center relative">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center"
            onClick={(e) => { navigateTo('/', e); setActiveTab('Home'); setHoveredTab(null); }}>
            <img 
              src="/assets/images/sk-logo.png" 
              alt="SK Precast Industries" 
              className="h-[46px] sm:h-[58px] lg:h-[70px] max-h-[70px] w-auto object-contain block"/>
          </a>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center gap-8" onMouseLeave={() => setHoveredTab(null)}>
            <ul className="flex items-center gap-7 list-none">
              {/* Home */}
              <li 
                className="relative"
                onMouseEnter={() => setHoveredTab('Home')}>
                <a 
                  href="/" 
                  className={`relative inline-flex items-center gap-1.5 text-[0.95rem] font-semibold py-2.5 transition-colors duration-200 ${
                    currentIndicatorTab === 'Home' ? 'text-yellow-600' : 'text-slate-700 hover:text-yellow-600'
                  }`}
                  onClick={(e) => { navigateTo('/', e); setActiveTab('Home'); setIsProductsOpen(false); }}>
                  Home
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#fde047] via-[#facc15] to-[#eab308] rounded-full transition-all duration-300 origin-center ${
                    currentIndicatorTab === 'Home' ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`} />
                </a>
              </li>

              {/* About Us (Opens Dedicated About Page) */}
              <li 
                className="relative"
                onMouseEnter={() => setHoveredTab('About')}
              >
                <a 
                  href="/about-us" 
                  className={`relative inline-flex items-center gap-1.5 text-[0.95rem] font-semibold py-2.5 transition-colors duration-200 ${
                    currentIndicatorTab === 'About' ? 'text-yellow-600' : 'text-slate-700 hover:text-yellow-600'
                  }`}
                  onClick={(e) => { navigateTo('/about-us', e); setActiveTab('About'); setIsProductsOpen(false); }}
                >
                  About Us
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#fde047] via-[#facc15] to-[#eab308] rounded-full transition-all duration-300 origin-center ${
                    currentIndicatorTab === 'About' ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`} />
                </a>
              </li>

              {/* Products Dropdown (Mega Menu) */}
              <li 
                className="relative has-dropdown after:content-[''] after:absolute after:top-full after:-left-12 after:-right-12 after:h-5 after:bg-transparent after:z-40"
                onMouseEnter={() => {
                  setHoveredTab('Products');
                  setIsProductsOpen(true);
                }}
                onMouseLeave={() => {
                  setIsProductsOpen(false);
                  setHoveredTab(null);
                }}
              >
                <a 
                  href="/products"
                  className={`relative inline-flex items-center gap-1.5 text-[0.95rem] font-semibold py-2.5 transition-colors duration-200 cursor-pointer ${
                    currentIndicatorTab === 'Products' ? 'text-yellow-600' : 'text-slate-700 hover:text-yellow-600'
                  }`}
                  onClick={(e) => {
                    navigateTo('/products', e);
                    setActiveTab('Products');
                    setIsProductsOpen(false);
                    setHoveredTab(null);
                  }}
                  aria-expanded={isProductsOpen}
                >
                  <span>Products</span>
                  <ChevronDown size={15} className={`transition-transform duration-200 ${isProductsOpen ? 'rotate-180 text-yellow-600' : 'text-slate-500'}`} />
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#fde047] via-[#facc15] to-[#eab308] rounded-full transition-all duration-300 origin-center ${
                    currentIndicatorTab === 'Products' ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`} />
                </a>

                {/* Mega Menu Dropdown */}
                <div className={`absolute top-[calc(100%+8px)] -right-[260px] w-[880px] bg-white rounded-xl shadow-2xl p-7 border border-slate-100 z-50 transition-all duration-200 ${
                  isProductsOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible translate-y-2 pointer-events-none'
                }`}>
                  {/* Invisible Hover Extension */}
                  <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />

                  {/* Top Arrow Pointer */}
                  <div className="absolute -top-1.5 right-[295px] w-3.5 h-3.5 bg-white transform rotate-45 border-t border-l border-slate-100" />

                  <div className="grid grid-cols-4 gap-7">
                    {productCategories.map((col, idx) => (
                      <div className="flex flex-col" key={idx}>
                        <a
                          href={`/${col.categoryId}.htm`}
                          onClick={(e) => {
                            navigateTo(`/${col.categoryId}.htm`, e);
                            setActiveTab('Products');
                            setIsProductsOpen(false);
                            setHoveredTab(null);
                          }}
                          className="text-[0.8125rem] font-extrabold text-slate-900 tracking-wider uppercase mb-3.5 pb-2.5 relative flex items-center hover:text-amber-600 transition-colors cursor-pointer"
                        >
                          <span>{col.title}</span>
                          <span className="absolute bottom-0 left-0 right-3.5 h-[1px] bg-amber-200 rounded-full" />
                        </a>
                        <ul className="list-none flex flex-col gap-2.5">
                          {col.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <a 
                                href={`/${item.slug}.htm`}
                                className="text-[0.845rem] font-medium text-slate-600 leading-snug py-0.5 inline-block transition-all duration-200 hover:text-yellow-600 hover:translate-x-1 cursor-pointer"
                                onClick={(e) => {
                                  navigateTo(`/${item.slug}.htm`, e);
                                  setActiveTab('Products');
                                  setIsProductsOpen(false);
                                  setHoveredTab(null);
                                }}
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Mega Menu Footer Banner */}
                  <div className="mt-6 pt-3.5 border-t border-slate-100 flex justify-between items-center text-[0.8125rem] text-slate-500">
                    <div>
                      <strong className="text-slate-900">Looking for custom precast specifications?</strong> We manufacture durable, precision-engineered precast solutions.
                    </div>
                    <a 
                      href="/products" 
                      className="inline-flex items-center gap-1 font-bold text-yellow-600 hover:text-yellow-700 transition-colors cursor-pointer"
                      onClick={(e) => {
                        navigateTo('/products', e);
                        setActiveTab('Products');
                        setIsProductsOpen(false);
                        setHoveredTab(null);
                      }}
                    >
                      View All Products <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </li>

              {/* Catalogues */}
              <li 
                className="relative"
                onMouseEnter={() => setHoveredTab('Catalogues')}
              >
                <a 
                  href="/catalogues.htm" 
                  className={`relative inline-flex items-center gap-1.5 text-[0.95rem] font-semibold py-2.5 transition-colors duration-200 ${
                    currentIndicatorTab === 'Catalogues' ? 'text-yellow-600' : 'text-slate-700 hover:text-yellow-600'
                  }`}
                  onClick={(e) => { 
                    setActiveTab('Catalogues'); 
                    setIsProductsOpen(false); 
                    navigateTo('/catalogues.htm', e);
                  }}
                >
                  Catalogues
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#fde047] via-[#facc15] to-[#eab308] rounded-full transition-all duration-300 origin-center ${
                    currentIndicatorTab === 'Catalogues' ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`} />
                </a>
              </li>

              {/* Blog */}
              <li 
                className="relative"
                onMouseEnter={() => setHoveredTab('Blog')}
              >
                <a 
                  href="/blog" 
                  className={`relative inline-flex items-center gap-1.5 text-[0.95rem] font-semibold py-2.5 transition-colors duration-200 cursor-pointer ${
                    currentIndicatorTab === 'Blog' ? 'text-yellow-600' : 'text-slate-700 hover:text-yellow-600'
                  }`}
                  onClick={(e) => { 
                    setActiveTab('Blog'); 
                    setIsProductsOpen(false); 
                    navigateTo('/blog', e);
                  }}
                >
                  Blog
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#fde047] via-[#facc15] to-[#eab308] rounded-full transition-all duration-300 origin-center ${
                    currentIndicatorTab === 'Blog' ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`} />
                </a>
              </li>
            </ul>

            {/* Actions: Search & Contact Button */}
            <div className="flex items-center gap-5">
              {/* Search Trigger */}
              <div className="relative search-box-container">
                <button 
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isSearchOpen ? 'bg-yellow-400 text-slate-950 shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-yellow-400 hover:text-slate-950'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSearchOpen(!isSearchOpen);
                  }}
                  title="Search Products"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>

                {/* Search Bar Popover with Interactive Products Dropdown */}
                {isSearchOpen && (
                  <div className="absolute top-12 right-0 w-80 sm:w-96 bg-white rounded-xl shadow-2xl p-3 border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-150" onClick={(e) => e.stopPropagation()}>
                    {/* Search Input Box */}
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:bg-white transition-all">
                      <Search size={16} className="text-slate-400 shrink-0" />
                      <input 
                        type="text" 
                        placeholder="Filter 35+ products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-none bg-transparent outline-none text-sm w-full text-slate-900 placeholder-slate-400 font-medium"
                        autoFocus
                      />
                      {searchQuery && (
                        <button className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5" onClick={() => setSearchQuery('')}>
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    {/* Products Dropdown List */}
                    <div className="mt-2.5 pt-1 border-t border-slate-100 max-h-72 overflow-y-auto custom-scrollbar flex flex-col">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 flex items-center justify-between">
                        <span>Products ({filteredHeaderProducts.length})</span>
                        <span className="text-[10px] text-amber-700 bg-amber-50 font-semibold px-2 py-0.5 rounded border border-amber-200/60">
                          Click to view
                        </span>
                      </div>
                      {filteredHeaderProducts.length > 0 ? (
                        filteredHeaderProducts.map((product, idx) => (
                          <a
                            key={idx}
                            href={getProductUrl(product)}
                            onClick={(e) => {
                              navigateTo(getProductUrl(product), e);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                              setActiveTab('Products');
                            }}
                            className="px-3 py-2.5 text-sm text-slate-700 hover:bg-amber-50/90 hover:text-amber-950 rounded-lg transition-colors flex items-center justify-between group cursor-pointer border-b border-slate-50 last:border-b-0"
                          >
                            <span className="font-medium text-[13.5px] truncate">{product}</span>
                            <ArrowRight size={13} className="text-slate-300 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                          </a>
                        ))
                      ) : (
                        <div className="px-3 py-6 text-center text-xs text-slate-400">
                          No products matching "{searchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Standalone Contact Us CTA */}
              <a 
                href="/contact-us.htm" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] hover:from-[#fde047] hover:to-[#eab308] text-slate-950 font-bold text-[0.925rem] px-6 py-2.5 rounded-lg shadow-md shadow-yellow-500/20 hover:shadow-yellow-500/35 border border-yellow-300/80 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                onClick={(e) => {
                  navigateTo('/contact-us.htm', e);
                  setActiveTab('Contact');
                  setHoveredTab(null);
                }}
              >
                <span>Contact Us</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden flex items-center justify-center p-2 rounded-md text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl px-5 py-4 flex flex-col gap-3 max-h-[calc(100vh-80px)] overflow-y-auto">
          {/* Mobile Search Input */}
          <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2.5 rounded-lg shrink-0 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:bg-white focus-within:border focus-within:border-amber-400 transition-all">
            <Search size={18} className="text-slate-500 shrink-0" />
            <input 
              type="text" 
              placeholder="Filter 35+ products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full text-slate-800 placeholder-slate-400"
            />
            {searchQuery && (
              <button className="text-slate-400 hover:text-slate-600" onClick={() => setSearchQuery('')}>
                <X size={15} />
              </button>
            )}
          </div>

          {/* Mobile Filtered Products Dropdown List */}
          {searchQuery.trim() && (
            <div className="bg-slate-50/90 rounded-xl p-2 border border-slate-200 max-h-60 overflow-y-auto flex flex-col gap-1 shadow-inner">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                Matching Products ({filteredHeaderProducts.length})
              </div>
              {filteredHeaderProducts.length > 0 ? (
                filteredHeaderProducts.map((product, idx) => (
                  <a
                    key={idx}
                    href={getProductUrl(product)}
                    onClick={(e) => {
                      navigateTo(getProductUrl(product), e);
                      setIsMobileMenuOpen(false);
                      setSearchQuery('');
                      setActiveTab('Products');
                    }}
                    className="px-2.5 py-2 text-xs font-medium text-slate-800 hover:bg-amber-100/70 hover:text-amber-950 rounded-lg flex items-center justify-between"
                  >
                    <span className="truncate">{product}</span>
                    <ArrowRight size={12} className="text-slate-400 shrink-0 ml-2" />
                  </a>
                ))
              ) : (
                <div className="px-2 py-3 text-center text-xs text-slate-400">
                  No products matching "{searchQuery}"
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <a 
              href="/" 
              className={`text-base font-semibold py-2.5 px-3 rounded-lg transition-colors ${
                activeTab === 'Home' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
              onClick={(e) => { navigateTo('/', e); setActiveTab('Home'); setIsMobileMenuOpen(false); }}
            >
              Home
            </a>
            <a 
              href="/about-us" 
              className={`text-base font-semibold py-2.5 px-3 rounded-lg transition-colors ${
                activeTab === 'About' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
              onClick={(e) => { navigateTo('/about-us', e); setActiveTab('About'); setIsMobileMenuOpen(false); }}
            >
              About Us
            </a>

            {/* Mobile Products Dropdown Accordion */}
            <div className="rounded-lg overflow-hidden transition-all">
              <button 
                type="button"
                className={`w-full flex items-center justify-between text-base font-semibold py-2.5 px-3 rounded-lg transition-colors cursor-pointer ${
                  isMobileProductsOpen || activeTab === 'Products' ? 'bg-amber-50/90 text-amber-900 font-bold' : 'text-slate-800 hover:bg-slate-50'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMobileProductsOpen(prev => !prev);
                }}
              >
                <span>Products</span>
                <ChevronDown size={18} className={`transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180 text-amber-600' : 'text-slate-500'}`} />
              </button>

              {isMobileProductsOpen && (
                <div className="pl-3 pr-2 py-2.5 bg-slate-50/90 rounded-xl my-1.5 flex flex-col gap-2.5 border border-slate-200/80 shadow-2xs">
                  {/* View All Products Link */}
                  <a
                    href="/products"
                    className="text-xs sm:text-sm font-extrabold text-amber-950 py-2 px-3 bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] rounded-lg flex items-center justify-between border border-yellow-300 shadow-xs cursor-pointer"
                    onClick={(e) => {
                      navigateTo('/products', e);
                      setActiveTab('Products');
                      setIsMobileMenuOpen(false);
                      setIsMobileProductsOpen(false);
                    }}
                  >
                    <span>View All Products</span>
                    <ArrowRight size={14} />
                  </a>

                  {/* 4 Category Groups */}
                  {productCategories.map((col, idx) => {
                    const isCategoryOpen = mobileExpandedCategory === col.categoryId;
                    return (
                      <div key={idx} className="flex flex-col bg-white rounded-lg p-2.5 border border-slate-200/90 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <a
                            href={`/${col.categoryId}.htm`}
                            className="text-[12px] font-extrabold text-slate-900 uppercase tracking-wide hover:text-amber-600 transition-colors flex-1"
                            onClick={(e) => {
                              navigateTo(`/${col.categoryId}.htm`, e);
                              setActiveTab('Products');
                              setIsMobileMenuOpen(false);
                              setIsMobileProductsOpen(false);
                            }}
                          >
                            {col.title}
                          </a>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setMobileExpandedCategory(prev => prev === col.categoryId ? null : col.categoryId);
                            }}
                            className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                            aria-label={`Toggle ${col.title}`}
                          >
                            <ChevronDown size={15} className={`transition-transform duration-200 ${isCategoryOpen ? 'rotate-180 text-amber-600' : ''}`} />
                          </button>
                        </div>

                        {/* Expandable sub-items */}
                        {isCategoryOpen && (
                          <div className="flex flex-col gap-1 pt-2 mt-1.5 border-t border-slate-100">
                            {col.items.map((item, itemIdx) => (
                              <a 
                                key={itemIdx} 
                                href={`/${item.slug}.htm`}
                                className="text-xs text-slate-600 hover:text-amber-600 py-1 px-1.5 rounded hover:bg-amber-50/60 transition-colors"
                                onClick={(e) => {
                                  navigateTo(`/${item.slug}.htm`, e);
                                  setActiveTab('Products');
                                  setIsMobileMenuOpen(false);
                                  setIsMobileProductsOpen(false);
                                }}
                              >
                                • {item.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <a 
              href="/catalogues.htm" 
              className={`text-base font-semibold py-2.5 px-3 rounded-lg transition-colors ${
                activeTab === 'Catalogues' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
              onClick={(e) => { 
                setActiveTab('Catalogues'); 
                setIsMobileMenuOpen(false); 
                navigateTo('/catalogues.htm', e);
              }}
            >
              Catalogues
            </a>

            <a 
              href="/blog" 
              className={`text-base font-semibold py-2.5 px-3 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'Blog' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
              onClick={(e) => { 
                setActiveTab('Blog'); 
                setIsMobileMenuOpen(false); 
                navigateTo('/blog', e);
              }}
            >
              Blog
            </a>

            <div className="pt-2">
              <a 
                href="/contact-us.htm" 
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-[#fef08a] via-[#fde047] to-[#facc15] text-slate-950 font-bold py-3 rounded-lg text-center shadow-md border border-yellow-300/80 cursor-pointer"
                onClick={(e) => { 
                  navigateTo('/contact-us.htm', e);
                  setActiveTab('Contact'); 
                  setIsMobileMenuOpen(false); 
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
