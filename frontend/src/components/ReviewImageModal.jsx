import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, MapPin, CheckCircle2 } from 'lucide-react';
import { FaStar } from 'react-icons/fa6';

const ReviewImageModal = ({ isOpen, onClose, imageData }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageData) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[999999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8"
        aria-modal="true"
        role="dialog"
      >
        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full bg-[#111927] border border-slate-700/80 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0d1522] border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-400/40">
                {imageData.initials || 'FE'}
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-100 leading-tight">
                  {imageData.name || 'Verified Google Review'}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="flex items-center text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={11} />
                    ))}
                  </span>
                  {imageData.relativeTime && <span>• {imageData.relativeTime}</span>}
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 size={12} /> Google Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all cursor-pointer border border-slate-700 hover:border-amber-400 hover:scale-105"
              aria-label="Close image popup"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>

          {/* Big Image Viewer Container */}
          <div className="relative flex-1 overflow-auto bg-[#070b14] flex items-center justify-center p-2 sm:p-4 min-h-[280px]">
            <img
              src={imageData.image}
              alt={imageData.caption || `${imageData.name} project boundary wall`}
              className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-slate-800"
            />
          </div>

          {/* Footer Caption */}
          {imageData.caption && (
            <div className="px-4 sm:px-6 py-2.5 bg-[#0d1522] border-t border-slate-800 flex items-center justify-between text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5 font-medium text-amber-300/90">
                <MapPin size={14} className="text-amber-400 shrink-0" />
                {imageData.caption}
              </span>
              <span className="text-slate-500 text-[11px] hidden sm:inline">
                SK Precast Industries Installed Site Photo
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewImageModal;
