import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ThumbsUp, ThumbsDown, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { FaStar } from 'react-icons/fa6';
import { countryCodes, allProductsList } from '../data/homeData';
import { CountryCodePicker, SearchableSelect } from '../common';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.trim().length < 8) {
      setErrorMessage('Please enter a valid mobile number.');
      return;
    }
    if (!formData.product.trim()) {
      setErrorMessage('Please select a Product / Service.');
      return;
    }
    if (!formData.rating || formData.rating < 1) {
      setErrorMessage('Please select a rating score.');
      return;
    }
    if (!formData.review.trim() || formData.review.trim().length < 10) {
      setErrorMessage('Please write a review of at least 10 characters.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onReviewSubmitted) {
        onReviewSubmitted(formData);
      }
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 800);
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

        {/* Modal Window (White Background) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-[740px] max-h-[92vh] overflow-y-auto bg-white text-slate-900 rounded-2xl border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] p-4 sm:p-7 z-10 custom-scrollbar"
        >
          {/* Top Bar: Title + Mandatory Notice + Close Button */}
          <div className="flex items-center justify-between pb-3 sm:pb-3.5 mb-4 border-b border-slate-200 gap-2">
            <h2 className="text-[17px] sm:text-2xl font-black tracking-tight text-slate-900 whitespace-nowrap">
              <span>Write a Review</span>
            </h2>
            
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <span className="text-[11px] sm:text-[13px] text-slate-500 font-medium whitespace-nowrap">
                <span className="text-rose-500 font-bold text-xs sm:text-sm">*</span> fields are mandatory.
              </span>
              <button 
                type="button"
                onClick={onClose}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer shrink-0"
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
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-md border border-emerald-200">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-black text-slate-900">Review Submitted!</h3>
              <p className="text-sm text-slate-600 max-w-md">
                Thank you for sharing your valuable feedback with SK Precast Industries.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-0 text-left">
              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0 text-rose-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Table Structure matching exact layout (White / Light theme) */}
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 bg-[#fbfbfa]">
                
                {/* 1. Your Name */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-white transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-800">
                    <span className="text-rose-500 font-bold">*</span> Your Name :
                  </label>
                  <div className="sm:col-span-8">
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
                      required
                    />
                  </div>
                </div>

                {/* 2. Company Name */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-white transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-800">
                    Company Name :
                  </label>
                  <div className="sm:col-span-8">
                    <input 
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Optional company or farm name"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* 3. Designation */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-white transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-800">
                    Designation :
                  </label>
                  <div className="sm:col-span-8">
                    <input 
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="e.g. Project Head, Plot Owner, Builder"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* 4. E-mail */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-white transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-800">
                    <span className="text-rose-500 font-bold">*</span> E-mail :
                  </label>
                  <div className="sm:col-span-8">
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
                      required
                    />
                  </div>
                </div>

                {/* 5. Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-white transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-800">
                    <span className="text-rose-500 font-bold">*</span> Mobile :
                  </label>
                  <div className="sm:col-span-8 flex items-center gap-2">
                    <CountryCodePicker
                      selectedCountry={selectedCountry}
                      onChange={setSelectedCountry}
                      size="sm"
                      className="shrink-0"
                    />
                    <input 
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={(e) => setFormData(p => ({ ...p, mobile: e.target.value.replace(/[^0-9]/g, '') }))}
                      placeholder="10-digit mobile number"
                      maxLength={12}
                      className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-2xs"
                      required
                    />
                  </div>
                </div>

                {/* 6. Product / Service */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-white transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-800">
                    <span className="text-rose-500 font-bold">*</span> Product / Service :
                  </label>
                  <div className="sm:col-span-8">
                    <SearchableSelect
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      options={allProductsList}
                      placeholder="Type or select Product / Service..."
                      searchPlaceholder="Filter 35+ products..."
                      isTypeable={true}
                      showSearch={true}
                      size="sm"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* 7. Rating */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-center gap-2 sm:gap-4 hover:bg-white transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-800">
                    <span className="text-rose-500 font-bold">*</span> Rating :
                  </label>
                  <div className="sm:col-span-8 flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData(p => ({ ...p, rating: star }))}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 rounded-md hover:bg-amber-50 transition-all duration-150 focus:outline-hidden group/star"
                        aria-label={`Rate ${star} star`}
                      >
                        <FaStar
                          className={`text-xl sm:text-2xl transition-all duration-150 ${
                            (hoverRating || formData.rating) >= star
                              ? 'text-yellow-400 drop-shadow-[0_2px_4px_rgba(234,179,8,0.4)] scale-110'
                              : 'text-slate-300 hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      {hoverRating || formData.rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* 8. What did you Like? */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-start sm:items-center gap-2 sm:gap-4 hover:bg-white transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-800">
                    What did you Like? :
                  </label>
                  <div className="sm:col-span-8 flex flex-wrap items-center gap-3 sm:gap-5">
                    {/* Response */}
                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                      <span className="text-xs font-bold text-slate-700">Response</span>
                      <button
                        type="button"
                        onClick={() => handleToggleLike('response', 'like')}
                        className={`p-1 rounded-md transition-colors ${
                          formData.likes.response === 'like' 
                            ? 'text-emerald-700 bg-emerald-100 ring-1 ring-emerald-400' 
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
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
                            ? 'text-rose-700 bg-rose-100 ring-1 ring-rose-400' 
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                        title="Dislike Response"
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </div>

                    {/* Quality */}
                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                      <span className="text-xs font-bold text-slate-700">Quality</span>
                      <button
                        type="button"
                        onClick={() => handleToggleLike('quality', 'like')}
                        className={`p-1 rounded-md transition-colors ${
                          formData.likes.quality === 'like' 
                            ? 'text-emerald-700 bg-emerald-100 ring-1 ring-emerald-400' 
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
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
                            ? 'text-rose-700 bg-rose-100 ring-1 ring-rose-400' 
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                        title="Dislike Quality"
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </div>

                    {/* Delivery */}
                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                      <span className="text-xs font-bold text-slate-700">Delivery</span>
                      <button
                        type="button"
                        onClick={() => handleToggleLike('delivery', 'like')}
                        className={`p-1 rounded-md transition-colors ${
                          formData.likes.delivery === 'like' 
                            ? 'text-emerald-700 bg-emerald-100 ring-1 ring-emerald-400' 
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
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
                            ? 'text-rose-700 bg-rose-100 ring-1 ring-rose-400' 
                            : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                        title="Dislike Delivery"
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </div>

                  </div>
                </div>

                {/* 9. Write Your Review */}
                <div className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-3.5 items-start gap-2 sm:gap-4 hover:bg-white transition-colors">
                  <label className="sm:col-span-4 text-xs sm:text-sm font-bold text-slate-800 pt-1">
                    <span className="text-rose-500 font-bold">*</span> Write Your Review :
                  </label>
                  <div className="sm:col-span-8">
                    <textarea 
                      name="review"
                      rows={4}
                      value={formData.review}
                      onChange={handleChange}
                      placeholder="Share details of your experience with precast materials, installation, quality and service..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-y shadow-2xs"
                      required
                    />
                  </div>
                </div>

              </div>

              {/* Action Buttons: Submit & Cancel (Centered) */}
              <div className="flex items-center justify-center gap-3.5 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
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
                  className="px-7 py-2.5 rounded-lg bg-amber-400/90 hover:bg-amber-500 text-slate-950 font-bold text-sm tracking-wide transition-all active:scale-95 cursor-pointer"
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
