import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, CheckCircle2, ChevronDown, 
  Search, ExternalLink, User, Monitor, Globe, Building2
} from 'lucide-react';
import { Button, SearchableSelect, CountryCodePicker } from '../common';
import { navigateTo } from '../utils/navigation';
import { allProductsList, countryCodes } from '../data/homeData';
import { contactUsHeroData, companyContactDetails, mapSectionData } from '../data/contactUsData';

const getMaxPhoneDigits = (country) => {
  if (!country) return 10;
  if (country.code === 'IN') return 10;
  if (['AE', 'SA', 'AU', 'FR', 'NZ'].includes(country.code)) return 9;
  if (['US', 'CA', 'GB', 'MX', 'BR'].includes(country.code)) return 10;
  if (['SG', 'QA', 'KW', 'OM', 'BH', 'HK'].includes(country.code)) return 8;
  if (['DE', 'RU', 'ZA'].includes(country.code)) return 11;
  return 12;
};

const ContactUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us - SK Precast Industries | Palwal, Haryana";
  }, []);

  const [formData, setFormData] = useState({
    product: '',
    name: '',
    email: '',
    selectedCountry: countryCodes[0], // India +91
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation
  const validateField = (name, value, currentFormData = formData) => {
    let error = '';

    if (name === 'product') {
      if (!(value || '').trim()) {
        error = 'Please enter or select a product/service.';
      }
    }

    if (name === 'name') {
      const trimmed = (value || '').trim();
      if (!trimmed) {
        error = 'Your name is required.';
      } else if (trimmed.length < 2) {
        error = 'Name must be at least 2 characters.';
      }
    }

    if (name === 'email') {
      const trimmed = (value || '').trim().toLowerCase();
      if (!trimmed) {
        error = 'Email is required.';
      } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(trimmed)) {
        error = 'Please enter a valid email address.';
      }
    }

    if (name === 'phone') {
      const cleaned = (value || '').replace(/\D/g, '');
      const maxDigits = getMaxPhoneDigits(currentFormData.selectedCountry);

      if (!cleaned) {
        error = 'Mobile number is required.';
      } else if (currentFormData.selectedCountry?.code === 'IN') {
        if (cleaned.length !== 10) {
          error = 'Please enter a valid 10-digit mobile number.';
        } else if (!/^[6-9]\d{9}$/.test(cleaned)) {
          error = 'Mobile number must start with 6, 7, 8, or 9.';
        }
      } else {
        if (cleaned.length < (maxDigits > 8 ? 8 : maxDigits)) {
          error = `Please enter a valid ${maxDigits}-digit mobile number.`;
        }
      }
    }

    if (name === 'message') {
      if (!(value || '').trim()) {
        error = 'Please provide enquiry details / your requirement.';
      }
    }

    return error;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    if (name === 'phone') {
      const digitsOnly = sanitizedValue.replace(/\D/g, '');
      const maxDigits = getMaxPhoneDigits(formData.selectedCountry);
      const truncatedPhone = digitsOnly.slice(0, maxDigits);

      setFormData(prev => ({ ...prev, phone: truncatedPhone }));
      if (touched.phone) {
        setErrors(prev => ({ ...prev, phone: validateField('phone', truncatedPhone, formData) }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
      if (touched[name]) {
        setErrors(prev => ({ ...prev, [name]: validateField(name, sanitizedValue) }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      product: true,
      name: true,
      email: true,
      phone: true,
      message: true
    });

    const productError = validateField('product', formData.product);
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const phoneError = validateField('phone', formData.phone);
    const messageError = validateField('message', formData.message);

    const newErrors = {
      product: productError,
      name: nameError,
      email: emailError,
      phone: phoneError,
      message: messageError
    };

    setErrors(newErrors);

    if (productError || nameError || emailError || phoneError || messageError) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      const waMsg = `*New Contact Enquiry - SK Precast Industries*%0A%0A• *Product/Service:* ${formData.product.trim()}%0A• *Name:* ${formData.name.trim()}%0A• *Email:* ${formData.email.trim()}%0A• *Mobile:* ${formData.selectedCountry.dialCode} ${formData.phone.trim()}%0A• *Requirement:* ${formData.message.trim()}`;

      setTimeout(() => {
        window.open(`https://wa.me/918238902687?text=${waMsg}`, '_blank');
      }, 1000);

      setFormData({
        product: '',
        name: '',
        email: '',
        selectedCountry: countryCodes[0],
        phone: '',
        message: ''
      });
      setErrors({});
      setTouched({});
      setTimeout(() => setSubmitted(false), 8000);
    }, 600);
  };

  return (
    <div className="w-full bg-theme-pageBg text-theme-heading font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-theme-heroNavy text-white pt-14 pb-16 lg:pt-20 lg:pb-22 overflow-hidden border-b border-amber-500/20 shadow-xl">
        {/* Architectural Dot Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Gradient Glows */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

        {/* Top Gold Highlight Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.6)]" />

        <div className="max-w-[1260px] mx-auto px-6 relative z-10 text-center">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center justify-center gap-2.5 text-sm sm:text-base font-semibold text-slate-300 mb-5"
          >
            <a 
              href="/" 
              onClick={(e) => navigateTo('/', e)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </a>
            <span className="text-slate-500 font-normal">/</span>
            <span className="text-amber-400 font-bold">{contactUsHeroData.breadcrumb}</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-[30px] font-extrabold tracking-tight leading-tight mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-400 drop-shadow-sm">
              {contactUsHeroData.title}
            </span>
          </motion.h1>

          {/* Decorative Underline Accent */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-4 mx-auto"
          >
            <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
            <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
            <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
            className="max-w-3xl mx-auto text-slate-300 text-[15px] leading-[26px]"
          >
            {contactUsHeroData.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. MAIN CONTACT & ENQUIRY SECTION (Left Box Wider, Right Box Compact, Distinct Cards) */}
      <section className="py-12 sm:py-16 bg-[#f8fafc] text-slate-900 relative">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* LEFT CARD: Company Contact Details (Wider Card: lg:col-span-7) */}
            <div className="lg:col-span-7 bg-white rounded-[20px] border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-amber-300 transition-all duration-300 p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full">
              
              <div>
                {/* Header with Signature Gradient Text and Decorative Accent Underline */}
                <div className="mb-6 text-left">
                  <h2 className="text-[23px] sm:text-2xl lg:text-[28px] font-black tracking-tight leading-tight text-slate-900">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500 drop-shadow-sm">
                      {companyContactDetails.companyName}
                    </span>
                  </h2>
                  <div className="flex items-center gap-2 mt-2.5 mb-2">
                    <span className="h-[2px] w-14 sm:w-20 rounded-full title-accent-bar" />
                    <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
                    <span className="h-[2px] w-14 sm:w-20 rounded-full title-accent-bar" />
                  </div>
                </div>

                {/* Details List with 3D Glossy Gold Squircle Icons (Matching About Us Page) */}
                <div className="flex flex-col gap-3 sm:gap-3.5 text-left">
                  {/* Item 1: Contact Person */}
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
                    <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                      <User size={20} className="text-white drop-shadow-xs" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Contact Person</span>
                      <p className="caption-text text-[13.5px] sm:text-[14px] text-slate-800 font-bold leading-snug">
                        {companyContactDetails.contactPerson}
                      </p>
                    </div>
                  </div>

                  {/* Item 2: Address */}
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
                    <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                      <MapPin size={20} className="text-white drop-shadow-xs" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Address</span>
                      <p className="caption-text text-[13.5px] sm:text-[14px] text-slate-700 font-medium leading-relaxed">
                        {companyContactDetails.address}
                      </p>
                    </div>
                  </div>

                  {/* Item 3: Call Us */}
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
                    <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                      <Phone size={20} className="text-white drop-shadow-xs" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Mobile</span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {companyContactDetails.phones.map((ph, idx) => (
                          <React.Fragment key={ph}>
                            <a href={`tel:${ph.replace(/[^0-9+]/g, '')}`} className="caption-text text-[13.5px] sm:text-[14px] text-slate-800 hover:text-amber-600 transition-colors font-medium">
                              {ph}
                            </a>
                            {idx < companyContactDetails.phones.length - 1 && <span className="text-slate-300 font-bold">•</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Item 4: Email */}
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
                    <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                      <Mail size={20} className="text-white drop-shadow-xs" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">E-Mail</span>
                      <a href={`mailto:${companyContactDetails.email}`} className="caption-text text-[13.5px] sm:text-[14px] text-slate-800 hover:text-amber-600 transition-colors font-medium truncate block">
                        {companyContactDetails.email}
                      </a>
                    </div>
                  </div>

                  {/* Item 5: Alt. Email */}
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
                    <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                      <Mail size={20} className="text-white drop-shadow-xs" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Alt. E-Mail</span>
                      <a href={`mailto:${companyContactDetails.altEmail}`} className="caption-text text-[13.5px] sm:text-[14px] text-slate-800 hover:text-amber-600 transition-colors font-medium truncate block">
                        {companyContactDetails.altEmail}
                      </a>
                    </div>
                  </div>

                  {/* Item 6: Web Address */}
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
                    <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                      <Monitor size={20} className="text-white drop-shadow-xs" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Web Address</span>
                      <a 
                        href={companyContactDetails.website} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="caption-text text-[13.5px] sm:text-[14px] text-slate-800 hover:text-amber-600 transition-colors font-medium truncate block"
                      >
                        {companyContactDetails.website}
                      </a>
                    </div>
                  </div>

                  {/* Item 7: Web Page */}
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
                    <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                      <Globe size={20} className="text-white drop-shadow-xs" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Web Page</span>
                      <div className="flex flex-col gap-1.5">
                        {companyContactDetails.directoryLinks.map((dir) => (
                          <a 
                            key={dir.url}
                            href={dir.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="caption-text text-[13.5px] text-slate-800 hover:text-amber-600 transition-colors font-medium break-all block"
                          >
                            {dir.url}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* RIGHT CARD: Exact Enquiry Form (Compact Card: lg:col-span-5 without header title) */}
            <div className="lg:col-span-5 bg-white rounded-[20px] border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-amber-300 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-center h-full">
              
              <div>
                {/* Success Banner */}
                {submitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-start gap-3 text-sm"
                  >
                    <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold block text-emerald-950">Thank you for contacting SK Precast Industries!</strong>
                      Your requirement has been received. Our team will reach out to you within 30 minutes.
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                         {/* Field 1: Product / Service Looking for * */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Product / Service Looking for <span className="text-red-500 font-bold">*</span>
                    </label>
                    <SearchableSelect
                      name="product"
                      placeholder="Product / Service Looking for"
                      searchPlaceholder="Search 35+ products..."
                      isTypeable={true}
                      value={formData.product}
                      options={allProductsList}
                      onChange={handleChange}
                      onBlur={() => handleBlur('product')}
                      error={errors.product && touched.product}
                    />
                    {errors.product && touched.product && (
                      <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.product}</span>
                    )}
                  </div>

                  {/* Field 2: Your Name * */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Your Name <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Your Name" 
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      className={`w-full bg-slate-50/80 border ${errors.name && touched.name ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/15'} rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-medium`}
                    />
                    {errors.name && touched.name && (
                      <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.name}</span>
                    )}
                  </div>

                  {/* Field 3: Email * */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Email <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email" 
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      className={`w-full bg-slate-50/80 border ${errors.email && touched.email ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/15'} rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-medium`}
                    />
                    {errors.email && touched.email && (
                      <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  {/* Field 4: Mobile * */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Mobile <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {/* Standardized Common Country Dial Code Dropdown */}
                      <CountryCodePicker
                        selectedCountry={formData.selectedCountry}
                        onChange={(item) => {
                          const newMaxDigits = getMaxPhoneDigits(item);
                          const adjustedPhone = formData.phone.slice(0, newMaxDigits);
                          setFormData(prev => ({
                            ...prev,
                            selectedCountry: item,
                            phone: adjustedPhone
                          }));
                          if (touched.phone) {
                            setErrors(prev => ({
                              ...prev,
                              phone: validateField('phone', adjustedPhone, { ...formData, selectedCountry: item })
                            }));
                          }
                        }}
                      />

                      {/* Phone Input */}
                      <div className="w-full">
                        <input 
                          type="tel" 
                          name="phone" 
                          placeholder="Mobile" 
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={() => handleBlur('phone')}
                          className={`w-full bg-slate-50/80 border ${errors.phone && touched.phone ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/15'} rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all font-medium`}
                        />
                      </div>
                    </div>
                    {errors.phone && touched.phone && (
                      <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.phone}</span>
                    )}
                  </div>

                  {/* Field 5: Enquiry Details * */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Enquiry Details <span className="text-red-500 font-bold">*</span>
                    </label>
                    <textarea 
                      name="message" 
                      rows={4} 
                      placeholder="Your Requirement"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur('message')}
                      className={`w-full bg-slate-50/80 border ${errors.message && touched.message ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/15'} rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-none font-medium`}
                    />
                    {errors.message && touched.message && (
                      <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex justify-center">
                    <Button
                      type="submit"
                      variant="dark-to-gold"
                      size="md"
                      disabled={loading}
                      className="px-12 sm:px-14 py-3 min-w-[160px] sm:min-w-[180px] rounded-xl"
                    >
                      {loading ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. GOOGLE MAP SECTION (Palwal, Haryana Unit) */}
      <section id="google-map-section" className="py-10 sm:py-16 bg-white border-t border-slate-200 overflow-hidden w-full">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Section Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Factory Location & <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">Google Map</span>
            </h2>
            <div className="flex items-center justify-center gap-2 my-2.5 mx-auto">
              <span className="h-[2px] w-16 sm:w-24 rounded-full title-accent-bar" />
              <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
              <span className="h-[2px] w-16 sm:w-24 rounded-full title-accent-bar" />
            </div>
            <p className="caption-text text-slate-600 text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px] max-w-xl mx-auto px-2">
              {mapSectionData.subtitle}
            </p>
          </div>

          {/* Interactive Google Map Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-100 h-[320px] sm:h-[400px] md:h-[460px] w-full">
            <iframe 
              title="SK Precast Industries Palwal Haryana Location Map"
              src={mapSectionData.embedUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full block"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactUsPage;
