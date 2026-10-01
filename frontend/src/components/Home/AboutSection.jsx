import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ReceiptText, PiggyBank } from 'lucide-react';
import { navigateTo } from '../../utils/navigation';
import { aboutHomeSectionData } from '../../data/homeData';
import { Button } from '../../common';

const iconMap = {
  ReceiptText,
  PiggyBank
};

const AboutSection = () => {
  const { tag, heading, paragraph, image, stats, button } = aboutHomeSectionData;

  return (
    <section className="relative pt-4 pb-12 sm:py-12 lg:py-16 bg-white font-sans overflow-hidden">
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber-400/8 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-slate-200/50 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Circular Feature Image with Orbital Orbit Accent (On Mobile: below button) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 lg:col-span-5 flex justify-center items-center pt-2 lg:pt-0"
          >
            <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
              
              {/* Outer Orbital Orbit Ring with Nodes (Continuous Smooth Rotation) */}
              <div className="absolute inset-0 rounded-full border border-slate-200 pointer-events-none animate-[spin_25s_linear_infinite]">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15] ring-4 ring-white" />
                <span className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316] ring-4 ring-white" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15] ring-4 ring-white" />
                <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316] ring-4 ring-white" />
              </div>

              {/* Inner Decorative Subtle Ring */}
              <div className="absolute inset-4 rounded-full border border-dashed border-yellow-400/50 pointer-events-none animate-[spin_60s_linear_infinite]" />

              {/* Main Circular Image Frame */}
              <div className="relative w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] rounded-full overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200/80 group">
                <img 
                  src={image} 
                  alt="About SK Precast Industries" 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Decorative Hand-Drawn Arrow */}
              <div className="absolute -bottom-6 -right-6 hidden sm:block pointer-events-none opacity-80">
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 25C15 35 35 38 48 20" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
                  <path d="M42 16L50 19L47 27" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Content + Stats Cards + Discover Button (On Mobile: above image) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center">
            {/* Top Tag / Pill */}
            <div className="mb-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200/90 shadow-sm">
                {tag}
              </span>
            </div>

            {/* 2-Line Heading with Smooth Continuous Linear Gradient */}
            <div className="mb-5 text-center lg:text-left">
              <h2 className="text-[23px] sm:text-3xl lg:text-[2.25rem] font-extrabold tracking-tight leading-[1.24] text-center lg:text-left">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500 drop-shadow-sm inline-block pb-1">
                  <span className="block">India's Trusted Manufacturer</span>
                  <span className="block">of RCC Precast Solutions</span>
                </span>
              </h2>

              {/* Decorative Underline Accent */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-2.5 mb-1 mx-auto lg:mx-0">
                <span className="h-[2px] w-16 sm:w-24 bg-amber-400 rounded-full" />
                <span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b] shrink-0" />
                <span className="h-[2px] w-16 sm:w-24 bg-amber-400 rounded-full" />
              </div>
            </div>

            {/* Concise About Description */}
            <p className="text-slate-600 text-[17px] leading-[28px] mb-6 sm:mb-8 text-center lg:text-left">
              {paragraph}
            </p>

            {/* 2 Details / Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {stats.map((stat) => {
                const IconComponent = iconMap[stat.icon] || ReceiptText;
                return (
                  <div 
                    key={stat.id}
                    className="p-4 sm:p-5 rounded-[15px] bg-slate-50 border border-slate-200/90 hover:border-yellow-400/80 hover:shadow-lg transition-all duration-300 group text-left">
                    <div className="flex items-center gap-3.5 mb-2">
                      <div className="w-11 h-11 rounded-xl bg-yellow-400/20 text-yellow-800 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#fde047] group-hover:text-slate-950 transition-all shadow-sm">
                        <IconComponent size={20} strokeWidth={2.2} />
                      </div>
                      <div className="text-left">
                        <span className="text-[14px] sm:text-base font-bold uppercase tracking-wider text-slate-500 block leading-snug">
                          {stat.label}
                        </span>
                        <h4 className="text-[14px] sm:text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                          {stat.title}
                        </h4>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-200/70 text-left">
                      <span className={`text-[13px] sm:text-[0.85rem] text-slate-700 ${stat.isMono ? 'font-mono font-bold tracking-wide' : 'font-bold'}`}>
                        {stat.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Discover More CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <Button
                variant="dark-to-gold"
                size="md"
                href={button.link}
                icon={<ArrowRight size={14} />}
                iconPosition="right"
              >
                {button.text}
              </Button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
