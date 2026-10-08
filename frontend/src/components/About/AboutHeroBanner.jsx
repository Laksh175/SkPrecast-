import React from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../../utils/navigation';
import { ShieldCheck, Award, MapPin, Building2, ChevronRight } from 'lucide-react';
import { aboutHeroData } from '../../data/aboutUsData';

const heroIconMap = {
  Building2,
  Award,
  ShieldCheck,
  MapPin
};

const AboutHeroBanner = () => {
  const { breadcrumbs, title, subtitle, highlights } = aboutHeroData;

  return (
    <section className="relative bg-theme-heroNavy text-white pt-16 pb-20 overflow-hidden border-b border-amber-500/30 font-sans">
      {/* Background Banner Image Clearly Visible */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/assets/images/hero-page-banner.jpeg" 
          alt="SK Precast Industries Hero Banner" 
          className="w-full h-full object-cover object-center opacity-85"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090e1a]/70 via-[#090e1a]/40 to-[#090e1a]" />
      </div>

      {/* 1. Subtle Architectural Dot Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none z-1"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}/>

      {/* 2. Ambient Gradient Glows */}
      <div className="absolute -top-24 left-1/3 w-96 h-96 bg-amber-500/15 blur-[120px] pointer-events-none rounded-full z-1" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full z-1" />

      {/* 3. Top Gold Highlight Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.6)] z-1" />

      <div className="max-w-[1260px] mx-auto px-6 relative z-10 text-center">
        {/* Breadcrumb (Clean & Bigger Font without background square box) */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 text-sm sm:text-base font-semibold text-slate-300 mb-6">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.path}>
              {idx > 0 && <ChevronRight size={17} strokeWidth={2.5} className="text-amber-400/90 shrink-0" />}
              {idx === breadcrumbs.length - 1 ? (
                <span className="text-amber-400 font-bold">{crumb.label}</span>
              ) : (
                <a 
                  href={crumb.path} 
                  onClick={(e) => navigateTo(crumb.path, e)}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {crumb.label}
                </a>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Main Heading with Gradient Text */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="text-[30px] font-extrabold tracking-tight leading-tight mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-400 drop-shadow-sm">
            {title}
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
          className="max-w-3xl mx-auto text-slate-300 text-[15px] font-medium leading-[26px]">
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHeroBanner;
