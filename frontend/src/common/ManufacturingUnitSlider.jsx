import React from 'react';
import { motion } from 'framer-motion';
import { manufacturingSliderHeaderData, manufacturingSliderData } from '../data/homeData';
import { useInfiniteSlider } from '../hooks';

/**
 * Common Reusable Manufacturing Unit Image Scroller / Slider Component
 * Single source of truth for the 6 Palwal manufacturing plant photos scroller.
 * Can be used on Home page (with default header) or embedded in About Us page (with showHeader={false}).
 */
const ManufacturingUnitSlider = ({
  title = manufacturingSliderHeaderData.title,
  subtitle = manufacturingSliderHeaderData.subtitle,
  showHeader = true,
  items = manufacturingSliderData,
  className = ''
}) => {
  const { sliderRef, isDragging, containerHandlers, sliderHandlers } = useInfiniteSlider({ speed: 0.85 });

  // Triple the items for continuous seamless infinite looping
  const displayItems = items && items.length > 0
    ? [...items, ...items, ...items]
    : [...manufacturingSliderData, ...manufacturingSliderData, ...manufacturingSliderData];

  const sliderTrack = (
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
            key={`${item.id || index}-${index}`}
            className="group relative h-44 sm:h-64 md:h-72 lg:h-[320px] w-[210px] sm:w-[320px] md:w-[400px] lg:w-[460px] shrink-0 rounded-xl sm:rounded-[15px] overflow-hidden shadow-xl hover:shadow-[0_16px_35px_rgba(250,204,21,0.35)] border border-slate-800 hover:border-yellow-400 bg-[#111927] transition-all duration-500 hover:-translate-y-1"
          >
            {/* Facility Image */}
            <img
              src={item.image}
              alt={item.alt || `SK Precast Palwal Unit ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
              draggable={false}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (!showHeader) {
    return (
      <div className={`w-full overflow-hidden ${className}`}>
        {sliderTrack}
      </div>
    );
  }

  return (
    <section className={`relative pt-2 pb-6 sm:py-8 lg:py-10 bg-[#090e1a] font-sans overflow-hidden ${className}`}>
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-300 to-yellow-400 drop-shadow-sm inline-block pt-1 pb-1 sm:pb-2">
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
          {subtitle && (
            <p className="caption-text text-slate-300 text-[15px] sm:text-[16px] leading-[26px] sm:leading-[28px] max-w-3xl mx-auto px-2 font-medium">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      {/* Full-Width Edge-To-Edge Scrollable Slider Track */}
      {sliderTrack}

    </section>
  );
};

export default ManufacturingUnitSlider;
