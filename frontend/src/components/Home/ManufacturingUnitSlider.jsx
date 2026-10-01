import React from 'react';
import { motion } from 'framer-motion';
import { manufacturingSliderHeaderData, manufacturingSliderData } from '../../data/homeData';
import { useInfiniteSlider } from '../../hooks';

const ManufacturingUnitSlider = () => {
  const { title, subtitle } = manufacturingSliderHeaderData;
  const { sliderRef, isDragging, containerHandlers, sliderHandlers } = useInfiniteSlider({ speed: 0.85 });

  // Triple the items for continuous seamless infinite looping
  const displayItems = [...manufacturingSliderData, ...manufacturingSliderData, ...manufacturingSliderData];

  return (
    <section className="relative pt-4 pb-8 sm:py-12 lg:py-16 bg-white font-sans overflow-hidden border-y border-slate-200/80">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-slate-100/80 blur-[100px] pointer-events-none rounded-full" />

      {/* Header Container - Centered Title & Description */}
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-5 sm:mb-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Title with Continuous Linear Gradient */}
          <h2 className="text-[23px] sm:text-3xl lg:text-[2.6rem] font-extrabold tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500 drop-shadow-sm inline-block pt-1 pb-1 sm:pb-2">
              {title}
            </span>
          </h2>

          {/* Decorative Underline Accent */}
          <div className="flex items-center justify-center gap-2 mt-1.5 sm:mt-2 mb-2 sm:mb-3 mx-auto">
            <span className="h-[2px] w-14 sm:w-28 rounded-full title-accent-bar" />
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full title-accent-dot shrink-0" />
            <span className="h-[2px] w-14 sm:w-28 rounded-full title-accent-bar" />
          </div>

          {/* 2-Line Description */}
          <p className="text-slate-600 text-[17px] leading-[28px] max-w-3xl mx-auto px-2">
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Full-Width Edge-To-Edge Scrollable Slider Track */}
      <div 
        className="relative w-full overflow-hidden select-none"
        {...containerHandlers}
      >
        <div
          ref={sliderRef}
          {...sliderHandlers}
          className={`flex items-center gap-3.5 sm:gap-6 overflow-x-auto no-scrollbar px-3 sm:px-8 lg:px-12 py-2 sm:py-4 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          {displayItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="group relative h-44 sm:h-64 md:h-72 lg:h-[320px] w-[210px] sm:w-[320px] md:w-[400px] lg:w-[460px] shrink-0 rounded-xl sm:rounded-[15px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_35px_rgba(250,204,21,0.35)] border border-slate-200/90 hover:border-yellow-400 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Facility Image */}
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ManufacturingUnitSlider;
