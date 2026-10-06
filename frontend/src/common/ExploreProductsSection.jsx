import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Shield, Landmark, PlusCircle, Sparkles, Layers, Box, Factory, Home, Plus, Minus, X, ArrowRight } from 'lucide-react';
import { dropdownCategoriesData, standaloneProductsData } from '../data/aboutUsData';
import { navigateTo } from '../utils/navigation';

// Icon Map for dynamic icon lookup
const iconComponentMap = { Building2, Shield, Landmark, PlusCircle, Sparkles, Layers, Box, Factory, Home, };

/**
 * Reusable "Explore Our Products" Section
 * Displays category cards with animated accordion-style tray for subproducts,
 * and 5 standalone product cards in the second row.
 */
const ExploreProductsSection = ({
  showHeader = true,
  title = 'Explore Our',
  highlightText = 'Products',
  className = 'py-12 sm:py-16',
  containerClassName = 'max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8',
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const activeDropdownData = dropdownCategoriesData.find((d) => d.id === openDropdown);

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <section className={`w-full ${className}`}>
      <div className={containerClassName}>
        {/* Section Header */}
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight leading-tight">
              {title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">
                {highlightText}
              </span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2 mb-2 mx-auto">
              <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
              <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
              <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
            </div>
          </div>
        )}

        {/* LINE 1: 4 Dropdown Categories in One Line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-6xl mx-auto mb-4">
          {dropdownCategoriesData.map((cat) => {
            const isOpen = openDropdown === cat.id;
            const CatIcon = iconComponentMap[cat.iconName] || Building2;
            return (
              <button
                key={cat.id}
                onClick={() => toggleDropdown(cat.id)}
                className={`w-full p-4 rounded-[12px] flex items-center justify-between font-bold text-sm sm:text-[15px] transition-all duration-300 shadow-lg border cursor-pointer group ${
                  isOpen
                    ? 'bg-[#1a2942] text-white border-amber-400/80 shadow-[0_10px_25px_rgba(245,158,11,0.2)] ring-2 ring-amber-400/50'
                    : 'bg-[#111927] text-slate-200 border-slate-800 hover:border-amber-400/50 hover:bg-[#162238] hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-xs'
                        : 'bg-amber-500/20 text-amber-300 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-slate-950 group-hover:shadow-xs'
                    }`}>
                    <CatIcon size={20} />
                  </div>
                  <div className="text-left">
                    <span
                      className={`block font-bold leading-snug transition-colors ${
                        isOpen ? 'text-white' : 'text-slate-100 group-hover:text-amber-300'
                      }`}>
                      {cat.title}
                    </span>
                    <span
                      className={`text-[12px] font-normal transition-colors ${
                        isOpen ? 'text-amber-300' : 'text-slate-400 group-hover:text-amber-400/80'
                      }`}>
                      {cat.count}
                    </span>
                  </div>
                </div>

                {/* Plus / Minus indicator button */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 text-slate-400 group-hover:bg-amber-500/20 group-hover:text-amber-300'
                  }`}
                >
                  {isOpen ? <Minus size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Collapsible Dropdown Product Menu Tray */}
        <AnimatePresence>
          {activeDropdownData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden max-w-6xl mx-auto mb-6">
              <div className="p-5 sm:p-7 rounded-[14px] bg-[#0d1527] border-2 border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
                {/* Tray Top Header */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <h4 className="text-base sm:text-lg font-bold text-slate-100">
                      {activeDropdownData.title}{' '}
                      <span className="text-slate-400 font-normal text-sm">
                        ({activeDropdownData.count})
                      </span>
                    </h4>
                  </div>
                  <button
                    onClick={() => setOpenDropdown(null)}
                    className="text-xs font-bold text-slate-300 hover:text-amber-300 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#162238] border border-slate-700 hover:border-amber-400 transition-colors cursor-pointer"
                  >
                    <X size={13} />
                    <span>Close</span>
                  </button>
                </div>

                {/* All Product Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                  {activeDropdownData.products.map((prod) => (
                    <a
                      key={prod.id}
                      href={prod.link}
                      onClick={(e) => navigateTo(prod.link, e)}
                      className="p-3 sm:p-3.5 rounded-[12px] bg-[#162238] border border-slate-700/60 hover:border-amber-400/60 hover:shadow-lg hover:bg-slate-800 transition-all flex items-center justify-between text-left group cursor-pointer"
                    >
                      <span className="text-[13.5px] sm:text-[14px] font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                        {prod.title}
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 ml-2"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LINE 2: 5 Standalone Product Cards in One Line */}
        <div className="max-w-6xl mx-auto mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {standaloneProductsData.map((prod, idx) => {
              const ProdIcon = iconComponentMap[prod.iconName] || Building2;
              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="h-full"
                >
                  <a
                    href={prod.link}
                    onClick={(e) => navigateTo(prod.link, e)}
                    className="w-full h-full p-4 rounded-[12px] flex items-center gap-3 font-bold text-sm sm:text-[14px] transition-all duration-300 shadow-md border border-slate-800 bg-[#111927] text-slate-200 hover:border-amber-400/50 hover:bg-[#162238] hover:-translate-y-0.5 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-[12px] bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-slate-950 transition-all shadow-xs">
                      <ProdIcon size={20} />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <span className="block font-bold leading-snug text-slate-200 group-hover:text-amber-300 transition-colors line-clamp-2">
                        {prod.title}
                      </span>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreProductsSection;
