import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PenLine, ChevronRight } from 'lucide-react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa6';
import { testimonialsCol1, testimonialsCol2 } from '../data/homeData';
import { WriteReviewModal } from '../components/WriteReviewModal';
import { ContactInfoCard, ExploreProductsSection } from '../common';

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
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Client Testimonials - SK Precast Industries | Read Customer Reviews';
  }, []);

  return (
    <div className="w-full bg-[#090e1a] text-slate-100 font-sans min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1. HERO BANNER SECTION (Clean Dark Navy & Gold)                           */}
      {/* ========================================================================= */}
      <section className="relative bg-[#0d1527] text-white pt-14 pb-14 lg:pt-18 lg:pb-18 overflow-hidden border-b border-amber-500/20 shadow-xl">
        {/* Background Banner Image Clearly Visible */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/assets/images/hero-page-banner.jpeg" 
            alt="SK Precast Industries Testimonials Banner" 
            className="w-full h-full object-cover object-center opacity-85"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#090e1a]/70 via-[#090e1a]/40 to-[#090e1a]" />
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
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/15 blur-[120px] pointer-events-none rounded-full z-1" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full z-1" />

        <div className="max-w-[1260px] mx-auto px-6 relative z-10 text-center">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 text-sm sm:text-base font-semibold text-slate-300 mb-4"
          >
            <a 
              href="/" 
              onClick={(e) => navigateTo('/', e)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </a>
            <ChevronRight size={17} strokeWidth={2.5} className="text-amber-400/90 shrink-0" />
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
            className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Real feedback and verified reviews from commercial developers, farmhouse owners, and infrastructure contractors across India.
          </motion.p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN SECTION: 2-COLUMN TESTIMONIALS (LEFT) + CONTACT CARD (RIGHT)      */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-14 sm:pt-10 sm:pb-18 lg:pt-12 lg:pb-20 bg-[#090e1a]">
        
        {/* Soft Ambient Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-amber-500/10 blur-[130px] rounded-full" />
          <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-600/10 blur-[140px] rounded-full" />
          <div className="absolute top-2/3 right-10 w-80 h-80 bg-amber-500/10 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* ========================================================================= */}
          {/* 2 Columns of Testimonials (Left) + Sticky Contact Card (Right)             */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">
            
            {/* LEFT SIDE: 2 Columns of Testimonials */}
            <div className="lg:col-span-8">
              <div className="columns-1 sm:columns-2 gap-5 space-y-5 [column-fill:_balance]">
                {allVerifiedTestimonials.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
                    className="break-inside-avoid inline-block w-full h-fit bg-[#111927] backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-amber-400/80 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group relative"
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

                    {/* Testimonial Content (15px) */}
                    <div 
                      className="text-slate-100 font-normal mb-4 leading-[25px]"
                      style={{ fontSize: '15px' }}
                    >
                      "{item.content}"
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] w-full bg-slate-800 mb-3" />

                    {/* User Details with Avatar */}
                    <div className="flex items-center gap-3">
                      {item.profilePhoto ? (
                        <img 
                          src={item.profilePhoto} 
                          alt={item.name} 
                          className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-amber-400/60"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#fde047] via-[#facc15] to-[#eab308] text-slate-950 font-extrabold flex items-center justify-center text-xs shadow-[0_2px_8px_rgba(250,204,21,0.3)] shrink-0 border border-yellow-300/80 group-hover:scale-105 transition-transform">
                          {item.initials}
                        </div>
                      )}
                      
                      <div className="overflow-hidden text-left">
                        <h3 className="text-[13.5px] font-bold text-white group-hover:text-amber-400 transition-colors leading-tight">
                          {item.name}
                        </h3>
                        <p className="caption-text text-[12px] text-slate-400 mt-0.5 font-medium flex flex-wrap items-center gap-1.5">
                          <span>{item.role}</span>
                          {item.relativeTime && (
                            <>
                              <span className="text-slate-600">•</span>
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

            {/* RIGHT SIDE: Sticky Column */}
            <div className="lg:col-span-4 relative h-full">
              <div className="sticky top-[120px] sm:top-[130px] lg:top-[140px] z-20 space-y-4 sm:space-y-5">
                
                {/* 0. WRITE A REVIEW BUTTON */}
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-[14px] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-600 hover:via-amber-500 hover:to-yellow-500 text-slate-950 font-black text-[15px] sm:text-[16px] tracking-wide shadow-[0_6px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_10px_28px_rgba(245,158,11,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group border border-amber-300/80 cursor-pointer"
                >
                  <PenLine size={18} className="stroke-[2.5] text-slate-950 group-hover:rotate-6 transition-transform" />
                  <span>Write a Review</span>
                </button>

                {/* 1. STANDALONE CONTACT DETAILS CARD */}
                <ContactInfoCard className="w-full" />

                {/* 2. USER SATISFACTION SECTION */}
                <div className="w-full text-left">
                  {/* Title Above Box */}
                  <h3 className="text-[21px] font-bold text-white tracking-tight mb-2.5 px-0.5">
                    User Satisfaction
                  </h3>

                  {/* Container Box */}
                  <div className="w-full relative rounded-[15px] p-5 sm:p-6 bg-[#111927] border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300">
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
                      
                      {/* Metric 1: Response */}
                      <div className="relative rounded-2xl p-[2px] overflow-hidden group shadow-xs hover:shadow-md transition-all">
                        {/* Infinite Full-Perimeter Color Shade Scrolling Border */}
                        <div 
                          className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,#f59e0b_0deg,#fde047_70deg,#f97316_140deg,#d97706_210deg,#fde047_280deg,#f59e0b_360deg)] animate-[spin_4s_linear_infinite]"
                          style={{ animationDelay: '0s' }}
                        />
                        
                        {/* Inner Card */}
                        <div className="relative z-10 w-full h-full bg-[#162238] rounded-[14px] py-4 px-2 flex flex-col items-center justify-center text-center">
                          <span className="text-[18px] sm:text-[20px] font-black text-amber-400 tracking-tight mb-1">
                            100%
                          </span>
                          <span className="text-[12.5px] sm:text-[13px] font-bold text-slate-200 leading-tight">
                            Response
                          </span>
                        </div>
                      </div>

                      {/* Metric 2: Quality */}
                      <div className="relative rounded-2xl p-[2px] overflow-hidden group shadow-xs hover:shadow-md transition-all">
                        {/* Infinite Full-Perimeter Color Shade Scrolling Border */}
                        <div 
                          className="absolute -inset-[100%] bg-[conic-gradient(from_120deg,#f59e0b_0deg,#fde047_70deg,#f97316_140deg,#d97706_210deg,#fde047_280deg,#f59e0b_360deg)] animate-[spin_4s_linear_infinite]"
                          style={{ animationDelay: '-1.33s' }}
                        />
                        
                        {/* Inner Card */}
                        <div className="relative z-10 w-full h-full bg-[#162238] rounded-[14px] py-4 px-2 flex flex-col items-center justify-center text-center">
                          <span className="text-[18px] sm:text-[20px] font-black text-amber-400 tracking-tight mb-1">
                            100%
                          </span>
                          <span className="text-[12.5px] sm:text-[13px] font-bold text-slate-200 leading-tight">
                            Quality
                          </span>
                        </div>
                      </div>

                      {/* Metric 3: Delivery */}
                      <div className="relative rounded-2xl p-[2px] overflow-hidden group shadow-xs hover:shadow-md transition-all">
                        {/* Infinite Full-Perimeter Color Shade Scrolling Border */}
                        <div 
                          className="absolute -inset-[100%] bg-[conic-gradient(from_240deg,#f59e0b_0deg,#fde047_70deg,#f97316_140deg,#d97706_210deg,#fde047_280deg,#f59e0b_360deg)] animate-[spin_4s_linear_infinite]"
                          style={{ animationDelay: '-2.66s' }}
                        />
                        
                        {/* Inner Card */}
                        <div className="relative z-10 w-full h-full bg-[#162238] rounded-[14px] py-4 px-2 flex flex-col items-center justify-center text-center">
                          <span className="text-[18px] sm:text-[20px] font-black text-amber-400 tracking-tight mb-1">
                            100%
                          </span>
                          <span className="text-[12.5px] sm:text-[13px] font-bold text-slate-200 leading-tight">
                            Delivery
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. EXPLORE OUR PRODUCTS SECTION (Common Reusable Component)                 */}
      {/* ========================================================================= */}
      <ExploreProductsSection className="py-14 sm:py-18 bg-[#090e1a] border-t border-slate-800" />
      
      {/* 4. WRITE A REVIEW POPUP MODAL (Blur Background) */}
      <WriteReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
      />

    </div>
  );
};

export default TestimonialsPage;
