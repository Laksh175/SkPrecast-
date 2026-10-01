import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, Eye } from 'lucide-react';

const ImageZoomMagnifier = ({
  src,
  alt = 'Product Image',
  productName = 'Precast RCC Compound & Boundary Walls',
  zoomLevel = 2.8,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, percentX: 50, percentY: 50 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Dimensions of the lens box
  const lensWidth = 140;
  const lensHeight = 140;

  const updatePosition = useCallback((clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setContainerSize({ width: rect.width, height: rect.height });

    // Mouse/Touch coordinates relative to image container
    const posX = clientX - rect.left;
    const posY = clientY - rect.top;

    // Constrain lens inside the container
    let x = posX - lensWidth / 2;
    let y = posY - lensHeight / 2;

    x = Math.max(0, Math.min(x, rect.width - lensWidth));
    y = Math.max(0, Math.min(y, rect.height - lensHeight));

    // Percentages for background zoom calculation (0 to 100)
    const percentX = Math.max(0, Math.min(100, (posX / rect.width) * 100));
    const percentY = Math.max(0, Math.min(100, (posY / rect.height) * 100));

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

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] lg:h-[480px] bg-white rounded-[15px] overflow-hidden border border-slate-200 shadow-xl cursor-crosshair group select-none touch-none"
      >
        {/* Main Base Image (Turns Grayscale on Hover) */}
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover object-center pointer-events-none transition-[filter] duration-300 ${isHovered ? 'grayscale contrast-105' : ''}`}
          draggable={false}
        />

        {/* Bottom Hint Pill */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-300">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-slate-700 shadow-md border border-slate-200/80 whitespace-nowrap">
            <ZoomIn size={13} className="text-amber-600" />
            <span className="sm:hidden">
              {isHovered ? 'Drag finger to explore details' : 'Touch & Drag to zoom'}
            </span>
            <span className="hidden sm:inline">
              {isHovered ? 'Move mouse to explore details' : 'Hover over image to zoom'}
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
              transition={{ duration: 0.15 }}
              style={{
                top: `${lensPos.y}px`,
                left: `${lensPos.x}px`,
                width: `${lensWidth}px`,
                height: `${lensHeight}px`
              }}
              className="absolute pointer-events-none z-20 rounded-xl border-2 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.6)] flex flex-col justify-between p-1.5 overflow-hidden"
            >
              {/* Full-Color HD Zoom Cutout Inside Lens */}
              {containerSize.width > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10px]"
                  style={{
                    backgroundImage: `url(${src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${lensPos.percentX}% ${lensPos.percentY}%`,
                    backgroundSize: `${containerSize.width * 2.2}px ${containerSize.height * 2.2}px`
                  }}
                >
                  <div className="absolute inset-0 bg-amber-500/10 pointer-events-none" />
                </div>
              )}

              {/* Lens Tag Label (as shown in reference screenshot) */}
              <div className="relative z-10 bg-slate-900/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] tracking-tight truncate border border-amber-400/40 text-center shadow-xs">
                {productName}
              </div>
              <div className="relative z-10 flex justify-between items-center px-0.5">
                <span className="text-[8px] font-bold text-amber-300 bg-slate-900/80 px-1 rounded">2.2x</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Side-by-Side Zoom Output Window (Desktop / Large Screens) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 15 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.96, x: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="hidden lg:block absolute top-0 left-[103%] w-[480px] xl:w-[540px] h-[480px] rounded-[15px] overflow-hidden border-2 border-amber-400 bg-slate-950 shadow-2xl z-50 pointer-events-none"
            style={{
              backgroundImage: `url(${src})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: `${lensPos.percentX}% ${lensPos.percentY}%`,
              backgroundSize: `${zoomLevel * 100}%`
            }}
          >
            {/* Header Badge in Zoom Preview */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 backdrop-blur-md text-white border border-amber-400/50 shadow-lg">
                <Eye size={13} className="text-amber-400" />
                HD Material Texture Zoom ({zoomLevel}x)
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageZoomMagnifier;
