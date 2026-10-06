import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Loader2, AlertCircle, Building2, Factory } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { countryCodes } from '../data/homeData';
import { Button, PhoneField, NameField, EmailField, getMaxPhoneDigits } from '../common';
import { validateField, validateQuantity } from '../utils/validation';
import { dispatchQuickQuoteForm } from '../utils/whatsappDispatch';

const QuickQuoteModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    quantity: '1000',
    unit: product?.unit || 'Square Feet',
    purpose: 'Reselling',
    details: 'I am interested. Kindly send the quotation for the same.'
  });

  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]); // India +91
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Reset state when product changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        mobile: '',
        quantity: '1000',
        unit: product?.unit || 'Square Feet',
        purpose: 'Reselling',
        details: 'I am interested. Kindly send the quotation for the same.'
      });
      setSelectedCountry(countryCodes[0]);
      setIsSubmitting(false);
      setIsSubmitted(false);
      setErrors({});
      setTouched({});
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

  const getFieldError = (name, value, currentFormData = formData) => {
    if (name === 'quantity') return validateQuantity(value, true);
    return validateField(name, value, {
      selectedCountry,
      required: name !== 'email'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const digitsOnly = value.replace(/\D/g, '');
      const maxDigits = getMaxPhoneDigits(selectedCountry);
      const truncatedPhone = digitsOnly.slice(0, maxDigits);
      setFormData(prev => ({ ...prev, mobile: truncatedPhone }));
      if (touched.mobile) {
        setErrors(prev => ({ ...prev, mobile: getFieldError('mobile', truncatedPhone) }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (touched[name]) {
        setErrors(prev => ({ ...prev, [name]: getFieldError(name, value) }));
      }
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: getFieldError(field, formData[field]) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fieldsToValidate = ['name', 'mobile', 'quantity', 'details'];
    if (formData.email) fieldsToValidate.push('email');

    const newTouched = {};
    const newErrors = {};
    let hasError = false;

    fieldsToValidate.forEach(field => {
      newTouched[field] = true;
      const error = getFieldError(field, formData[field]);
      newErrors[field] = error;
      if (error) hasError = true;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (hasError) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Dispatch structured WhatsApp lead to Admin
      dispatchQuickQuoteForm({
        productName: product?.name,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        selectedCountry,
        quantity: formData.quantity,
        unit: formData.unit,
        purpose: formData.purpose,
        details: formData.details
      });
    }, 500);
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

        {/* Modal Window Card (Compact & Optimized Dimensions) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[880px] max-h-[92vh] overflow-y-auto bg-[#0d1527] rounded-2xl shadow-2xl border border-slate-700/70 z-10 my-auto custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Row (Split Header matching reference design) */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch border-b border-slate-800 sticky top-0 z-20">
            {/* Left Header: Product Name */}
            <div className="md:col-span-5 px-5 py-3.5 flex items-center gap-2.5 bg-[#060a12] border-r border-slate-800">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#facc15] shrink-0" />
              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-tight line-clamp-1">
                {product.name}
              </h3>
            </div>

            {/* Right Header: "Get a Quick Quote" Banner with Close Button */}
            <div className="md:col-span-7 px-5 py-3.5 bg-gradient-to-r from-amber-600 via-amber-700 to-slate-900 flex items-center justify-between text-white">
              <span className="text-base sm:text-lg font-extrabold tracking-wide drop-shadow-md text-white">
                Get a Quick Quote
              </span>

              {/* Close Button */}
              <button 
                type="button"
                onClick={onClose}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer ml-3 shrink-0 border border-slate-700"
                aria-label="Close dialog"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Modal Body: Split 2-Column Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-6 items-start">
            
            {/* Left Column: Product Image, Price, MOQ, Guarantee */}
            <div className="md:col-span-5 flex flex-col items-start text-left md:sticky md:top-18">
              {/* Product Image Frame */}
              <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-[#162238] border border-slate-700/60 shadow-xs mb-3">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Price Row */}
              <div className="mb-1.5 text-sm sm:text-[14.5px]">
                <span className="font-semibold text-slate-300">Price : </span>
                <span className="font-extrabold text-amber-400 text-base sm:text-lg">
                  {priceText}
                </span>
              </div>

              {/* MOQ Row */}
              <div className="text-sm sm:text-[14.5px] mb-3">
                <span className="font-bold text-slate-200">MOQ : </span>
                <span className="font-extrabold text-slate-100 text-sm sm:text-base">
                  {moqText}
                </span>
              </div>

              {/* Quality Guarantee Tag */}
              <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-400 font-medium border-t border-slate-800 w-full">
                <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
                <span>Factory Direct • Quality Tested RCC</span>
              </div>
            </div>

            {/* Right Column: Full Interactive Lead Form */}
            <div className="md:col-span-7 flex flex-col">
              {isSubmitted ? (
                /* Success State Confirmation */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 px-4 flex flex-col items-center justify-center text-center bg-[#111927] rounded-xl border border-slate-700"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-950/80 text-emerald-400 flex items-center justify-center mb-3 shadow-inner border border-emerald-800/60">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">
                    Quote Request Sent!
                  </h4>
                  <p className="text-sm text-slate-300 mb-4 max-w-sm">
                    Thank you, <span className="font-bold text-white">{formData.name || 'Customer'}</span>! We have dispatched your quotation request to our sales team on WhatsApp.
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-800/50">
                    <FaWhatsapp size={14} />
                    <span>WhatsApp chat opened in new tab</span>
                  </div>
                </motion.div>
              ) : (
                /* Main Interactive Form with ALL requested fields */
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  
                  {/* Row 1: Your Name (left) | Email Address (right) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <NameField
                      label="Your Name"
                      required={true}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      error={errors.name}
                      touched={touched.name}
                      placeholder="Enter your full name..."
                    />

                    <EmailField
                      label="Email Address"
                      required={false}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      error={errors.email}
                      touched={touched.email}
                      placeholder="Enter your email address..."
                    />
                  </div>

                  {/* Row 2: Phone / Mobile (left) | ESTIMATED QUANTITY (right) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <PhoneField
                      label="Phone / Mobile"
                      required={true}
                      name="mobile"
                      value={formData.mobile}
                      selectedCountry={selectedCountry}
                      onCountryChange={(item) => {
                        const newMaxDigits = getMaxPhoneDigits(item);
                        const adjusted = formData.mobile.slice(0, newMaxDigits);
                        setSelectedCountry(item);
                        setFormData(prev => ({ ...prev, mobile: adjusted }));
                        if (touched.mobile) {
                          setErrors(prev => ({
                            ...prev,
                            mobile: validateField('mobile', adjusted, { selectedCountry: item, required: true })
                          }));
                        }
                      }}
                      onChange={handleChange}
                      onBlur={() => handleBlur('mobile')}
                      error={errors.mobile}
                      touched={touched.mobile}
                      placeholder={selectedCountry.code === 'IN' ? 'Enter 10-digit mobile number' : 'Enter mobile number'}
                    />

                    {/* ESTIMATED QUANTITY & UNIT */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Estimated Quantity <span className="text-amber-400 font-bold">*</span>
                      </label>
                      <div className={`flex rounded-xl border overflow-hidden focus-within:ring-2 focus-within:ring-amber-500/20 bg-[#162238] transition-all shadow-2xs ${
                        touched.quantity && errors.quantity
                          ? 'border-red-500 ring-2 ring-red-500/30'
                          : 'border-slate-700/80 focus-within:border-amber-500 hover:border-slate-600'
                      }`}>
                        <input
                          type="number"
                          name="quantity"
                          min="1"
                          value={formData.quantity}
                          onChange={handleChange}
                          onBlur={() => handleBlur('quantity')}
                          placeholder="1000"
                          required
                          className="w-full px-3 py-2 text-white placeholder-slate-500 text-sm font-bold outline-none bg-transparent"
                        />
                        <div className="border-l border-slate-700 bg-slate-800/80 hover:bg-slate-800 transition-colors shrink-0 flex items-center">
                          <input
                            type="text"
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            placeholder="Square Feet"
                            className="w-24 sm:w-28 px-2.5 py-2 bg-transparent text-amber-400 text-xs sm:text-sm font-bold outline-none text-center"
                            aria-label="Measurement Unit"
                          />
                        </div>
                      </div>
                      {touched.quantity && errors.quantity && (
                        <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-400 font-medium mt-1 flex items-center gap-1">
                          <AlertCircle size={14} className="shrink-0 text-red-400" />
                          <span>{errors.quantity}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: PURPOSE OF REQUIREMENT (Tactile Choice Cards) */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Purpose of Requirement <span className="text-amber-400 font-bold">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <label 
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                          formData.purpose === 'Reselling' 
                            ? 'bg-amber-500/15 border-amber-500 text-amber-300 ring-2 ring-amber-500/20 shadow-xs' 
                            : 'bg-[#162238] border-slate-700/80 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="purpose"
                            value="Reselling"
                            checked={formData.purpose === 'Reselling'}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <Building2 size={15} className={formData.purpose === 'Reselling' ? 'text-amber-400' : 'text-slate-400'} />
                          <span>Reselling</span>
                        </div>
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${formData.purpose === 'Reselling' ? 'border-amber-500 bg-amber-500' : 'border-slate-600'}`}>
                          {formData.purpose === 'Reselling' && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </span>
                      </label>

                      <label 
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                          formData.purpose === 'End Use' 
                            ? 'bg-amber-500/15 border-amber-500 text-amber-300 ring-2 ring-amber-500/20 shadow-xs' 
                            : 'bg-[#162238] border-slate-700/80 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="purpose"
                            value="End Use"
                            checked={formData.purpose === 'End Use'}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <Factory size={15} className={formData.purpose === 'End Use' ? 'text-amber-400' : 'text-slate-400'} />
                          <span>End Use</span>
                        </div>
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${formData.purpose === 'End Use' ? 'border-amber-500 bg-amber-500' : 'border-slate-600'}`}>
                          {formData.purpose === 'End Use' && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Row 4: REQUIREMENT DETAILS (Compact 2.5-row Textarea) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Leave a Message / Requirement Details <span className="text-amber-400 font-bold">*</span>
                      </label>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {formData.details.length}/300
                      </span>
                    </div>
                    <textarea
                      name="details"
                      rows={2}
                      maxLength={300}
                      value={formData.details}
                      onChange={handleChange}
                      onBlur={() => handleBlur('details')}
                      required
                      placeholder="I am interested. Kindly send the quotation for the same."
                      className={`w-full px-3.5 py-2 rounded-xl border bg-[#162238] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white text-xs sm:text-sm placeholder:text-slate-500 outline-none resize-none transition-all min-h-[64px] ${
                        touched.details && errors.details
                          ? 'border-red-500 ring-2 ring-red-500/30'
                          : 'border-slate-700/80 focus:border-amber-500 hover:border-slate-600'
                      }`}
                    />
                    {touched.details && errors.details && (
                      <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-400 font-medium mt-1 flex items-center gap-1">
                        <AlertCircle size={14} className="shrink-0 text-red-400" />
                        <span>{errors.details}</span>
                      </p>
                    )}
                  </div>

                  {/* Row 5: Submit Button ("Send Enquiry" Golden Button) */}
                  <div className="pt-1">
                    <Button
                      variant="gold"
                      size="md"
                      type="submit"
                      disabled={isSubmitting}
                      fullWidth
                      icon={isSubmitting ? <Loader2 size={18} className="animate-spin text-slate-950" /> : <ArrowRight size={17} />}
                      iconPosition="right"
                    >
                      {isSubmitting ? 'Sending Request...' : 'Send Enquiry'}
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
