import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, ZoomIn, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { navigateTo } from '../../utils/navigation';

import { Button } from '../../common';

const CompoundWallCard = ({ product, index, onOpenQuoteModal, onViewDetails }) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [isHovered, setIsHovered] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, percentX: 50, percentY: 50 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const cardScrollRef = useRef(null);

  const scrollCardGallery = (direction, e) => {
    if (e) e.stopPropagation();
    if (cardScrollRef.current) {
      const scrollAmount = 160;
      cardScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    setActiveImage(product.image);
  }, [product]);

  // Gallery Images array (Identical to inside detail page)
  const galleryList = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  // Dimensions of the magnifier lens box
  const lensWidth = 110;
  const lensHeight = 110;
  const zoomLevel = 2.8;

  const updatePosition = useCallback((clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setContainerSize({ width: rect.width, height: rect.height });

    // Coordinates inside image
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    // Constrain lens inside container
    let x = mouseX - lensWidth / 2;
    let y = mouseY - lensHeight / 2;

    x = Math.max(0, Math.min(x, rect.width - lensWidth));
    y = Math.max(0, Math.min(y, rect.height - lensHeight));

    // Percentages for background zoom calculation (0 to 100)
    const percentX = Math.max(0, Math.min(100, (mouseX / rect.width) * 100));
    const percentY = Math.max(0, Math.min(100, (mouseY / rect.height) * 100));

    setLensPos({
      x,
      y,
      percentX,
      percentY
    });
  }, [lensWidth, lensHeight]);

  const handleMouseMove = useCallback((e) => {
    updatePosition(e.clientX, e.clientY);
  }, [updatePosition]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches && e.touches[0]) {
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [updatePosition]);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    }
    setIsHovered(true);
  };

  const handleTouchStart = (e) => {
    if (containerRef.current && e.touches && e.touches[0]) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => setIsHovered(false);
  const handleTouchEnd = () => setIsHovered(false);

  // Extract exactly the first 5 product details / specifications from inside
  const getSpecsRows = () => {
    let allRows = [];

    if (product.overviewList && product.overviewList.length > 0) {
      allRows.push(...product.overviewList);
    }
    if (product.specificationsList && product.specificationsList.length > 0) {
      product.specificationsList.forEach(item => {
        if (!allRows.some(r => r.label.toLowerCase() === item.label.toLowerCase())) {
          allRows.push(item);
        }
      });
    }

    if (allRows.length === 0 && product.overview && product.overview.length > 0) {
      allRows.push(...product.overview);
      if (product.specifications && product.specifications.length > 0) {
        product.specifications.forEach(item => {
          if (!allRows.some(r => r.label.toLowerCase() === item.label.toLowerCase())) {
            allRows.push(item);
          }
        });
      }
    }

    if (allRows.length === 0 && product.specs) {
      Object.entries(product.specs).forEach(([k, v]) => {
        const label = k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        allRows.push({ label, value: v });
      });
    }

    // Return the first 5 specifications for the card
    return allRows.slice(0, 5);
  };

  const specsRows = getSpecsRows();
  const priceParts = product.price ? product.price.split('/') : ['₹ 60.00 - 120.00', 'Square Feet'];
  const priceMain = priceParts[0]?.trim();
  const unitText = product.unit || priceParts[1]?.trim() || 'Square Feet';
  const moqText = product.moq
    ? (product.moq.includes('MOQ') ? product.moq : `${product.moq} (MOQ)`)
    : '1000 Square Feet (MOQ)';

  // About Content matching inside details
  const aboutContent = product.commercialPitch || (
    Array.isArray(product.description)
      ? product.description.join(' ')
      : (product.description || `SK Precast Industries is a leading manufacturer and supplier of ${product.name} and high-durability Precast RCC Compound & Boundary Walls based in Palwal (Haryana), delivering durable, high-quality, and robust boundary solutions across residential, commercial, industrial, and solar construction projects across Delhi NCR.`)
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: (i % 5) * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -5, transition: { duration: 0.28, ease: 'easeOut' } }}
      className="relative w-full bg-gradient-to-b from-[#131d2e] via-[#111927] to-[#0d1522] rounded-[15px] border border-slate-800/90 shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:border-amber-400/80 hover:shadow-[0px_2px_20px_2px_rgba(245,158,11,0.25)] transition-all duration-300 p-6 sm:p-7 md:p-8 lg:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-10 items-start mb-6"
    >

      {/* 1. Left: Product Image with Zoom Lens & Gallery Thumbnails */}
      <div className="relative w-full md:w-[340px] lg:w-[400px] xl:w-[420px] shrink-0">

        {/* Main Image Box */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onClick={() => onViewDetails(product)}
          className="w-full h-[250px] sm:h-[290px] lg:h-[310px] rounded-[15px] overflow-hidden bg-slate-900 relative group border border-slate-800 shadow-inner cursor-crosshair select-none touch-none"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={activeImage}
              alt={product.name}
              initial={{ opacity: 0.4, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.4, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`w-full h-full object-cover pointer-events-none transition-[filter] duration-300 ${isHovered ? 'grayscale contrast-105' : ''}`}
              draggable={false}
              loading="lazy"
            />
          </AnimatePresence>

          {/* Bottom Hint Pill */}
          <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-300">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-slate-950/90 text-amber-300 shadow-lg backdrop-blur-md border border-amber-400/30 whitespace-nowrap">
              <ZoomIn size={12} className="text-amber-400" />
              <span className="sm:hidden">
                {isHovered ? 'Drag finger to explore details' : 'Touch & Drag to zoom'}
              </span>
              <span className="hidden sm:inline">
                {isHovered ? 'Move mouse to explore details' : 'Hover to zoom'}
              </span>
            </span>
          </div>

          {/* Interactive Magnifier Lens Box with HD Spotlight Magnification */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.12 }}
                style={{
                  top: `${lensPos.y}px`,
                  left: `${lensPos.x}px`,
                  width: `${lensWidth}px`,
                  height: `${lensHeight}px`
                }}
                className="absolute pointer-events-none z-20 rounded-xl border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] flex flex-col justify-between p-1.5 overflow-hidden"
              >
                {/* Full-Color HD Zoom Cutout Inside Lens */}
                {containerSize.width > 0 && (
                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${lensPos.percentX}% ${lensPos.percentY}%`,
                      backgroundSize: `${containerSize.width * 2.2}px ${containerSize.height * 2.2}px`
                    }}
                  >
                    <div className="absolute inset-0 bg-amber-500/10 pointer-events-none" />
                  </div>
                )}

                {/* Lens Tag Label */}
                <div className="relative z-10 bg-slate-950/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] tracking-tight truncate border border-amber-400/40 text-center shadow-xs">
                  {product.name}
                </div>
                <div className="relative z-10 flex justify-between items-center px-0.5">
                  <span className="text-[8px] font-bold text-amber-300 bg-slate-900/90 px-1 rounded">2.2x</span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Gallery Thumbnails */}
        {galleryList.length > 1 && (
          <div className="relative flex items-center gap-2 mt-3.5 w-full">
            {/* Left Scroll Arrow */}
            {galleryList.length > 3 && (
              <button
                type="button"
                onClick={(e) => scrollCardGallery('left', e)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer z-10 hover:scale-110 active:scale-95 border border-slate-700"
                title="Previous images"
              >
                <ChevronLeft size={15} />
              </button>
            )}

            {/* Scrollable Track */}
            <div
              ref={cardScrollRef}
              className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1.5 px-3.5 w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {galleryList.map((imgUrl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(imgUrl);
                  }}
                  onMouseEnter={() => setActiveImage(imgUrl)}
                  className={`w-[70px] h-[70px] sm:w-[76px] sm:h-[76px] rounded-xl overflow-hidden border-2 transition-all duration-300 p-0.5 cursor-pointer bg-slate-900 shrink-0 ${activeImage === imgUrl
                      ? 'border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.55)] scale-105 ring-2 ring-amber-400/40'
                      : 'border-slate-800 hover:border-amber-400/60 opacity-75 hover:opacity-100 hover:scale-[1.02]'
                    }`}
                  title={`View image ${i + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                </button>
              ))}
            </div>

            {/* Right Scroll Arrow */}
            {galleryList.length > 3 && (
              <button
                type="button"
                onClick={(e) => scrollCardGallery('right', e)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer z-10 hover:scale-110 active:scale-95 border border-slate-700"
                title="Next images"
              >
                <ChevronRight size={15} />
              </button>
            )}
          </div>
        )}

        {/* Floating Zoom Window */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 10 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="hidden md:block absolute top-0 left-[103%] w-[380px] lg:w-[460px] xl:w-[500px] h-[310px] rounded-[15px] overflow-hidden border-2 border-amber-400 bg-slate-950 shadow-2xl z-50 pointer-events-none"
              style={{
                backgroundImage: `url(${activeImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: `${lensPos.percentX}% ${lensPos.percentY}%`,
                backgroundSize: `${zoomLevel * 100}%`
              }}
            >
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-950/90 backdrop-blur-md text-amber-300 border border-amber-400/50 shadow-lg">
                  <Eye size={13} className="text-amber-400" />
                  HD Material Texture Zoom ({zoomLevel}x)
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Right: Info & Specs Table */}
      <div className="flex-1 w-full flex flex-col items-start text-left">

        {/* Title */}
        <h3
          onClick={() => {
            navigateTo(`/${product.slug}.htm`);
            onViewDetails(product);
          }}
          className="text-xl sm:text-2xl font-extrabold text-slate-100 hover:text-amber-400 transition-colors cursor-pointer leading-snug"
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex flex-wrap items-baseline gap-1.5 mt-2 mb-1">
          <span className="text-xl sm:text-2xl font-extrabold text-amber-400">
            {priceMain}
          </span>
          <span className="text-slate-400 text-sm font-semibold">
            / {unitText}
          </span>
        </div>

        {/* MOQ */}
        <div className="text-xs sm:text-sm font-bold text-slate-300 mb-3.5">
          {moqText}
        </div>

        {/* Get Best Price Button */}
        <div className="mb-4 sm:mb-5">
          <Button
            variant="gold"
            size="sm"
            onClick={() => onOpenQuoteModal(product)}
          >
            Get Best Price
          </Button>
        </div>

        {/* Key Attributes Specs Table */}
        <div className="w-full border-t border-b border-slate-800 divide-y divide-slate-800/60 text-xs sm:text-sm mb-4">
          {specsRows.map((row, idx) => (
            <div key={idx} className="py-2.5 grid grid-cols-12 gap-2 items-center">
              <span className="col-span-5 sm:col-span-4 text-slate-400 font-medium capitalize">
                {row.label}
              </span>
              <span className="col-span-7 sm:col-span-8 text-slate-100 font-bold">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* About & Description Paragraph */}
        <div className="w-full mb-5">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
            {aboutContent}
          </p>
          <a
            href={`/${product.slug}.htm`}
            onClick={(e) => {
              navigateTo(`/${product.slug}.htm`, e);
              onViewDetails(product);
            }}
            className="text-amber-400 hover:text-amber-300 text-[14px] font-bold underline inline-flex items-center gap-1 mt-2 cursor-pointer transition-colors"
          >
            <span>Click to view more specifications</span>
            <span>→</span>
          </a>
        </div>

        {/* Action Button: Request to Call */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="view-more"
            size="sm"
            href="tel:+918238902687"
            icon={<PhoneCall size={14} />}
            iconPosition="left"
            className="!text-[14px]"
          >
            Request to Call
          </Button>
        </div>

      </div>

    </motion.div>
  );
};

export default CompoundWallCard;
