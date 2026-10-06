import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Send,
  ArrowRight
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { galleryItemsData } from '../data/galleryData';
import { navigateTo } from '../utils/navigation';
import { ContactInfoCard, ExploreProductsSection } from '../common';

const GalleryPage = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(null);

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
    <div className="w-full bg-[#090e1a] text-slate-100 font-sans min-h-screen">
      
      {/* 1. HERO BANNER SECTION (30px Title, 15px Subtitle matching other pages) */}
      <section className="relative bg-[#060a12] text-white pt-14 pb-16 lg:pt-20 lg:pb-22 overflow-hidden border-b border-slate-800 shadow-xl">
        {/* Background Banner Image Clearly Visible */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/assets/images/hero-page-banner.jpeg" 
            alt="SK Precast Industries Gallery Banner" 
            className="w-full h-full object-cover object-center opacity-85"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060a12]/70 via-[#060a12]/40 to-[#060a12]" />
        </div>

        {/* Architectural Dot Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none z-1"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Gradient Glows */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full z-1" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full z-1" />

        {/* Top Gold Highlight Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.6)] z-1" />

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
      <section className="py-12 sm:py-16 bg-[#090e1a]">
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
                    className="group relative bg-[#111927] rounded-[16px] overflow-hidden border border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-2xl hover:border-amber-400 transition-all duration-300 cursor-pointer aspect-[16/11]"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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

      {/* 3. Explore Our Products Section (Common Reusable Component) */}
      <ExploreProductsSection className="py-12 sm:py-16 lg:py-20 bg-[#090e1a] border-t border-slate-800" />

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
