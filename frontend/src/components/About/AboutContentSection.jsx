import React from 'react';
import { motion } from 'framer-motion';
import { navigateTo } from '../../utils/navigation';
import { Button, ContactInfoCard, ManufacturingUnitSlider, ExploreProductsSection } from '../../common';
import { ArrowRight, ShieldCheck, Award, CheckCircle2, Globe, Warehouse, Building2, Tag, FileCheck, Eye, Target } from 'lucide-react';
import { aboutCompanyData, missionVisionData, whyChooseUsFactorsData } from '../../data/aboutUsData';

// Icon Map for dynamic icon lookup
const iconComponentMap = { Building2, Globe, Warehouse, ShieldCheck, Tag, FileCheck, Award, Eye, Target };

const AboutContentSection = () => {

  return (
    <section id="about" className="relative pt-8 pb-8 lg:pt-10 lg:pb-12 bg-white font-sans overflow-hidden">
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-400/8 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-slate-200/50 blur-[100px] pointer-events-none rounded-full" />

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
            <p className="text-slate-600 text-[14px] sm:text-[16px] lg:text-[17px] leading-relaxed sm:leading-[28px] mb-4">
              {aboutCompanyData.paragraph1}
            </p>

            {/* Paragraph 2 */}
            <p className="text-slate-600 text-[14px] sm:text-[16px] lg:text-[17px] leading-relaxed sm:leading-[28px] mb-5">
              {aboutCompanyData.paragraph2}
            </p>

            {/* Our Product Range */}
            <div className="mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-1.5">
                {aboutCompanyData.productRangeHeading}
              </h4>
              <p className="text-slate-600 text-[14px] sm:text-[16px] lg:text-[17px] leading-relaxed sm:leading-[28px]">
                {aboutCompanyData.productRangeText}
              </p>
            </div>

            {/* Contact Us Pill Button */}
            <div>
              <Button
                variant="dark-to-gold"
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

        {/* 2. Our Mission & Our Vision - Custom Template with Pill Headers & Dashed Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16 sm:mb-24 pt-4">
          
          {/* Card 1: Our Mission (Slides in from Left) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[15px] p-7 sm:p-9 pt-12 sm:pt-14 bg-white border-2 border-dashed border-slate-300 hover:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
            {/* Top Pill Header (Floating on top border) */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-7 sm:px-9 py-2 rounded-[5px] bg-slate-900 text-white font-bold text-sm sm:text-base tracking-wide shadow-md shadow-slate-900/20 border border-slate-700 whitespace-nowrap">
              {missionVisionData.mission.title}
            </div>

            {/* Centered Circular Target Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/20 mb-5 group-hover:scale-105 transition-transform duration-300 ring-4 ring-slate-100">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 stroke-[2.2]" />
            </div>

            {/* Paragraph Text */}
            <p className="text-slate-600 text-[17px] leading-[28px] max-w-[92%] mx-auto">
              {missionVisionData.mission.text}
            </p>
          </motion.div>

          {/* Card 2: Our Vision (Slides in from Right) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[15px] p-7 sm:p-9 pt-12 sm:pt-14 bg-white border-2 border-dashed border-amber-300 hover:border-amber-500 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
            {/* Top Pill Header (Floating on top border) */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-7 sm:px-9 py-2 rounded-[5px] bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-white font-bold text-sm sm:text-base tracking-wide shadow-md shadow-amber-500/20 border border-amber-300/50 whitespace-nowrap">
              {missionVisionData.vision.title}
            </div>

            {/* Centered Circular Eye Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 mb-5 group-hover:scale-105 transition-transform duration-300 ring-4 ring-amber-100">
              <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-white stroke-[2.2]" />
            </div>

            {/* Paragraph Text */}
            <p className="text-slate-600 text-[17px] leading-[28px] max-w-[92%] mx-auto">
              {missionVisionData.vision.text}
            </p>
          </motion.div>

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
              
              {/* Left Column: 3 Points (Factors 4, 5, 6 - Well-structured, Realistic price, Expedient business) */}
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
                      className="relative z-10 flex items-center justify-start gap-2.5 sm:gap-3 md:gap-2.5 lg:gap-3.5 p-2 sm:p-2.5 md:p-2.5 lg:p-3 pl-2.5 sm:pl-3 pr-3 sm:pr-4 lg:pr-5 rounded-full bg-white border border-slate-200/90 shadow-sm hover:border-amber-400 hover:shadow-md hover:scale-[1.02] transition-all duration-300 group cursor-pointer max-w-[340px] md:max-w-[225px] lg:max-w-[310px] xl:max-w-[340px] w-full text-left">
                      {/* Round Icon Badge on Left */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shrink-0 shadow-xs ring-2 ring-amber-100 group-hover:scale-110 group-hover:ring-amber-200 transition-all z-10">
                        <WhyUsIcon size={16} className="text-slate-950 lg:w-[18px] lg:h-[18px]" />
                      </div>

                      {/* Title */}
                      <h4 className="text-[13px] sm:text-[14px] md:text-[12.5px] lg:text-[15.5px] font-semibold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug z-10">
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
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-300/60 pointer-events-none animate-[spin_90s_linear_infinite]" />
                  <div className="absolute inset-[-12px] sm:inset-[-14px] md:inset-[-12px] lg:inset-[-16px] rounded-full border border-amber-200/40 pointer-events-none" />

                  {/* Main Inner Center Dome Card */}
                  <div className="relative w-[230px] h-[230px] sm:w-[250px] sm:h-[250px] md:w-[215px] md:h-[215px] lg:w-[290px] lg:h-[290px] rounded-full bg-gradient-to-br from-[#fffdf5] via-[#fffbeb] to-[#fef3c7] border-4 sm:border-[5px] border-white shadow-2xl flex flex-col justify-center items-center p-4 sm:p-5 md:p-3.5 lg:p-6 text-center z-30 ring-1 ring-amber-200/80">
                    
                    {/* "Why Choose Us?" Title */}
                    <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-[38px] lg:leading-[40px] font-black text-slate-900 tracking-tight leading-[1.12] mb-1.5 sm:mb-2">
                      Why<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">
                        Choose Us?
                      </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="caption-text text-[11px] sm:text-[11.5px] md:text-[11px] lg:text-[12.5px] leading-snug sm:leading-relaxed text-slate-600 max-w-[190px] sm:max-w-[210px] md:max-w-[185px] lg:max-w-[230px] font-normal">
                      We have a vast list of happy clients who believe our company due to the following factors:
                    </p>
                  </div>

                </div>
              </div>

              {/* Right Column: 3 Points (Factors 1, 2, 3 - Massive network, Large warehouse, Wide range) */}
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
                      className="relative z-10 flex items-center justify-start gap-2.5 sm:gap-3 md:gap-2.5 lg:gap-3.5 p-2 sm:p-2.5 md:p-2.5 lg:p-3 pl-2.5 sm:pl-3 pr-3 sm:pr-4 lg:pr-5 rounded-full bg-white border border-slate-200/90 shadow-sm hover:border-amber-400 hover:shadow-md hover:scale-[1.02] transition-all duration-300 group cursor-pointer max-w-[340px] md:max-w-[225px] lg:max-w-[310px] xl:max-w-[340px] w-full text-left">
                      {/* Round Icon Badge on Left */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shrink-0 shadow-xs ring-2 ring-amber-100 group-hover:scale-110 group-hover:ring-amber-200 transition-all z-10">
                        <WhyUsIcon size={16} className="text-slate-950 lg:w-[18px] lg:h-[18px]" />
                      </div>

                      {/* Title */}
                      <h4 className="text-[13px] sm:text-[14px] md:text-[12.5px] lg:text-[15.5px] font-semibold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug z-10">
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
                <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">Range</span>
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
              <p className="text-slate-600 text-[17px] leading-[28px]">
                Explore our successfully engineered precast concrete and boundary wall solutions delivered across industrial and residential sites.
              </p>
              
              <Button
                variant="dark-to-gold"
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
