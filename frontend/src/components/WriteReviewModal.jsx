import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ThumbsUp, ThumbsDown, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { FaStar } from 'react-icons/fa6';
import { countryCodes, allProductsList } from '../data/homeData';
import { CountryCodePicker, SearchableSelect } from '../common';
import { getMaxPhoneDigits, validateName, validateEmail, validatePhone, validateProduct, validateMessage } from '../utils/validation';
import { dispatchProductReviewForm } from '../utils/whatsappDispatch';

export const WriteReviewModal = ({ isOpen, onClose, onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    designation: '',
    email: '',
    mobile: '',
    product: '',
    rating: 5,
    likes: {
      response: null, // 'like' | 'dislike' | null
      quality: null,
      delivery: null
    },
    review: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        companyName: '',
        designation: '',
        email: '',
        mobile: '',
        product: '',
        rating: 5,
        likes: {
          response: null,
          quality: null,
          delivery: null
        },
        review: ''
      });
      setErrors({});
      setTouched({});
      setHoverRating(0);
      setSelectedCountry(countryCodes[0]);
      setErrorMessage('');
      setIsSubmitting(false);
      setIsSuccess(false);
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getFieldError = (name, value, currentFormData = formData) => {
    if (name === 'name') return validateName(value, true);
    if (name === 'email') return validateEmail(value, true);
    if (name === 'mobile') return validatePhone(value, selectedCountry, true);
    if (name === 'product') return validateProduct(value, true);
    if (name === 'review') return validateMessage(value, true, 10);
    return '';
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = getFieldError(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const digits = value.replace(/\D/g, '');
      const maxDigits = getMaxPhoneDigits(selectedCountry);
      const truncated = digits.slice(0, maxDigits);
      setFormData(prev => ({ ...prev, mobile: truncated }));
      if (touched.mobile) {
        setErrors(prev => ({ ...prev, mobile: getFieldError('mobile', truncated) }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (touched[name]) {
        setErrors(prev => ({ ...prev, [name]: getFieldError(name, value) }));
      }
    }
  };

  const handleToggleLike = (category, type) => {
    setFormData(prev => ({
      ...prev,
      likes: {
        ...prev.likes,
        [category]: prev.likes[category] === type ? null : type
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const fieldsToValidate = ['name', 'email', 'mobile', 'product', 'review'];
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
      setIsSuccess(true);
      
      // Dispatch structured WhatsApp review details to Admin
      dispatchProductReviewForm({
        product: formData.product,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        selectedCountry: formData.selectedCountry,
        review: formData.review,
        rating: formData.rating,
        likes: formData.likes
      });

      if (onReviewSubmitted) {
        onReviewSubmitted(formData);
      }
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 500);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Background Blur Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window (Dark Background) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-[740px] max-h-[92vh] overflow-y-auto bg-[#0d1527] text-slate-100 rounded-2xl border border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] p-4 sm:p-7 z-10 custom-scrollbar"
        >
          {/* Top Bar: Title + Mandatory Notice + Close Button */}
          <div className="flex items-center justify-between pb-3 sm:pb-3.5 mb-4 border-b border-slate-800 gap-2">
            <h2 className="text-[17px] sm:text-2xl font-black tracking-tight text-white whitespace-nowrap">
              <span>Write a Review</span>
            </h2>
            
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <span className="text-[11px] sm:text-[13px] text-slate-400 font-medium whitespace-nowrap">
                <span className="text-amber-400 font-bold text-xs sm:text-sm">*</span> fields are mandatory.
              </span>
              <button 
                type="button"
                onClick={onClose}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 border border-slate-700"
                aria-label="Close dialog"
              >
                <X size={16} className="sm:hidden" />
                <X size={18} className="hidden sm:block" />
              </button>
            </div>
          </div>

          {/* Success Notification */}
          {isSuccess ? (
            <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 text-emerald-400 flex items-center justify-center shadow-md border border-emerald-800/60">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-black text-white">Review Submitted!</h3>
              <p className="text-sm text-slate-300 max-w-md">
                Thank you for sharing your valuable feedback with SK Precast Industries.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-0 text-left">
              {/* Error Message */}
              {errorMessage && (
                <div style={{ fontSize: '15px' }} className="mb-4 p-3 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-300 text-[15px] flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0 text-rose-400" />
                  <span style={{ fontSize: '15px' }}>{errorMessage}</span>
                </div>
              )}

              {/* Table Structure (Dark theme) */}
              <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800/80 bg-[#111927]">
                
                {/* 1. Your Name */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-[#162238]/60 transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-200">
                    <span className="text-amber-400 font-bold">*</span> Your Name :
                  </label>
                  <div className="sm:col-span-8">
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="Enter your full name"
                      className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#162238] border text-white placeholder-slate-500 focus:outline-hidden transition-all shadow-2xs ${
                        touched.name && errors.name
                          ? 'border-red-500 ring-2 ring-red-500/30'
                          : 'border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                      }`}
                      required
                    />
                    {touched.name && errors.name && (
                      <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-400 font-medium mt-1.5 flex items-center gap-1.5">
                        <AlertCircle size={15} className="shrink-0 text-red-400" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* 2. Company Name */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-[#162238]/60 transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-200">
                    Company Name :
                  </label>
                  <div className="sm:col-span-8">
                    <input 
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Optional company or farm name"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#162238] border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* 3. Designation */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-[#162238]/60 transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-200">
                    Designation :
                  </label>
                  <div className="sm:col-span-8">
                    <input 
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="e.g. Project Head, Plot Owner, Builder"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#162238] border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* 4. E-mail */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-[#162238]/60 transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-200">
                    <span className="text-amber-400 font-bold">*</span> E-mail :
                  </label>
                  <div className="sm:col-span-8">
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="name@example.com"
                      className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#162238] border text-white placeholder-slate-500 focus:outline-hidden transition-all shadow-2xs ${
                        touched.email && errors.email
                          ? 'border-red-500 ring-2 ring-red-500/30'
                          : 'border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                      }`}
                      required
                    />
                    {touched.email && errors.email && (
                      <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-400 font-medium mt-1.5 flex items-center gap-1.5">
                        <AlertCircle size={15} className="shrink-0 text-red-400" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* 5. Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-[#162238]/60 transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-200">
                    <span className="text-amber-400 font-bold">*</span> Mobile :
                  </label>
                  <div className="sm:col-span-8">
                    <div className="flex items-center gap-2">
                      <CountryCodePicker
                        selectedCountry={selectedCountry}
                        onChange={(item) => {
                          const maxDigits = getMaxPhoneDigits(item);
                          const adjusted = formData.mobile.slice(0, maxDigits);
                          setSelectedCountry(item);
                          setFormData(p => ({ ...p, mobile: adjusted }));
                          if (touched.mobile) {
                            setErrors(prev => ({ ...prev, mobile: validatePhone(adjusted, item, true) }));
                          }
                        }}
                        size="sm"
                        className="shrink-0"
                      />
                      <input 
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        onBlur={() => handleBlur('mobile')}
                        placeholder={selectedCountry?.code === 'IN' ? '10-digit mobile number' : 'Mobile number'}
                        maxLength={getMaxPhoneDigits(selectedCountry)}
                        className={`flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-[#162238] border text-white placeholder-slate-500 focus:outline-hidden transition-all shadow-2xs ${
                          touched.mobile && errors.mobile
                            ? 'border-red-500 ring-2 ring-red-500/30'
                            : 'border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                        }`}
                        required
                      />
                    </div>
                    {touched.mobile && errors.mobile && (
                      <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-400 font-medium mt-1.5 flex items-center gap-1.5">
                        <AlertCircle size={15} className="shrink-0 text-red-400" />
                        <span>{errors.mobile}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* 6. Product / Service */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-[#162238]/60 transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-200">
                    <span className="text-amber-400 font-bold">*</span> Product / Service :
                  </label>
                  <div className="sm:col-span-8">
                    <SearchableSelect
                      name="product"
                      value={formData.product}
                      onChange={(e) => {
                        handleChange(e);
                        if (touched.product) {
                          setErrors(prev => ({ ...prev, product: getFieldError('product', e.target.value) }));
                        }
                      }}
                      onBlur={() => handleBlur('product')}
                      error={Boolean(touched.product && errors.product)}
                      options={allProductsList}
                      placeholder="Type or select Product / Service..."
                      searchPlaceholder="Filter 35+ products..."
                      isTypeable={true}
                      showSearch={true}
                      size="sm"
                      className="w-full"
                    />
                    {touched.product && errors.product && (
                      <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-400 font-medium mt-1.5 flex items-center gap-1.5">
                        <AlertCircle size={15} className="shrink-0 text-red-400" />
                        <span>{errors.product}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* 7. Rating */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-[#162238]/60 transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-200">
                    <span className="text-amber-400 font-bold">*</span> Rating :
                  </label>
                  <div className="sm:col-span-8 flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData(p => ({ ...p, rating: star }))}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 rounded-md hover:bg-slate-800 transition-all duration-150 focus:outline-hidden group/star"
                        aria-label={`Rate ${star} star`}
                      >
                        <FaStar
                          className={`text-xl sm:text-2xl transition-all duration-150 ${
                            (hoverRating || formData.rating) >= star
                              ? 'text-yellow-400 drop-shadow-[0_2px_4px_rgba(234,179,8,0.4)] scale-110'
                              : 'text-slate-600 hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                      {hoverRating || formData.rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* 8. What did you Like? */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-start sm:items-center gap-2 sm:gap-4 hover:bg-[#162238]/60 transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-200">
                    What did you Like? :
                  </label>
                  <div className="sm:col-span-8 flex flex-wrap items-center gap-3 sm:gap-5">
                    {/* Response */}
                    <div className="flex items-center gap-1.5 bg-[#162238] px-2.5 py-1 rounded-lg border border-slate-700 shadow-2xs">
                      <span className="text-xs font-bold text-slate-300">Response</span>
                      <button
                        type="button"
                        onClick={() => handleToggleLike('response', 'like')}
                        className={`p-1 rounded-md transition-colors ${
                          formData.likes.response === 'like' 
                            ? 'text-emerald-400 bg-emerald-950 ring-1 ring-emerald-500' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                        title="Like Response"
                      >
                        <ThumbsUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleLike('response', 'dislike')}
                        className={`p-1 rounded-md transition-colors ${
                          formData.likes.response === 'dislike' 
                            ? 'text-rose-400 bg-rose-950 ring-1 ring-rose-500' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                        title="Dislike Response"
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </div>

                    {/* Quality */}
                    <div className="flex items-center gap-1.5 bg-[#162238] px-2.5 py-1 rounded-lg border border-slate-700 shadow-2xs">
                      <span className="text-xs font-bold text-slate-300">Quality</span>
                      <button
                        type="button"
                        onClick={() => handleToggleLike('quality', 'like')}
                        className={`p-1 rounded-md transition-colors ${
                          formData.likes.quality === 'like' 
                            ? 'text-emerald-400 bg-emerald-950 ring-1 ring-emerald-500' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                        title="Like Quality"
                      >
                        <ThumbsUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleLike('quality', 'dislike')}
                        className={`p-1 rounded-md transition-colors ${
                          formData.likes.quality === 'dislike' 
                            ? 'text-rose-400 bg-rose-950 ring-1 ring-rose-500' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                        title="Dislike Quality"
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </div>

                    {/* Delivery */}
                    <div className="flex items-center gap-1.5 bg-[#162238] px-2.5 py-1 rounded-lg border border-slate-700 shadow-2xs">
                      <span className="text-xs font-bold text-slate-300">Delivery</span>
                      <button
                        type="button"
                        onClick={() => handleToggleLike('delivery', 'like')}
                        className={`p-1 rounded-md transition-colors ${
                          formData.likes.delivery === 'like' 
                            ? 'text-emerald-400 bg-emerald-950 ring-1 ring-emerald-500' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                        title="Like Delivery"
                      >
                        <ThumbsUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleLike('delivery', 'dislike')}
                        className={`p-1 rounded-md transition-colors ${
                          formData.likes.delivery === 'dislike' 
                            ? 'text-rose-400 bg-rose-950 ring-1 ring-rose-500' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                        title="Dislike Delivery"
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </div>

                  </div>
                </div>

                {/* 9. Write Your Review */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-start gap-2 sm:gap-4 hover:bg-[#162238]/60 transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-200 pt-1">
                    <span className="text-amber-400 font-bold">*</span> Write Your Review :
                  </label>
                  <div className="sm:col-span-8">
                    <textarea 
                      name="review"
                      rows={4}
                      value={formData.review}
                      onChange={handleChange}
                      onBlur={() => handleBlur('review')}
                      placeholder="Share details of your experience with precast materials, installation, quality and service..."
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg bg-[#162238] border text-white placeholder-slate-500 focus:outline-hidden transition-all resize-y shadow-2xs ${
                        touched.review && errors.review
                          ? 'border-red-500 ring-2 ring-red-500/30'
                          : 'border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                      }`}
                      required
                    />
                    {touched.review && errors.review && (
                      <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-400 font-medium mt-1.5 flex items-center gap-1.5">
                        <AlertCircle size={15} className="shrink-0 text-red-400" />
                        <span>{errors.review}</span>
                      </p>
                    )}
                  </div>
                </div>

              </div>

              {/* Action Buttons: Submit & Cancel (Centered) */}
              <div className="flex items-center justify-center gap-3.5 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-7 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm tracking-wide transition-all active:scale-95 cursor-pointer"
                >
                  Cancel
                </button>
              </div>

            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WriteReviewModal;
