import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigateTo } from '../utils/navigation';
import { X, Download, FileText, Eye } from 'lucide-react';
import { Button, ContactInfoCard, ExploreProductsSection } from '../common';
import { catalogueBrochuresData } from '../data/cataloguesData';

const CataloguesPage = () => {
  const [activePdfModal, setActivePdfModal] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Product Catalogues | SK Precast Industries Palwal';
  }, []);

  return (
    <div className="w-full min-h-[70vh] bg-[#090e1a] font-sans overflow-hidden">
      
      {/* 1. Hero Banner matching About & Product pages */}
      <section className="relative bg-[#060a12] text-white pt-16 pb-20 overflow-hidden border-b border-slate-800 font-sans">
        {/* Background Banner Image Clearly Visible */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/assets/images/hero-page-banner.jpeg" 
            alt="SK Precast Industries Banner" 
            className="w-full h-full object-cover object-center opacity-85"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060a12]/70 via-[#060a12]/40 to-[#060a12]" />
        </div>

        {/* Subtle Architectural Dot Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none z-1"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Gradient Glows */}
        <div className="absolute -top-24 left-1/3 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full z-1" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full z-1" />

        {/* Top Gold Highlight Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.6)] z-1" />

        <div className="max-w-[1260px] mx-auto px-6 relative z-10 text-center">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center justify-center gap-2.5 text-sm sm:text-base font-semibold text-slate-300 mb-6">
            <a 
              href="/index.htm" 
              onClick={(e) => navigateTo('/index.htm', e)}
              className="hover:text-amber-400 transition-colors cursor-pointer">
              Home
            </a>
            <span className="text-slate-500 font-normal">/</span>
            <span className="text-amber-400 font-bold">Catalogues</span>
          </motion.div>

          {/* Main Heading with Gradient Text */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-[30px] font-extrabold tracking-tight leading-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-400 drop-shadow-sm">
              Product Catalogues & Range
            </span>
          </motion.div>

          {/* Decorative Underline Accent */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-4 mx-auto">
            <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
            <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
            <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
            className="max-w-3xl mx-auto text-slate-300 text-[15px] leading-[26px]">
            Browse through SK Precast Industries' complete catalogue of precast boundary walls, RCC compound walls, and modular concrete solutions manufactured at our state-of-the-art Palwal unit.
          </motion.p>
        </div>
      </section>

      {/* 2. Top Showcase Section: 2 PDF Catalogues (Left) + Contact Us Card (Right) */}
      <section className="py-12 sm:py-16 bg-[#090e1a] border-b border-slate-800">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left Column: 2 Catalogue PDF Cards */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              
              {/* Section Header with Gradient Shading */}
              <div className="mb-6 text-center lg:text-left">
                <div className="inline-block">
                  <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                    Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">Product Brochures</span>
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-2.5 mb-2.5 mx-auto">
                    <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
                    <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
                    <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
                  </div>
                </div>
                <p className="text-slate-300 text-[17px] leading-[28px] mt-1.5 max-w-xl mx-auto lg:mx-0">
                  Access our complete precast technical specifications, installation guides, and product details in your preferred language.
                </p>
              </div>

              {/* 2 PDF Catalogue Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 flex-1">
                {catalogueBrochuresData.map((item) => (
                  <div key={item.id} className="bg-[#111927] rounded-[15px] border border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group">
                    {/* Image Container with 10px border radius */}
                    <div 
                      onClick={() => setActivePdfModal({ title: item.title, url: item.url, downloadName: item.downloadName })}
                      className="relative w-full aspect-[4/3] rounded-[10px] overflow-hidden bg-[#162238] border border-slate-700/80 shadow-xs mb-4 cursor-pointer"
                    >
                      <img 
                        src={item.image} 
                        alt={`${item.name} - SK Precast Industries`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-[6px] bg-slate-950/80 backdrop-blur-md text-white font-bold text-[11px] border border-white/20 shadow-sm flex items-center gap-1.5">
                        <FileText size={13} className="text-amber-400" />
                        <span>{item.edition}</span>
                      </div>
                    </div>

                    {/* Content & Action */}
                    <div className="text-left flex-1 flex flex-col justify-between">
                      <div className="mb-4">
                        <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h3>
                        <p 
                          className="!text-[16px] text-slate-300 leading-relaxed mt-1.5 font-normal"
                          style={{ fontSize: '16px', lineHeight: '24px' }}
                        >
                          {item.description}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="pt-3 border-t border-slate-800">
                        <Button 
                          variant="gold"
                          size="md"
                          fullWidth
                          onClick={() => setActivePdfModal({ title: item.title, url: item.url, downloadName: item.downloadName })}
                          icon={<Eye size={15} />}
                          iconPosition="left"
                          className="rounded-full normal-case text-xs sm:text-sm font-bold shadow-md"
                        >
                          View PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Contact Details Card (Common Reusable Component) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end w-full">
              <ContactInfoCard className="w-full" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Explore Our Products Section (Common Reusable Component) */}
      <ExploreProductsSection className="py-12 sm:py-16" />

      {/* Interactive In-Website PDF Viewer Modal */}
      <AnimatePresence>
        {activePdfModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePdfModal(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-5xl h-[90vh] bg-slate-900 rounded-[15px] border border-slate-700 shadow-2xl z-10 flex flex-col overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <FileText size={16} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
                      {activePdfModal.title}
                    </h3>
                    <p className="text-slate-400 text-xs">
                      Official Technical Specifications & Dimensions
                    </p>
                  </div>
                </div>

                {/* Right Action Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActivePdfModal(null)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close PDF Viewer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* PDF Document Embedded Viewer Body */}
              <div className="flex-1 w-full h-full bg-slate-800 relative">
                <iframe
                  src={`${activePdfModal.url}#toolbar=1&navpanes=0`}
                  title={activePdfModal.title}
                  className="w-full h-full border-0 bg-white"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CataloguesPage;
