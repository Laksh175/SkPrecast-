import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import { navigateTo } from '../../utils/navigation';

import { Button } from '../../common';

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i = 0) => ({ 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.38, 
      delay: (i % 6) * 0.045, 
      ease: [0.22, 1, 0.36, 1] 
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
      animate="visible"
      exit="hidden"
      layout
      whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
      onClick={handleCardClick}
      className="group relative flex flex-col bg-gradient-to-b from-white to-slate-50/80 rounded-[15px] overflow-hidden border border-slate-200/90 hover:border-yellow-400 shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:shadow-[0px_1px_14px_2px_rgba(250,204,21,0.45)] transition-all duration-300 cursor-pointer"
    >
      {/* 1. Image Header matching exact reference */}
      <div className="p-[5px]">
        <div 
          className="block relative h-60 w-full overflow-hidden rounded-[12px] bg-slate-100 cursor-pointer shadow-sm"
          title={product.name}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-[12px] group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Floating Product Number Watermark */}
          <div className="absolute top-2.5 right-3 text-white/40 font-extrabold text-xs bg-slate-900/40 backdrop-blur-sm px-2 py-0.5 rounded-[5px] border border-white/10 select-none">
            #{displayNumber}
          </div>
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Category Eyebrow */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            <span className="text-[0.68rem] font-[700] uppercase tracking-widest text-amber-800">
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
              className="text-[16px] font-semibold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1 cursor-pointer block text-left w-full"
              title={product.name}
            >
              {product.name}
            </a>
          </h2>

          {/* 2-Line Clean Description */}
          <p className="text-slate-600 text-[14px] leading-relaxed line-clamp-2 min-h-[42px] mb-4" title={product.description}>
            {product.description}
          </p>
        </div>

        {/* 3. Dual Action Buttons using Common Button Component */}
        <div className="grid grid-cols-2 gap-3 pt-3.5 border-t border-slate-100">
          {/* Button 1: View More */}
          <Button
            variant="view-more"
            size="sm"
            href={`/${product.slug}.htm`}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick(e);
            }}
            icon={<FaArrowRight size={10} />}
            iconPosition="right"
          >
            View More
          </Button>

          {/* Button 2: Get Best Price */}
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
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
};

export default ProductCard;
