import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDiamond } from 'react-icons/fa6';
import { productRangeHeaderData, productRangeData } from '../../data/homeData';
import { navigateTo } from '../../utils/navigation';

// Staggered Industrial Reveal Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 45, 
    scale: 0.96 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.65, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

const ProductRange = () => {
  const { title, subtitle } = productRangeHeaderData;

  return (
    <section className="relative pt-4 pb-12 sm:py-16 lg:py-20 bg-theme-pageBg font-sans overflow-hidden">
      <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* Section Title with Smooth Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="text-[23px] sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-normal">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500 drop-shadow-sm inline-block pt-1 pb-2.5 px-1">
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
          <p className="text-slate-600 text-[17px] leading-[28px] max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* 4 Cards Grid with Staggered Industrial Reveal */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {productRangeData.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="group flex flex-col bg-white rounded-[15px] overflow-hidden border border-slate-200 hover:border-yellow-400 hover:shadow-[0px_1px_14px_2px_rgba(250,204,21,0.45)] transition-all duration-300"
            >
              {/* Product Image Header with 5px Spacing & Rounded Corners */}
              <div className="p-[5px]">
                <a 
                  href={`/products#${product.id}`}
                  onClick={(e) => {
                    navigateTo('/products', e);
                    window.location.hash = product.id;
                  }}
                  className="block relative h-56 w-full overflow-hidden rounded-[12px] bg-slate-100 cursor-pointer shadow-sm"
                  title={`View ${product.title}`}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-[12px] group-hover:scale-105 transition-transform duration-500"
                  />
                </a>
              </div>

              {/* Card Body */}
              <div className="flex-1 px-5 pb-5 pt-2 flex flex-col justify-between bg-white">
                <div>
                  {/* Category Title (Clickable) */}
                  <h2 className="mb-4 pb-2 border-b border-slate-100">
                    <a
                      href={`/products#${product.id}`}
                      onClick={(e) => {
                        navigateTo('/products', e);
                        window.location.hash = product.id;
                      }}
                      className="inline-block text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors cursor-pointer"
                    >
                      {product.title}
                    </a>
                  </h2>

                  {/* List of Products (All Clickable with Unique Diamond Bullet) */}
                  <ul className="space-y-2.5">
                    {product.items.map((item, idx) => (
                      <li key={idx}>
                        <a
                          href={`/products#${product.id}`}
                          onClick={(e) => {
                            navigateTo('/products', e);
                            window.location.hash = product.id;
                          }}
                          className="flex items-start gap-2 text-[0.825rem] text-slate-700 font-medium leading-snug group/item hover:text-amber-700 hover:translate-x-1 transition-all cursor-pointer"
                        >
                          <FaDiamond size={8} className="text-yellow-500 mt-1.5 shrink-0 group-hover/item:text-yellow-600 group-hover/item:scale-125 group-hover/item:rotate-45 transition-all duration-300" />
                          <span>{item}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* View All Link (Clickable) */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a
                    href={`/products#${product.id}`}
                    onClick={(e) => {
                      navigateTo('/products', e);
                      window.location.hash = product.id;
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-yellow-600 transition-colors cursor-pointer group-hover:translate-x-1"
                  >
                    <span>+ View all</span>
                    <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ProductRange;
