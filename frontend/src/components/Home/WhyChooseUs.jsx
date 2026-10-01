import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Factory, ShieldCheck, Zap, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { whyChooseUsHeaderData, whyChooseUsData } from '../../data/homeData';

const iconMap = {
  Factory,
  ShieldCheck,
  Zap,
  Sparkles
};

const WhyChooseUs = () => {
  const { title, subtitle } = whyChooseUsHeaderData;
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const isInteractingRef = useRef(false);

  // Sync active slide index on scroll
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, offsetWidth } = sliderRef.current;
    const index = Math.round(scrollLeft / (offsetWidth * 0.8));
    if (index >= 0 && index < whyChooseUsData.length) {
      setActiveSlide(index);
    }
  };

  const scrollToSlide = (index) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.children[index]?.offsetLeft || 0;
    sliderRef.current.scrollTo({
      left: cardWidth - 16,
      behavior: 'smooth'
    });
    setActiveSlide(index);
  };

  // Auto-play carousel for mobile when user isn't interacting
  useEffect(() => {
    const interval = setInterval(() => {
      if (isInteractingRef.current) return;
      if (window.innerWidth < 768) {
        setActiveSlide((prev) => {
          const next = (prev + 1) % whyChooseUsData.length;
          if (sliderRef.current) {
            const nextChild = sliderRef.current.children[next];
            if (nextChild) {
              sliderRef.current.scrollTo({
                left: nextChild.offsetLeft - 16,
                behavior: 'smooth'
              });
            }
          }
          return next;
        });
      }
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-10 lg:pt-12 lg:pb-20 bg-white font-sans overflow-hidden border-t border-slate-200/90">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-yellow-400/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header (Matching Reference Style) */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto mb-8 sm:mb-12"
        >
          <h2 className="text-[23px] sm:text-3xl lg:text-[2.35rem] font-extrabold tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500 drop-shadow-sm inline-block pt-1 pb-2">
              {title}
            </span>
          </h2>

          {/* Decorative Underline Accent */}
          <div className="flex items-center justify-center gap-2 mt-2 mb-3 mx-auto">
            <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
            <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
            <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
          </div>

          <p className="text-slate-600 text-[17px] leading-[28px] mt-2 font-normal max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* --- MOBILE VIEW: Horizontal Swipeable Carousel (Option 1) --- */}
        <div className="block md:hidden relative pb-4">
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onTouchStart={() => { isInteractingRef.current = true; }}
            onTouchEnd={() => { setTimeout(() => { isInteractingRef.current = false; }, 3000); }}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-3 pt-4 pb-3"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch' 
            }}
          >
            {whyChooseUsData.map((item, idx) => {
              const IconComponent = iconMap[item.iconKey] || Sparkles;
              return (
                <div
                  key={item.id}
                  className="w-[84vw] max-w-[310px] shrink-0 snap-center pt-2"
                >
                  <div className="relative bg-white rounded-[15px] p-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.06)] border border-slate-200/90 transition-all duration-300">
                    
                    {/* Top 3D Dual-Coin Overlapping Sphere Pin */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center z-20 pointer-events-none">
                      <div className="relative flex items-center">
                        <div className={`w-5 h-5 rounded-full ${item.pinBack} -mr-2.5 shadow-inner`} />
                        <div className={`w-7 h-7 rounded-full ${item.pinFront} border-2 border-white flex items-center justify-center relative z-10`}>
                          <div className="w-2 h-2 rounded-full bg-white/45 blur-[0.5px] -translate-x-0.5 -translate-y-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Inner Pastel Colored Card */}
                    <div className={`${item.cardBg} ${item.cardBorder} border rounded-[12px] p-4 pt-5 text-left`}>
                      
                      {/* Icon & Title on same row */}
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(217,119,6,0.3)] ring-1 ring-amber-300/60">
                          <IconComponent size={18} className="text-white drop-shadow-xs" strokeWidth={2.3} />
                        </div>
                        <h3 className="text-[15px] font-bold text-slate-900 tracking-tight leading-snug">
                          {item.title}
                        </h3>
                      </div>

                      {/* Description with 14px font-size */}
                      <p className="text-slate-600 text-[13.5px] leading-relaxed font-normal">
                        {item.description}
                      </p>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator & Swipe Navigation for Mobile */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {whyChooseUsData.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToSlide(dotIdx)}
                aria-label={`Slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === dotIdx 
                    ? 'w-7 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' 
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* --- DESKTOP & TABLET VIEW: Original 2x2 Staggered Floating Cards Grid --- */}
        <div className="hidden md:block relative pb-6 lg:pb-12">
          
          {/* Connecting Dashed Pathway (Desktop only) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1000 540" fill="none" preserveAspectRatio="none">
              <path 
                d="M 270 100 C 440 50, 580 170, 730 190 C 830 200, 420 290, 270 350 C 190 390, 580 420, 740 470" 
                stroke="#cbd5e1" 
                strokeWidth="1.8" 
                strokeDasharray="6 6" 
                className="opacity-75"
              />
            </svg>
          </div>

          {/* 2x2 Staggered & Tilted Cards Grid */}
          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:gap-x-14 lg:gap-y-12 relative z-10 max-w-[840px] mx-auto items-stretch">
            {whyChooseUsData.map((item, idx) => {
              const IconComponent = iconMap[item.iconKey] || Sparkles;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                  className="h-full flex flex-col"
                >
                  <div className={`transform ${item.tilt} ${item.offset} transition-transform duration-300 origin-center h-full flex flex-col`}>
                    <div className="relative bg-white rounded-[15px] p-2.5 sm:p-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-slate-200/90 transition-all duration-300 group max-w-[390px] w-full mx-auto hover:-translate-y-1.5 h-full flex flex-col">
                      
                      {/* Top 3D Dual-Coin Overlapping Sphere Pin */}
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center z-20 pointer-events-none">
                        <div className="relative flex items-center group-hover:scale-110 transition-transform duration-300">
                          {/* Darker Back Coin */}
                          <div className={`w-6 h-6 rounded-full ${item.pinBack} -mr-3 shadow-inner`} />
                          {/* Bright Front Coin */}
                          <div className={`w-8 h-8 rounded-full ${item.pinFront} border-2 border-white flex items-center justify-center relative z-10`}>
                            <div className="w-2.5 h-2.5 rounded-full bg-white/45 blur-[0.5px] -translate-x-1 -translate-y-1" />
                          </div>
                        </div>
                      </div>

                      {/* Inner Pastel Colored Card (Full Height & Equalized) */}
                      <div className={`${item.cardBg} ${item.cardBorder} border rounded-[12px] p-5 sm:p-6 pt-6 sm:pt-7 text-left transition-colors flex-1 flex flex-col justify-start min-h-[190px] sm:min-h-[205px]`}>
                        
                        {/* Icon & Title on same row */}
                        <div className="flex items-center gap-3.5 mb-3">
                          <div className="w-11 h-11 rounded-[11px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 shadow-[0_5px_12px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-2px_3px_rgba(0,0,0,0.18)] ring-1 ring-amber-300/60 group-hover:scale-108 transition-all duration-300">
                            <IconComponent size={20} className="text-white drop-shadow-xs" strokeWidth={2.3} />
                          </div>
                          <h2 className="text-[17px] sm:text-[18px] font-bold text-slate-900 tracking-tight group-hover:text-amber-800 transition-colors leading-snug">
                            {item.title}
                          </h2>
                        </div>

                        {/* Description with 15px font-size */}
                        <p className="text-slate-600 text-[15px] leading-relaxed font-normal flex-1">
                          {item.description}
                        </p>

                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
