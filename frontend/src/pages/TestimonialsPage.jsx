import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Box, 
  Factory, 
  Home, 
  Globe, 
  Warehouse, 
  ShieldCheck, 
  Tag, 
  FileCheck, 
  Award, 
  Eye, 
  Target, 
  Landmark, 
  PlusCircle, 
  Plus, 
  Minus, 
  Shield, 
  MessageSquareText,
  X
} from 'lucide-react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa6';
import { navigateTo } from '../utils/navigation';
import { dropdownCategoriesData, standaloneProductsData } from '../data/aboutUsData';
import { testimonialsCol1, testimonialsCol2 } from '../data/homeData';

// Dynamic Icon Map for explore products section
const iconComponentMap = { Building2, Shield, Landmark, PlusCircle, Sparkles, Layers, Box, Factory, Home, Globe, Warehouse, ShieldCheck, Tag, FileCheck, Award, Eye, Target };

const TestimonialsPage = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  // Exact 10 testimonials from homeData.js
  const allTestimonials = [...testimonialsCol1, ...testimonialsCol2];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Client Testimonials - SK Precast Industries | Read Customer Reviews';
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown(prev => prev === id ? null : id);
  };

  const activeDropdownData = dropdownCategoriesData.find(d => d.id === openDropdown);

  return (
    <div className="w-full bg-theme-pageBg text-theme-heading font-sans min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1. HERO BANNER SECTION (Clean Dark Navy & Gold without top line or stats) */}
      {/* ========================================================================= */}
      <section className="relative bg-theme-heroNavy text-white pt-14 pb-14 lg:pt-18 lg:pb-18 overflow-hidden border-b border-amber-500/20 shadow-xl">
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

        <div className="max-w-[1260px] mx-auto px-6 relative z-10 text-center">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center justify-center gap-2.5 text-sm sm:text-base font-semibold text-slate-300 mb-4"
          >
            <a 
              href="/" 
              onClick={(e) => navigateTo('/', e)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </a>
            <span className="text-slate-500 font-normal">/</span>
            <span className="text-amber-400 font-bold">Testimonials</span>
          </motion.div>

          {/* Main Heading with Site-Standard Gradient Text */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-[28px] sm:text-[34px] md:text-[40px] font-extrabold tracking-tight leading-tight mb-3"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-400 drop-shadow-sm">
              Client Testimonials &amp; Reviews
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Real feedback and verified reviews from commercial developers, farmhouse owners, and infrastructure contractors across India.
          </motion.p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PUBLIC CHEERS SECTION (Twitter/X Style Masonry with Dynamic Height)    */}
      {/* ========================================================================= */}
      <section className="relative py-14 sm:py-18 lg:py-20 overflow-hidden bg-gradient-to-b from-[#faf5f0] via-[#fdfbf7] to-[#f8fafc]">
        
        {/* Soft Ambient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-gradient-to-tr from-rose-200/30 via-amber-200/30 to-orange-100/20 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-amber-200/20 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-2/3 right-10 w-80 h-80 bg-teal-200/20 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Header Section styled identically to site-wide headings */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            
            {/* Heading with Standard Common Color & Gradient */}
            <motion.h2 
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[24px] sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2"
            >
              Real Stories of <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">Trust &amp; Precast Excellence</span>
            </motion.h2>

            {/* Standard Title Accent Bar */}
            <div className="flex items-center justify-center gap-2 mt-2 mb-3.5 mx-auto">
              <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
              <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
              <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              Discover why industrial developers, farmhouse owners, and infrastructure contractors across Delhi NCR &amp; Haryana trust SK Precast Industries for their perimeter boundary walls.
            </motion.p>
          </div>

          {/* ========================================================================= */}
          {/* Exact 10 Testimonials in Natural Height Masonry Multi-Column Layout       */}
          {/* ========================================================================= */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]">
            {allTestimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                className="break-inside-avoid inline-block w-full h-fit bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-amber-400/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_-8px_rgba(245,158,11,0.18)] transition-all duration-300 hover:-translate-y-1.5 group relative"
              >
                {/* Top Subtle Amber Bar Accent on Hover */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                {/* Card Header: Rating + Quote Icon */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-1.5 bg-amber-50/80 border border-amber-200/60 px-2.5 py-1 rounded-full">
                    <FaStar className="text-yellow-500 text-xs drop-shadow-sm" />
                    <span className="text-amber-900 font-extrabold text-xs tracking-wide">
                      {item.rating}
                    </span>
                  </div>
                  <FaQuoteLeft className="text-slate-300 group-hover:text-amber-500/60 text-base transition-colors" />
                </div>

                {/* Testimonial Content (Dynamic Height: Takes exact text size) */}
                <div className="text-slate-700 text-[14px] sm:text-[14.5px] leading-relaxed font-normal mb-4">
                  "{item.content}"
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-slate-100 mb-3.5" />

                {/* User Details with Gold Gradient Initials Avatar */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fde047] via-[#facc15] to-[#eab308] text-slate-950 font-extrabold flex items-center justify-center text-xs sm:text-sm shadow-[0_2px_10px_rgba(250,204,21,0.35)] shrink-0 border border-yellow-300/80 group-hover:scale-105 transition-transform">
                    {item.initials}
                  </div>
                  <div className="overflow-hidden text-left">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. EXPLORE OUR PRODUCTS (Exact section matching About page & image 3)     */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 bg-white border-t border-slate-200">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">Products</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2 mb-2 mx-auto">
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
                  className={`w-full p-4 rounded-[9px] flex items-center justify-between font-bold text-sm sm:text-[15px] transition-all duration-300 shadow-sm border cursor-pointer group ${
                    isOpen 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg ring-2 ring-amber-400/50' 
                      : 'bg-white text-slate-800 border-slate-200 hover:border-amber-400 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 transition-all duration-300 ${
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
                <div className="p-5 sm:p-7 rounded-[9px] bg-theme-pageBg border-2 border-amber-200/90 shadow-xl relative">
                  
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
                        className="p-3 sm:p-3.5 rounded-[12px] bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md hover:bg-amber-50/40 transition-all flex items-center justify-between text-left group cursor-pointer"
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
                      className="w-full h-full p-4 rounded-[9px] flex items-center gap-3 font-bold text-sm sm:text-[14px] transition-all duration-300 shadow-sm border border-slate-200 bg-white text-slate-800 hover:border-amber-300 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group"
                    >
                      <div className="w-10 h-10 rounded-[12px] bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-white transition-all shadow-xs">
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

        </div>
      </section>

    </div>
  );
};

export default TestimonialsPage;
