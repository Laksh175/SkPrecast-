import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  Phone, 
  Send,
  MapPin,
  Mail,
  Shield,
  Landmark,
  PlusCircle,
  Sparkles,
  Layers,
  Box,
  Factory,
  Home,
  Plus,
  Minus,
  ArrowRight
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { galleryItemsData } from '../data/galleryData';
import { dropdownCategoriesData, standaloneProductsData, aboutCompanyData } from '../data/aboutUsData';
import { navigateTo } from '../utils/navigation';
import { ContactInfoCard } from '../common';

// Icon Map for dynamic icon lookup
const iconComponentMap = { Building2, Shield, Landmark, PlusCircle, Sparkles, Layers, Box, Factory, Home };

const GalleryPage = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const activeDropdownData = dropdownCategoriesData.find(d => d.id === openDropdown);

  const toggleDropdown = (id) => {
    setOpenDropdown(prev => prev === id ? null : id);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Gallery - SK Precast Industries | Boundary & Compound Wall Photos';
  }, []);

  // Lightbox Navigation Handlers
  const handleOpenLightbox = (index) => {
    setActiveImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
    setActiveImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const handlePrevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryItemsData.length - 1));
  }, []);

  const handleNextImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev < galleryItemsData.length - 1 ? prev + 1 : 0));
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, handlePrevImage, handleNextImage]);

  const currentLightboxItem = activeImageIndex !== null ? galleryItemsData[activeImageIndex] : null;

  return (
    <div className="w-full bg-theme-pageBg text-theme-heading font-sans min-h-screen">
      
      {/* 1. HERO BANNER SECTION (30px Title, 15px Subtitle matching other pages) */}
      <section className="relative bg-theme-heroNavy text-white pt-14 pb-16 lg:pt-20 lg:pb-22 overflow-hidden border-b border-amber-500/20 shadow-xl">
        {/* Architectural Dot Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Gradient Glows */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

        {/* Top Gold Highlight Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.6)]" />

        <div className="max-w-[1260px] mx-auto px-6 relative z-10 text-center">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center justify-center gap-2.5 text-sm sm:text-base font-semibold text-slate-300 mb-5"
          >
            <a 
              href="/" 
              onClick={(e) => navigateTo('/', e)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </a>
            <span className="text-slate-500 font-normal">/</span>
            <span className="text-amber-400 font-bold">Gallery</span>
          </motion.div>

          {/* Main Heading - 30px */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-[30px] font-extrabold tracking-tight leading-tight mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-400 drop-shadow-sm">
              Photo Gallery &amp; Project Portfolio
            </span>
          </motion.h1>

          {/* Decorative Underline Accent */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-4 mx-auto"
          >
            <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
            <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
            <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
          </motion.div>

          {/* Subtitle - 15px */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
            className="max-w-3xl mx-auto text-slate-300 text-[15px] leading-[26px]"
          >
            Explore real-world project photos of precast boundary walls, RCC compound walls, factory yard production, and live installation sites across India.
          </motion.p>
        </div>
      </section>

      {/* 2. GALLERY GRID (2 COLS) + STICKY CONTACT CARD (RIGHT) */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Column: Images Grid (2 photos per row) */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {galleryItemsData.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    onClick={() => handleOpenLightbox(idx)}
                    className="group relative bg-white rounded-[16px] overflow-hidden border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:border-amber-400 transition-all duration-300 cursor-pointer aspect-[16/11]"
                  >
                    {/* Full Card Image */}
                    <img 
                      src={item.fullImg} 
                      alt={`SK Precast Gallery ${idx + 1}`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = item.fallback;
                      }}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle Hover Gradient & Zoom Indicator */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                        <ZoomIn size={22} className="stroke-[2.5]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Sticky Contact Details Card */}
            <div className="lg:col-span-5 xl:col-span-4 relative h-full">
              <div className="sticky top-[110px] sm:top-[125px] lg:top-[135px] z-20">
                <ContactInfoCard className="w-full" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Explore Our Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          
          {/* Product Categories Section: Explore Our Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <h2 className="text-[23px] sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">Products</span>
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2.5 mb-2 mx-auto">
                <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
                <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
                <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
              </div>
            </div>

            {/* LINE 1: 4 Dropdown Categories in One Line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-6xl mx-auto mb-4">
              {dropdownCategoriesData.map((cat) => {
                const isOpen = openDropdown === cat.id;
                const CatIcon = iconComponentMap[cat.iconName] || Building2;
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleDropdown(cat.id)}
                    className={`w-full p-4 rounded-[8px] flex items-center justify-between font-bold text-sm sm:text-[15px] transition-all duration-300 shadow-sm border cursor-pointer group ${
                      isOpen 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg ring-2 ring-amber-400/50' 
                        : 'bg-white text-slate-800 border-slate-200 hover:border-amber-400 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen 
                          ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-xs' 
                          : 'bg-amber-100 text-amber-900 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-white group-hover:shadow-xs'
                      }`}>
                        <CatIcon size={20} />
                      </div>
                      <div className="text-left">
                        <span className={`block font-bold leading-snug transition-colors ${
                          isOpen ? 'text-white' : 'text-slate-900 group-hover:text-amber-700'
                        }`}>
                          {cat.title}
                        </span>
                        <span className={`text-[12px] font-normal transition-colors ${
                          isOpen ? 'text-amber-200' : 'text-slate-400 group-hover:text-amber-600/80'
                        }`}>
                          {cat.count}
                        </span>
                      </div>
                    </div>
                    
                    {/* Plus / Minus indicator button */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen 
                        ? 'bg-amber-500 text-slate-950' 
                        : 'bg-slate-100 text-slate-600 group-hover:bg-amber-100 group-hover:text-amber-900'
                    }`}>
                      {isOpen ? <Minus size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Collapsible Dropdown Product Menu Tray */}
            <AnimatePresence>
              {activeDropdownData && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden max-w-6xl mx-auto mb-6"
                >
                  <div className="p-5 sm:p-7 rounded-[8px] bg-[#f8fafc] border-2 border-amber-200/90 shadow-xl relative">
                    
                    {/* Tray Top Header */}
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <h4 className="text-base sm:text-lg font-bold text-slate-900">
                          {activeDropdownData.title} <span className="text-slate-400 font-normal text-sm">({activeDropdownData.count})</span>
                        </h4>
                      </div>
                      <button
                        onClick={() => setOpenDropdown(null)}
                        className="text-xs font-bold text-slate-500 hover:text-amber-700 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-amber-300 transition-colors cursor-pointer"
                      >
                        <X size={13} />
                        <span>Close</span>
                      </button>
                    </div>

                    {/* All Product Links Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                      {activeDropdownData.products.map((prod) => (
                        <a
                          key={prod.id}
                          href={prod.link}
                          onClick={(e) => navigateTo(prod.link, e)}
                          className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md hover:bg-amber-50/40 transition-all flex items-center justify-between text-left group cursor-pointer"
                        >
                          <span className="text-[13.5px] sm:text-[14px] font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                            {prod.title}
                          </span>
                          <ArrowRight size={14} className="text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                        </a>
                      ))}
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LINE 2: 5 Standalone Product Cards in One Line */}
            <div className="max-w-6xl mx-auto mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
                {standaloneProductsData.map((prod, idx) => {
                  const ProdIcon = iconComponentMap[prod.iconName] || Building2;
                  return (
                    <motion.div
                      key={prod.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="h-full"
                    >
                      <a
                        href={prod.link}
                        onClick={(e) => navigateTo(prod.link, e)}
                        className="w-full h-full p-4 rounded-[8px] flex items-center gap-3 font-bold text-sm sm:text-[14px] transition-all duration-300 shadow-sm border border-slate-200 bg-white text-slate-800 hover:border-amber-300 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-white transition-all shadow-xs">
                          <ProdIcon size={20} />
                        </div>
                        <div className="text-left min-w-0 flex-1">
                          <span className="block font-bold leading-snug text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                            {prod.title}
                          </span>
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 4. LIGHTBOX FULLSCREEN MODAL */}
      <AnimatePresence>
        {activeImageIndex !== null && currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
          >
            {/* Modal Box */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col max-h-[95vh]"
            >
              {/* Lightbox Header */}
              <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                    {activeImageIndex + 1} / {galleryItemsData.length}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-100 truncate max-w-lg">
                    {currentLightboxItem.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCloseLightbox}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-red-500 hover:text-white text-slate-300 transition-colors cursor-pointer"
                    title="Close (Esc)"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Lightbox Image Stage - Large View */}
              <div className="relative flex-1 bg-black/80 flex items-center justify-center min-h-[400px] max-h-[82vh] p-2 sm:p-4 overflow-hidden">
                <img 
                  src={currentLightboxItem.fullImg} 
                  alt={currentLightboxItem.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = currentLightboxItem.fallback;
                  }}
                  className="w-full h-full max-h-[80vh] object-contain rounded-lg select-none"
                />

                {/* Prev Button */}
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 flex items-center justify-center transition-all duration-200 border border-slate-700 hover:border-amber-400 cursor-pointer shadow-xl z-10"
                  title="Previous Image"
                >
                  <ChevronLeft size={26} />
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 flex items-center justify-center transition-all duration-200 border border-slate-700 hover:border-amber-400 cursor-pointer shadow-xl z-10"
                  title="Next Image"
                >
                  <ChevronRight size={26} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default GalleryPage;
