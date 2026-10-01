import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigateTo } from '../utils/navigation';
import { ArrowRight, Building2, Shield, Landmark, PlusCircle, Sparkles, Layers, Box, Factory, Home, Plus, Minus, X, Download, FileText, Eye, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '../common';
import { dropdownCategoriesData, standaloneProductsData, aboutCompanyData } from '../data/aboutUsData';
import { catalogueBrochuresData, cataloguesHeroData } from '../data/cataloguesData';

// Icon Map for dynamic icon lookup
const iconComponentMap = { Building2, Shield, Landmark, PlusCircle, Sparkles, Layers, Box, Factory, Home };

const CataloguesPage = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activePdfModal, setActivePdfModal] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Product Catalogues | SK Precast Industries Palwal';
  }, []);

  // Lock background body scroll and listen for Escape key when PDF modal is open
  useEffect(() => {
    if (activePdfModal) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActivePdfModal(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activePdfModal]);

  const activeDropdownData = dropdownCategoriesData.find(d => d.id === openDropdown);

  const toggleDropdown = (id) => {
    setOpenDropdown(prev => prev === id ? null : id);
  };

  return (
    <div className="w-full min-h-[70vh] bg-theme-pageBg font-sans overflow-hidden">
      
      {/* 1. Hero Banner matching About & Product pages */}
      <section className="relative bg-theme-heroNavy text-white pt-16 pb-20 overflow-hidden border-b border-amber-500/30 font-sans">
        {/* Subtle Architectural Dot Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Gradient Glows */}
        <div className="absolute -top-24 left-1/3 w-96 h-96 bg-amber-500/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

        {/* Top Gold Highlight Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.6)]" />

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
      <section className="py-12 sm:py-16 bg-theme-pageBg border-b border-slate-200/80">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left Column: 2 Catalogue PDF Cards */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              
              {/* Section Header with Gradient Shading */}
              <div className="mb-6 text-center lg:text-left">
                <div className="inline-block">
                  <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                    Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">Product Brochures</span>
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-2.5 mb-2.5 mx-auto">
                    <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
                    <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
                    <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
                  </div>
                </div>
                <p className="text-slate-600 text-[17px] leading-[28px] mt-1.5 max-w-xl mx-auto lg:mx-0">
                  Access our complete precast technical specifications, installation guides, and product details in your preferred language.
                </p>
              </div>

              {/* 2 PDF Catalogue Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 flex-1">
                {catalogueBrochuresData.map((item) => (
                  <div key={item.id} className="bg-white rounded-[15px] border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group">
                    {/* Image Container with 10px border radius and white background frame */}
                    <div 
                      onClick={() => setActivePdfModal({ title: item.title, url: item.url, downloadName: item.downloadName })}
                      className="relative w-full aspect-[4/3] rounded-[10px] overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs mb-4 cursor-pointer"
                    >
                      <img 
                        src={item.image} 
                        alt={`${item.name} - SK Precast Industries`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-[6px] bg-slate-900/80 backdrop-blur-md text-white font-bold text-[11px] border border-white/20 shadow-sm flex items-center gap-1.5">
                        <FileText size={13} className="text-amber-400" />
                        <span>{item.edition}</span>
                      </div>
                    </div>

                    {/* Content & Action */}
                    <div className="text-left flex-1 flex flex-col justify-between">
                      <div className="mb-4">
                        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {item.description}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="pt-3 border-t border-slate-100">
                        <Button 
                          variant="dark-to-gold"
                          size="md"
                          fullWidth
                          onClick={() => setActivePdfModal({ title: item.title, url: item.url, downloadName: item.downloadName })}
                          icon={<Eye size={15} className="text-yellow-400 group-hover/btn:text-slate-950 transition-colors" />}
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

            {/* Right Column: Contact Us Card (Matching About Us & Full Height to Match Left Side) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end w-full h-full">
              <div className="w-full h-full relative rounded-[15px] p-6 sm:p-7 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-slate-300 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
                
                {/* Top Header */}
                <div className="mb-4 pb-3 border-b border-slate-200">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-[5px] text-[11px] font-extrabold uppercase tracking-wider bg-slate-200/80 text-slate-700 mb-1 border border-slate-300/60">
                    {aboutCompanyData.contactCard.badge}
                  </span>
                  <h2 className="text-[24px] sm:text-[26px] leading-tight font-black text-slate-900 tracking-tight">
                    {aboutCompanyData.contactCard.companyName}
                  </h2>
                </div>

                {/* Info List */}
                <div className="flex flex-col gap-3 sm:gap-3.5 flex-1 justify-between">
                  
                  {/* Address */}
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[12px] bg-slate-50 border border-slate-200/80 hover:border-amber-300 hover:bg-white hover:shadow-md transition-all duration-200 shadow-xs">
                    <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                      <MapPin size={20} className="text-white drop-shadow-xs" />
                    </div>
                    <div className="text-left">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Address</span>
                      <p className="text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-medium">
                        {aboutCompanyData.contactCard.address}
                      </p>
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[12px] bg-slate-50 border border-slate-200/80 hover:border-amber-300 hover:bg-white hover:shadow-md transition-all duration-200 shadow-xs">
                    <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                      <Phone size={20} className="text-white drop-shadow-xs" />
                    </div>
                    <div className="text-left">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Mobile</span>
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        {aboutCompanyData.contactCard.phones.map((phone, idx) => (
                          <React.Fragment key={phone}>
                            {idx > 0 && <span className="text-slate-300 font-bold">•</span>}
                            <a 
                              href={`tel:${phone.replace(/[^0-9+]/g, '')}`} 
                              className="text-[14px] font-medium text-slate-900 hover:text-amber-600 transition-colors"
                            >
                              {phone}
                            </a>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* E-mail */}
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[12px] bg-slate-50 border border-slate-200/80 hover:border-amber-300 hover:bg-white hover:shadow-md transition-all duration-200 shadow-xs">
                    <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                      <Mail size={20} className="text-white drop-shadow-xs" />
                    </div>
                    <div className="text-left overflow-hidden">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">E-mail</span>
                      <a 
                        href={`mailto:${aboutCompanyData.contactCard.email}`} 
                        className="text-[14px] font-medium text-slate-900 hover:text-amber-600 transition-colors truncate block"
                      >
                        {aboutCompanyData.contactCard.email}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Explore Our Products Section */}
      <div className="py-12 sm:py-16">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          
          {/* Product Categories Section: Explore Our Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                      animate={{ opacity: 1, y: 0 }}
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
      </div>

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
