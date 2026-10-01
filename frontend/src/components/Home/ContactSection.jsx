import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, ChevronDown, Search, ShieldCheck, Clock, MapPin, Check, AlertCircle } from 'lucide-react';
import { allProductsList, countryCodes, countriesList, contactSectionHeaderData } from '../../data/homeData';
import { useClickOutside } from '../../hooks';
import { Button } from '../../common';

const getMaxPhoneDigits = (country) => {
  if (!country) return 10;
  if (country.code === 'IN') return 10;
  if (['AE', 'SA', 'AU', 'FR', 'NZ'].includes(country.code)) return 9;
  if (['US', 'CA', 'GB', 'MX', 'BR'].includes(country.code)) return 10;
  if (['SG', 'QA', 'KW', 'OM', 'BH', 'HK'].includes(country.code)) return 8;
  if (['DE', 'RU', 'ZA'].includes(country.code)) return 11;
  return 12;
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    product: '',
    name: '',
    email: '',
    country: 'India',
    selectedCountry: countryCodes[0], // India +91
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Dropdown open states
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);

  // Search filter states inside the dropdown menus
  const [productSearch, setProductSearch] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [countryCodeSearch, setCountryCodeSearch] = useState('');

  const [charCount, setCharCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Refs for click outside
  const productRef = useRef(null);
  const countryRef = useRef(null);
  const countryCodeRef = useRef(null);

  useClickOutside(productRef, () => {
    setIsProductOpen(false);
    setProductSearch('');
  }, isProductOpen);

  useClickOutside(countryRef, () => {
    setIsCountryOpen(false);
    setCountrySearch('');
  }, isCountryOpen);

  useClickOutside(countryCodeRef, () => {
    setIsCountryCodeOpen(false);
    setCountryCodeSearch('');
  }, isCountryCodeOpen);

  // Filtered lists based on search inside the popup (or all items if empty search)
  const filteredProducts = allProductsList.filter(item =>
    item.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredCountries = countriesList.filter(item =>
    item.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredCountryCodes = countryCodes.filter(c =>
    c.name.toLowerCase().includes(countryCodeSearch.toLowerCase()) ||
    c.dialCode.includes(countryCodeSearch) ||
    c.code.toLowerCase().includes(countryCodeSearch.toLowerCase())
  );

  // Input Sanitization & Validation Rules
  const validateField = (name, value, currentFormData = formData) => {
    let error = '';

    if (name === 'name') {
      const trimmed = (value || '').trim();
      if (!trimmed) {
        error = 'Full name is required.';
      } else if (trimmed.length < 2) {
        error = 'Name must be at least 2 characters.';
      } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
        error = 'Please enter a valid name (letters only).';
      }
    }

    if (name === 'email') {
      const trimmed = (value || '').trim().toLowerCase();
      if (trimmed && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(trimmed)) {
        error = 'Please enter a valid email address (e.g. radha@gmail.com).';
      }
    }

    if (name === 'phone') {
      const cleaned = (value || '').replace(/\D/g, '');
      const maxDigits = getMaxPhoneDigits(currentFormData.selectedCountry);

      if (!cleaned) {
        error = 'Phone / mobile number is required.';
      } else if (currentFormData.selectedCountry?.code === 'IN') {
        if (cleaned.length !== 10) {
          error = 'Please enter a valid 10-digit Indian mobile number.';
        } else if (!/^[6-9]\d{9}$/.test(cleaned)) {
          error = 'Mobile number must start with 6, 7, 8, or 9.';
        }
      } else {
        if (cleaned.length < (maxDigits > 8 ? 8 : maxDigits)) {
          error = `Please enter a valid ${maxDigits}-digit mobile number.`;
        }
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
    
    // XSS / Script injection prevention: strip out script tags
    const sanitizedValue = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    if (name === 'product') {
      setFormData(prev => ({ ...prev, product: sanitizedValue }));
    } else if (name === 'country') {
      setFormData(prev => ({ ...prev, country: sanitizedValue }));
    } else if (name === 'email') {
      // Force lowercase automatically
      const lowercaseEmail = sanitizedValue.toLowerCase();
      setFormData(prev => ({ ...prev, email: lowercaseEmail }));
      if (touched.email) {
        setErrors(prev => ({ ...prev, email: validateField('email', lowercaseEmail) }));
      }
    } else if (name === 'phone') {
      // Strictly digits only (0-9). Max length restricted based on country
      const digitsOnly = sanitizedValue.replace(/\D/g, '');
      const maxDigits = getMaxPhoneDigits(formData.selectedCountry);
      const truncatedPhone = digitsOnly.slice(0, maxDigits);

      setFormData(prev => ({ ...prev, phone: truncatedPhone }));
      if (touched.phone) {
        setErrors(prev => ({ ...prev, phone: validateField('phone', truncatedPhone, formData) }));
      }
    } else if (name === 'message') {
      if (sanitizedValue.length <= 300) {
        setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
        setCharCount(sanitizedValue.length);
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

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true
    });

    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const phoneError = validateField('phone', formData.phone);

    const newErrors = {
      name: nameError,
      email: emailError,
      phone: phoneError
    };

    setErrors(newErrors);

    if (nameError || emailError || phoneError) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        product: '',
        name: '',
        email: '',
        country: 'India',
        selectedCountry: countryCodes[0],
        phone: '',
        message: ''
      });
      setErrors({});
      setTouched({});
      setCharCount(0);
      setTimeout(() => setSubmitted(false), 7000);
    }, 600);
  };

  const currentMaxDigits = getMaxPhoneDigits(formData.selectedCountry);

  return (
    <section id="contact" className="relative py-12 lg:py-16 bg-white text-slate-900 font-sans overflow-hidden border-t border-slate-200/90">
      
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-yellow-400/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-slate-100 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Visual Showcase Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-between self-stretch"
          >
            {/* Image Card Container */}
            <div className="relative rounded-[15px] overflow-hidden border border-slate-200/90 shadow-xl bg-slate-100 group h-[340px] sm:h-[420px] lg:h-full min-h-[360px]">
              <img 
                src="/assets/images/contact-wall.jpg" 
                alt="SK Precast Boundary Wall Installation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              {/* Floating Top Badge */}
              <div className="absolute top-5 left-5 bg-slate-900/85 backdrop-blur-md border border-white/20 px-4 py-2 rounded-[15px] flex items-center gap-2.5 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-100">
                  {contactSectionHeaderData.showcase.badge}
                </span>
              </div>

              {/* Bottom Info Floating Card */}
              <div className="absolute bottom-5 inset-x-5 p-5 rounded-[15px] bg-slate-900/90 backdrop-blur-md border border-white/15 text-white shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="text-yellow-400" size={20} />
                  {contactSectionHeaderData.showcase.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {contactSectionHeaderData.showcase.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300 pt-2 border-t border-slate-700/60">
                  <div className="flex items-center gap-1.5 text-yellow-400 font-semibold">
                    <Clock size={14} />
                    <span>{contactSectionHeaderData.showcase.features[0].text}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <MapPin size={14} className="text-yellow-400" />
                    <span>{contactSectionHeaderData.showcase.features[1].text}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (Clean White Theme + Combobox & Full List Dropdown) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 bg-white border border-slate-200/90 rounded-[15px] p-5 sm:p-7 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          >
            {/* Header Area */}
            <div className="mb-4 sm:mb-5">
              <h2 className="text-[23px] sm:text-3xl font-extrabold tracking-tight text-theme-heading mb-1.5">
                {contactSectionHeaderData.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Or reach out manually to <a href={`mailto:${contactSectionHeaderData.email}`} className="text-amber-700 hover:text-amber-800 underline font-semibold">{contactSectionHeaderData.email}</a> / <a href={`tel:${contactSectionHeaderData.phone.replace(/[^0-9+]/g, '')}`} className="text-amber-700 hover:text-amber-800 underline font-semibold">{contactSectionHeaderData.phone}</a>
              </p>
            </div>

            {/* Success Banner */}
            {submitted && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-start gap-3"
              >
                <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-sm text-emerald-900">Inquiry Received Successfully!</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Thank you! Our technical sales engineer will contact you shortly with the best quote and specifications.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              
              {/* Row 1: Product Combobox (Directly Typeable + Complete 35 Products List) & Your Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Product / Service Looking for */}
                <div className="relative" ref={productRef}>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Product / Service Looking for
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      onClick={() => {
                        setIsProductOpen(true);
                        setIsCountryOpen(false);
                        setIsCountryCodeOpen(false);
                      }}
                      onFocus={() => {
                        setIsProductOpen(true);
                        setIsCountryOpen(false);
                        setIsCountryCodeOpen(false);
                      }}
                      placeholder="Type or select product..."
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl px-4 py-3 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/30 transition-all shadow-2xs cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsProductOpen(!isProductOpen);
                        setIsCountryOpen(false);
                        setIsCountryCodeOpen(false);
                      }}
                      className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-slate-400 hover:text-amber-600 transition-colors cursor-pointer"
                    >
                      <ChevronDown size={16} className={`transition-transform ${isProductOpen ? 'rotate-180 text-amber-600' : ''}`} />
                    </button>
                  </div>

                  {/* Dropdown Popover with Search & Complete 35 Products List */}
                  <AnimatePresence>
                    {isProductOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl z-[100] overflow-hidden"
                      >
                        {/* Search Input inside Popover */}
                        <div className="p-2.5 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                          <Search size={14} className="text-slate-400 ml-1.5" />
                          <input
                            type="text"
                            placeholder="Filter 35+ products..."
                            value={productSearch}
                            onChange={(e) => setProductSearch(e.target.value)}
                            className="bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none w-full py-0.5"
                            autoFocus
                          />
                        </div>

                        {/* Complete Scrollable List of all 35 products */}
                        <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
                          {filteredProducts.length > 0 ? (
                            filteredProducts.map((item, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, product: item }));
                                  setIsProductOpen(false);
                                  setProductSearch('');
                                }}
                                className={`w-full text-left px-3.5 py-2.5 text-xs hover:bg-yellow-50 hover:text-amber-900 transition-colors flex items-center justify-between ${
                                  formData.product === item ? 'bg-yellow-100/70 text-amber-950 font-bold' : 'text-slate-700'
                                }`}
                              >
                                <span className="truncate">{item}</span>
                                {formData.product === item && <Check size={14} className="text-amber-600 shrink-0 ml-2" />}
                              </button>
                            ))
                          ) : (
                            <div className="p-3 text-left text-xs text-slate-500">
                              Use custom: "<span className="text-amber-700 font-semibold">{formData.product}</span>"
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Your Name (With Real-Time Validation) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    placeholder="Enter your full name..."
                    className={`w-full bg-slate-50 hover:bg-white focus:bg-white border rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs ${
                      touched.name && errors.name
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-400/20'
                        : 'border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/30'
                    }`}
                  />
                  {touched.name && errors.name && (
                    <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} className="shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

              </div>

              {/* Row 2: Email & Country (Directly Typeable + Complete 240+ Countries List) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Email Address (Strict Lowercase Only e.g. radha@gmail.com) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="radha@gmail.com"
                    className={`w-full bg-slate-50 hover:bg-white focus:bg-white border rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all lowercase shadow-2xs ${
                      touched.email && errors.email
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-400/20'
                        : 'border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/30'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} className="shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Country (Typeable Input + Complete 240+ Countries Browsable List) */}
                <div className="relative" ref={countryRef}>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Country
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      onClick={() => {
                        setIsCountryOpen(true);
                        setIsProductOpen(false);
                        setIsCountryCodeOpen(false);
                      }}
                      onFocus={() => {
                        setIsCountryOpen(true);
                        setIsProductOpen(false);
                        setIsCountryCodeOpen(false);
                      }}
                      placeholder="Type or select country..."
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl px-4 py-3 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/30 transition-all shadow-2xs cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCountryOpen(!isCountryOpen);
                        setIsProductOpen(false);
                        setIsCountryCodeOpen(false);
                      }}
                      className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-slate-400 hover:text-amber-600 transition-colors cursor-pointer"
                    >
                      <ChevronDown size={16} className={`transition-transform ${isCountryOpen ? 'rotate-180 text-amber-600' : ''}`} />
                    </button>
                  </div>

                  {/* Complete 240+ Countries Scrollable Dropdown Menu with Search */}
                  <AnimatePresence>
                    {isCountryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl z-[100] overflow-hidden"
                      >
                        {/* Search Input inside Popover */}
                        <div className="p-2.5 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                          <Search size={14} className="text-slate-400 ml-1.5" />
                          <input
                            type="text"
                            placeholder="Filter 240+ countries..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none w-full py-0.5"
                            autoFocus
                          />
                        </div>

                        {/* Complete List of all 240+ countries */}
                        <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((item, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, country: item }));
                                  setIsCountryOpen(false);
                                  setCountrySearch('');
                                }}
                                className={`w-full text-left px-3.5 py-2.5 text-xs hover:bg-yellow-50 hover:text-amber-900 transition-colors flex items-center justify-between ${
                                  formData.country === item ? 'bg-yellow-100/70 text-amber-950 font-bold' : 'text-slate-700'
                                }`}
                              >
                                <span className="truncate">{item}</span>
                                {formData.country === item && <Check size={14} className="text-amber-600 shrink-0 ml-2" />}
                              </button>
                            ))
                          ) : (
                            <div className="p-3 text-left text-xs text-slate-500">
                              Use custom: "<span className="text-amber-700 font-semibold">{formData.country}</span>"
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* Row 3: Phone / Mobile with Strict Country-Length Enforcement (Numbers Only) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Phone / Mobile <span className="text-amber-600">*</span>
                </label>
                <div className="flex gap-2">
                  
                  {/* Country Code Picker Dropdown */}
                  <div className="relative" ref={countryCodeRef}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCountryCodeOpen(!isCountryCodeOpen);
                        setIsProductOpen(false);
                        setIsCountryOpen(false);
                      }}
                      className="bg-slate-50 hover:bg-white border border-slate-300 rounded-xl px-3 py-3 text-sm font-bold text-slate-900 flex items-center gap-1.5 justify-center shrink-0 min-w-[95px] hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all cursor-pointer shadow-2xs"
                    >
                      <span>{formData.selectedCountry.flag}</span>
                      <span>{formData.selectedCountry.dialCode}</span>
                      <ChevronDown size={14} className={`text-slate-500 transition-transform ${isCountryCodeOpen ? 'rotate-180 text-amber-600' : ''}`} />
                    </button>

                    {/* Country Code Dropdown Popover */}
                    <AnimatePresence>
                      {isCountryCodeOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 w-72 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl z-[100] overflow-hidden"
                        >
                          {/* Search Input */}
                          <div className="p-2.5 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                            <Search size={14} className="text-slate-400 ml-1.5" />
                            <input
                              type="text"
                              placeholder="Search country or code..."
                              value={countryCodeSearch}
                              onChange={(e) => setCountryCodeSearch(e.target.value)}
                              className="bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none w-full py-0.5"
                              autoFocus
                            />
                          </div>

                          {/* Country Codes List */}
                          <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
                            {filteredCountryCodes.map((item, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  const newMaxDigits = getMaxPhoneDigits(item);
                                  const adjustedPhone = formData.phone.slice(0, newMaxDigits);
                                  setFormData(prev => ({ 
                                    ...prev, 
                                    selectedCountry: item,
                                    phone: adjustedPhone 
                                  }));
                                  setIsCountryCodeOpen(false);
                                  setCountryCodeSearch('');
                                  if (touched.phone) {
                                    setErrors(prev => ({ 
                                      ...prev, 
                                      phone: validateField('phone', adjustedPhone, { ...formData, selectedCountry: item }) 
                                    }));
                                  }
                                }}
                                className={`w-full text-left px-3 py-2 text-xs hover:bg-yellow-50 hover:text-amber-900 transition-colors flex items-center justify-between ${
                                  formData.selectedCountry.code === item.code ? 'bg-yellow-100/70 text-amber-950 font-bold' : 'text-slate-700'
                                }`}
                              >
                                <span className="flex items-center gap-2 truncate">
                                  <span>{item.flag}</span>
                                  <span className="truncate">{item.name}</span>
                                </span>
                                <span className="font-mono text-slate-500 text-[11px] ml-2 shrink-0">
                                  {item.dialCode}
                                </span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone Input (Strict Numeric & Strict Max Length) */}
                  <div className="w-full">
                    <input
                      type="tel"
                      name="phone"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={currentMaxDigits}
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur('phone')}
                      placeholder={formData.selectedCountry?.code === 'IN' ? 'Enter 10-digit mobile number' : `Enter ${currentMaxDigits}-digit mobile number`}
                      className={`w-full bg-slate-50 hover:bg-white focus:bg-white border rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs ${
                        touched.phone && errors.phone
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-400/20'
                          : 'border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/30'
                      }`}
                    />
                  </div>
                </div>
                {touched.phone && errors.phone && (
                  <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle size={12} className="shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Row 4: Leave a Message for us */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Leave a Message for us
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {charCount}/300
                  </span>
                </div>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project requirements (wall height, running feet, site location, etc.)..."
                  className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/30 transition-all resize-none shadow-2xs"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  variant="dark-to-gold"
                  size="md"
                  type="submit"
                  disabled={loading}
                  icon={<Send size={18} />}
                  iconPosition="left"
                >
                  {loading ? 'Sending Request...' : 'Send Message'}
                </Button>
              </div>

            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
