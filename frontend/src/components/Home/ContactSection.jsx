import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, ShieldCheck, Clock, MapPin, AlertCircle } from 'lucide-react';
import { allProductsList, countryCodes, countriesList, contactSectionHeaderData } from '../../data/homeData';
import { 
  Button, 
  ProductSelectField, 
  NameField, 
  EmailField, 
  PhoneField, 
  MessageField, 
  CountrySelectField, 
  getMaxPhoneDigits 
} from '../../common';
import { validateField } from '../../utils/validation';
import { dispatchHomeContactForm } from '../../utils/whatsappDispatch';


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
  const [charCount, setCharCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFieldError = (name, value, currentFormData = formData) => {
    return validateField(name, value, {
      selectedCountry: currentFormData.selectedCountry,
      required: name === 'name' || name === 'phone'
    });
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = getFieldError(field, formData[field]);
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
        setErrors(prev => ({ ...prev, email: getFieldError('email', lowercaseEmail) }));
      }
    } else if (name === 'phone') {
      // Strictly digits only (0-9). Max length restricted based on country
      const digitsOnly = sanitizedValue.replace(/\D/g, '');
      const maxDigits = getMaxPhoneDigits(formData.selectedCountry);
      const truncatedPhone = digitsOnly.slice(0, maxDigits);

      setFormData(prev => ({ ...prev, phone: truncatedPhone }));
      if (touched.phone) {
        setErrors(prev => ({ ...prev, phone: getFieldError('phone', truncatedPhone, formData) }));
      }
    } else if (name === 'message') {
      if (sanitizedValue.length <= 300) {
        setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
        setCharCount(sanitizedValue.length);
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

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true
    });

    const nameError = getFieldError('name', formData.name);
    const emailError = getFieldError('email', formData.email);
    const phoneError = getFieldError('phone', formData.phone);

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

      // Dispatch structured WhatsApp message to admin
      dispatchHomeContactForm(formData);

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
    }, 500);
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
              <div className="absolute bottom-5 inset-x-5 p-4 sm:p-5 rounded-[15px] bg-slate-900/90 backdrop-blur-md border border-white/15 text-white shadow-2xl space-y-2">
                <h3 className="text-[14px] font-bold text-white flex items-center gap-2" style={{ fontSize: '14px' }}>
                  <ShieldCheck className="text-yellow-400" size={18} />
                  <span style={{ fontSize: '14px' }}>{contactSectionHeaderData.showcase.title}</span>
                </h3>
                <p className="text-[13px] text-slate-300 leading-relaxed font-normal" style={{ fontSize: '13px' }}>
                  {contactSectionHeaderData.showcase.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-slate-300 font-medium pt-2 border-t border-slate-700/60" style={{ fontSize: '11.5px' }}>
                  <div className="flex items-center gap-1.5 text-yellow-400 font-semibold" style={{ fontSize: '11.5px' }}>
                    <Clock size={13} />
                    <span style={{ fontSize: '11.5px' }}>{contactSectionHeaderData.showcase.features[0].text}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300" style={{ fontSize: '11.5px' }}>
                    <MapPin size={13} className="text-yellow-400" />
                    <span style={{ fontSize: '11.5px' }}>{contactSectionHeaderData.showcase.features[1].text}</span>
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
              <h2 className="text-[22px] sm:text-[26px] font-extrabold tracking-tight text-slate-900 mb-1">
                {contactSectionHeaderData.title}
              </h2>
              <p className="text-[14px] text-slate-600 leading-normal" style={{ fontSize: '14px' }}>
                Or reach out manually to <a href={`mailto:${contactSectionHeaderData.email}`} className="text-amber-700 hover:text-amber-800 underline underline-offset-2 font-semibold" style={{ fontSize: '15px' }}>{contactSectionHeaderData.email}</a> / <a href={`tel:${contactSectionHeaderData.phone.replace(/[^0-9+]/g, '')}`} className="text-amber-700 hover:text-amber-800 underline underline-offset-2 font-semibold" style={{ fontSize: '15px' }}>{contactSectionHeaderData.phone}</a>
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
              
              {/* Row 1: Product Combobox & Your Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ProductSelectField
                  label="Product / Service Looking for"
                  required={false}
                  value={formData.product}
                  onChange={handleChange}
                  options={allProductsList}
                  placeholder="Type or select product..."
                  searchPlaceholder="Filter 35+ products..."
                  isTypeable={true}
                />

                <NameField
                  label="Your Name"
                  required={true}
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  error={errors.name}
                  touched={touched.name}
                  placeholder="Enter your full name..."
                />
              </div>

              {/* Row 2: Email & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EmailField
                  label="Email Address"
                  required={false}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                  placeholder="radha@gmail.com"
                />

                <CountrySelectField
                  label="Country"
                  required={false}
                  value={formData.country}
                  onChange={handleChange}
                  options={countriesList}
                  placeholder="Type or select country..."
                  searchPlaceholder="Filter 240+ countries..."
                  isTypeable={true}
                />
              </div>

              {/* Row 3: Phone / Mobile */}
              <PhoneField
                label="Phone / Mobile"
                required={true}
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
                placeholder={formData.selectedCountry?.code === 'IN' ? 'Enter 10-digit mobile number' : `Enter ${getMaxPhoneDigits(formData.selectedCountry)}-digit mobile number`}
              />

              {/* Row 4: Leave a Message for us */}
              <MessageField
                label="Leave a Message for us"
                required={false}
                name="message"
                rows={3}
                maxLength={300}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project requirements (wall height, running feet, site location, etc.)..."
              />


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
