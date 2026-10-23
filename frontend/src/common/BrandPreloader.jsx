import React, { useState, useEffect } from 'react';

const BrandPreloader = () => {
  const [mounted, setMounted] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Fast dismissal so mobile LCP and FCP are instant while preserving smooth fade
    const timer = setTimeout(() => {
      setOpacity(0);
      const unmountTimer = setTimeout(() => setMounted(false), 250);
      return () => clearTimeout(unmountTimer);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{ opacity, transition: 'opacity 0.25s ease-out' }}
      className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-[#080d1a] select-none pointer-events-none"
    >
      {/* Ambient Golden Radial Glow */}
      <div className="absolute w-96 h-96 sm:w-[480px] sm:h-[480px] rounded-full bg-amber-500/15 blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center px-4">
        {/* Big Proper Logo with Infinite Opacity & Scale Blinking / Breathing */}
        <div className="relative mb-6 flex items-center justify-center animate-pulse">
          <img 
            src="/assets/images/sk-logo.png" 
            alt="SK Precast Industries" 
            className="w-56 sm:w-72 md:w-80 max-h-24 sm:max-h-28 object-contain filter drop-shadow-[0_4px_25px_rgba(245,158,11,0.6)]"
          />
        </div>

        {/* Loading Indicator */}
        <div className="flex flex-col items-center gap-2 text-center">
          {/* Sleek Mini Linear Loader */}
          <div className="w-40 sm:w-48 h-1 bg-slate-800/80 rounded-full overflow-hidden relative">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full animate-badge-shimmer" />
          </div>

          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
            Loading Experience...
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrandPreloader;
