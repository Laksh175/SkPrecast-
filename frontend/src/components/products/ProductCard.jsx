import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import { navigateTo } from '../../utils/navigation';
import { Button } from '../../common';

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: (i = 0) => ({ 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.45, 
      delay: (i % 6) * 0.06, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  })
};

const ProductCard = ({ product, index = 0, onOpenQuoteModal, onViewDetails }) => {
  const displayNumber = String(index + 1).padStart(2, '0');

  const handleCardClick = (e) => {
    if (product.slug) {
      navigateTo(`/${product.slug}.htm`, e);
    }
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.3, ease: 'easeOut' } 
      }}
      onClick={handleCardClick}
      className="group relative flex flex-col bg-gradient-to-b from-[#131d2e] via-[#111927] to-[#0d1522] rounded-[15px] overflow-hidden border border-slate-800/90 hover:border-amber-400/80 shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:shadow-[0px_2px_20px_2px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer"
    >
      {/* 1. Image Header with Light Sweep Shimmer on Hover */}
      <div className="p-[6px]">
        <div 
          className="block relative h-60 w-full overflow-hidden rounded-[12px] bg-slate-900 cursor-pointer shadow-inner border border-slate-800/60"
          title={product.name}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-[12px] group-hover:scale-108 group-hover:brightness-[1.05] transition-all duration-700 ease-out"
            loading="lazy"
          />

          {/* Light Sweep Shimmer Bar on Hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

          {/* Floating Product Number Watermark */}
          <div className="absolute top-2.5 right-3 text-white/90 font-extrabold text-[11px] bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-[6px] border border-white/15 shadow-sm select-none group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-all duration-300">
            #{displayNumber}
          </div>
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Category Eyebrow with Animated Glow Dot */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 group-hover:bg-amber-300 transition-transform duration-300" />
            <span className="text-[0.68rem] font-[700] uppercase tracking-widest text-amber-400 group-hover:text-amber-300 transition-colors">
              {product.categoryName || 'PRECAST INFRASTRUCTURE'}
            </span>
          </div>

          {/* Product Name (Clickable) */}
          <h2 className="mb-2.5">
            <a
              href={`/${product.slug}.htm`}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(e);
              }}
              className="text-[16px] font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer block text-left w-full"
              title={product.name}
            >
              {product.name}
            </a>
          </h2>

          {/* 2-Line Clean Description */}
          <p className="text-slate-300 text-[14px] leading-relaxed line-clamp-2 min-h-[42px] mb-4" title={product.description}>
            {product.description}
          </p>
        </div>

        {/* 3. Dual Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-3.5 border-t border-slate-800">
          {/* Button 1: View More (Dark Button) */}
          <Button
            variant="view-more"
            size="sm"
            href={`/${product.slug}.htm`}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick(e);
            }}
            icon={<FaArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />}
            iconPosition="right"
          >
            View More
          </Button>

          {/* Button 2: Get Best Price (Gold CTA) */}
          <Button
            variant="gold"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuoteModal(product);
            }}
          >
            Get Best Price
          </Button>
        </div>
      </div>

      {/* 4. Bottom Hover Glow Accent Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
    </motion.div>
  );
};

export default ProductCard;
