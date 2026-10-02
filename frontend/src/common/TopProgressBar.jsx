import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TopProgressBar = ({ active = false }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer1, timer2, timer3;

    const startProgress = () => {
      setIsVisible(true);
      setProgress(25);
      timer1 = setTimeout(() => setProgress(65), 100);
      timer2 = setTimeout(() => setProgress(88), 250);
      timer3 = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsVisible(false);
          setProgress(0);
        }, 300);
      }, 450);
    };

    const handleNavigate = () => {
      startProgress();
    };

    window.addEventListener('app-navigate', handleNavigate);
    window.addEventListener('popstate', handleNavigate);

    return () => {
      window.removeEventListener('app-navigate', handleNavigate);
      window.removeEventListener('popstate', handleNavigate);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Also react to active prop changes (e.g. during Suspense lazy chunk loading)
  useEffect(() => {
    if (active) {
      setIsVisible(true);
      setProgress(70);
    } else if (isVisible) {
      setProgress(100);
      const t = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [active]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-[999999] pointer-events-none h-[3.5px] bg-transparent"
        >
          {/* Glowing Gradient Laser Bar */}
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 shadow-[0_0_12px_#f59e0b,0_0_5px_#fbbf24] relative"
            style={{
              width: `${progress}%`,
              transition: 'width 250ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Glowing Leading Head Particle */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-yellow-300 shadow-[0_0_10px_#fde047,0_0_18px_#f59e0b] opacity-90 blur-[0.5px]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopProgressBar;
