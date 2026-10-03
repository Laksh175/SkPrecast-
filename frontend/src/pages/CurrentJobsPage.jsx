import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Phone, Mail, ArrowRight, ShieldCheck, FileCheck, Briefcase, Upload, CheckCircle, AlertCircle, FileText, User, Clock, Search, ChevronDown, Check, Sparkles, X } from 'lucide-react';
import { Button, SearchableSelect, CountryCodePicker, ContactInfoCard, ExploreProductsSection } from '../common';
import { navigateTo } from '../utils/navigation';
import { aboutCompanyData } from '../data/aboutUsData';
import { countriesList, countryCodes } from '../data/homeData';
import { qualificationsGrouped, functionalAreasList, noticePeriodsList, salaryThousandsList, currentJobsHeroData } from '../data/currentJobsData';
import { getMaxPhoneDigits, validateName, validateEmail, validatePhone, validateCity, validateField } from '../utils/validation';

const CurrentJobsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    email: '',
    country: 'India',
    selectedCountry: countryCodes[0], // India +91
    city: '',
    locality: '',
    mobile: '',
    qualification: '',
    otherQualification: '',
    functionalArea: '',
    otherFunctionalArea: '',
    expYears: '',
    otherExpYears: '',
    expMonths: '',
    salaryLakhs: '',
    salaryThousands: '',
    otherSalary: '',
    noticePeriod: '',
    otherNoticePeriod: '',
    keySkills: '',
    resumeFile: null
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');

  const isOtherOption = (val) => {
    if (!val) return false;
    const lower = String(val).toLowerCase();
    return lower.includes('other');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Current Jobs & Careers | SK Precast Industries - Palwal, Haryana';
  }, []);

  const getFieldError = (name, value, currentFormData = formData) => {
    if (name === 'name') return validateName(value, true);
    if (name === 'email') return validateEmail(value, true);
    if (name === 'mobile') return validatePhone(value, currentFormData.selectedCountry, true);
    if (name === 'city') return validateCity(value, true);
    if (name === 'locality') {
      if (!(value || '').trim()) return 'Current locality / area is required.';
      return '';
    }
    if (name === 'qualification') {
      if (!(value || '').trim()) return 'Please select your qualification.';
      if (isOtherOption(value) && !(currentFormData.otherQualification || '').trim()) {
        return 'Please specify your qualification.';
      }
      return '';
    }
    if (name === 'functionalArea') {
      if (!(value || '').trim()) return 'Please select your functional area.';
      if (isOtherOption(value) && !(currentFormData.otherFunctionalArea || '').trim()) {
        return 'Please specify your functional area.';
      }
      return '';
    }
    if (name === 'expYears') {
      if (!(value || '').trim()) return 'Please select total work experience.';
      if (isOtherOption(value) && !(currentFormData.otherExpYears || '').trim()) {
        return 'Please specify your experience in years.';
      }
      return '';
    }
    if (name === 'salaryLakhs') {
      if (!(value || '').trim() && !(currentFormData.salaryThousands || '').trim()) {
        return 'Please select your current annual salary.';
      }
      if ((isOtherOption(value) || isOtherOption(currentFormData.salaryThousands)) && !(currentFormData.otherSalary || '').trim()) {
        return 'Please specify your salary details.';
      }
      return '';
    }
    if (name === 'noticePeriod') {
      if (!(value || '').trim()) return 'Please select notice period.';
      if (isOtherOption(value) && !(currentFormData.otherNoticePeriod || '').trim()) {
        return 'Please specify your notice period.';
      }
      return '';
    }
    if (name === 'keySkills') {
      if (!(value || '').trim()) return 'Please enter your key skills / areas of expertise.';
      return '';
    }
    if (name === 'resumeFile') {
      if (!value) return 'Please attach your resume document (.doc, .docx, .rtf, .pdf)';
      return '';
    }
    return '';
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = getFieldError(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const digitsOnly = value.replace(/\D/g, '');
      const maxDigits = getMaxPhoneDigits(formData.selectedCountry);
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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['.pdf', '.doc', '.docx', '.rtf'];
      const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (!validTypes.includes(fileExt)) {
        setErrors(prev => ({ ...prev, resumeFile: 'Invalid file format. Please attach .doc, .docx, .rtf, or .pdf files only.' }));
        e.target.value = '';
        return;
      }
      
      // 5 MB limit (5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resumeFile: 'File size exceeds 5 MB limit. Please upload document under 5 MB.' }));
        e.target.value = '';
        return;
      }

      setFormData(prev => ({ ...prev, resumeFile: file }));
      setFileName(file.name);
      setErrors(prev => ({ ...prev, resumeFile: '' }));
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      gender: 'Male',
      email: '',
      country: 'India',
      selectedCountry: countryCodes[0],
      city: '',
      locality: '',
      mobile: '',
      qualification: '',
      otherQualification: '',
      functionalArea: '',
      otherFunctionalArea: '',
      expYears: '',
      otherExpYears: '',
      expMonths: '',
      salaryLakhs: '',
      salaryThousands: '',
      otherSalary: '',
      noticePeriod: '',
      otherNoticePeriod: '',
      keySkills: '',
      resumeFile: null
    });
    setErrors({});
    setTouched({});
    setFileName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fieldsToValidate = [
      'name', 'email', 'mobile', 'city', 'locality',
      'qualification', 'functionalArea', 'expYears',
      'salaryLakhs', 'noticePeriod', 'keySkills', 'resumeFile'
    ];

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

    setIsSubmitted(true);
  };

  return (
    <div className="w-full bg-[#f8fafc] text-slate-900 font-sans min-h-screen">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative bg-theme-heroNavy text-white pt-14 pb-16 lg:pt-20 lg:pb-22 overflow-hidden border-b border-amber-500/20 shadow-xl">
        {/* Architectural Dot Grid Background */}
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

        {/* Top Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.6)]" />

        <div className="max-w-[1260px] mx-auto px-6 relative z-10 text-center">
          
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center justify-center gap-2.5 text-sm sm:text-base font-semibold text-slate-300 mb-4"
          >
            <a 
              href="/" 
              onClick={(e) => navigateTo('/', e)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </a>
            <span className="text-slate-500 font-normal">/</span>
            <span className="text-amber-400 font-bold">Current Jobs</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-[30px] font-extrabold tracking-tight leading-tight mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-400 drop-shadow-sm">
              Current Jobs
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
            Join our growing team at SK Precast Industries. Submit your resume to be considered for current and upcoming engineering, production, and management openings.
          </motion.p>
        </div>
      </section>

      {/* 2. MAIN JOBS SECTION (Left: Form with wider width, Right: Contact Card) */}
      <section className="py-12 sm:py-16 bg-white text-slate-900 relative">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* LEFT COLUMN: Wider Column with Post Your Resume Form (lg:col-span-7 xl:col-span-8) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 text-left">
              
              {/* Highlighted Status Card Banner with Modern Mirror-Sheen Infinite Glow Animation */}
              <div className="relative rounded-[22px] p-[1.5px] overflow-hidden group shadow-lg shadow-amber-500/10">
                
                {/* 1. Infinite Ambient Glowing Pulsing Border Aura */}
                <motion.div 
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    opacity: [0.65, 1, 0.65]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: 'linear'
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 via-amber-500 to-amber-400 bg-[length:200%_auto] rounded-[22px]"
                />

                {/* 2. Inner Main Glass Card Surface */}
                <div className="relative rounded-[21px] p-6 sm:p-7 bg-gradient-to-b from-white via-[#fffdf9] to-[#fff9ee] backdrop-blur-md overflow-hidden text-center z-10">
                  
                  {/* 3. Sweeping Infinite Mirror Sheen / Glowing Light Beam */}
                  <motion.div
                    animate={{
                      x: ['-160%', '260%']
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: 'easeInOut',
                      repeatDelay: 0.6
                    }}
                    className="absolute inset-0 w-1/3 -skew-x-25 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20 shadow-[0_0_25px_rgba(255,255,255,0.9)]"
                  />

                  {/* 4. Subtle Ambient Background Glows */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-400/15 rounded-full blur-2xl pointer-events-none" />

                  {/* Content Container */}
                  <div className="relative z-10">
                    {/* Main Highlight Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
                      <Sparkles size={18} className="text-amber-500 shrink-0" />
                      <span>No Active Openings Right Now</span>
                      <Sparkles size={18} className="text-amber-500 shrink-0" />
                    </h3>

                    {/* Descriptive Text */}
                    <p className="caption-text text-[16px] leading-[26px] text-slate-600 max-w-2xl mx-auto mt-2 font-medium">
                      We are continually expanding our precast manufacturing and engineering teams! <strong className="text-slate-900 font-bold">Post your resume below</strong> to get fast-tracked for immediate upcoming project vacancies.
                    </p>
                  </div>

                </div>
              </div>

              {/* Form Container Card */}
              <div className="bg-white rounded-[20px] border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-8 relative overflow-hidden">
                
                {/* Form Top Header with Design Accent & No Icon */}
                <div className="text-center w-full mb-6 pb-4 border-b border-slate-200">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    Post Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">Resume</span>
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-2.5 mb-2 mx-auto">
                    <span className="h-[2px] w-16 sm:w-24 rounded-full title-accent-bar" />
                    <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
                    <span className="h-[2px] w-16 sm:w-24 rounded-full title-accent-bar" />
                  </div>
                  <span className="text-xs font-bold text-red-500 inline-flex items-center gap-1 mt-1">
                    <span className="text-red-500 font-black">*</span> Fields are mandatory
                  </span>
                </div>

                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 px-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-md">
                      <CheckCircle size={36} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Resume Submitted Successfully!</h3>
                    <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm sm:text-base">
                      Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Your resume has been recorded in our talent database. Our HR department will contact you at <span className="font-semibold text-slate-900">{formData.email}</span> if your profile matches our requirements.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          gender: 'Male',
                          email: '',
                          country: 'India',
                          selectedCountry: countryCodes[0],
                          city: '',
                          locality: '',
                          mobile: '',
                          qualification: '',
                          functionalArea: '',
                          expYears: '',
                          expMonths: '',
                          salaryLakhs: '',
                          salaryThousands: '',
                          noticePeriod: '',
                          keySkills: '',
                          resumeFile: null
                        });
                        setFileName('');
                        setIsCountryOpen(false);
                        setCountrySearch('');
                        setIsCountryCodeOpen(false);
                        setCountryCodeSearch('');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
                    >
                      Submit Another Resume
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    
                    {/* 1. Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Your Name :
                      </label>
                      <div className="sm:col-span-8">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('name')}
                          required
                          placeholder="Enter your full name"
                          className={`w-full px-3.5 py-2.5 rounded-xl border outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white ${
                            touched.name && errors.name
                              ? 'border-red-500 ring-2 ring-red-200'
                              : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                          }`}
                        />
                        {touched.name && errors.name && (
                          <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle size={15} className="shrink-0 text-red-500" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 2. Gender */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Gender :
                      </label>
                      <div className="sm:col-span-8 flex items-center gap-6">
                        <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={handleInputChange}
                            className="accent-amber-600 w-4 h-4 cursor-pointer"
                          />
                          <span>Male</span>
                        </label>
                        <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === 'Female'}
                            onChange={handleInputChange}
                            className="accent-amber-600 w-4 h-4 cursor-pointer"
                          />
                          <span>Female</span>
                        </label>
                        <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
                          <input
                            type="radio"
                            name="gender"
                            value="Other"
                            checked={formData.gender === 'Other'}
                            onChange={handleInputChange}
                            className="accent-amber-600 w-4 h-4 cursor-pointer"
                          />
                          <span>Other</span>
                        </label>
                      </div>
                    </div>

                    {/* 3. Email ID */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Email ID :
                      </label>
                      <div className="sm:col-span-8">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('email')}
                          required
                          placeholder="e.g. name@example.com"
                          className={`w-full px-3.5 py-2.5 rounded-xl border outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white ${
                            touched.email && errors.email
                              ? 'border-red-500 ring-2 ring-red-200'
                              : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                          }`}
                        />
                        {touched.email && errors.email && (
                          <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle size={15} className="shrink-0 text-red-500" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 4. Country (Standardized Searchable Combobox with all 240+ Countries) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Country :
                      </label>
                      <div className="sm:col-span-8">
                        <SearchableSelect
                          name="country"
                          value={formData.country}
                          options={countriesList}
                          isTypeable={true}
                          placeholder="Type or select country..."
                          searchPlaceholder="Filter 240+ countries..."
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* 5. Current City */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Current City :
                      </label>
                      <div className="sm:col-span-8">
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('city')}
                          required
                          placeholder="e.g. Palwal, Faridabad, Delhi NCR"
                          className={`w-full px-3.5 py-2.5 rounded-xl border outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white ${
                            touched.city && errors.city
                              ? 'border-red-500 ring-2 ring-red-200'
                              : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                          }`}
                        />
                        {touched.city && errors.city && (
                          <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle size={15} className="shrink-0 text-red-500" />
                            <span>{errors.city}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 6. Current Locality */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Current Locality :
                      </label>
                      <div className="sm:col-span-8">
                        <input
                          type="text"
                          name="locality"
                          value={formData.locality}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('locality')}
                          placeholder="Enter your area / locality"
                          className={`w-full px-3.5 py-2.5 rounded-xl border outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white ${
                            touched.locality && errors.locality
                              ? 'border-red-500 ring-2 ring-red-200'
                              : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                          }`}
                        />
                        {touched.locality && errors.locality && (
                          <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle size={15} className="shrink-0 text-red-500" />
                            <span>{errors.locality}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 7. Mobile with Standardized Common Country Code Picker */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Mobile :
                      </label>
                      <div className="sm:col-span-8">
                        <div className="flex gap-2">
                          <CountryCodePicker
                            selectedCountry={formData.selectedCountry}
                            onChange={(item) => {
                              const newMaxDigits = getMaxPhoneDigits(item);
                              const adjustedPhone = formData.mobile.slice(0, newMaxDigits);
                              setFormData(prev => ({ 
                                ...prev, 
                                selectedCountry: item,
                                mobile: adjustedPhone 
                              }));
                              if (touched.mobile) {
                                setErrors(prev => ({ ...prev, mobile: validatePhone(adjustedPhone, item, true) }));
                              }
                            }}
                          />

                          <input
                            type="tel"
                            name="mobile"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={getMaxPhoneDigits(formData.selectedCountry)}
                            value={formData.mobile}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur('mobile')}
                            required
                            placeholder={formData.selectedCountry?.code === 'IN' ? '10-digit mobile number' : `Enter ${getMaxPhoneDigits(formData.selectedCountry)}-digit mobile number`}
                            className={`flex-1 px-3.5 py-2.5 rounded-xl border outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white ${
                              touched.mobile && errors.mobile
                                ? 'border-red-500 ring-2 ring-red-200'
                                : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                            }`}
                          />
                        </div>
                        {touched.mobile && errors.mobile && (
                          <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle size={15} className="shrink-0 text-red-500" />
                            <span>{errors.mobile}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 8. Qualification (Grouped Searchable Dropdown) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right pt-2.5">
                        <span className="text-red-500 font-bold mr-1">*</span>Qualification :
                      </label>
                      <div className="sm:col-span-8">
                        <SearchableSelect
                          name="qualification"
                          value={formData.qualification}
                          options={qualificationsGrouped}
                          placeholder="--Select Qualification--"
                          searchPlaceholder="Search qualification..."
                          onChange={(e) => {
                            handleInputChange(e);
                            if (touched.qualification) {
                              setErrors(prev => ({ ...prev, qualification: getFieldError('qualification', e.target.value) }));
                            }
                          }}
                          onBlur={() => handleBlur('qualification')}
                          error={Boolean(touched.qualification && errors.qualification)}
                          required
                        />

                        {/* If Other Qualification is selected, show manual text input */}
                        {isOtherOption(formData.qualification) && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2.5"
                          >
                            <input
                              type="text"
                              name="otherQualification"
                              value={formData.otherQualification}
                              onChange={handleInputChange}
                              onBlur={() => handleBlur('qualification')}
                              required
                              placeholder="Please enter your specific qualification (e.g., B.Des, ITI, B.F.Tech, etc.)..."
                              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-amber-50/40 focus:bg-white placeholder:text-slate-400"
                            />
                          </motion.div>
                        )}
                        {touched.qualification && errors.qualification && (
                          <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle size={15} className="shrink-0 text-red-500" />
                            <span>{errors.qualification}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 9. Functional Area (Searchable Dropdown) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right pt-2.5">
                        <span className="text-red-500 font-bold mr-1">*</span>Functional Area :
                      </label>
                      <div className="sm:col-span-8">
                        <SearchableSelect
                          name="functionalArea"
                          value={formData.functionalArea}
                          options={functionalAreasList}
                          placeholder="--Select Functional Area--"
                          searchPlaceholder="Search functional area..."
                          onChange={(e) => {
                            handleInputChange(e);
                            if (touched.functionalArea) {
                              setErrors(prev => ({ ...prev, functionalArea: getFieldError('functionalArea', e.target.value) }));
                            }
                          }}
                          onBlur={() => handleBlur('functionalArea')}
                          error={Boolean(touched.functionalArea && errors.functionalArea)}
                          required
                        />

                        {/* If Other Functional Area is selected, show manual text input */}
                        {isOtherOption(formData.functionalArea) && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2.5"
                          >
                            <input
                              type="text"
                              name="otherFunctionalArea"
                              value={formData.otherFunctionalArea}
                              onChange={handleInputChange}
                              onBlur={() => handleBlur('functionalArea')}
                              required
                              placeholder="Please enter your specific functional area / department..."
                              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-amber-50/40 focus:bg-white placeholder:text-slate-400"
                            />
                          </motion.div>
                        )}
                        {touched.functionalArea && errors.functionalArea && (
                          <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle size={15} className="shrink-0 text-red-500" />
                            <span>{errors.functionalArea}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 10. Total Work Experience (Searchable Dropdowns for Years & Months) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right pt-2.5">
                        <span className="text-red-500 font-bold mr-1">*</span>Total Work Experience :
                      </label>
                      <div className="sm:col-span-8">
                        <div className="grid grid-cols-2 gap-3">
                          <SearchableSelect
                            name="expYears"
                            value={formData.expYears}
                            options={['Fresher', ...Array.from({ length: 30 }, (_, i) => `${i + 1} Years`), 'Other (Please Specify)']}
                            placeholder="--Select Year--"
                            searchPlaceholder="Filter years..."
                            onChange={(e) => {
                              handleInputChange(e);
                              if (touched.expYears) {
                                setErrors(prev => ({ ...prev, expYears: getFieldError('expYears', e.target.value) }));
                              }
                            }}
                            onBlur={() => handleBlur('expYears')}
                            error={Boolean(touched.expYears && errors.expYears)}
                            required
                          />

                          <SearchableSelect
                            name="expMonths"
                            value={formData.expMonths}
                            options={['0 Months', ...Array.from({ length: 12 }, (_, i) => `${i + 1} Months`)]}
                            placeholder="--Select Months--"
                            searchPlaceholder="Filter months..."
                            disabled={formData.expYears === 'Fresher' || isOtherOption(formData.expYears)}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* If Other Experience is selected, show manual text input */}
                        {isOtherOption(formData.expYears) && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2.5"
                          >
                            <input
                              type="text"
                              name="otherExpYears"
                              value={formData.otherExpYears}
                              onChange={handleInputChange}
                              onBlur={() => handleBlur('expYears')}
                              required
                              placeholder="Please specify your total work experience (e.g., 32 Years, 15+ Years Freelance, etc.)..."
                              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-amber-50/40 focus:bg-white placeholder:text-slate-400"
                            />
                          </motion.div>
                        )}
                        {touched.expYears && errors.expYears && (
                          <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle size={15} className="shrink-0 text-red-500" />
                            <span>{errors.expYears}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 11. Current Annual Salary (Searchable Dropdowns for Lakhs & Thousands) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right pt-2.5">
                        <span className="text-red-500 font-bold mr-1">*</span>Current Annual Salary :
                      </label>
                      <div className="sm:col-span-8">
                        <div className="grid grid-cols-2 gap-3">
                          <SearchableSelect
                            name="salaryLakhs"
                            value={formData.salaryLakhs}
                            options={[
                              ...Array.from({ length: 50 }, (_, i) => ({ label: `${i + 1} Lakhs`, value: `${i + 1}` })),
                              { label: 'Other (Please Specify)', value: 'Other' }
                            ]}
                            placeholder="Lakhs"
                            searchPlaceholder="Filter lakhs..."
                            onChange={(e) => {
                              handleInputChange(e);
                              if (touched.salaryLakhs) {
                                setErrors(prev => ({ ...prev, salaryLakhs: getFieldError('salaryLakhs', e.target.value) }));
                              }
                            }}
                            onBlur={() => handleBlur('salaryLakhs')}
                            error={Boolean(touched.salaryLakhs && errors.salaryLakhs)}
                            required
                          />

                          <SearchableSelect
                            name="salaryThousands"
                            value={formData.salaryThousands}
                            options={salaryThousandsList.map(val => ({ 
                              label: `${val} Thousand`, 
                              value: val 
                            }))}
                            placeholder="Thousands"
                            searchPlaceholder="Filter thousands..."
                            disabled={isOtherOption(formData.salaryLakhs)}
                            onChange={(e) => {
                              handleInputChange(e);
                              if (touched.salaryLakhs) {
                                setErrors(prev => ({ ...prev, salaryLakhs: getFieldError('salaryLakhs', formData.salaryLakhs) }));
                              }
                            }}
                          />
                        </div>

                        {/* If Other Salary is selected in Lakhs, show full annual salary text input */}
                        {isOtherOption(formData.salaryLakhs) && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2.5"
                          >
                            <input
                              type="text"
                              name="otherSalary"
                              value={formData.otherSalary}
                              onChange={handleInputChange}
                              onBlur={() => handleBlur('salaryLakhs')}
                              required
                              placeholder="Please specify your current annual salary (e.g., 55 Lakhs / Annum, Negotiable, Per Project)..."
                              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-amber-50/40 focus:bg-white placeholder:text-slate-400"
                            />
                          </motion.div>
                        )}
                        {touched.salaryLakhs && errors.salaryLakhs && (
                          <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle size={15} className="shrink-0 text-red-500" />
                            <span>{errors.salaryLakhs}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 12. Duration of Notice Period (Searchable Dropdown) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right pt-2.5">
                        <span className="text-red-500 font-bold mr-1">*</span>Duration of Notice Period :
                      </label>
                      <div className="sm:col-span-8">
                        <SearchableSelect
                          name="noticePeriod"
                          value={formData.noticePeriod}
                          options={noticePeriodsList}
                          placeholder="Select"
                          searchPlaceholder="Search notice period..."
                          onChange={(e) => {
                            handleInputChange(e);
                            if (touched.noticePeriod) {
                              setErrors(prev => ({ ...prev, noticePeriod: getFieldError('noticePeriod', e.target.value) }));
                            }
                          }}
                          onBlur={() => handleBlur('noticePeriod')}
                          error={Boolean(touched.noticePeriod && errors.noticePeriod)}
                          required
                        />

                        {/* If Other Notice Period is selected, show manual text input */}
                        {isOtherOption(formData.noticePeriod) && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2.5"
                          >
                            <input
                              type="text"
                              name="otherNoticePeriod"
                              value={formData.otherNoticePeriod}
                              onChange={handleInputChange}
                              onBlur={() => handleBlur('noticePeriod')}
                              required
                              placeholder="Please enter your notice period duration (e.g., 45 Days, Serving Notice, etc.)..."
                              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-amber-50/40 focus:bg-white placeholder:text-slate-400"
                            />
                          </motion.div>
                        )}
                        {touched.noticePeriod && errors.noticePeriod && (
                          <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle size={15} className="shrink-0 text-red-500" />
                            <span>{errors.noticePeriod}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 13. Key Skills (Multi-line Textarea with increased height) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right pt-2.5">
                        <span className="text-red-500 font-bold mr-1">*</span>Key Skills :
                      </label>
                      <div className="sm:col-span-8">
                        <textarea
                          name="keySkills"
                          rows={4}
                          value={formData.keySkills}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('keySkills')}
                          required
                          placeholder="e.g. Precast Casting, RCC Quality Testing, AutoCAD, Boundary Wall Erection, Site Execution, Team Management..."
                          className={`w-full px-3.5 py-2.5 rounded-xl border outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white resize-y min-h-[105px] ${
                            touched.keySkills && errors.keySkills
                              ? 'border-red-500 ring-2 ring-red-200'
                              : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                          }`}
                        />
                        {touched.keySkills && errors.keySkills && (
                          <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1.5 flex items-center gap-1.5">
                            <AlertCircle size={15} className="shrink-0 text-red-500" />
                            <span>{errors.keySkills}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 14. Attach Resume with Complete File Support & 5MB Validation */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right pt-2">
                        <span className="text-red-500 font-bold mr-1">*</span>Attach Resume :
                      </label>
                      <div className="sm:col-span-8">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-500 text-amber-950 hover:text-white border border-amber-300 hover:border-amber-500 font-bold text-[12px] cursor-pointer transition-all duration-200 shadow-xs hover:shadow-md">
                              <Upload size={14} className="text-amber-600 group-hover:text-white transition-colors" />
                              <span>Choose file</span>
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx,.rtf"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>

                            <div className={`flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl border flex-1 min-w-[180px] max-w-full ${
                              touched.resumeFile && errors.resumeFile ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200'
                            }`}>
                              {fileName ? (
                                <div className="flex items-center justify-between w-full gap-2">
                                  <span className="text-[12px] text-emerald-800 font-bold flex items-center gap-1.5 truncate">
                                    <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                                    <span className="truncate">{fileName}</span>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setFormData(prev => ({ ...prev, resumeFile: null }));
                                      setFileName('');
                                      if (touched.resumeFile) {
                                        setErrors(prev => ({ ...prev, resumeFile: 'Please attach your resume document.' }));
                                      }
                                    }}
                                    className="p-0.5 text-slate-400 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
                                    title="Remove attached file"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              ) : (
                                <span className="text-[12px] text-slate-500 font-medium">
                                  No file chosen
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="caption-text text-[11.5px] font-semibold text-amber-700 tracking-normal mt-0.5">
                            Allowed File Type : .doc, .docx, .rtf, .pdf (Upto 5 MB)
                          </p>
                          {touched.resumeFile && errors.resumeFile && (
                            <p style={{ fontSize: '14px' }} className="text-[14px] leading-snug text-red-500 font-medium mt-1 flex items-center gap-1.5">
                              <AlertCircle size={15} className="shrink-0 text-red-500" />
                              <span>{errors.resumeFile}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit & Reset Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-4 border-t border-slate-200 mt-6">
                      <div className="sm:col-start-5 sm:col-span-8 flex flex-wrap items-center gap-3.5">
                        <Button
                          variant="view-more"
                          size="md"
                          type="submit"
                        >
                          Submit
                        </Button>
                        <Button
                          variant="gold"
                          size="md"
                          type="button"
                          onClick={handleReset}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>

                  </form>
                )}

              </div>

            </div>

            {/* RIGHT COLUMN: Exact About Us Contact Details Card (lg:col-span-5 xl:col-span-4) */}
            <div className="lg:col-span-5 xl:col-span-4 relative h-full">
              <div className="sticky top-[110px] sm:top-[125px] lg:top-[135px] z-20 flex flex-col gap-4">
                <ContactInfoCard className="w-full" />
                <Button
                  variant="dark-to-gold"
                  size="md"
                  href="/contact-us.htm"
                  className="w-full"
                >
                  Contact Us
                </Button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. EXPLORE OUR PRODUCTS SECTION (Common Reusable Component) */}
      <ExploreProductsSection className="py-14 sm:py-18 bg-[#f8fafc] border-t border-slate-200/90" />

    </div>
  );
};

export default CurrentJobsPage;
