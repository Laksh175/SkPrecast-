import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, ArrowRight, ShieldCheck, ChevronRight, ChevronLeft,
  Send, Building2, Factory, Award, ArrowLeft, CheckCircle2,
  Clock, Loader2, Sparkles, ChevronDown, Search, AlertCircle
} from 'lucide-react';
import { getProductBySlug } from '../../data/productsData';
import { exploreRangeProductsData } from '../../data/aboutUsData';
import { countryCodes } from '../../data/homeData';
import { useInfiniteSlider, useClickOutside } from '../../hooks';
import ImageZoomMagnifier from './ImageZoomMagnifier';
import QuickQuoteModal from '../QuickQuoteModal';
import { navigateTo } from '../../utils/navigation';
import { 
  Button, 
  NameField, 
  EmailField, 
  PhoneField, 
  getMaxPhoneDigits 
} from '../../common';
import { validateField } from '../../utils/validation';


const ProductDetailPage = ({ slug: propSlug, productData: propProductData }) => {
  // If slug is passed as prop, use it; otherwise extract from window.location.pathname
  const pathSlug = window.location.pathname
    .toLowerCase()
    .replace(/^\//, '')
    .replace(/\.htm.*$/, '')
    .replace(/^products\//, '');

  const activeSlug = propSlug || pathSlug;
  const product = propProductData || getProductBySlug(activeSlug) || getProductBySlug('concrete-folding-compound-wall');

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(product?.image);
  const galleryScrollRef = useRef(null);

  const scrollGallery = (direction) => {
    if (galleryScrollRef.current) {
      const scrollAmount = 180;
      galleryScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    setActiveImage(product?.image);
  }, [product?.id, product?.image]);

  const { sliderRef, isDragging, containerHandlers, sliderHandlers } = useInfiniteSlider({ speed: 0.85 });

  // Country Code Dropdown State
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]); // India +91

  // Inline Enquiry Form State
  const [inlineFormState, setInlineFormState] = useState({
    name: '',
    email: '',
    mobile: '',
    quantity: '1000',
    unit: 'Square Feet',
    purpose: 'Reselling',
    details: ''
  });
  const [inlineErrors, setInlineErrors] = useState({});
  const [inlineTouched, setInlineTouched] = useState({});
  const [isInlineSubmitting, setIsInlineSubmitting] = useState(false);
  const [isInlineSubmitted, setIsInlineSubmitted] = useState(false);
  const [inlineError, setInlineError] = useState('');

  const getFieldError = (name, value, currentForm = inlineFormState) => {
    return validateField(name, value, {
      selectedCountry,
      required: true,
      minLength: name === 'details' ? 5 : undefined
    });
  };

  const handleInlineBlur = (field) => {
    setInlineTouched(prev => ({ ...prev, [field]: true }));
    const error = getFieldError(field, inlineFormState[field]);
    setInlineErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleInlineFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const maxDigits = getMaxPhoneDigits(selectedCountry);
      const digitsOnly = value.replace(/\D/g, '').slice(0, maxDigits);
      setInlineFormState((prev) => ({ ...prev, mobile: digitsOnly }));
      if (inlineTouched.mobile) {
        setInlineErrors(prev => ({ ...prev, mobile: getFieldError('mobile', digitsOnly) }));
      }
    } else {
      setInlineFormState((prev) => ({ ...prev, [name]: value }));
      if (inlineTouched[name]) {
        setInlineErrors(prev => ({ ...prev, [name]: getFieldError(name, value) }));
      }
    }
  };

  const handleInlineSubmit = (e) => {
    e.preventDefault();

    setInlineTouched({
      name: true,
      email: true,
      mobile: true,
      quantity: true,
      details: true
    });

    const nameError = getFieldError('name', inlineFormState.name);
    const emailError = getFieldError('email', inlineFormState.email);
    const mobileError = getFieldError('mobile', inlineFormState.mobile);
    const quantityError = getFieldError('quantity', inlineFormState.quantity);
    const detailsError = getFieldError('details', inlineFormState.details);

    const newErrors = {
      name: nameError,
      email: emailError,
      mobile: mobileError,
      quantity: quantityError,
      details: detailsError
    };

    setInlineErrors(newErrors);

    if (nameError || emailError || mobileError || quantityError || detailsError) {
      return;
    }
    setInlineError('');
    setIsInlineSubmitting(true);

    setTimeout(() => {
      setIsInlineSubmitting(false);
      setIsInlineSubmitted(true);

      const message = `Hello SK Precast Industries,%0A%0A*New Product Enquiry for ${product?.name}*%0A• *Name:* ${inlineFormState.name.trim()}%0A• *Mobile:* ${selectedCountry.dialCode} ${inlineFormState.mobile.trim()}${inlineFormState.email ? `%0A• *Email:* ${inlineFormState.email.trim()}` : ''}%0A• *Quantity:* ${inlineFormState.quantity} ${inlineFormState.unit || 'Square Feet'}%0A• *Purpose:* ${inlineFormState.purpose}%0A• *Message:* ${inlineFormState.details}%0A%0APlease share best factory quotation.`;

      setTimeout(() => {
        window.open(`https://wa.me/918238902687?text=${message}`, '_blank');
      }, 1000);
    }, 800);
  };

  // Triple items for seamless continuous infinite looping
  const displayRangeProducts = [
    ...exploreRangeProductsData,
    ...exploreRangeProductsData,
    ...exploreRangeProductsData
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (product?.name) {
      document.title = `${product.name} Manufacturers & Suppliers Palwal | SK Precast Industries`;
    }
  }, [product?.name, activeSlug]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-white">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Product Not Found</h2>
        <p className="text-slate-600 mb-6">The requested product could not be located in our catalog.</p>
        <a
          href="/products.htm"
          onClick={(e) => navigateTo('/products.htm', e)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to All Products</span>
        </a>
      </div>
    );
  }

  const scrollToExploreRange = (e) => {
    e.preventDefault();
    const elem = document.getElementById('explore-our-range');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen pb-20">
      
      {/* 1. Main Hero Banner with Breadcrumbs, Title & Subtitle Paragraph (Matching About & Products) */}
      <section className="relative bg-theme-heroNavy text-white pt-14 pb-16 sm:pt-16 sm:pb-20 overflow-hidden border-b border-amber-500/30 font-sans">
        {/* Subtle Dot Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Gradient Glows */}
        <div className="absolute -top-24 left-1/3 w-96 h-96 bg-amber-500/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

        {/* Top Gold Highlight Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.6)]" />

        <div className="max-w-[1260px] mx-auto px-6 relative z-10 text-center">
          {/* Top Breadcrumb (Clean & Bigger Font without background square box) */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center justify-center flex-wrap gap-2.5 text-sm sm:text-base font-semibold text-slate-300 mb-4"
          >
            {product.breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.path}>
                {idx > 0 && <span className="text-slate-500 font-normal">/</span>}
                {idx === product.breadcrumbs.length - 1 ? (
                  <span className="text-amber-400 font-bold">
                    {crumb.label}
                  </span>
                ) : (
                  <a
                    href={crumb.path}
                    onClick={(e) => navigateTo(crumb.path, e)}
                    className="hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {crumb.label}
                  </a>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Subtitle Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="max-w-3xl mx-auto text-slate-300 text-[15px] leading-[26px]"
          >
            {product.categoryTagline ? (
              <>
                <strong className="text-white font-bold">SK Precast Industries: </strong>
                {product.categoryTagline.replace(/^SK Precast Industries:\s*/i, '')}
              </>
            ) : (
              product.description
            )}
          </motion.p>
        </div>
      </section>

      {/* 3. Main Product Details (Clean Full-Width Flow without enclosed box) */}
      <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <motion.div 
          key={product.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Interactive Image with Real-Time Hover Zoom Magnifier */}
            <div className="lg:col-span-6 xl:col-span-5 relative flex flex-col justify-start">
              <ImageZoomMagnifier
                src={activeImage || product.image}
                alt={product.name}
                productName={product.name}
                zoomLevel={3}
              />

              {/* Gallery Thumbnails Slot below Image with Left/Right Arrows */}
              {product.galleryImages && product.galleryImages.length > 1 && (
                <div className="mt-4 relative flex items-center gap-2 w-full">
                  {/* Left Scroll Arrow */}
                  {product.galleryImages.length > 3 && (
                    <button
                      type="button"
                      onClick={() => scrollGallery('left')}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer z-10 hover:scale-110 active:scale-95"
                      aria-label="Previous images"
                    >
                      <ChevronLeft size={16} />
                    </button>
                  )}

                  {/* Scrollable Thumbnails Track */}
                  <div
                    ref={galleryScrollRef}
                    className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1.5 px-3.5 w-full"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {product.galleryImages.map((imgSrc, idx) => {
                      const isSelected = (activeImage || product.image) === imgSrc;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImage(imgSrc)}
                          onMouseEnter={() => setActiveImage(imgSrc)}
                          className={`relative w-[76px] h-[64px] sm:w-[84px] sm:h-[72px] rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-slate-100 shrink-0 ${
                            isSelected
                              ? 'border-blue-500 ring-2 ring-blue-400/50 shadow-md scale-105'
                              : 'border-slate-300 hover:border-amber-400 opacity-75 hover:opacity-100 shadow-xs'
                          }`}
                        >
                          <img
                            src={imgSrc}
                            alt={`${product.name} thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Scroll Arrow */}
                  {product.galleryImages.length > 3 && (
                    <button
                      type="button"
                      onClick={() => scrollGallery('right')}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer z-10 hover:scale-110 active:scale-95"
                      aria-label="Next images"
                    >
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Product Info & Pricing & Order Controls */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between">
              <div>
                
                {/* Product Title Header */}
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[5px] text-[11px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-300/80 shadow-xs mb-2">
                    <Building2 size={12} className="text-amber-600" />
                    {product.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-black text-slate-900 tracking-tight leading-tight">
                    {product.name}
                  </h2>
                </div>

                {/* Price & MOQ Display */}
                <div className="mb-4 pb-4 border-b border-slate-200">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl lg:text-[32px] font-black text-amber-600 tracking-tight">
                      {product.priceDisplay?.split('/')[0]?.trim()}
                    </span>
                    <span className="text-slate-600 text-sm sm:text-base font-semibold">
                      / {product.unit}
                    </span>
                  </div>
                  
                  {/* MOQ below price */}
                  <div className="mt-1.5 text-xs sm:text-sm font-bold text-slate-900">
                    {product.moq}
                  </div>
                </div>

                {/* Key Overview Attribute List */}
                <div className="divide-y divide-slate-100 mb-6 text-[14px] sm:text-[16px]">
                  {product.overview.map((item, idx) => (
                    <div key={idx} className="py-2.5 sm:py-3.5 flex items-start gap-3 sm:gap-8">
                      <span className="text-slate-500 font-semibold text-[14px] sm:text-[16px] shrink-0 w-32 sm:w-44 text-left leading-relaxed">
                        {item.label}
                      </span>
                      <span className="text-slate-900 font-bold text-[14px] sm:text-[16px] text-left flex-1 leading-relaxed">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* "Click to view more" link */}
                <div className="mb-6">
                  <a
                    href="#explore-our-range"
                    onClick={scrollToExploreRange}
                    className="inline-flex items-center gap-1.5 text-[14px] font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer"
                  >
                    <span>Click to view more specifications</span>
                    <ArrowRight size={14} />
                  </a>
                </div>

              </div>

              {/* Dual Action Buttons (Request to Call & Send Enquiry in 1 line on mobile) */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 pt-6 sm:pt-8 pb-1 border-t border-slate-200 mt-2">
                {/* Button 1: Request to Call */}
                <Button
                  variant="view-more"
                  size="md"
                  href="tel:+918238902687"
                  icon={<Phone size={15} className="text-amber-400 group-hover/btn:text-slate-950 transition-colors" />}
                  iconPosition="left"
                >
                  Request to Call
                </Button>

                {/* Button 2: Send Enquiry */}
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => setIsQuoteModalOpen(true)}
                  icon={<Send size={15} className="text-slate-950" />}
                  iconPosition="left"
                >
                  Send Enquiry
                </Button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>

      {/* 4. Complete Detailed Specifications Section (Themed Striped Table as per Reference) */}
      <div id="product-specifications-table" className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4">
        <div className="w-full text-left">
          
          {/* Header */}
          <div className="mb-5">
            <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">Details</span>
            </h2>
          </div>

          {/* Specifications Table (Themed Striped Table) */}
          <div className="w-full overflow-hidden rounded-[15px] border border-slate-200/90 shadow-sm bg-white">
            <div className="grid grid-cols-12 bg-theme-heading text-white px-5 sm:px-7 py-3.5 sm:py-4 font-bold text-xs sm:text-sm uppercase tracking-wider">
              <div className="col-span-5 sm:col-span-4 text-white">Attribute</div>
              <div className="col-span-7 sm:col-span-8 text-white">Details</div>
            </div>

            <div className="divide-y divide-slate-100">
              {product.specifications.map((spec, idx) => (
                <div 
                  key={idx}
                  className={`grid grid-cols-12 px-5 sm:px-7 py-3.5 sm:py-4 items-center transition-colors ${
                    idx % 2 === 0 ? 'bg-white hover:bg-amber-50/20' : 'bg-slate-50/70 hover:bg-amber-50/30'
                  }`}
                >
                  <div className="col-span-5 sm:col-span-4 text-slate-600 font-semibold text-[14px] sm:text-[16px] pr-2">
                    {spec.label}
                  </div>
                  <div className="col-span-7 sm:col-span-8 text-theme-heading font-bold text-[14px] sm:text-[16px]">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 5. Buyer Attraction & Commercial Description Section */}
      <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8 text-left">
        <div className="w-full">
          
          {/* Header */}
          <div className="mb-4 sm:mb-5">
            <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">{product.name}</span>
            </h2>
          </div>

          {/* Engaging Commercial Pitch Text */}
          <div className="text-slate-700 text-[15px] sm:text-[17px] leading-[28px] mb-6 space-y-4">
            {product.commercialPitch ? (
              typeof product.commercialPitch === 'string' ? (
                product.commercialPitch.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>{product.commercialPitch}</p>
              )
            ) : (
              <>
                <p>
                  <strong className="text-slate-900 font-bold">SK Precast Industries</strong> is a leading manufacturer and supplier of <strong className="text-slate-900 font-bold">{product.name}</strong> and high-durability <strong className="text-slate-900 font-bold">Precast RCC Compound &amp; Boundary Walls</strong> based in Palwal (Haryana), delivering durable, high-quality, and robust boundary solutions across residential, commercial, industrial, and solar construction projects across Delhi NCR.
                </p>
                <p>
                  Manufactured using machine-vibrated high-grade concrete with prestressed high-tensile carbon steel reinforcement, our precast compound walls offer outstanding resistance to harsh environmental factors, heavy weathering, and physical impact. Designed for seamless modular interlocking, they eliminate labor-intensive brickwork, providing a sturdy, maintenance-free, and aesthetically superior boundary wall for any site.
                </p>
              </>
            )}
          </div>

          {/* Centered Action Button */}
          <div className="mt-8 sm:mt-10 flex justify-center items-center">
            <Button
              variant="gold"
              size="md"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Yes! I am interested
            </Button>
          </div>

        </div>
      </div>

      {/* 6. Product Enquiry Form Section (Left Form + Right Image Card as per Reference) */}
      <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Clean High-Precision Enquiry Form Card */}
          <div className="lg:col-span-7 bg-white rounded-[15px] border border-slate-200/90 shadow-[0_20px_60px_rgba(15,23,42,0.06)] p-5 sm:p-8 lg:p-10 pt-5 sm:pt-7 text-left flex flex-col justify-between">
            
            {/* Header: Title & Direct Contact Details */}
            <div className="mb-4 sm:mb-5">
              <h2 className="text-[23px] sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-1.5">
                Let&apos;s Get In Touch.
              </h2>
              
              <p style={{ fontSize: '14px' }} className="text-[14px] text-slate-500 leading-relaxed">
                Or reach out manually to{' '}
                <a style={{ fontSize: '14px' }} href="mailto:info@skprecast-industries.com" className="text-[14px] text-amber-600 hover:text-amber-700 font-bold underline transition-colors">
                  info@skprecast-industries.com
                </a>
                {' '}/{' '}
                <a style={{ fontSize: '14px' }} href="tel:+918238902687" className="text-[14px] text-amber-600 hover:text-amber-700 font-bold underline transition-colors">
                  +91-8238902687
                </a>
              </p>
            </div>

            {/* Success Notification */}
            {isInlineSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-[15px] p-8 text-center flex flex-col items-center justify-center my-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  Thank You for Your Enquiry!
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed max-w-md">
                  Our Palwal technical team has received your requirement for <strong className="text-slate-900">{product.name}</strong> and will share the best quotation shortly.
                </p>
                <Button
                  variant="dark"
                  size="md"
                  onClick={() => {
                    setIsInlineSubmitted(false);
                    setInlineFormState({
                      name: '',
                      email: '',
                      mobile: '',
                      quantity: '1000',
                      unit: product?.unit || 'Square Feet',
                      purpose: 'Reselling',
                      details: ''
                    });
                  }}
                >
                  Send Another Enquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleInlineSubmit} className="space-y-4 sm:space-y-4.5">
                
                {inlineError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-700 text-xs sm:text-sm font-semibold">
                    {inlineError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <NameField
                    label="Your Name"
                    required={true}
                    name="name"
                    value={inlineFormState.name}
                    onChange={handleInlineFormChange}
                    onBlur={() => handleInlineBlur('name')}
                    error={inlineErrors.name}
                    touched={inlineTouched.name}
                    placeholder="Enter your full name..."
                  />

                  <EmailField
                    label="Email Address"
                    required={true}
                    name="email"
                    value={inlineFormState.email}
                    onChange={handleInlineFormChange}
                    onBlur={() => handleInlineBlur('email')}
                    error={inlineErrors.email}
                    touched={inlineTouched.email}
                    placeholder="Enter your email address..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PhoneField
                    label="Phone / Mobile"
                    required={true}
                    name="mobile"
                    value={inlineFormState.mobile}
                    selectedCountry={selectedCountry}
                    onCountryChange={(item) => {
                      const newMaxDigits = getMaxPhoneDigits(item);
                      const adjustedPhone = inlineFormState.mobile.slice(0, newMaxDigits);
                      setSelectedCountry(item);
                      setInlineFormState((prev) => ({ ...prev, mobile: adjustedPhone }));
                      if (inlineTouched.mobile) {
                        setInlineErrors((prev) => ({
                          ...prev,
                          mobile: validateField('mobile', adjustedPhone, { selectedCountry: item, required: true })
                        }));
                      }
                    }}
                    onChange={handleInlineFormChange}
                    onBlur={() => handleInlineBlur('mobile')}
                    error={inlineErrors.mobile}
                    touched={inlineTouched.mobile}
                    placeholder={selectedCountry.code === 'IN' ? 'Enter 10-digit mobile number' : `Enter phone number`}
                  />


                  {/* ESTIMATED QUANTITY & UNIT */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Estimated Quantity <span className="text-amber-600 font-bold">*</span>
                    </label>
                    <div className={`flex rounded-xl border overflow-hidden focus-within:ring-3 focus-within:ring-amber-500/15 bg-white transition-all shadow-2xs ${
                      inlineTouched.quantity && inlineErrors.quantity
                        ? 'border-red-500 ring-2 ring-red-200'
                        : 'border-slate-300 focus-within:border-amber-500 hover:border-slate-400'
                    }`}>
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={inlineFormState.quantity}
                        onChange={handleInlineFormChange}
                        onBlur={() => handleInlineBlur('quantity')}
                        placeholder="e.g. 1000"
                        required
                        className="w-full px-3.5 py-2.5 sm:py-3 text-slate-900 text-sm font-bold outline-none bg-transparent"
                      />
                      <div className="border-l border-amber-200/90 bg-amber-50/70 hover:bg-amber-100/70 focus-within:bg-amber-50 transition-colors shrink-0 flex items-center">
                        <input
                          type="text"
                          name="unit"
                          value={inlineFormState.unit}
                          onChange={handleInlineFormChange}
                          placeholder="Square Feet"
                          className="w-28 sm:w-32 px-3 py-2.5 sm:py-3 bg-transparent text-amber-900 text-xs sm:text-sm font-bold outline-none text-center"
                          aria-label="Measurement Unit"
                        />
                      </div>
                    </div>
                    {inlineTouched.quantity && inlineErrors.quantity && (
                      <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1.5 flex items-center gap-1.5">
                        <AlertCircle size={16} className="shrink-0 text-red-500" />
                        <span>{inlineErrors.quantity}</span>
                      </p>
                    )}
                  </div>

                </div>

                {/* PURPOSE OF REQUIREMENT (Tactile Cards) */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Purpose of Requirement <span className="text-amber-600 font-bold">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label 
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                        inlineFormState.purpose === 'Reselling' 
                          ? 'bg-amber-50/90 border-amber-500 text-amber-950 ring-2 ring-amber-500/20 shadow-xs' 
                          : 'bg-slate-50/50 border-slate-300 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="purpose"
                          value="Reselling"
                          checked={inlineFormState.purpose === 'Reselling'}
                          onChange={handleInlineFormChange}
                          className="sr-only"
                        />
                        <Building2 size={16} className={inlineFormState.purpose === 'Reselling' ? 'text-amber-600' : 'text-slate-400'} />
                        <span>Reselling</span>
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${inlineFormState.purpose === 'Reselling' ? 'border-amber-500 bg-amber-500' : 'border-slate-300'}`}>
                        {inlineFormState.purpose === 'Reselling' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </label>

                    <label 
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                        inlineFormState.purpose === 'End Use' 
                          ? 'bg-amber-50/90 border-amber-500 text-amber-950 ring-2 ring-amber-500/20 shadow-xs' 
                          : 'bg-slate-50/50 border-slate-300 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="purpose"
                          value="End Use"
                          checked={inlineFormState.purpose === 'End Use'}
                          onChange={handleInlineFormChange}
                          className="sr-only"
                        />
                        <Factory size={16} className={inlineFormState.purpose === 'End Use' ? 'text-amber-600' : 'text-slate-400'} />
                        <span>End Use</span>
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${inlineFormState.purpose === 'End Use' ? 'border-amber-500 bg-amber-500' : 'border-slate-300'}`}>
                        {inlineFormState.purpose === 'End Use' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </label>
                  </div>
                </div>

                {/* REQUIREMENT DETAILS (Proper Height + Required + Placeholder) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Leave a Message / Requirement Details <span className="text-amber-600 font-bold">*</span>
                    </label>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {inlineFormState.details.length}/300
                    </span>
                  </div>
                  <textarea
                    name="details"
                    rows={4}
                    maxLength={300}
                    value={inlineFormState.details}
                    onChange={handleInlineFormChange}
                    onBlur={() => handleInlineBlur('details')}
                    required
                    placeholder="I am interested. Kindly send the quotation for the same."
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white focus:ring-3 focus:ring-amber-500/15 text-slate-900 text-sm placeholder:text-slate-400 outline-none resize-none transition-all min-h-[110px] ${
                      inlineTouched.details && inlineErrors.details
                        ? 'border-red-500 ring-2 ring-red-200'
                        : 'border-slate-300 focus:border-amber-500 hover:border-slate-400'
                    }`}
                  />
                  {inlineTouched.details && inlineErrors.details && (
                    <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1.5 flex items-center gap-1.5">
                      <AlertCircle size={16} className="shrink-0 text-red-500" />
                      <span>{inlineErrors.details}</span>
                    </p>
                  )}
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <Button
                    variant="gold"
                    size="md"
                    type="submit"
                    disabled={isInlineSubmitting}
                    icon={isInlineSubmitting ? <Loader2 size={17} className="animate-spin text-slate-950" /> : <Send size={16} />}
                    iconPosition="left"
                  >
                    {isInlineSubmitting ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: High-Impact Visual Image Card with Floating Pricing Badge */}
          <div className="lg:col-span-5 relative rounded-[15px] overflow-hidden min-h-[440px] sm:min-h-[500px] lg:min-h-full border border-slate-200/90 shadow-[0_20px_60px_rgba(15,23,42,0.06)] flex flex-col justify-between p-6 sm:p-7 text-left group">
            
            {/* Background Image */}
            <img 
              src={product.image || "/assets/about/factory.jpg"} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700" 
            />
            
            {/* Dark Aesthetic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/95 via-[#0b1220]/35 to-[#0b1220]/45" />

            {/* Top-Left Location Badge */}
            <div className="relative z-10 self-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                <span>PALWAL UNIT, HARYANA</span>
              </div>
            </div>

            {/* Bottom Floating Glass Card */}
            <div className="relative z-10 bg-[#0f172a]/95 backdrop-blur-md border border-white/10 rounded-[15px] p-4 sm:p-4.5 text-white shadow-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold" style={{ fontSize: '14px' }}>
                <ShieldCheck size={16} className="text-amber-400 shrink-0" />
                <span style={{ fontSize: '14px' }} className="text-[14px] font-bold tracking-tight">Direct Manufacturer Pricing</span>
              </div>
              
              <p style={{ fontSize: '13px' }} className="text-[13px] text-slate-300 leading-relaxed font-normal">
                Get high-density vibrated precast boundary walls delivered directly from our Palwal plant across Delhi NCR & North India.
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-slate-300 font-medium flex-wrap gap-2" style={{ fontSize: '11.5px' }}>
                <span className="flex items-center gap-1.5 text-amber-300 text-[11.5px]">
                  <Clock size={12} className="shrink-0" />
                  <span>Quick Quote in 30 Mins</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-300 text-[11.5px]">
                  <Factory size={12} className="shrink-0" />
                  <span>Pan-India Supply</span>
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 7. Explore Our Range (Continuous Auto-Scrolling Edge-to-Edge Full Width Slider) */}
      <div id="explore-our-range" className="mt-16 sm:mt-20 pt-4 mb-4 relative z-10 w-full scroll-mt-10">
        {/* Header Row: Title on Left, Description & Button Below it on Right */}
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 mb-8 sm:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left: Title with Decorative Underline */}
            <div className="text-center lg:text-left">
              <div className="inline-block">
                <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">Range</span>
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2 mx-auto">
                  <span className="h-[2px] w-20 sm:w-28 bg-amber-400 rounded-full" />
                  <span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b] shrink-0" />
                  <span className="h-[2px] w-20 sm:w-28 bg-amber-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Right: Subtitle Text + View All Button directly below paragraph */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 max-w-lg mx-auto lg:mx-0">
              <p className="text-slate-600 text-[17px] leading-[28px]">
                Explore our successfully engineered precast concrete and boundary wall solutions delivered across industrial and residential sites.
              </p>
              
              <Button
                variant="dark-to-gold"
                size="md"
                href="/products.htm"
                icon={<ArrowRight size={14} />}
                iconPosition="right"
              >
                View All
              </Button>
            </div>

          </div>
        </div>

        {/* Full-Width Edge-To-Edge Auto-Scrolling Track (100% Screen Width) */}
        <div 
          className="relative w-full overflow-hidden select-none"
          {...containerHandlers}
        >
          <div
            ref={sliderRef}
            {...sliderHandlers}
            className={`flex items-center gap-3.5 sm:gap-6 overflow-x-auto no-scrollbar px-3 sm:px-8 lg:px-12 py-2 sm:py-4 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch' 
            }}
          >
            {displayRangeProducts.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="w-[220px] sm:w-[300px] md:w-[350px] lg:w-[370px] shrink-0"
              >
                <a
                  href={item.link}
                  onClick={(e) => navigateTo(item.link, e)}
                  className="group relative block w-full h-[280px] sm:h-[360px] lg:h-[390px] rounded-[15px] overflow-hidden bg-slate-900 border border-slate-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_35px_rgba(250,204,21,0.25)] hover:border-yellow-400 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer"
                  draggable={false}
                >
                  {/* Image (Clean full opacity) */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                    draggable={false}
                    loading="lazy"
                  />

                  {/* Top-Left Name Text with White Text-Shadow */}
                  <div className="absolute top-4 left-4 right-12 z-10 text-left">
                    <h3 
                      className="text-white font-extrabold text-[15px] sm:text-[16px] md:text-[17px] leading-snug tracking-tight line-clamp-2"
                      style={{ textShadow: 'black 1px 3px 7px' }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Bottom-Right Arrow Circle Button */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <div className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-slate-900 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-white transition-all shadow-[0_4px_14px_rgba(0,0,0,0.3)] group-hover:translate-x-0.5">
                      <ArrowRight size={16} />
                    </div>
                  </div>

                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={{
          name: product.name,
          image: product.image,
          price: product.priceDisplay,
          moq: product.moq || '1000 Square Feet'
        }}
      />

    </div>
  );
};

export default ProductDetailPage;
