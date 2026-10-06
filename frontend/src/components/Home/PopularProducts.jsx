import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaRotateRight, FaChevronDown } from 'react-icons/fa6';
import { popularProductsHeaderData, popularProductsData } from '../../data/homeData';
import { usePagination } from '../../hooks';
import { navigateTo } from '../../utils/navigation';
import QuickQuoteModal from '../QuickQuoteModal';
import { Button } from '../../common';

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  }
};

const PopularProducts = () => {
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const { title, subtitle } = popularProductsHeaderData;

  const {
    displayedItems: displayedProducts,
    hasMore,
    isLoadingMore,
    handleLoadMore,
    handleShowLess
  } = usePagination(popularProductsData, 6, 6, 'popular-products-section');

  const handleOpenQuoteModal = (product) => {
    setSelectedQuoteProduct(product);
    setIsQuoteModalOpen(true);
  };

  return (
    <section id="popular-products-section" className="relative pt-8 pb-16 lg:pt-10 lg:pb-20 bg-[#090e1a] font-sans overflow-hidden">
      <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Continuous Linear Gradient */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="text-[23px] sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-normal">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-sm inline-block pt-1 pb-2.5 px-1">
              {title}
            </span>
          </h2>

          {/* Decorative Underline Accent */}
          <div className="flex items-center justify-center gap-2 mt-2.5 mb-3.5 mx-auto">
            <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
            <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
            <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
          </div>

          {/* Subtitle */}
          <p className="text-slate-300 text-[17px] font-medium leading-[28px] max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* 3 Products Per Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence>
            {displayedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
                onClick={(e) => {
                  navigateTo(`/${product.slug}.htm`, e);
                }}
                className="group relative flex flex-col bg-[#111927] rounded-[15px] overflow-hidden border border-slate-800 hover:border-amber-400 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0px_1px_16px_2px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer"
              >
                {/* 1. Image Header with Light Sweep Shimmer on Hover */}
                <div className="p-[6px]">
                  <a 
                    href={`/${product.slug}.htm`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo(`/${product.slug}.htm`, e);
                    }}
                    className="block relative h-60 w-full overflow-hidden rounded-[12px] bg-slate-900 cursor-pointer shadow-inner"
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
                      #{String(index + 1).padStart(2, '0')}
                    </div>
                  </a>
                </div>

                {/* 2. Card Content Body */}
                <div className="flex-1 p-6 flex flex-col justify-between bg-[#111927]">
                  <div>
                    {/* Category Eyebrow with Animated Glow Dot */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 group-hover:bg-amber-300 transition-transform duration-300" />
                      <span className="text-[0.68rem] font-[700] uppercase tracking-widest text-amber-400 group-hover:text-amber-300 transition-colors">
                        {product.categoryName || 'PRECAST INFRASTRUCTURE'}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h2 className="mb-2.5">
                      <a
                        href={`/${product.slug}.htm`}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateTo(`/${product.slug}.htm`, e);
                        }}
                        className="text-[16px] font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer block"
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
                    {/* Button 1: View More */}
                    <Button
                      variant="view-more"
                      size="sm"
                      href={`/${product.slug}.htm`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo(`/${product.slug}.htm`, e);
                      }}
                      icon={<FaArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />}
                      iconPosition="right"
                    >
                      View More
                    </Button>

                    {/* Button 2: Get Best Price */}
                    <Button
                      variant="get-quote"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenQuoteModal(product);
                      }}
                    >
                      Get Best Price
                    </Button>
                  </div>
                </div>

                {/* 4. Bottom Hover Glow Accent Line Animation */}
                <div className="h-[3.5px] w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More / Show Less Button Area */}
        <div className="mt-10 sm:mt-12 text-center">
          {hasMore ? (
            <Button
              variant="dark-to-gold"
              size="sm"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              icon={isLoadingMore ? <FaRotateRight className="animate-spin" /> : <FaChevronDown size={11} />}
              iconPosition="right"
              className="px-6 py-2.5 rounded-full text-xs font-bold tracking-wide"
            >
              {isLoadingMore ? 'Loading Products...' : 'Load More Products'}
            </Button>
          ) : (
            <Button
              variant="light"
              size="sm"
              onClick={handleShowLess}
              className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wide"
            >
              Show Less
            </Button>
          )}
        </div>

      </div>

      {/* Quick Quote Modal Popup Matching Reference Design */}
      <QuickQuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={selectedQuoteProduct}
      />
    </section>
  );
};

export default PopularProducts;
