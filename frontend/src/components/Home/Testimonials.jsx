import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa6';
import { testimonialsHeaderData, testimonialsCol1, testimonialsCol2 } from '../../data/homeData';

const TestimonialCard = ({ item }) => {
  return (
    <div className="bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-yellow-400 rounded-[15px] p-5 sm:p-6 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(250,204,21,0.2)] transition-all duration-300 select-none group h-full flex flex-col justify-between">
      <div>
        {/* Top Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <FaStar className="text-yellow-500 text-sm drop-shadow-sm" />
            <span className="text-amber-800 font-extrabold text-sm tracking-wide">
              {item.rating}
            </span>
          </div>
          <FaQuoteLeft className="text-slate-300 group-hover:text-yellow-500/50 text-lg transition-colors" />
        </div>

        {/* Review Content */}
        <p className="text-slate-700 text-[13.5px] sm:text-sm leading-relaxed mb-4 font-normal">
          "{item.content}"
        </p>
      </div>

      <div>
        {/* Divider */}
        <div className="h-[1px] w-full bg-slate-200/80 mb-3.5" />

        {/* User Info with Initials Avatar */}
        <div className="flex items-center gap-3.5">
          {/* Name Initials Circle */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#fde047] via-[#facc15] to-[#eab308] text-slate-950 font-extrabold flex items-center justify-center text-xs sm:text-sm shadow-[0_2px_10px_rgba(250,204,21,0.35)] shrink-0 border border-yellow-300/80 group-hover:scale-105 transition-transform">
            {item.initials}
          </div>

          {/* Name & Role */}
          <div className="overflow-hidden text-left">
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
              {item.name}
            </h4>
            <p className="text-xs text-slate-500 truncate font-medium">
              {item.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { title, highlight, subtitle, stats } = testimonialsHeaderData;
  const allTestimonials = [...testimonialsCol1, ...testimonialsCol2];

  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const isInteractingRef = useRef(false);

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, offsetWidth } = sliderRef.current;
    const index = Math.round(scrollLeft / (offsetWidth * 0.85));
    if (index >= 0 && index < allTestimonials.length) {
      setActiveSlide(index);
    }
  };

  const scrollToSlide = (index) => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.children[index];
    if (card) {
      sliderRef.current.scrollTo({
        left: card.offsetLeft - 16,
        behavior: 'smooth'
      });
      setActiveSlide(index);
    }
  };

  // Mobile Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (isInteractingRef.current) return;
      if (window.innerWidth < 1024) {
        setActiveSlide((prev) => {
          const next = (prev + 1) % allTestimonials.length;
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
    }, 4000);

    return () => clearInterval(interval);
  }, [allTestimonials.length]);

  return (
    <section id="testimonials" className="relative py-10 lg:py-16 bg-white text-slate-900 font-sans overflow-hidden border-t border-slate-200/90">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-yellow-400/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-slate-100 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Heading & Description (Centered on mobile, left on desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-center py-2 text-center lg:text-left"
          >
            <div>
              <div className="inline-block text-center lg:text-left">
                <h2 className="text-[23px] sm:text-3xl lg:text-[2.25rem] font-extrabold tracking-tight leading-[1.3] text-slate-900 mb-2">
                  {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">{highlight}</span>
                </h2>

                {/* Decorative Underline Accent */}
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-2 mb-3.5 mx-auto lg:mx-0">
                  <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
                  <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
                  <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-[17px] leading-[28px] mb-6 text-center lg:text-left">
                {subtitle}
              </p>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/90 mt-4 text-center lg:text-left">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col items-center lg:items-start">
                  <span className={`text-2xl sm:text-3xl font-extrabold ${stat.color}`}>{stat.value}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-0.5">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: MOBILE VIEW (Swipeable Horizontal Carousel with All Reviews) */}
          <div className="block lg:hidden relative w-full pt-2 pb-4">
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              onTouchStart={() => { isInteractingRef.current = true; }}
              onTouchEnd={() => { setTimeout(() => { isInteractingRef.current = false; }, 3000); }}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-2 py-3"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch' 
              }}
            >
              {allTestimonials.map((item) => (
                <div
                  key={`mobile-${item.id}`}
                  className="w-[86vw] max-w-[330px] shrink-0 snap-center min-h-[200px]"
                >
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>

            {/* Pagination Dots for Mobile */}
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {allTestimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => scrollToSlide(dotIdx)}
                  aria-label={`Testimonial ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === dotIdx 
                      ? 'w-6 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' 
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: DESKTOP VIEW (Dual Vertical Infinite Scrolling Columns) */}
          <div className="hidden lg:block lg:col-span-7 relative h-[470px] sm:h-[490px] overflow-hidden">
            
            {/* Top & Bottom Smooth Gradient Fade Masks */}
            <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />

            <div className="grid grid-cols-2 gap-5 h-full">
              
              {/* Column 1: Vertical Infinite Scroll (Upward) */}
              <div className="overflow-hidden relative group/col1">
                <div className="flex flex-col gap-5 animate-marquee-vertical group-hover/col1:[animation-play-state:paused]">
                  {[...testimonialsCol1, ...testimonialsCol1, ...testimonialsCol1].map((item, idx) => (
                    <TestimonialCard key={`col1-${item.id}-${idx}`} item={item} />
                  ))}
                </div>
              </div>

              {/* Column 2: Vertical Infinite Scroll (Downward / Offset Upward) */}
              <div className="overflow-hidden relative group/col2">
                <div className="flex flex-col gap-5 animate-marquee-vertical-reverse group-hover/col2:[animation-play-state:paused]">
                  {[...testimonialsCol2, ...testimonialsCol2, ...testimonialsCol2].map((item, idx) => (
                    <TestimonialCard key={`col2-${item.id}-${idx}`} item={item} />
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
