import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../../utils/navigation';
import { Button, ContactInfoCard, ManufacturingUnitSlider, ExploreProductsSection } from '../../common';
import { ArrowRight, ShieldCheck, Award, CheckCircle2, Globe, Warehouse, Building2, Tag, FileCheck, Eye, Target, Sparkles } from 'lucide-react';
import { aboutCompanyData, missionVisionData, whyChooseUsFactorsData } from '../../data/aboutUsData';

// Icon Map for dynamic icon lookup
const iconComponentMap = { Building2, Globe, Warehouse, ShieldCheck, Tag, FileCheck, Award, Eye, Target };

// ============================================================================
// AWWWARDS & DRIBBBLE INSPIRED CONTINUOUS ANIMATED MISSION/VISION CARD
// ============================================================================
const MissionVisionCard = ({ data, type = 'mission', delay = 0 }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const isMission = type === 'mission';
  const Icon = isMission ? Target : Eye;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, opacity: 1 });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Dynamic responsive 3D pitch/tilt (tilt up/down, left/right)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="relative perspective-[1200px] w-full">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovered ? rotate.x : 0,
          rotateY: isHovered ? rotate.y : 0,
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.03 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 22,
          mass: 0.8
        }}
        className="relative rounded-3xl p-[2px] overflow-hidden group cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
      {/* 1. CONTINUOUS ROTATING PERIMETER NEON GLOW BORDER (Logo Gold / Amber Theme) */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: isMission ? 7 : 8.5,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="absolute -inset-[150%] pointer-events-none z-0 opacity-45 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isMission 
            ? 'conic-gradient(from 0deg, transparent 0deg, #f59e0b 80deg, #fbbf24 125deg, #fef08a 150deg, transparent 200deg, #d97706 290deg, transparent 360deg)'
            : 'conic-gradient(from 0deg, transparent 0deg, #d97706 75deg, #fbbf24 130deg, #fef08a 160deg, transparent 210deg, #f59e0b 300deg, transparent 360deg)'
        }}
      />

      {/* 2. INNER GLASS CARD CONTAINER */}
      <div className="relative z-10 w-full h-full rounded-[22px] bg-gradient-to-br from-[#121926] via-[#0d1422] to-[#070b14] border border-amber-500/20 group-hover:border-amber-500/40 p-7 sm:p-9 pt-9 sm:pt-11 flex flex-col justify-between items-center text-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] group-hover:shadow-[0_25px_60px_rgba(245,158,11,0.25)] transition-all duration-500">
        
        {/* TOP GOLD LIGHT BEAM ACCENT */}
        <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.9)]" />

        {/* 3. CONTINUOUS RADIAL CORNER AMBIENT GLOW */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.35, 0.65, 0.35]
          }}
          transition={{
            duration: isMission ? 5 : 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={`absolute ${isMission ? '-top-10 -right-10' : '-top-10 -left-10'} w-56 h-56 bg-amber-500/15 blur-[60px] pointer-events-none rounded-full`}
        />

        {/* 4. INTERACTIVE MOUSE SPOTLIGHT (Tracks user's cursor) */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
          style={{
            opacity: mousePos.opacity,
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.12), transparent 70%)`
          }}
        />

        {/* 5. CONTINUOUS PERIODIC DIAGONAL LIGHT SWEEP */}
        <motion.div
          animate={{ x: ['-220%', '300%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 2.2,
            repeatDelay: isMission ? 3 : 4,
            delay: isMission ? 0 : 1.5,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute inset-y-0 -left-1/3 w-1/2 -skew-x-25 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent pointer-events-none z-20"
        />

        {/* 6. CONTENT WRAPPER WITH 3D POP */}
        <div className="relative z-20 w-full flex flex-col items-center">
          
          {/* ICON BADGE WITH CONTINUOUS RADAR WAVES & LEVITATION */}
          <div className="relative mb-6 w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center">
            
            {/* Radar Ripple Wave 1 (Continuous) */}
            <motion.div
              animate={{
                scale: [1, 1.7, 2.3],
                opacity: [0.7, 0.3, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeOut'
              }}
              className="absolute inset-0 rounded-2xl border-2 border-amber-400/60 pointer-events-none"
            />

            {/* Radar Ripple Wave 2 (Continuous Staggered) */}
            <motion.div
              animate={{
                scale: [1, 1.7, 2.3],
                opacity: [0.7, 0.3, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1.5,
                ease: 'easeOut'
              }}
              className="absolute inset-0 rounded-2xl border border-amber-300/50 pointer-events-none"
            />

            {/* Ambient Background Aura */}
            <motion.div 
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 rounded-2xl bg-amber-400/30 blur-xl group-hover:bg-amber-400/50 transition-all duration-500" 
            />

            {/* Floating 3D Gold Badge */}
            <motion.div
              animate={{
                y: isMission ? [-4, 4, -4] : [4, -4, 4],
                rotateZ: isMission ? [-2, 2, -2] : [2, -2, 2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#fde047] via-[#facc15] to-[#d97706] text-slate-950 flex items-center justify-center shadow-[0_10px_28px_rgba(245,158,11,0.65)] ring-4 ring-amber-400/40 group-hover:scale-110 transition-transform duration-300 overflow-hidden"
            >
              {/* Internal Glass Reflection Shimmer */}
              <motion.div
                animate={{ x: ['-150%', '200%'] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 1.5,
                  repeatDelay: 2.5,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 -skew-x-20 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
              />
              <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-slate-950 stroke-[2.5] relative z-10 drop-shadow-sm" />
            </motion.div>
          </div>

          {/* TITLE WITH HOVER GLOW */}
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2 group-hover:text-amber-300 transition-colors duration-300 flex items-center justify-center gap-2">
            <span>{data.title}</span>
          </h3>

          {/* CONTINUOUS SHIMMER GRADIENT TAGLINE */}
          <div className="mb-4 inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '200% 50%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="text-xs font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500"
              style={{
                backgroundSize: '200% auto'
              }}
            >
              {data.tagline}
            </motion.span>
          </div>

          {/* PARAGRAPH DESCRIPTION */}
          <p className="text-slate-300 text-[14.5px] sm:text-[15.5px] leading-[26px] font-normal max-w-[96%] mx-auto select-none">
            {data.text}
          </p>

        </div>
      </div>
    </motion.div>
  </div>
  );
};

const AboutContentSection = () => {

  return (
    <section id="about" className="relative pt-8 pb-8 lg:pt-10 lg:pb-12 bg-[#090e1a] font-sans overflow-hidden">
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-400/8 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-slate-800/30 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Header Section: Story Content & Right-Side Contact Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start mb-16 sm:mb-20">
          
          {/* Left Column: Story Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 text-left pt-1">

            {/* Paragraph 1 */}
            <p className="text-slate-300 text-[14px] sm:text-[16px] lg:text-[17px] leading-relaxed sm:leading-[28px] mb-4">
              {aboutCompanyData.paragraph1}
            </p>

            {/* Paragraph 2 */}
            <p className="text-slate-300 text-[14px] sm:text-[16px] lg:text-[17px] leading-relaxed sm:leading-[28px] mb-5">
              {aboutCompanyData.paragraph2}
            </p>

            {/* Our Product Range */}
            <div className="mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                {aboutCompanyData.productRangeHeading}
              </h4>
              <p className="text-slate-300 text-[14px] sm:text-[16px] lg:text-[17px] leading-relaxed sm:leading-[28px]">
                {aboutCompanyData.productRangeText}
              </p>
            </div>

            {/* Contact Us Pill Button */}
            <div>
              <Button
                variant="gold"
                size="md"
                href="#contact"
                icon={<ArrowRight size={14} />}
                iconPosition="right"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Premium Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative flex justify-end"
          >
            <ContactInfoCard className="w-full lg:w-[88%] lg:ml-[25%]" />
          </motion.div>

        </div>

        {/* 2. Our Mission & Our Vision - Awwwards & Dribbble Inspired Ultra-Modern Continuous Animated Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16 sm:mb-24 pt-2">
          
          {/* Card 1: Our Mission */}
          <MissionVisionCard 
            data={missionVisionData.mission}
            type="mission"
            delay={0}
          />

          {/* Card 2: Our Vision */}
          <MissionVisionCard 
            data={missionVisionData.vision}
            type="vision"
            delay={0.15}
          />

        </div>

        {/* 3. Product Categories Section (Common Reusable Component) */}
        <ExploreProductsSection className="mb-12 sm:mb-16 pt-0" containerClassName="w-full" />

        {/* 4. Why Choose Us? Section (Centered Orbital Circle with 3 Left & 3 Right Points on Laptop/Tablet) */}
        {whyChooseUsFactorsData && whyChooseUsFactorsData.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-2 sm:mb-4 pt-2">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-3 lg:gap-8 xl:gap-14 max-w-[1280px] mx-auto">
              
              {/* Left Column: 3 Points (Factors 4, 5, 6) */}
              <div className="flex flex-col gap-3.5 sm:gap-4 md:gap-3.5 lg:gap-5 items-center md:items-end w-full md:w-auto shrink-0 order-2 md:order-1 relative z-10">
                {whyChooseUsFactorsData.slice(3, 6).map((factor, idx) => {
                  const WhyUsIcon = iconComponentMap[factor.iconName] || ShieldCheck;
                  const leftLineClasses = [
                    'w-[40px] md:w-[45px] lg:w-[95px] xl:w-[130px] left-full top-1/2 -translate-y-1/2 origin-left rotate-[16deg]',
                    'w-[25px] md:w-[35px] lg:w-[70px] xl:w-[100px] left-full top-1/2 -translate-y-1/2 origin-left rotate-0',
                    'w-[40px] md:w-[45px] lg:w-[95px] xl:w-[130px] left-full top-1/2 -translate-y-1/2 origin-left -rotate-[16deg]',
                  ][idx] || 'w-[50px] left-full';

                  return (
                    <motion.div
                      key={factor.id}
                      initial={{ opacity: 0, x: -25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="relative z-10 flex items-center justify-start gap-2.5 sm:gap-3 md:gap-2.5 lg:gap-3.5 p-2 sm:p-2.5 md:p-2.5 lg:p-3 pl-2.5 sm:pl-3 pr-3 sm:pr-4 lg:pr-5 rounded-full bg-[#111927] border border-slate-800 shadow-sm hover:border-amber-400 hover:shadow-md hover:scale-[1.02] transition-all duration-300 group cursor-pointer max-w-[340px] md:max-w-[225px] lg:max-w-[310px] xl:max-w-[340px] w-full text-left">
                      {/* Round Icon Badge on Left */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shrink-0 shadow-xs ring-2 ring-amber-500/30 group-hover:scale-110 transition-all z-10">
                        <WhyUsIcon size={16} className="text-slate-950 lg:w-[18px] lg:h-[18px]" />
                      </div>

                      {/* Title */}
                      <h4 className="text-[13px] sm:text-[14px] md:text-[12.5px] lg:text-[15.5px] font-semibold text-slate-200 group-hover:text-amber-400 transition-colors leading-snug z-10">
                        {factor.title}
                      </h4>

                      {/* Connector Line extending from outer right edge of card */}
                      <div className={`hidden md:block absolute ${leftLineClasses} pointer-events-none -z-10`}>
                        <div className="w-full h-[2px] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 shadow-[0_0_8px_#f59e0b]" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Center Column: Symmetrical Orbital Center Hub */}
              <div className="flex justify-center items-center order-1 md:order-2 my-2 md:my-0 shrink-0 relative z-30">
                <div className="relative w-[270px] h-[270px] sm:w-[290px] sm:h-[290px] md:w-[250px] md:h-[250px] lg:w-[330px] lg:h-[330px] flex items-center justify-center">
                  
                  {/* Concentric Orbital Rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/30 pointer-events-none animate-[spin_90s_linear_infinite]" />
                  <div className="absolute inset-[-12px] sm:inset-[-14px] md:inset-[-12px] lg:inset-[-16px] rounded-full border border-amber-500/20 pointer-events-none" />

                  {/* Main Inner Center Dome Card */}
                  <div className="relative w-[230px] h-[230px] sm:w-[250px] sm:h-[250px] md:w-[215px] md:h-[215px] lg:w-[290px] lg:h-[290px] rounded-full bg-gradient-to-br from-[#111927] via-[#162238] to-[#0d1527] border-4 sm:border-[5px] border-slate-800 shadow-2xl flex flex-col justify-center items-center p-4 sm:p-5 md:p-3.5 lg:p-6 text-center z-30 ring-1 ring-slate-700">
                    
                    {/* "Why Choose Us?" Title */}
                    <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-[38px] lg:leading-[40px] font-black text-white tracking-tight leading-[1.12] mb-1.5 sm:mb-2">
                      Why<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">
                        Choose Us?
                      </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="caption-text text-[11px] sm:text-[11.5px] md:text-[11px] lg:text-[12.5px] leading-snug sm:leading-relaxed text-slate-300 max-w-[190px] sm:max-w-[210px] md:max-w-[185px] lg:max-w-[230px] font-normal">
                      We have a vast list of happy clients who believe our company due to the following factors:
                    </p>
                  </div>

                </div>
              </div>

              {/* Right Column: 3 Points (Factors 1, 2, 3) */}
              <div className="flex flex-col gap-3.5 sm:gap-4 md:gap-3.5 lg:gap-5 items-center md:items-start w-full md:w-auto shrink-0 order-3 relative z-10">
                {whyChooseUsFactorsData.slice(0, 3).map((factor, idx) => {
                  const WhyUsIcon = iconComponentMap[factor.iconName] || ShieldCheck;
                  const rightLineClasses = [
                    'w-[40px] md:w-[45px] lg:w-[95px] xl:w-[130px] right-full top-1/2 -translate-y-1/2 origin-right -rotate-[16deg]',
                    'w-[25px] md:w-[35px] lg:w-[70px] xl:w-[100px] right-full top-1/2 -translate-y-1/2 origin-right rotate-0',
                    'w-[40px] md:w-[45px] lg:w-[95px] xl:w-[130px] right-full top-1/2 -translate-y-1/2 origin-right rotate-[16deg]',
                  ][idx] || 'w-[50px] right-full';

                  return (
                    <motion.div
                      key={factor.id}
                      initial={{ opacity: 0, x: 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="relative z-10 flex items-center justify-start gap-2.5 sm:gap-3 md:gap-2.5 lg:gap-3.5 p-2 sm:p-2.5 md:p-2.5 lg:p-3 pl-2.5 sm:pl-3 pr-3 sm:pr-4 lg:pr-5 rounded-full bg-[#111927] border border-slate-800 shadow-sm hover:border-amber-400 hover:shadow-md hover:scale-[1.02] transition-all duration-300 group cursor-pointer max-w-[340px] md:max-w-[225px] lg:max-w-[310px] xl:max-w-[340px] w-full text-left">
                      {/* Round Icon Badge on Left */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shrink-0 shadow-xs ring-2 ring-amber-500/30 group-hover:scale-110 transition-all z-10">
                        <WhyUsIcon size={16} className="text-slate-950 lg:w-[18px] lg:h-[18px]" />
                      </div>

                      {/* Title */}
                      <h4 className="text-[13px] sm:text-[14px] md:text-[12.5px] lg:text-[15.5px] font-semibold text-slate-200 group-hover:text-amber-400 transition-colors leading-snug z-10">
                        {factor.title}
                      </h4>

                      {/* Connector Line extending from outer left edge of card */}
                      <div className={`hidden md:block absolute ${rightLineClasses} pointer-events-none -z-10`}>
                        <div className="w-full h-[2px] bg-gradient-to-l from-amber-400 via-amber-500 to-amber-500 shadow-[0_0_8px_#f59e0b]" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </motion.div>
        )}

      </div>

      {/* 5. Explore Our Range (Continuous Auto-Scrolling Edge-to-Edge Full Width Slider) */}
      <div className="mt-20 sm:mt-24 pt-4 mb-4 relative z-10 w-full">
        {/* Header Row: Title on Left, Description & Button Below it on Right */}
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 mb-8 sm:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left: Title with Decorative Underline */}
            <div className="text-center lg:text-left">
              <div className="inline-block">
                <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">Range</span>
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2 mx-auto">
                  <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
                  <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
                  <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
                </div>
              </div>
            </div>

            {/* Right: Subtitle Text + View All Button directly below paragraph */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 max-w-lg mx-auto lg:mx-0">
              <p className="text-slate-300 text-[17px] font-medium leading-[28px]">
                Explore our successfully engineered precast concrete and boundary wall solutions delivered across industrial and residential sites.
              </p>
              
              <Button
                variant="gold"
                size="md"
                href="#products"
                onClick={(e) => navigateTo('/products.htm', e)}
                icon={<ArrowRight size={14} />}
                iconPosition="right"
              >
                View All
              </Button>
            </div>

          </div>
        </div>

        {/* Common Reusable Manufacturing Unit Images Scroller Track */}
        <ManufacturingUnitSlider showHeader={false} className="pt-2 pb-0" />
      </div>

    </section>
  );
};

export default AboutContentSection;
