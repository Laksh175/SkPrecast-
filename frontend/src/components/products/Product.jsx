import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Layers,
  ShieldCheck,
  Building2,
  CheckCircle2,
  X,
  PhoneCall,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { FaRotateRight, FaChevronDown, FaChevronUp, FaWhatsapp } from 'react-icons/fa6';
import { allProductsData, productCategoriesData } from '../../data/productsData';
import { navigateTo } from '../../utils/navigation';
import ProductCard from './ProductCard';
import CompoundWallCard from './CompoundWallCard';
import ProductDetailModal from './ProductDetailModal';
import QuickQuoteModal from '../QuickQuoteModal';
import { Button } from '../../common';

const ITEMS_PER_PAGE = 6;

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
  const searchInputRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Auto-center the active category tab when selectedCategory changes
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeBtn = tabsContainerRef.current.querySelector(`[data-category="${selectedCategory}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedCategory]);

  // Modals state
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Check URL hash / pathname for category filtering if user arrived from deep link
  useEffect(() => {
    const handleUrlSync = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      const path = window.location.pathname.toLowerCase().replace('/', '').replace('.htm', '');

      const categories = ['compound-wall', 'boundary-wall', 'cement-wall', 'other-products'];
      if (categories.includes(hash)) {
        setSelectedCategory(hash);
      } else if (categories.includes(path)) {
        setSelectedCategory(path);
      } else {
        setSelectedCategory('all');
      }
    };
    handleUrlSync();
    window.addEventListener('hashchange', handleUrlSync);
    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('app-navigate', handleUrlSync);
    return () => {
      window.removeEventListener('hashchange', handleUrlSync);
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('app-navigate', handleUrlSync);
    };
  }, []);

  // Filtered Products based on Category & Search
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allProductsData.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      if (!q) return matchesCategory;

      // 1. Direct name match (e.g. "Readymade", "RCC", "Folding", "Wall")
      const nameMatch = product.name.toLowerCase().includes(q);

      // 2. Category match
      const categoryMatch = (product.categoryName || '').toLowerCase().includes(q);

      // 3. Description match for queries with 3+ characters (word-based to avoid false substring matches)
      const descMatch = q.length >= 3 && product.description.toLowerCase().split(/\s+/).some(word => word.startsWith(q));

      return matchesCategory && (nameMatch || categoryMatch || descMatch);
    });
  }, [selectedCategory, searchQuery]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    setCategoryVisibleCounts({
      'compound-wall': 6,
      'boundary-wall': 6,
      'cement-wall': 6,
      'other-products': 6
    });
  }, [selectedCategory, searchQuery]);

  // Per-category visible counts for "All Products" section
  const [categoryVisibleCounts, setCategoryVisibleCounts] = useState({
    'compound-wall': 6,
    'boundary-wall': 6,
    'cement-wall': 6,
    'other-products': 6
  });

  const handleLoadMoreCategory = (catId) => {
    setCategoryVisibleCounts(prev => ({
      ...prev,
      [catId]: (prev[catId] || 6) + 6
    }));
  };

  const handleShowLessCategory = (catId) => {
    setCategoryVisibleCounts(prev => ({
      ...prev,
      [catId]: 6
    }));
  };

  // Grouped products by category for "All Products" section
  const groupedProducts = useMemo(() => {
    const groups = {};
    productCategoriesData.filter(c => c.id !== 'all').forEach(cat => {
      groups[cat.id] = filteredProducts.filter(p => p.category === cat.id);
    });
    return groups;
  }, [filteredProducts]);

  const totalDisplayedInAll = useMemo(() => {
    return Object.keys(groupedProducts).reduce((acc, catId) => {
      const total = groupedProducts[catId]?.length || 0;
      const visible = Math.min(total, categoryVisibleCounts[catId] || 6);
      return acc + visible;
    }, 0);
  }, [groupedProducts, categoryVisibleCounts]);

  // Handle Category Switching with Smooth Scroll to Top of Products Section
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setVisibleCount(ITEMS_PER_PAGE);
    
    setTimeout(() => {
      const section = document.getElementById('products-grid-section');
      if (section) {
        const headerOffset = 110;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 40);
  };

  // Paginated items (Show all directly for All Products view)
  const displayedProducts = selectedCategory === 'all' ? filteredProducts : filteredProducts.slice(0, visibleCount);
  const hasMore = selectedCategory !== 'all' && visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 300);
  };

  const handleShowLess = () => {
    setVisibleCount(ITEMS_PER_PAGE);
    const section = document.getElementById('products-grid-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuote = (product) => {
    setSelectedQuoteProduct(product);
    setIsQuoteModalOpen(true);
  };

  const handleOpenDetail = (product) => {
    if (product?.slug) {
      navigateTo(`/${product.slug}.htm`);
      return;
    }
    setSelectedDetailProduct(product);
    setIsDetailModalOpen(true);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: allProductsData.length };
    productCategoriesData.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = allProductsData.filter(p => p.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  return (
    <div className="w-full bg-[#090e1a] font-sans pb-20">
      {/* 1. Products Hero Banner */}
      <section className="relative bg-[#060a12] text-white pt-16 pb-20 overflow-hidden border-b border-slate-800">
        {/* Background Banner Image Clearly Visible */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/assets/images/hero-page-banner.jpeg" 
            alt="SK Precast Industries Products Banner" 
            className="w-full h-full object-cover object-center opacity-85"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060a12]/70 via-[#060a12]/40 to-[#060a12]" />
        </div>

        {/* Subtle dot overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none z-1"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        {/* Ambient Glows */}
        <div className="absolute -top-24 left-1/3 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full z-1" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full z-1" />

        <div className="max-w-[1260px] mx-auto px-6 relative z-10 text-center">
          {/* Top Breadcrumb (Clean & Bigger Font without background square box) */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 text-sm sm:text-base font-semibold text-slate-300 mb-6"
          >
            <a
              href="/"
              onClick={(e) => navigateTo('/', e)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </a>
            <ChevronRight size={17} strokeWidth={2.5} className="text-amber-400/90 shrink-0" />
            <span className="text-amber-400 font-bold">Products Catalog</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-[30px] font-extrabold tracking-tight leading-tight mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-400 drop-shadow-sm">
              Precast Concrete & RCC Wall Products
            </span>
          </motion.h1>

          {/* Decorative Underline */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-4 mx-auto"
          >
            <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
            <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
            <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
            className="max-w-2xl mx-auto text-slate-300 text-[15px] font-medium leading-[26px]"
          >
            Browse our complete range of heavy-duty precast compound walls, modular boundary walls, and prefabricated RCC infrastructure solutions.
          </motion.p>
        </div>
      </section>

      {/* 2. Main Catalog Filter & Grid Container */}
      <div id="products-grid-section" className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 pt-10">

        {/* Sticky Unified Control Bar: Rounded 25px Category Tabs + 3D Search */}
        <div
          className="sticky z-30 mb-8 transition-all duration-200"
          style={{ top: 'calc(var(--header-height, 115px) + 14px)' }}
        >
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-2.5 sm:gap-3 bg-[#0d1527] p-2.5 sm:p-3 rounded-[15px] border border-slate-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all">

            {/* 1. Category Tabs */}
            <div 
              ref={tabsContainerRef}
              className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5 w-full lg:w-auto scroll-smooth"
            >
              {productCategoriesData.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;
                return (
                  <motion.button
                    key={cat.id}
                    data-category={cat.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      handleCategoryChange(cat.id);
                      e.currentTarget.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                      });
                    }}
                    className={`relative inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-[20px] sm:rounded-[25px] text-[12.5px] sm:text-[14px] font-bold whitespace-nowrap transition-colors duration-200 cursor-pointer shrink-0 select-none ${
                      isActive
                        ? 'text-slate-950 font-black'
                        : 'bg-[#162238] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/70 shadow-xs'
                    }`}
                  >
                    {/* Animated Sliding Active Pill Background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 rounded-[20px] sm:rounded-[25px] border border-amber-300 shadow-[0_3px_12px_rgba(245,158,11,0.45)] -z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat.name}</span>
                    <span className={`relative z-10 px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold transition-all ${
                      isActive ? 'bg-slate-950 text-amber-400 scale-105' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* 2. 3D Search Icon Button & 3. Result Counter */}
            <div className="flex items-center justify-between lg:justify-start w-full lg:w-auto gap-3 shrink-0 pt-1.5 lg:pt-0 border-t lg:border-t-0 border-slate-800">
              {/* 3D Search Icon / Expandable Bar */}
              <div className="relative flex items-center shrink-0">
                {isSearchOpen || searchQuery ? (
                  <div className="flex items-center gap-1.5 bg-[#162238] border border-amber-400/80 rounded-[25px] px-2 py-1 shadow-[0_3px_10px_rgba(245,158,11,0.25)] transition-all">
                    <Search size={14} className="text-amber-400 ml-1 shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-28 sm:w-40 md:w-48 px-1.5 py-0.5 text-xs sm:text-sm text-white placeholder-slate-500 bg-transparent focus:outline-none"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="p-1 text-slate-400 hover:text-white cursor-pointer"
                        title="Clear text"
                      >
                        <X size={12} />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
                      title="Close Search"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsSearchOpen(true);
                      setTimeout(() => searchInputRef.current?.focus(), 50);
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-slate-950 flex items-center justify-center shrink-0 shadow-[0_3px_8px_rgba(217,119,6,0.4)] ring-1 ring-amber-300/50 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                    title="Search Products"
                  >
                    <Search size={14} className="text-slate-950 drop-shadow-xs group-hover:scale-110 transition-transform" />
                  </button>
                )}
              </div>

              {/* Result Counter */}
              <div className="text-[12px] sm:text-sm text-slate-400 font-semibold whitespace-nowrap pl-1 shrink-0">
                Showing <span className="text-white font-extrabold">{selectedCategory === 'all' ? totalDisplayedInAll : displayedProducts.length}</span> of{' '}
                <span className="text-amber-400 font-extrabold">{filteredProducts.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compound Wall Category Intro Header */}
        {selectedCategory === 'compound-wall' && !searchQuery && (
          <div className="w-full text-center py-2 mb-8">
            <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
              Compound Wall
            </h2>
            <div className="flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-slate-400 mb-4 font-semibold">
              <span className="hover:text-amber-400 transition-colors cursor-pointer" onClick={() => handleCategoryChange('all')}>Home</span>
              <ChevronRight size={15} strokeWidth={2.5} className="text-amber-400/90 shrink-0" />
              <span className="hover:text-amber-400 transition-colors cursor-pointer" onClick={() => handleCategoryChange('all')}>Products</span>
              <ChevronRight size={15} strokeWidth={2.5} className="text-amber-400/90 shrink-0" />
              <span className="text-amber-400 font-bold">Compound Wall</span>
            </div>
            <p className="text-[14px] sm:text-[17px] leading-[24px] sm:leading-[28px] text-slate-300 w-full max-w-6xl mx-auto font-normal text-justify">
              Leading Manufacturers, Wholesaler, Retailer, Exporters and Trader of Concrete Folding Compound Wall, Concrete Precast Single Panel Wall, Factory Boundary Wall, Heavy Readymade Boundary Wall, Industrial Compound Wall, Panel Build RCC Compound Wall, Panel Build RCC Precast Compound Wall, Precast Compound Walls, Precast Heavy Duty Boundary Wall, Precast Heavy Duty Compound Wall, Prefab RCC Readymade Precast Compound Wall, RCC Compound Wall, rcc folding compound wall, RCC Industrial One Piece Compound Wall, RCC Readymade Compound Wall, Readymade Compound Wall and Single Mould RCC Precast Compound Wall from Palwal.
            </p>
          </div>
        )}

        {/* Boundary Wall Category Intro Header */}
        {selectedCategory === 'boundary-wall' && !searchQuery && (
          <div className="w-full text-center py-2 mb-8">
            <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
              Boundary Wall
            </h2>
            <div className="flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-slate-400 mb-4 font-semibold">
              <span className="hover:text-amber-400 transition-colors cursor-pointer" onClick={() => handleCategoryChange('all')}>Home</span>
              <ChevronRight size={15} strokeWidth={2.5} className="text-amber-400/90 shrink-0" />
              <span className="hover:text-amber-400 transition-colors cursor-pointer" onClick={() => handleCategoryChange('all')}>Products</span>
              <ChevronRight size={15} strokeWidth={2.5} className="text-amber-400/90 shrink-0" />
              <span className="text-amber-400 font-bold">Boundary Wall</span>
            </div>
            <p className="text-[14px] sm:text-[17px] leading-[24px] sm:leading-[28px] text-slate-300 w-full max-w-6xl mx-auto font-normal text-justify">
              Leading Manufacturers, Wholesaler, Retailer, Exporters and Trader of Cement Boundary Wall, Concrete Boundary Wall, Concrete Prestressed Boundary Walls, Precast Boundary Wall, RCC Boundary Wall, Readymade Boundary Wall and Solar Plant Boundary Wall from Palwal.
            </p>
          </div>
        )}

        {/* Cement Wall Category Intro Header */}
        {selectedCategory === 'cement-wall' && !searchQuery && (
          <div className="w-full text-center py-2 mb-8">
            <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
              Cement Wall
            </h2>
            <div className="flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-slate-400 mb-4 font-semibold">
              <span className="hover:text-amber-400 transition-colors cursor-pointer" onClick={() => handleCategoryChange('all')}>Home</span>
              <ChevronRight size={15} strokeWidth={2.5} className="text-amber-400/90 shrink-0" />
              <span className="hover:text-amber-400 transition-colors cursor-pointer" onClick={() => handleCategoryChange('all')}>Products</span>
              <ChevronRight size={15} strokeWidth={2.5} className="text-amber-400/90 shrink-0" />
              <span className="text-amber-400 font-bold">Cement Wall</span>
            </div>
            <p className="text-[14px] sm:text-[17px] leading-[24px] sm:leading-[28px] text-slate-300 w-full max-w-6xl mx-auto font-normal text-center">
              Leading Manufacturer and Supplier of Pre Fabricated Cement Wall and RCC Cement Wall from Palwal.
            </p>
          </div>
        )}

        {/* Other Products Category Intro Header */}
        {selectedCategory === 'other-products' && !searchQuery && (
          <div className="w-full text-center py-2 mb-8">
            <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
              Other Products
            </h2>
            <div className="flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-slate-400 mb-4 font-semibold">
              <span className="hover:text-amber-400 transition-colors cursor-pointer" onClick={() => handleCategoryChange('all')}>Home</span>
              <ChevronRight size={15} strokeWidth={2.5} className="text-amber-400/90 shrink-0" />
              <span className="hover:text-amber-400 transition-colors cursor-pointer" onClick={() => handleCategoryChange('all')}>Products</span>
              <ChevronRight size={15} strokeWidth={2.5} className="text-amber-400/90 shrink-0" />
              <span className="text-amber-400 font-bold">Other Products</span>
            </div>
            <p className="text-[14px] sm:text-[17px] leading-[24px] sm:leading-[28px] text-slate-300 w-full max-w-6xl mx-auto font-normal text-center">
              Leading Manufacturers, Wholesaler, Retailer, Exporters and Trader of Precast Wall, RCC Folding Wall, RCC Wall and Readymade Walls from Palwal.
            </p>
          </div>
        )}

        {/* 3. Products Grid / List */}
        {filteredProducts.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + (searchQuery ? `-${searchQuery}` : '')}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {selectedCategory === 'compound-wall' || selectedCategory === 'boundary-wall' || selectedCategory === 'cement-wall' || selectedCategory === 'other-products' ? (
                /* Dedicated List Format for Compound Wall, Boundary Wall, Cement Wall & Other Products */
                <div className="flex flex-col gap-6">
                  {displayedProducts.map((product, index) => (
                    <CompoundWallCard
                      key={`${selectedCategory}-${product.id}-${index}`}
                      product={product}
                      index={index}
                      onOpenQuoteModal={handleOpenQuote}
                      onViewDetails={handleOpenDetail}
                    />
                  ))}
                </div>
              ) : (
                /* Standard Grid Format for All Products grouped by Category with individual Load More buttons */
                <div className="flex flex-col gap-10">
                  {productCategoriesData
                    .filter(cat => cat.id !== 'all')
                    .map((cat) => {
                      const itemsInCat = groupedProducts[cat.id] || [];
                      if (itemsInCat.length === 0) return null;

                      const visibleForThisCat = categoryVisibleCounts[cat.id] || 6;
                      const displayedItemsInCat = itemsInCat.slice(0, visibleForThisCat);
                      const hasMoreInCat = itemsInCat.length > visibleForThisCat;
                      const isExpandedInCat = visibleForThisCat > 6;

                      return (
                        <div key={`all-section-${cat.id}`} className="w-full">
                          {/* Category Partition Header */}
                          <div className="pt-2 pb-5">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <button
                                type="button"
                                onClick={() => handleCategoryChange(cat.id)}
                                className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-[12px] bg-[#111927] hover:bg-slate-800 text-white shadow-sm border border-slate-800 hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group text-left shrink-0"
                              >
                                <span className="relative flex h-2.5 w-2.5 shrink-0">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 shadow-[0_0_8px_#f59e0b]"></span>
                                </span>
                                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white group-hover:text-amber-400 transition-colors">
                                  {cat.name}
                                </span>
                                <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-[#162238] text-slate-300 group-hover:bg-amber-500/20 group-hover:text-amber-300 transition-colors">
                                  {itemsInCat.length}
                                </span>
                              </button>

                              {/* Decorative Partition Divider Line */}
                              <div className="h-[2px] flex-1 bg-gradient-to-r from-amber-400/80 via-slate-700 to-transparent rounded-full" />
                            </div>
                          </div>

                          {/* Products Grid for this Category */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                            {displayedItemsInCat.map((product, pIdx) => (
                              <ProductCard
                                key={`${cat.id}-${product.id}-${pIdx}`}
                                product={product}
                                index={pIdx}
                                onOpenQuoteModal={handleOpenQuote}
                                onViewDetails={handleOpenDetail}
                              />
                            ))}
                          </div>

                          {/* Specific Category Load More / Show Less Button */}
                          {(hasMoreInCat || isExpandedInCat) && (
                            <div className="mt-7 flex items-center justify-center gap-3">
                              {hasMoreInCat && (
                                <Button
                                  variant="dark-to-gold"
                                  size="sm"
                                  onClick={() => handleLoadMoreCategory(cat.id)}
                                  icon={<FaRotateRight size={14} />}
                                  iconPosition="left"
                                  className="normal-case px-5 sm:px-6 py-2.5 !text-[15px] sm:!text-[15px] font-bold"
                                >
                                  Load more {cat.name.toLowerCase()}
                                </Button>
                              )}
                              {isExpandedInCat && (
                                <Button
                                  variant="light"
                                  size="sm"
                                  onClick={() => handleShowLessCategory(cat.id)}
                                  icon={<FaChevronUp size={13} />}
                                  iconPosition="left"
                                  className="normal-case px-5 py-2.5 !text-[15px] sm:!text-[15px] font-bold"
                                >
                                  Show less
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="bg-[#111927] rounded-[15px] p-12 text-center border border-slate-800 my-8">
            <div className="w-16 h-16 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
              <Search size={28} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No products found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-5">
              We couldn't find any products matching "{searchQuery}". Try searching with a different keyword or category.
            </p>
            <Button
              variant="dark"
              size="md"
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* 4. Load More / Show Less Pagination (Only for individual categories if items > ITEMS_PER_PAGE) */}
        {selectedCategory !== 'all' && filteredProducts.length > ITEMS_PER_PAGE && (
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
        )}

      </div>

      {/* 6. Modals */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={selectedQuoteProduct}
      />

      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={selectedDetailProduct}
        onOpenQuoteModal={handleOpenQuote}
      />
    </div>
  );
};

export default Product;
