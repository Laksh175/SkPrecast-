import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Phone, Mail, ArrowRight, Sparkles, Layers, Box, Factory, Home, Globe, Warehouse, ShieldCheck, Tag, FileCheck, Award, Eye, Target, Landmark, PlusCircle, Plus, Minus, Shield, X, PenLine } from 'lucide-react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa6';
import { navigateTo } from '../utils/navigation';
import { dropdownCategoriesData, standaloneProductsData, aboutCompanyData } from '../data/aboutUsData';
import { testimonialsCol1, testimonialsCol2 } from '../data/homeData';
import { WriteReviewModal } from '../components/WriteReviewModal';

// Dynamic Icon Map for explore products section
const iconComponentMap = { Building2, Shield, Landmark, PlusCircle, Sparkles, Layers, Box, Factory, Home, Globe, Warehouse, ShieldCheck, Tag, FileCheck, Award, Eye, Target };

// Combine top 10 verified customer testimonials from Google
const allVerifiedTestimonials = [
  ...testimonialsCol1,
  ...testimonialsCol2
].map((item, idx) => ({
  id: item.id || `testi-${idx + 1}`,
  name: item.name,
  initials: item.initials || item.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
  role: item.role || 'Verified Customer',
  rating: parseFloat(item.rating) || 5.0,
  content: item.content,
  relativeTime: item.relativeTime || null,
  profilePhoto: item.profilePhoto || null,
  isGoogleVerified: true
}));

const TestimonialsPage = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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
      {/* 1. HERO BANNER SECTION (Clean Dark Navy & Gold)                           */}
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

          {/* Main Heading */}
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
      {/* 2. MAIN SECTION: 2-COLUMN TESTIMONIALS (LEFT) + CONTACT CARD (RIGHT)      */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-14 sm:pt-10 sm:pb-18 lg:pt-12 lg:pb-20 bg-gradient-to-b from-[#faf5f0] via-[#fdfbf7] to-[#f8fafc]">
        
        {/* Soft Ambient Glows (Contained safely so parent section does not break sticky) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-gradient-to-tr from-rose-200/30 via-amber-200/30 to-orange-100/20 blur-[130px] rounded-full" />
          <div className="absolute top-1/3 left-10 w-80 h-80 bg-amber-200/20 blur-[140px] rounded-full" />
          <div className="absolute top-2/3 right-10 w-80 h-80 bg-teal-200/20 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* ========================================================================= */}
          {/* 2 Columns of Testimonials (Left) + Sticky Contact Card (Right)             */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">
            
            {/* LEFT SIDE: 2 Columns of Testimonials (1 line me 2 comments) */}
            <div className="lg:col-span-8">
              <div className="columns-1 sm:columns-2 gap-5 space-y-5 [column-fill:_balance]">
                {allVerifiedTestimonials.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
                    className="break-inside-avoid inline-block w-full h-fit bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-200/90 hover:border-amber-400/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-8px_rgba(245,158,11,0.16)] transition-all duration-300 hover:-translate-y-1.5 group relative"
                  >
                    {/* Top Subtle Amber Bar Accent on Hover */}
                    <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                    {/* Card Header: 5 Stars Rating + Quote Icon */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-xs sm:text-[13px] drop-shadow-sm" />
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FaQuoteLeft className="text-amber-500/70 text-sm" />
                      </div>
                    </div>

                    {/* Testimonial Content (Dynamic Natural Height) */}
                    <div className="text-slate-700 text-[13.5px] sm:text-[14px] leading-relaxed font-normal mb-4">
                      "{item.content}"
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] w-full bg-slate-100 mb-3" />

                    {/* User Details with Avatar */}
                    <div className="flex items-center gap-3">
                      {item.profilePhoto ? (
                        <img 
                          src={item.profilePhoto} 
                          alt={item.name} 
                          className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-amber-300/60"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#fde047] via-[#facc15] to-[#eab308] text-slate-950 font-extrabold flex items-center justify-center text-xs shadow-[0_2px_8px_rgba(250,204,21,0.3)] shrink-0 border border-yellow-300/80 group-hover:scale-105 transition-transform">
                          {item.initials}
                        </div>
                      )}
                      
                      <div className="overflow-hidden text-left">
                        <h3 className="text-[13.5px] font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-[11.5px] text-slate-500 mt-0.5 font-medium flex items-center gap-1.5">
                          <span>{item.role}</span>
                          {item.relativeTime && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span className="text-slate-400">{item.relativeTime}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: Sticky Column containing Write a Review Button + Contact Card + User Satisfaction Card */}
            <div className="lg:col-span-4 relative h-full">
              <div className="sticky top-[120px] sm:top-[130px] lg:top-[140px] z-20 space-y-4 sm:space-y-5">
                
                {/* 0. WRITE A REVIEW BUTTON (Opens Review Modal) */}
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-[14px] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-600 hover:via-amber-500 hover:to-yellow-500 text-slate-950 font-black text-[15px] sm:text-[16px] tracking-wide shadow-[0_6px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_10px_28px_rgba(245,158,11,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group border border-amber-300/80 cursor-pointer"
                >
                  <PenLine size={18} className="stroke-[2.5] text-slate-950 group-hover:rotate-6 transition-transform" />
                  <span>Write a Review</span>
                </button>

                {/* 1. STANDALONE CONTACT DETAILS CARD (Exact matching About Us Page) */}
                <div className="w-full relative rounded-[15px] p-6 sm:p-7 bg-theme-pageBg border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-300/40 transition-all duration-300 group">
                  {/* Top Header */}
                  <div className="mb-5 pb-4 border-b border-slate-200">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-[5px] text-[11px] font-extrabold uppercase tracking-wider bg-slate-200/80 text-slate-700 mb-1 border border-slate-300/60">
                      {aboutCompanyData.contactCard.badge}
                    </span>
                    <h2 className="text-[26px] leading-tight font-black text-theme-heading tracking-tight">
                      {aboutCompanyData.contactCard.companyName}
                    </h2>
                  </div>

                  {/* Info List */}
                  <div className="flex flex-col gap-3.5">
                    {/* Address */}
                    <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
                      <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                        <MapPin size={20} className="text-white drop-shadow-xs" />
                      </div>
                      <div className="text-left">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Address</span>
                        <p className="caption-text text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-medium">
                          {aboutCompanyData.contactCard.address}
                        </p>
                      </div>
                    </div>

                    {/* Mobile */}
                    <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
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
                                className="caption-text text-[13.5px] sm:text-[14px] font-medium text-slate-800 hover:text-amber-600 transition-colors">
                                {phone}
                              </a>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* E-mail */}
                    <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
                      <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                        <Mail size={20} className="text-white drop-shadow-xs" />
                      </div>
                      <div className="text-left overflow-hidden">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">E-mail</span>
                        <a 
                          href={`mailto:${aboutCompanyData.contactCard.email}`} 
                          className="caption-text text-[13.5px] sm:text-[14px] font-medium text-slate-800 hover:text-amber-600 transition-colors truncate block">
                          {aboutCompanyData.contactCard.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. STANDALONE SEPARATE USER SATISFACTION CARD */}
                <div className="w-full relative rounded-[15px] p-6 sm:p-7 bg-theme-pageBg border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-300/40 transition-all duration-300 group">
                  <h3 className="text-left text-[27px] leading-tight font-black text-theme-heading tracking-tight mb-5">
                    User Satisfaction
                  </h3>

                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
                    {/* Metric 1: Response */}
                    <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all duration-200 shadow-2xs group/item">
                      <div className="relative w-14 h-14 sm:w-[60px] sm:h-[60px] flex items-center justify-center mb-2">
                        {/* Rotating Shaded Gradient Ring */}
                        <svg className="w-full h-full animate-[spin_5s_linear_infinite]" viewBox="0 0 44 44">
                          <defs>
                            <linearGradient id="rot-grad-resp" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#f59e0b" />
                              <stop offset="35%" stopColor="#fde047" />
                              <stop offset="70%" stopColor="#ea580c" />
                              <stop offset="100%" stopColor="#d97706" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="22"
                            cy="22"
                            r="17.5"
                            className="text-amber-100/70"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                          />
                          <circle
                            cx="22"
                            cy="22"
                            r="17.5"
                            stroke="url(#rot-grad-resp)"
                            strokeWidth="3.8"
                            strokeDasharray="92 20"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                        <span className="absolute text-[13px] sm:text-[13.5px] font-black text-slate-900 group-hover/item:text-amber-600 transition-colors">
                          100%
                        </span>
                      </div>
                      <span className="text-[15px] font-bold text-slate-700 leading-tight">Response</span>
                    </div>

                    {/* Metric 2: Quality */}
                    <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all duration-200 shadow-2xs group/item">
                      <div className="relative w-14 h-14 sm:w-[60px] sm:h-[60px] flex items-center justify-center mb-2">
                        {/* Rotating Shaded Gradient Ring */}
                        <svg className="w-full h-full animate-[spin_5s_linear_infinite]" viewBox="0 0 44 44">
                          <defs>
                            <linearGradient id="rot-grad-qual" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#fbbf24" />
                              <stop offset="35%" stopColor="#f59e0b" />
                              <stop offset="70%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#ea580c" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="22"
                            cy="22"
                            r="17.5"
                            className="text-amber-100/70"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                          />
                          <circle
                            cx="22"
                            cy="22"
                            r="17.5"
                            stroke="url(#rot-grad-qual)"
                            strokeWidth="3.8"
                            strokeDasharray="92 20"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                        <span className="absolute text-[13px] sm:text-[13.5px] font-black text-slate-900 group-hover/item:text-amber-600 transition-colors">
                          100%
                        </span>
                      </div>
                      <span className="text-[15px] font-bold text-slate-700 leading-tight">Quality</span>
                    </div>

                    {/* Metric 3: Delivery */}
                    <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all duration-200 shadow-2xs group/item">
                      <div className="relative w-14 h-14 sm:w-[60px] sm:h-[60px] flex items-center justify-center mb-2">
                        {/* Rotating Shaded Gradient Ring */}
                        <svg className="w-full h-full animate-[spin_5s_linear_infinite]" viewBox="0 0 44 44">
                          <defs>
                            <linearGradient id="rot-grad-delv" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#f59e0b" />
                              <stop offset="35%" stopColor="#fde047" />
                              <stop offset="70%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#d97706" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="22"
                            cy="22"
                            r="17.5"
                            className="text-amber-100/70"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                          />
                          <circle
                            cx="22"
                            cy="22"
                            r="17.5"
                            stroke="url(#rot-grad-delv)"
                            strokeWidth="3.8"
                            strokeDasharray="92 20"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                        <span className="absolute text-[13px] sm:text-[13.5px] font-black text-slate-900 group-hover/item:text-amber-600 transition-colors">
                          100%
                        </span>
                      </div>
                      <span className="text-[15px] font-bold text-slate-700 leading-tight">Delivery</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. EXPLORE OUR PRODUCTS (Exact section matching About page)                */}
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
      
      {/* 4. WRITE A REVIEW POPUP MODAL (Blur Background) */}
      <WriteReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
      />

    </div>
  );
};

export default TestimonialsPage;
