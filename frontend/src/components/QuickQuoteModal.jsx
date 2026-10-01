import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Loader2, ChevronDown, Search, AlertCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { countryCodes } from '../data/homeData';
import { Button, CountryCodePicker } from '../common';

const getMaxPhoneDigits = (country) => {
  if (!country) return 10;
  if (country.code === 'IN') return 10;
  if (['AE', 'SA', 'AU', 'FR', 'NZ'].includes(country.code)) return 9;
  if (['US', 'CA', 'GB', 'MX', 'BR'].includes(country.code)) return 10;
  if (['SG', 'QA', 'KW', 'OM', 'BH', 'HK'].includes(country.code)) return 8;
  if (['DE', 'RU', 'ZA'].includes(country.code)) return 11;
  return 12;
};

const QuickQuoteModal = ({ isOpen, onClose, product }) => {
  const [quantity, setQuantity] = useState(1000);
  const [unit, setUnit] = useState(product?.unit || 'Square Feet');
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]); // India +91
  const [mobileNumber, setMobileNumber] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Reset state when product changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1000);
      setUnit(product?.unit || 'Square Feet');
      setSelectedCountry(countryCodes[0]);
      setMobileNumber('');
      setLocation('');
      setIsSubmitting(false);
      setIsSubmitted(false);
      setErrorMessage('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, product]);

  if (!isOpen || !product) return null;

  const currentMaxDigits = getMaxPhoneDigits(selectedCountry);

  const handleSubmit = (e) => {
    e.preventDefault();
    const minRequired = selectedCountry.code === 'IN' ? 10 : (currentMaxDigits > 8 ? 8 : currentMaxDigits);
    if (!mobileNumber || mobileNumber.trim().length < minRequired) {
      setErrorMessage(`Please enter a valid ${minRequired}-digit mobile number.`);
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate fast enquiry dispatch and trigger WhatsApp fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Construct prefilled WhatsApp enquiry
      const message = `Hello SK Precast Industries,%0A%0AI want to get a Quick Quote for:* ${product.name}*%0A• *Quantity:* ${quantity} ${unit}%0A• *Mobile:* ${selectedCountry.dialCode} ${mobileNumber.trim()}${location ? `%0A• *Location:* ${location}` : ''}%0A%0APlease share best factory price and delivery timeline.`;
      
      // Auto open WhatsApp in new tab after 1 second
      setTimeout(() => {
        window.open(`https://wa.me/918238902687?text=${message}`, '_blank');
      }, 1200);
    }, 800);
  };

  const priceText = product.price || '₹ 80.00 - 150.00 / Square Feet';
  const moqText = product.moq || '250 Feet';

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Darkened Backdrop Blur */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Window Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[760px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 z-10 my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Row (Split Header matching reference image) */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch border-b border-slate-100">
            {/* Left Header: Product Name (Styled matching website dark & gold theme) */}
            <div className="md:col-span-6 px-6 py-3.5 flex items-center gap-2.5 bg-gradient-to-r from-slate-950 to-slate-900 border-r border-slate-800/80">
              <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15] shrink-0" />
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight line-clamp-1">
                {product.name}
              </h3>
            </div>

            {/* Right Header: "Get a Quick Quote" Banner with Close Button (Light Yellow to Dark Black Linear Gradient) */}
            <div className="md:col-span-6 px-6 py-3.5 bg-gradient-to-r from-[#fef08a] via-[#78350f] to-[#020617] flex items-center justify-between text-white">
              <span className="text-lg sm:text-xl font-extrabold tracking-wide drop-shadow-md text-white">
                Get a Quick Quote
              </span>

              {/* White Round Close Button */}
              <button 
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white text-slate-800 hover:text-slate-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer ml-3 shrink-0"
                aria-label="Close dialog"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Modal Body: Split 2-Column Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 p-6 sm:p-7 pb-7 sm:pb-8 gap-6 sm:gap-8 items-start">
            
            {/* Left Column: Product Image, Price, MOQ */}
            <div className="md:col-span-5 flex flex-col items-start text-left">
              {/* Product Image Frame */}
              <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-50 border border-slate-200/90 shadow-xs mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Price Row (Color rgb(206, 128, 45) / #ce802d) */}
              <div className="mb-2 text-sm sm:text-[15px]">
                <span className="font-semibold text-slate-700">Price : </span>
                <span className="font-extrabold text-[#ce802d] text-base sm:text-lg">
                  {priceText}
                </span>
              </div>

              {/* MOQ Row */}
              <div className="text-sm sm:text-[15px] mb-3">
                <span className="font-bold text-slate-900">MOQ : </span>
                <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {moqText}
                </span>
              </div>

              {/* Quality Guarantee Tag */}
              <div className="mt-auto pt-2 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <ShieldCheck size={15} className="text-emerald-600 shrink-0" />
                <span>Factory Direct • Quality Tested Grade RCC</span>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="md:col-span-7 flex flex-col">
              {isSubmitted ? (
                /* Success State Confirmation */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 px-4 flex flex-col items-center justify-center text-center bg-amber-50/60 rounded-xl border border-amber-200/80"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 shadow-inner">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">
                    Enquiry Sent Successfully!
                  </h4>
                  <p className="text-sm text-slate-600 mb-4 max-w-sm">
                    Thank you! Our technical sales engineer will contact you on <span className="font-bold text-slate-900">{selectedCountry.dialCode} {mobileNumber}</span> within 15 minutes.
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-theme-whatsapp bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                    <FaWhatsapp size={14} />
                    <span>Connecting you to WhatsApp expert...</span>
                  </div>
                </motion.div>
              ) : (
                /* Main Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Row 1: Quantity & Measurement Units */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Quantity Field (Default 1000) */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        Quantity
                      </label>
                      <input 
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 bg-white text-slate-900 font-extrabold text-base outline-none transition-all"
                        placeholder="1000"
                        required
                      />
                    </div>

                    {/* Measurement Units Field (Editable Text Box) */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                        Measurement Units
                      </label>
                      <input 
                        type="text"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 bg-white text-slate-900 font-bold text-sm outline-none transition-all"
                        placeholder="Square Feet"
                      />
                    </div>
                  </div>

                  {/* Row 2: Mobile Number with Standardized Country Code Picker */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Mobile No.
                    </label>
                    <div className="flex gap-2">
                      {/* Standardized Common Country Code Picker */}
                      <CountryCodePicker
                        selectedCountry={selectedCountry}
                        onChange={(item) => {
                          const newMax = getMaxPhoneDigits(item);
                          setSelectedCountry(item);
                          setMobileNumber(prev => prev.slice(0, newMax));
                        }}
                      />

                      {/* Phone Input with strict numeric entry & max digits */}
                      <div className="w-full">
                        <input 
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={currentMaxDigits}
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 bg-white text-slate-900 font-semibold text-sm sm:text-base outline-none transition-all shadow-2xs"
                          placeholder={selectedCountry?.code === 'IN' ? 'Enter 10 digit mobile no.' : `Enter ${currentMaxDigits}-digit mobile no.`}
                          required
                        />
                      </div>
                    </div>
                    {errorMessage && (
                      <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                        <AlertCircle size={12} className="shrink-0" />
                        <span>{errorMessage}</span>
                      </p>
                    )}
                  </div>

                  {/* Row 3: Optional Location / City */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Project Location / City (Optional)
                    </label>
                    <input 
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-amber-500 bg-white text-slate-800 text-xs sm:text-sm outline-none transition-all"
                      placeholder="e.g. Palwal, Faridabad, Delhi NCR, Mathura"
                    />
                  </div>

                  {/* Submit Button ("Send Enquiry" Styled with explicit 2rem margin-top) */}
                  <div className="!mt-8" style={{ marginTop: '2rem' }}>
                    <Button
                      variant="gold"
                      size="md"
                      type="submit"
                      disabled={isSubmitting}
                      fullWidth
                      icon={isSubmitting ? <Loader2 size={18} className="animate-spin text-slate-900" /> : <ArrowRight size={17} />}
                      iconPosition="right"
                    >
                      {isSubmitting ? 'Sending Enquiry...' : 'Send Enquiry'}
                    </Button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickQuoteModal;
