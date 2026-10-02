import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, Truck, Ruler, Layers, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { Button } from '../../common';

const ProductDetailModal = ({ isOpen, onClose, product, onOpenQuoteModal }) => {
  const [activeImg, setActiveImg] = React.useState(product?.image);

  React.useEffect(() => {
    setActiveImg(product?.image);
  }, [product]);

  if (!isOpen || !product) return null;

  const galleryList = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-white rounded-[15px] shadow-2xl overflow-hidden border border-slate-200 z-10 my-8"
        >
          {/* Header Accent Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-slate-900 via-amber-400 to-yellow-500" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-start">
              {/* Left Column: Image */}
              <div className="flex flex-col gap-3">
                <div className="relative h-64 sm:h-72 w-full rounded-[12px] overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                  <img
                    src={activeImg || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>

                {/* Thumbnails if > 1 */}
                {galleryList.length > 1 && (
                  <div className="flex items-center gap-2">
                    {galleryList.map((imgSrc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImg(imgSrc)}
                        onMouseEnter={() => setActiveImg(imgSrc)}
                        className={`w-16 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          (activeImg || product.image) === imgSrc
                            ? 'border-amber-500 ring-2 ring-amber-400/50 scale-105'
                            : 'border-slate-200 hover:border-amber-400 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img src={imgSrc} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Key Benefits Pill Row */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
                    <ShieldCheck size={16} className="text-amber-600" />
                    <span className="font-bold text-slate-800">ISO Certified</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
                    <Truck size={16} className="text-amber-600" />
                    <span className="font-bold text-slate-800">Pan-India</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1">
                    <Sparkles size={16} className="text-amber-600" />
                    <span className="font-bold text-slate-800">Zero Mainten.</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Details & Specs */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                      {product.categoryName}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-900 leading-tight mb-3">
                    {product.name}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed mb-5">
                    {product.description}
                  </p>

                  {/* Specifications Box */}
                  <div className="bg-slate-50 rounded-[12px] p-4 border border-slate-200/80 mb-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                      <Ruler size={14} className="text-amber-500" />
                      <span>Technical Specifications</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div>
                        <span className="text-slate-500 block">Height Range:</span>
                        <strong className="text-slate-900 font-semibold">{product.specs?.height || '5ft to 10ft'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Thickness:</span>
                        <strong className="text-slate-900 font-semibold">{product.specs?.thickness || '50mm'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Panel Length:</span>
                        <strong className="text-slate-900 font-semibold">{product.specs?.panelLength || '7ft'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Column Post:</span>
                        <strong className="text-slate-900 font-semibold">{product.specs?.columnSize || '150mm x 150mm'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Indicative Pricing & MOQ */}
                  <div className="flex items-center justify-between p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/60 mb-6">
                    <div>
                      <span className="text-[0.7rem] uppercase tracking-wider text-amber-900 font-bold block">Indicative Price</span>
                      <span className="text-sm font-extrabold text-slate-950">{product.price}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[0.7rem] uppercase tracking-wider text-amber-900 font-bold block">Min. Order (MOQ)</span>
                      <span className="text-xs font-bold text-slate-800">{product.moq}</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="dark"
                    size="md"
                    href={`https://wa.me/918238902687?text=Hi%20SK%20Precast,%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}.%20Please%20share%20quotation.`}
                    target="_blank"
                    icon={<FaWhatsapp size={16} className="text-theme-whatsappLight" />}
                    iconPosition="left"
                  >
                    WhatsApp
                  </Button>

                  <Button
                    variant="gold"
                    size="md"
                    onClick={() => {
                      onClose();
                      onOpenQuoteModal(product);
                    }}
                  >
                    Get Best Price
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;
