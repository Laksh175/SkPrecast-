import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
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
  X, 
  Shield,
  Newspaper,
  Briefcase,
  BookOpen,
  Image,
  MessageSquareQuote,
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import { FaDiamond } from 'react-icons/fa6';
import { Button, ContactInfoCard } from '../common';
import { navigateTo } from '../utils/navigation';
import { aboutCompanyData, dropdownCategoriesData, standaloneProductsData } from '../data/aboutUsData';
import { sitemapGeneralLinks, sitemapHeroData } from '../data/sitemapData';

// Dynamic Icon Map for explore products section
const iconComponentMap = { 
  Building2, 
  Shield, 
  Landmark, 
  PlusCircle, 
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
  Target 
};

const SitemapPage = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Sitemap | SK Precast Industries - Navigation Index';
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown(prev => prev === id ? null : id);
  };

  const activeDropdownData = dropdownCategoriesData.find(d => d.id === openDropdown);
  const generalLinks = sitemapGeneralLinks;

  return (
    <div className="w-full bg-[#f8fafc] text-slate-900 font-sans min-h-screen">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative bg-theme-heroNavy text-white pt-14 pb-16 lg:pt-20 lg:pb-22 overflow-hidden border-b border-amber-500/20 shadow-xl">
        {/* Architectural Dot Grid Background */}
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

        {/* Top Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.6)]" />

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
            <span className="text-amber-400 font-bold">Sitemap</span>
          </motion.div>

          {/* Main Heading - 30px */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-[30px] font-extrabold tracking-tight leading-tight mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-400 drop-shadow-sm">
              Sitemap
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

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
            className="max-w-3xl mx-auto text-slate-300 text-[15px] leading-[26px]"
          >
            Explore the complete navigation index and precast infrastructure solutions offered by SK Precast Industries.
          </motion.p>
        </div>
      </section>

      {/* 2. MAIN SITEMAP SECTION (Left: General Links, Right: About Us Contact Details Card) */}
      <section className="py-12 sm:py-16 bg-white text-slate-900 relative">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* LEFT COLUMN: General Links (Centered across total width, with Our Product Range diamond bullet icon & right-side link icon) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center h-full text-center py-2">
              
              {/* Title with decorative design accent & NO horizontal line */}
              <div className="text-center w-full mb-6 sm:mb-8">
                <h2 className="text-[24px] sm:text-3xl lg:text-[32px] font-black text-slate-900 tracking-tight leading-tight">
                  General <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">Links</span>
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2.5 mx-auto">
                  <span className="h-[2px] w-16 sm:w-24 rounded-full title-accent-bar" />
                  <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
                  <span className="h-[2px] w-16 sm:w-24 rounded-full title-accent-bar" />
                </div>
              </div>

              {/* Centered General Links List with Diamond on Left & External Link icon right after menu name */}
              <div className="w-full flex justify-center">
                <ul className="w-fit flex flex-col items-start gap-2 sm:gap-2.5 mx-auto">
                  {generalLinks.map((item, idx) => (
                    <li key={idx} className="group">
                      <a 
                        href={item.path}
                        onClick={(e) => {
                          if (item.path.startsWith('/#')) {
                            return;
                          }
                          navigateTo(item.path, e);
                        }}
                        className="inline-flex items-center gap-2.5 py-1.5 px-3 rounded-lg hover:bg-amber-50/70 hover:translate-x-1 transition-all duration-200 group cursor-pointer"
                      >
                        <FaDiamond size={8} className="text-yellow-500 shrink-0 group-hover:text-yellow-600 group-hover:scale-125 group-hover:rotate-45 transition-all duration-300" />
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`text-[15px] sm:text-[16px] font-bold transition-colors ${
                            item.isHome 
                              ? 'text-slate-950 uppercase font-black tracking-wide group-hover:text-amber-700' 
                              : 'text-slate-700 group-hover:text-amber-700'
                          }`}>
                            {item.name}
                          </span>
                          <ExternalLink size={12} className="text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* RIGHT COLUMN: Exact About Us Contact Details Card */}
            <div className="lg:col-span-5 flex flex-col gap-4 h-full text-left">
              <ContactInfoCard className="w-full flex-1" />
              <Button
                variant="dark-to-gold"
                size="md"
                href="/contact-us.htm"
                className="w-full"
              >
                Contact Us
              </Button>
            </div>

          </div>

        </div>
      </section>

      {/* 3. EXPLORE OUR PRODUCTS SECTION (Exact layout with Dropdown Menus + Standalone Cards) */}
      <section className="py-14 sm:py-18 bg-[#f8fafc] border-t border-slate-200/90 relative overflow-hidden">
        {/* Background Subtle Gradient Glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-400/8 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-slate-200/50 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="mb-8 pt-0"
          >
            {/* Header */}
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
                  <div className="p-5 sm:p-7 rounded-[9px] bg-white border-2 border-amber-200/90 shadow-xl relative">
                    
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
                        className="text-xs font-bold text-slate-500 hover:text-amber-700 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 hover:border-amber-300 transition-colors cursor-pointer"
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
                          className="p-3 sm:p-3.5 rounded-[12px] bg-[#f8fafc] border border-slate-200/80 hover:border-amber-400 hover:shadow-md hover:bg-amber-50/40 transition-all flex items-center justify-between text-left group cursor-pointer"
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

          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default SitemapPage;
