import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BrandPreloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Quick, smooth initial load (650ms) to ensure premium feel without delaying the user
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 650);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.03,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-[#080d1a] select-none pointer-events-none"
        >
          {/* Ambient Golden Radial Glow */}
          <div className="absolute w-96 h-96 sm:w-[480px] sm:h-[480px] rounded-full bg-amber-500/15 blur-[120px] pointer-events-none" />

          <div className="relative flex flex-col items-center px-4">
            {/* Big Proper Logo with Infinite Opacity & Scale Blinking / Breathing */}
            <motion.div
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.96, 1.02, 0.96],
              }}
              transition={{ 
                duration: 1.6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative mb-6 flex items-center justify-center"
            >
              <img 
                src="/assets/images/sk-logo.png" 
                alt="SK Precast Industries" 
                className="w-56 sm:w-72 md:w-80 max-h-24 sm:max-h-28 object-contain filter drop-shadow-[0_4px_25px_rgba(245,158,11,0.6)]"
              />
            </motion.div>

            {/* Loading Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              {/* Sleek Mini Linear Loader */}
              <div className="w-40 sm:w-48 h-1 bg-slate-800/80 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.1, 
                    ease: 'easeInOut' 
                  }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full"
                />
              </div>

              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
                Loading Experience...
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrandPreloader;
