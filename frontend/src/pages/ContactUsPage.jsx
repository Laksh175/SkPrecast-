import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, CheckCircle2, ChevronDown, 
  Search, ExternalLink, User, Monitor, Globe, Building2
} from 'lucide-react';
import { 
  Button, 
  ProductSelectField, 
  NameField, 
  EmailField, 
  PhoneField, 
  MessageField, 
  getMaxPhoneDigits 
} from '../common';
import { validateField } from '../utils/validation';
import { navigateTo } from '../utils/navigation';
import { dispatchContactUsForm } from '../utils/whatsappDispatch';
import { allProductsList, countryCodes } from '../data/homeData';
import { contactUsHeroData, companyContactDetails, mapSectionData } from '../data/contactUsData';


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

  const getFieldError = (name, value, currentFormData = formData) => {
    return validateField(name, value, {
      selectedCountry: currentFormData.selectedCountry,
      required: true,
      minLength: name === 'message' ? 5 : undefined
    });
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = getFieldError(field, formData[field]);
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
        setErrors(prev => ({ ...prev, phone: getFieldError('phone', truncatedPhone, formData) }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
      if (touched[name]) {
        setErrors(prev => ({ ...prev, [name]: getFieldError(name, sanitizedValue) }));
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

    const productError = getFieldError('product', formData.product);
    const nameError = getFieldError('name', formData.name);
    const emailError = getFieldError('email', formData.email);
    const phoneError = getFieldError('phone', formData.phone);
    const messageError = getFieldError('message', formData.message);

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

      // Dispatch structured WhatsApp lead to Admin
      dispatchContactUsForm(formData);

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
    }, 500);
  };

  return (
    <div className="w-full bg-[#090e1a] text-slate-100 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0d1527] text-white pt-14 pb-16 lg:pt-20 lg:pb-22 overflow-hidden border-b border-amber-500/20 shadow-xl">
        {/* Background Banner Image Clearly Visible */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/assets/images/hero-page-banner.jpeg" 
            alt="SK Precast Industries Contact Banner" 
            className="w-full h-full object-cover object-center opacity-85"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#090e1a]/70 via-[#090e1a]/40 to-[#090e1a]" />
        </div>

        {/* Architectural Dot Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none z-1"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Gradient Glows */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/15 blur-[120px] pointer-events-none rounded-full z-1" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full z-1" />

        {/* Top Gold Highlight Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.6)] z-1" />

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
            className="max-w-3xl mx-auto text-slate-300 text-[15px] font-medium leading-[26px]"
          >
            {contactUsHeroData.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. MAIN CONTACT & ENQUIRY SECTION */}
      <section className="py-12 sm:py-16 bg-[#090e1a] text-white relative">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* LEFT CARD: Company Contact Details (Wider Card: lg:col-span-7) */}
            <div className="lg:col-span-7 bg-[#111927] rounded-[20px] border border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-7 lg:p-8 flex flex-col justify-between h-full">
              
              <div>
                {/* Header with Signature Gradient Text and Decorative Accent Underline */}
                <div className="mb-5 text-left">
                  <h2 className="text-[22px] sm:text-2xl lg:text-[26px] font-black tracking-tight leading-tight text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-300 to-yellow-400 drop-shadow-sm">
                      {companyContactDetails.companyName}
                    </span>
                  </h2>
                  <div className="flex items-center gap-2 mt-2 mb-1">
                    <span className="h-[2px] w-14 sm:w-20 rounded-full title-accent-bar" />
                    <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
                    <span className="h-[2px] w-14 sm:w-20 rounded-full title-accent-bar" />
                  </div>
                </div>

                {/* Details List */}
                <div className="divide-y divide-slate-800 text-left">
                  {/* Item 1: Contact Person */}
                  <div className="flex items-start gap-3.5 py-3 first:pt-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_4px_10px_rgba(217,119,6,0.25)] ring-1 ring-amber-300/40">
                      <User size={18} className="text-slate-950 drop-shadow-xs" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Contact Person</span>
                      <p className="caption-text text-[13.5px] sm:text-[14px] text-white font-bold leading-snug">
                        {companyContactDetails.contactPerson}
                      </p>
                    </div>
                  </div>

                  {/* Item 2: Address */}
                  <div className="flex items-start gap-3.5 py-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_4px_10px_rgba(217,119,6,0.25)] ring-1 ring-amber-300/40">
                      <MapPin size={18} className="text-slate-950 drop-shadow-xs" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Address</span>
                      <p className="caption-text text-[13.5px] sm:text-[14px] text-slate-300 font-medium leading-relaxed">
                        {companyContactDetails.address}
                      </p>
                    </div>
                  </div>

                  {/* Item 3: Call Us */}
                  <div className="flex items-start gap-3.5 py-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_4px_10px_rgba(217,119,6,0.25)] ring-1 ring-amber-300/40">
                      <Phone size={18} className="text-slate-950 drop-shadow-xs" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Mobile</span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {companyContactDetails.phones.map((ph, idx) => (
                          <React.Fragment key={ph}>
                            <a href={`tel:${ph.replace(/[^0-9+]/g, '')}`} className="caption-text text-[13.5px] sm:text-[14px] text-slate-200 hover:text-amber-400 transition-colors font-medium">
                              {ph}
                            </a>
                            {idx < companyContactDetails.phones.length - 1 && <span className="text-slate-600 font-bold">•</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Item 4: Email */}
                  <div className="flex items-start gap-3.5 py-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_4px_10px_rgba(217,119,6,0.25)] ring-1 ring-amber-300/40">
                      <Mail size={18} className="text-slate-950 drop-shadow-xs" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">E-Mail</span>
                      <a href={`mailto:${companyContactDetails.email}`} className="caption-text text-[13.5px] sm:text-[14px] text-slate-200 hover:text-amber-400 transition-colors font-medium truncate block">
                        {companyContactDetails.email}
                      </a>
                    </div>
                  </div>

                  {/* Item 5: Alt. Email */}
                  <div className="flex items-start gap-3.5 py-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_4px_10px_rgba(217,119,6,0.25)] ring-1 ring-amber-300/40">
                      <Mail size={18} className="text-slate-950 drop-shadow-xs" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Alt. E-Mail</span>
                      <a href={`mailto:${companyContactDetails.altEmail}`} className="caption-text text-[13.5px] sm:text-[14px] text-slate-200 hover:text-amber-400 transition-colors font-medium truncate block">
                        {companyContactDetails.altEmail}
                      </a>
                    </div>
                  </div>

                  {/* Item 6: Web Address */}
                  <div className="flex items-start gap-3.5 py-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_4px_10px_rgba(217,119,6,0.25)] ring-1 ring-amber-300/40">
                      <Monitor size={18} className="text-slate-950 drop-shadow-xs" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Web Address</span>
                      <a 
                        href={companyContactDetails.website} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="caption-text text-[13.5px] sm:text-[14px] text-slate-200 hover:text-amber-400 transition-colors font-medium truncate block"
                      >
                        {companyContactDetails.website}
                      </a>
                    </div>
                  </div>

                  {/* Item 7: Web Page */}
                  <div className="flex items-start gap-3.5 py-3 last:pb-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_4px_10px_rgba(217,119,6,0.25)] ring-1 ring-amber-300/40">
                      <Globe size={18} className="text-slate-950 drop-shadow-xs" />
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
                            className="caption-text text-[13px] sm:text-[13.5px] text-slate-200 hover:text-amber-400 transition-colors font-medium break-all block"
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

            {/* RIGHT CARD: Exact Enquiry Form (Matching Equal Height Card: lg:col-span-5) */}
            <div className="lg:col-span-5 bg-[#111927] rounded-[20px] border border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-7 lg:p-8 flex flex-col justify-center h-full">
              
              <div>
                {/* Success Banner */}
                {submitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-start gap-3 text-sm"
                  >
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold block text-white">Thank you for contacting SK Precast Industries!</strong>
                      Your requirement has been received. Our team will reach out to you within 30 minutes.
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4 text-left">
                  {/* Field 1: Product / Service Looking for */}
                  <ProductSelectField
                    value={formData.product}
                    onChange={handleChange}
                    onBlur={() => handleBlur('product')}
                    error={errors.product}
                    touched={touched.product}
                  />

                  {/* Field 2: Your Name */}
                  <NameField
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    error={errors.name}
                    touched={touched.name}
                  />

                  {/* Field 3: Email */}
                  <EmailField
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    error={errors.email}
                    touched={touched.email}
                  />

                  {/* Field 4: Mobile */}
                  <PhoneField
                    value={formData.phone}
                    selectedCountry={formData.selectedCountry}
                    onCountryChange={(item) => {
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
                    onChange={handleChange}
                    onBlur={() => handleBlur('phone')}
                    error={errors.phone}
                    touched={touched.phone}
                  />

                  {/* Field 5: Enquiry Details */}
                  <MessageField
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    error={errors.message}
                    touched={touched.message}
                  />

                  {/* Submit Button */}
                  <div className="pt-1 flex justify-center">
                    <Button
                      type="submit"
                      variant="gold-to-dark"
                      size="md"
                      disabled={loading}
                      className="px-10 sm:px-12 py-2.5 sm:py-3 min-w-[150px] rounded-xl font-bold"
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
      <section id="google-map-section" className="py-10 sm:py-16 bg-[#090e1a] border-t border-slate-800 overflow-hidden w-full">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Section Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Factory Location & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-300 to-yellow-400">Google Map</span>
            </h2>
            <div className="flex items-center justify-center gap-2 my-2.5 mx-auto">
              <span className="h-[2px] w-16 sm:w-24 rounded-full title-accent-bar" />
              <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
              <span className="h-[2px] w-16 sm:w-24 rounded-full title-accent-bar" />
            </div>
            <p className="caption-text text-slate-300 text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px] max-w-xl mx-auto px-2">
              {mapSectionData.subtitle}
            </p>
          </div>

          {/* Interactive Google Map Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-[#162238] h-[320px] sm:h-[400px] md:h-[460px] w-full">
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
