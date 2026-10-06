import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { heroSectionData } from '../../data/homeData';

const HeroSection = () => {
  const { 
    badge, 
    heading, 
    description, 
    whatsappButton, 
    bgImage, 
    highlights 
  } = heroSectionData;

  return (
    <div className="relative w-full bg-[#090e1a] font-sans">
      {/* Hero Section Container */}
      <section 
        className="relative flex flex-col justify-between overflow-visible bg-[#090e1a] pt-8 sm:pt-12 lg:pt-14 pb-28 sm:pb-32 lg:pb-36"
        aria-label="SK Precast Industries Hero"
      >
        {/* Background Layer: High Quality Image + Architectural Lighting Design */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={bgImage} 
            alt="Precast Concrete Compound and Boundary Wall by SK Precast Industries" 
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          
          {/* Dynamic Architectural Gradient Lighting */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#33353b]/70 via-[#33353b]/30 to-[#2a2e38] z-10" />
          
          {/* Central Warm Amber Spotlight / Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(245,158,11,0.15)_0%,_transparent_65%)] z-10 pointer-events-none" />

          {/* Architectural Blueprint Micro-Grid Overlay */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] z-10 pointer-events-none opacity-40"
          />

          {/* Bottom Curved SVG Mask matching dark background */}
          <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden leading-none pointer-events-none">
            <svg 
              viewBox="0 0 1440 120" 
              className="w-full h-14 sm:h-20 lg:h-[6rem] text-[#090e1a] fill-current block"
              preserveAspectRatio="none"
            >
              <path d="M 0,0 L 160,0 C 240,0 260,110 340,110 L 1100,110 C 1180,110 1200,0 1280,0 L 1440,0 L 1440,120 L 0,120 Z" />
            </svg>
          </div>
        </div>

        {/* Hero Main Content Container */}
        <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center text-center">
          
          {/* Top Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative inline-flex items-center gap-2 px-3.5 sm:px-6 py-1.5 sm:py-[5px] rounded-[10px] sm:rounded-[12px] bg-[#111927]/90 backdrop-blur-md text-amber-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-amber-400/50 mb-3 sm:mb-4 overflow-hidden group cursor-default max-w-[95%] sm:max-w-none"
          >
            {/* Animated Light Beam Shimmer Sweep */}
            <div className="absolute inset-0 -top-1 -bottom-1 pointer-events-none overflow-hidden">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-badge-shimmer pointer-events-none" />
            </div>

            {/* Single Sparkles Icon in Amber */}
            <div className="flex items-center justify-center text-amber-400 shrink-0 relative z-10">
              <Sparkles size={16} className="fill-amber-400/30 shrink-0" />
            </div>

            {/* Badge Text */}
            <span className="text-[12px] sm:text-[15px] sm:text-[16px] font-bold text-amber-200 tracking-tight relative z-10 leading-tight">
              {badge}
            </span>
          </motion.div>

          {/* SEO-Optimized Primary H1 Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            style={{ lineHeight: 1.08, letterSpacing: '-0.025em' }}
            className="text-[28px] sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-extrabold text-white leading-[1.08] tracking-tight mb-4 max-w-5xl xl:max-w-6xl drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] text-center flex flex-col gap-0.5 sm:gap-1"
          >
            <span className="block" style={{ lineHeight: 1.08 }}>
              {heading.line1}
            </span>
            <span className="block" style={{ lineHeight: 1.08 }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                {heading.line2}
              </span>
            </span>
            <span className="block text-white/95" style={{ lineHeight: 1.08 }}>
              {heading.line3}
            </span>
          </motion.h1>

          {/* Clean Continuous Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-slate-200 text-[15px] sm:text-base md:text-[16.5px] lg:text-[17.5px] xl:text-[18px] leading-relaxed md:leading-[1.65] mb-4 sm:mb-6 max-w-3xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] px-1 sm:px-0 text-center"
          >
            {description}
          </motion.p>

          {/* Dual-Tone Pill WhatsApp CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="flex justify-center w-full mb-6 sm:mb-8"
          >
            <a 
              href={whatsappButton.link}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center rounded-full bg-[#111927] shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_45px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 p-[2px] sm:p-1 cursor-pointer overflow-hidden border border-slate-700/80"
              title="Chat with us on WhatsApp"
            >
              {/* Left Circular Icon Container */}
              <div className="flex items-center justify-center pl-1 sm:pl-1.5 pr-2 sm:pr-2.5 py-1 bg-[#111927] rounded-l-full">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#16a34a] group-hover:bg-[#22c55e] flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-all duration-300">
                  <FaWhatsapp size={23} className="text-white drop-shadow-sm sm:scale-110" />
                </div>
              </div>

              {/* Right Golden Pill Section with Text */}
              <div className="flex items-center justify-center px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 group-hover:from-yellow-300 group-hover:to-amber-400 rounded-full text-slate-950 font-bold text-xs sm:text-base tracking-tight transition-all duration-300">
                <span>{whatsappButton.text}</span>
              </div>
            </a>
          </motion.div>

        </div>

        {/* 4-Column Floating Stats Card */}
        <div className="absolute -bottom-14 sm:-bottom-12 md:-bottom-12 lg:-bottom-16 left-0 right-0 z-30 px-3.5 sm:px-6 pointer-events-auto">
          <div className="max-w-[1080px] mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
              className="bg-[#111927] rounded-[15px] shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-slate-800 p-3.5 sm:p-5 md:p-6 lg:p-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 items-center">
                {highlights.map((item, index) => (
                  <div 
                    key={item.id}
                    className="relative flex flex-col items-center justify-center text-center p-3 sm:p-4 md:px-4 lg:px-6 group hover:-translate-y-0.5 transition-transform duration-200"
                  >
                    {/* Subtle centered divider on desktop */}
                    {index !== 0 && (
                      <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-12 lg:h-14 bg-slate-800" />
                    )}

                    {/* Subtle centered vertical divider on mobile */}
                    {index % 2 === 1 && (
                      <div className="block md:hidden absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-slate-800" />
                    )}

                    {/* Subtle horizontal line between row 1 and row 2 on mobile */}
                    {index >= 2 && (
                      <div className="block md:hidden absolute top-0 left-3 right-3 h-[1px] bg-slate-800" />
                    )}

                    {/* 2-Line Title */}
                    <span className="text-sm sm:text-base md:text-lg lg:text-[1.65rem] font-extrabold text-amber-400 tracking-tight leading-[1.15] mb-0.5 sm:mb-1 flex flex-col items-center justify-center">
                      <span>{item.line1}</span>
                      <span>{item.line2}</span>
                    </span>
                    {/* Description Label */}
                    <span className="text-[11px] sm:text-xs md:text-sm lg:text-[15px] text-slate-300 font-medium leading-snug">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* Spacing spacer below hero to accommodate the bottom overlap of the floating card without colliding with next section */}
      <div className="w-full h-16 sm:h-16 md:h-16 lg:h-24 bg-[#090e1a]" />
    </div>
  );
};

export default HeroSection;
