import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Box, 
  Factory, 
  Home, 
  Globe, 
  Warehouse, 
  ShieldCheck, 
  Tag, 
  FileCheck, 
  Award, 
  Eye, 
  Target, 
  Landmark, 
  PlusCircle, 
  Plus, 
  Minus, 
  X, 
  Shield,
  Briefcase,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Clock,
  Search,
  ChevronDown,
  Check
} from 'lucide-react';
import { Button } from '../common';
import { navigateTo } from '../utils/navigation';
import { aboutCompanyData, dropdownCategoriesData, standaloneProductsData } from '../data/aboutUsData';
import { countriesList, countryCodes } from '../data/homeData';
import { useClickOutside } from '../hooks';

// Dynamic Icon Map for explore products section
const iconComponentMap = { 
  Building2, 
  Shield, 
  Landmark, 
  PlusCircle, 
  Sparkles, 
  Layers, 
  Box, 
  Factory, 
  Home, 
  Globe, 
  Warehouse, 
  ShieldCheck, 
  Tag, 
  FileCheck, 
  Award, 
  Eye, 
  Target 
};

const getMaxPhoneDigits = (country) => {
  if (!country) return 10;
  if (country.code === 'IN') return 10;
  if (['AE', 'SA', 'AU', 'FR', 'NZ'].includes(country.code)) return 9;
  if (['US', 'CA', 'GB', 'MX', 'BR'].includes(country.code)) return 10;
  if (['SG', 'QA', 'KW', 'OM', 'BH', 'HK'].includes(country.code)) return 8;
  if (['DE', 'RU', 'ZA'].includes(country.code)) return 11;
  return 12;
};

const qualificationsGrouped = [
  {
    group: '--Basic/UG Qualification--',
    options: [
      'Higher Secondary',
      'Secondary School',
      'Vocational Course',
      'Diploma',
      'Advanced/Higher Diploma',
      'Professional Degree',
      'B.A',
      'B.Arch',
      'B.C.A',
      'B.B.A',
      'B.Com',
      'B.Ed',
      'BDS',
      'BAMS',
      'BHM',
      'B.Pharma',
      'B.Sc',
      'B.Tech/B.E',
      'LLB',
      'MBBS',
      'BVSC',
      'Other Bachelor Degree'
    ]
  },
  {
    group: '--PG Qualification--',
    options: [
      'Post Graduate Diploma',
      'M.A',
      'M.Arch',
      'M.C.A',
      'M.B.A/PGDM',
      'M.Com',
      'M.Ed',
      'MS/Master of Surgery',
      'M.Pharma',
      'M.Sc',
      'M.Tech',
      'MSW',
      'LLM',
      'MVSC',
      'CA',
      'CS',
      'DNB',
      'ICWA',
      'Integrated PG',
      'MD/Medicinae Doctor',
      'M.C.H.',
      'M.D.S.'
    ]
  },
  {
    group: '--Doctorate Qualification--',
    options: [
      'Some Tertiary Coursework',
      'Ph.D/Doctorate',
      'MPHIL',
      'Other Doctorate Degree',
      'DM/Doctorate of Medicine'
    ]
  }
];

const functionalAreasList = [
  'Accounting/Auditing/Taxation',
  'Analytic and Business Intelligence',
  'Architecture / Interior Design',
  'Beauty / Fitness / Spa Services',
  'Cargo / Freight / Transportation / Packaging / Shipping/Logistic',
  'Content Writing/Journalism/Editing',
  'Corporate Planning & Strategy / Management Consulting',
  'CSR / Sustainability',
  'Defence Forces / Security Forces',
  'Education / Teaching / Training / Counselling / Academic',
  'Engineering/ Engineering Design / R&D / Quality',
  'Export/Import/Merchandising',
  'Fashion Designing & Merchandising',
  'Financial Services / Banking, Investments / Insurance / stock market / Loan',
  'Fresher / Trainee',
  'Front Office / Reception/Computer Operator/Assistant',
  'Guards / Security Services',
  'Health Care / Pharmaceuticals / Medical',
  'Hotel / Restaurants /Travel / Airlines',
  'HR / Recruitment / Administration / IR / Training & Development / Operations',
  'IT Hardware / Technical Support / Telecom Engineering',
  'IT Hardware - Networking',
  'IT Hardware - Security / Operating Systems',
  'IT Software - Application Programming / Maintenance',
  'IT Software - Client Server',
  'IT Software - DataBase / Datawarehousing',
  'IT Software - Ecommerce / Internet Technologies',
  'IT Software - Mainframe',
  'IT Software - Middleware',
  'IT Software - Mobile Technologies',
  'IT Software - Network Administration, Security',
  'IT Software - Others',
  'IT Software - QA / Testing / Documentation',
  'IT Software - System Programming',
  'IT Software - Telecom',
  'IT Software- ERP / CRM / EDP / MIS',
  'ITES / BPO / KPO / LPO / Customer Service',
  'Legal / Law Services / Judiciary',
  'Manufacturing / Production / Quality',
  'Marketing / Advertising / PR / Media Planning',
  'Media / Entertainment / TV / Films / Production / Broadcasting',
  'Oil / Gas / Petroleum',
  'Pharma / R&D / Biotech',
  'Public Relation (PR) / Advertising / Events',
  'Real Estate / Construction',
  'Sales & Marketing / Business Development/telecaller',
  'Self Employed / Entrepreneur / Consultants / Freelancers',
  'Supply Chain / Purchase / Procurement'
];

const noticePeriodsList = [
  '15 Days or Less',
  '1 Month',
  '2 Months',
  '3 Months',
  'More than 3 Months'
];

const salaryThousandsList = [
  '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95'
];

const CurrentJobsPage = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
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
    functionalArea: '',
    expYears: '',
    expMonths: '',
    salaryLakhs: '',
    salaryThousands: '',
    noticePeriod: '',
    keySkills: '',
    resumeFile: null
  });

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const countryRef = useRef(null);

  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
  const [countryCodeSearch, setCountryCodeSearch] = useState('');
  const countryCodeRef = useRef(null);

  useClickOutside(countryRef, () => {
    setIsCountryOpen(false);
    setCountrySearch('');
  }, isCountryOpen);

  useClickOutside(countryCodeRef, () => {
    setIsCountryCodeOpen(false);
    setCountryCodeSearch('');
  }, isCountryCodeOpen);

  const filteredCountries = countriesList.filter(item =>
    item.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredCountryCodes = countryCodes.filter(c =>
    c.name.toLowerCase().includes(countryCodeSearch.toLowerCase()) ||
    c.dialCode.includes(countryCodeSearch) ||
    c.code.toLowerCase().includes(countryCodeSearch.toLowerCase())
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Current Jobs & Careers | SK Precast Industries - Palwal, Haryana';
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown(prev => prev === id ? null : id);
  };

  const activeDropdownData = dropdownCategoriesData.find(d => d.id === openDropdown);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const digitsOnly = value.replace(/\D/g, '');
      const maxDigits = getMaxPhoneDigits(formData.selectedCountry);
      const truncatedPhone = digitsOnly.slice(0, maxDigits);
      setFormData(prev => ({ ...prev, mobile: truncatedPhone }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['.pdf', '.doc', '.docx', '.rtf'];
      const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (!validTypes.includes(fileExt)) {
        alert('Invalid file format. Please attach .doc, .docx, .rtf, or .pdf files only.');
        e.target.value = '';
        return;
      }
      
      // 2 MB limit (2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2 MB limit. Please upload a document smaller than 2 MB.');
        e.target.value = '';
        return;
      }

      setFormData(prev => ({ ...prev, resumeFile: file }));
      setFileName(file.name);
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.city || !formData.qualification || !formData.functionalArea || !formData.expYears || !formData.salaryLakhs || !formData.noticePeriod || !formData.keySkills) {
      alert('Please fill all mandatory fields (*)');
      return;
    }
    if (!formData.resumeFile) {
      alert('Please attach your resume document (.doc, .docx, .rtf, .pdf)');
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
              
              {/* Highlighted Status Card Banner */}
              <div className="relative rounded-[20px] p-6 sm:p-7 bg-gradient-to-br from-amber-500/10 via-[#fefbf6] to-amber-500/15 border-2 border-amber-400/80 shadow-[0_10px_30px_rgba(245,158,11,0.12)] overflow-hidden text-center group">
                
                {/* Decorative Amber Glow Circles */}
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

                {/* Main Highlight Title */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight flex items-center justify-center gap-2">
                  <Sparkles size={20} className="text-amber-600 shrink-0" />
                  <span>— No Active Opening Right Now —</span>
                  <Sparkles size={20} className="text-amber-600 shrink-0" />
                </h3>

                {/* Descriptive Text */}
                <p className="text-[14px] sm:text-[15px] text-slate-700 max-w-2xl mx-auto mt-2.5 leading-relaxed font-medium">
                  We are continually expanding our precast manufacturing and engineering teams! <strong className="text-slate-900">Post your resume below</strong> to get fast-tracked for immediate upcoming project vacancies.
                </p>
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
                    className="py-12 px-6 text-center"
                  >
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
                          required
                          placeholder="Enter your full name"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white"
                        />
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
                          required
                          placeholder="e.g. name@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* 4. Country (Searchable Dropdown with all 240+ Countries) */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Country :
                      </label>
                      <div className="sm:col-span-8 relative" ref={countryRef}>
                        <div className="relative">
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            onClick={() => setIsCountryOpen(true)}
                            onFocus={() => setIsCountryOpen(true)}
                            placeholder="Type or select country..."
                            className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white cursor-pointer"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsCountryOpen(!isCountryOpen);
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
                                      className={`w-full text-left px-3.5 py-2.5 text-xs hover:bg-yellow-50 hover:text-amber-900 transition-colors flex items-center justify-between cursor-pointer ${
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
                          required
                          placeholder="e.g. Palwal, Faridabad, Delhi NCR"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white"
                        />
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
                          placeholder="Enter your area / locality"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* 7. Mobile with Country Dial Code Picker */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Mobile :
                      </label>
                      <div className="sm:col-span-8 flex gap-2">
                        
                        {/* Country Code Picker Dropdown */}
                        <div className="relative" ref={countryCodeRef}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsCountryCodeOpen(!isCountryCodeOpen);
                              setIsCountryOpen(false);
                            }}
                            className="bg-slate-50 hover:bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900 flex items-center gap-1.5 justify-center shrink-0 min-w-[95px] hover:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all cursor-pointer shadow-xs"
                          >
                            <span>{formData.selectedCountry?.flag || '🇮🇳'}</span>
                            <span>{formData.selectedCountry?.dialCode || '+91'}</span>
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
                                        const adjustedPhone = formData.mobile.slice(0, newMaxDigits);
                                        setFormData(prev => ({ 
                                          ...prev, 
                                          selectedCountry: item,
                                          mobile: adjustedPhone 
                                        }));
                                        setIsCountryCodeOpen(false);
                                        setCountryCodeSearch('');
                                      }}
                                      className={`w-full text-left px-3 py-2 text-xs hover:bg-yellow-50 hover:text-amber-900 transition-colors flex items-center justify-between cursor-pointer ${
                                        formData.selectedCountry?.code === item.code ? 'bg-yellow-100/70 text-amber-950 font-bold' : 'text-slate-700'
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

                        {/* Phone Input */}
                        <input
                          type="tel"
                          name="mobile"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={getMaxPhoneDigits(formData.selectedCountry)}
                          value={formData.mobile}
                          onChange={handleInputChange}
                          required
                          placeholder={formData.selectedCountry?.code === 'IN' ? '10-digit mobile number' : `Enter ${getMaxPhoneDigits(formData.selectedCountry)}-digit mobile number`}
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* 8. Qualification */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Qualification :
                      </label>
                      <div className="sm:col-span-8">
                        <select
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white cursor-pointer"
                        >
                          <option value="">--Select Qualification--</option>
                          {qualificationsGrouped.map((grp, idx) => (
                            <optgroup key={idx} label={grp.group} className="font-bold text-slate-900 bg-slate-100">
                              {grp.options.map((opt) => (
                                <option key={opt} value={opt} className="font-normal text-slate-800 bg-white">
                                  {opt}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* 9. Functional Area */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Functional Area :
                      </label>
                      <div className="sm:col-span-8">
                        <select
                          name="functionalArea"
                          value={formData.functionalArea}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white cursor-pointer"
                        >
                          <option value="">--Select Functional Area--</option>
                          {functionalAreasList.map((fa) => (
                            <option key={fa} value={fa}>{fa}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* 10. Total Work Experience */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Total Work Experience :
                      </label>
                      <div className="sm:col-span-8 grid grid-cols-2 gap-3">
                        <select
                          name="expYears"
                          value={formData.expYears}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white cursor-pointer"
                        >
                          <option value="">--Select Year--</option>
                          <option value="Fresher">Fresher</option>
                          {[...Array(30)].map((_, i) => (
                            <option key={i + 1} value={`${i + 1} Years`}>{i + 1} Years</option>
                          ))}
                        </select>

                        <select
                          name="expMonths"
                          value={formData.expMonths}
                          onChange={handleInputChange}
                          disabled={formData.expYears === 'Fresher'}
                          className={`w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white cursor-pointer ${
                            formData.expYears === 'Fresher' ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''
                          }`}
                        >
                          <option value="0">--Select Months--</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={`${i + 1} Months`}>{i + 1} Months</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* 11. Current Annual Salary */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Current Annual Salary :
                      </label>
                      <div className="sm:col-span-8 grid grid-cols-2 gap-3">
                        <select
                          name="salaryLakhs"
                          value={formData.salaryLakhs}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white cursor-pointer"
                        >
                          <option value="">Lakhs</option>
                          {[...Array(50)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>

                        <select
                          name="salaryThousands"
                          value={formData.salaryThousands}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white cursor-pointer"
                        >
                          <option value="">Thousands</option>
                          {salaryThousandsList.map((val) => (
                            <option key={val} value={val}>{val}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* 12. Duration of Notice Period */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right">
                        <span className="text-red-500 font-bold mr-1">*</span>Duration of Notice Period :
                      </label>
                      <div className="sm:col-span-8">
                        <select
                          name="noticePeriod"
                          value={formData.noticePeriod}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white cursor-pointer"
                        >
                          <option value="">Select</option>
                          {noticePeriodsList.map((np) => (
                            <option key={np} value={np}>{np}</option>
                          ))}
                        </select>
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
                          required
                          placeholder="e.g. Precast Casting, RCC Quality Testing, AutoCAD, Boundary Wall Erection, Site Execution, Team Management..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 transition-all shadow-xs bg-slate-50/50 focus:bg-white resize-y min-h-[105px]"
                        />
                      </div>
                    </div>

                    {/* 14. Attach Resume with Complete File Support & 2MB Validation */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start">
                      <label className="sm:col-span-4 text-sm font-bold text-slate-700 sm:text-right pt-2">
                        <span className="text-red-500 font-bold mr-1">*</span>Attach Resume :
                      </label>
                      <div className="sm:col-span-8">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-500 text-amber-950 hover:text-white border border-amber-300 hover:border-amber-500 font-bold text-xs cursor-pointer transition-all duration-200 shadow-xs hover:shadow-md">
                              <Upload size={15} className="text-amber-600 group-hover:text-white transition-colors" />
                              <span>Choose file</span>
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx,.rtf"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>

                            <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl border border-slate-200 flex-1 min-w-[200px] max-w-full">
                              {fileName ? (
                                <div className="flex items-center justify-between w-full gap-2">
                                  <span className="text-xs text-emerald-800 font-bold flex items-center gap-1.5 truncate">
                                    <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                                    <span className="truncate">{fileName}</span>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setFormData(prev => ({ ...prev, resumeFile: null }));
                                      setFileName('');
                                    }}
                                    className="p-0.5 text-slate-400 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
                                    title="Remove attached file"
                                  >
                                    <X size={15} />
                                  </button>
                                </div>
                              ) : (
                                <span className="text-xs text-slate-500 font-medium">
                                  No file chosen
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-[12px] font-bold text-amber-600">
                            Allowed File Type : .doc, .docx, .rtf, .pdf (Upto 2 MB)
                          </p>
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
                          icon={<ArrowRight size={15} />}
                          iconPosition="right"
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
              <div className="sticky top-[110px] sm:top-[125px] lg:top-[135px] z-20">
                <div className="w-full relative rounded-[20px] p-6 sm:p-7 bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 hover:border-amber-300 hover:shadow-2xl hover:shadow-slate-300/40 transition-all duration-300 group text-left flex flex-col justify-between">
                  
                  {/* Top Header & Details */}
                  <div>
                    <div className="mb-5 pb-4 border-b border-slate-200">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-[5px] text-[11px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 mb-1 border border-slate-300/60">
                        {aboutCompanyData?.contactCard?.badge || 'CONTACT US'}
                      </span>
                      <h2 className="text-[26px] leading-tight font-black text-theme-heading tracking-tight">
                        {aboutCompanyData?.contactCard?.companyName || 'SK Precast Industries'}
                      </h2>
                    </div>

                    {/* Info List */}
                    <div className="flex flex-col gap-3.5">
                      
                      {/* Address */}
                      <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-[#f8fafc] border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
                        <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                          <MapPin size={20} className="text-white drop-shadow-xs" />
                        </div>
                        <div className="text-left">
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Address</span>
                          <p className="text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-medium">
                            {aboutCompanyData?.contactCard?.address || 'Opp. Adani CNG Pump, Delhi-Mathura Road Near Hanuman Mandir, Palwal, Haryana - 121102, India'}
                          </p>
                        </div>
                      </div>

                      {/* Mobile */}
                      <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-[#f8fafc] border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
                        <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                          <Phone size={20} className="text-white drop-shadow-xs" />
                        </div>
                        <div className="text-left">
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Mobile</span>
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                            {aboutCompanyData?.contactCard?.phones?.map((phone, idx) => (
                              <React.Fragment key={phone}>
                                {idx > 0 && <span className="text-slate-300 font-bold">•</span>}
                                <a 
                                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`} 
                                  className="text-[14px] font-medium text-slate-900 hover:text-amber-600 transition-colors">
                                  {phone}
                                </a>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* E-mail */}
                      <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-[#f8fafc] border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
                        <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
                          <Mail size={20} className="text-white drop-shadow-xs" />
                        </div>
                        <div className="text-left overflow-hidden">
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">E-mail</span>
                          <a 
                            href={`mailto:${aboutCompanyData?.contactCard?.email || 'info@skprecast-industries.com'}`} 
                            className="text-[14px] font-medium text-slate-900 hover:text-amber-600 transition-colors truncate block">
                            {aboutCompanyData?.contactCard?.email || 'info@skprecast-industries.com'}
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <div className="mt-6 pt-5 border-t border-slate-200 flex justify-center">
                    <Button
                      variant="dark-to-gold"
                      size="md"
                      href="/contact-us.htm"
                      icon={<ArrowRight size={14} />}
                      iconPosition="right"
                      className="w-full"
                    >
                      Contact Us
                    </Button>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. EXPLORE OUR PRODUCTS SECTION */}
      <section className="py-14 sm:py-18 bg-[#f8fafc] border-t border-slate-200/90 relative overflow-hidden">
        {/* Background Subtle Gradient Glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-400/8 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-slate-200/50 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="mb-8 pt-0"
          >
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
              <h2 className="text-[23px] sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">Products</span>
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2 mb-2 mx-auto">
                <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
                <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
                <span className="h-[2px] w-20 sm:w-28 rounded-full title-accent-bar" />
              </div>
            </div>

            {/* LINE 1: 4 Dropdown Categories in One Line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-6xl mx-auto mb-4">
              {dropdownCategoriesData.map((cat) => {
                const isOpen = openDropdown === cat.id;
                const CatIcon = iconComponentMap[cat.iconName] || Building2;
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleDropdown(cat.id)}
                    className={`w-full p-4 rounded-[9px] flex items-center justify-between font-bold text-sm sm:text-[15px] transition-all duration-300 shadow-sm border cursor-pointer group ${
                      isOpen 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-lg ring-2 ring-amber-400/50' 
                        : 'bg-white text-slate-800 border-slate-200 hover:border-amber-400 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen 
                          ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-xs' 
                          : 'bg-amber-100 text-amber-900 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-white group-hover:shadow-xs'
                      }`}>
                        <CatIcon size={20} />
                      </div>
                      <div className="text-left">
                        <span className={`block font-bold leading-snug transition-colors ${
                          isOpen ? 'text-white' : 'text-slate-900 group-hover:text-amber-700'
                        }`}>
                          {cat.title}
                        </span>
                        <span className={`text-[12px] font-normal transition-colors ${
                          isOpen ? 'text-amber-200' : 'text-slate-400 group-hover:text-amber-600/80'
                        }`}>
                          {cat.count}
                        </span>
                      </div>
                    </div>
                    
                    {/* Plus / Minus indicator button */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen 
                        ? 'bg-amber-500 text-slate-950' 
                        : 'bg-slate-100 text-slate-600 group-hover:bg-amber-100 group-hover:text-amber-900'
                    }`}>
                      {isOpen ? <Minus size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Collapsible Dropdown Product Menu Tray */}
            <AnimatePresence>
              {activeDropdownData && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden max-w-6xl mx-auto mb-6"
                >
                  <div className="p-5 sm:p-7 rounded-[9px] bg-white border-2 border-amber-200/90 shadow-xl relative">
                    
                    {/* Tray Top Header */}
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <h4 className="text-base sm:text-lg font-bold text-slate-900">
                          {activeDropdownData.title} <span className="text-slate-400 font-normal text-sm">({activeDropdownData.count})</span>
                        </h4>
                      </div>
                      <button
                        onClick={() => setOpenDropdown(null)}
                        className="text-xs font-bold text-slate-500 hover:text-amber-700 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 hover:border-amber-300 transition-colors cursor-pointer"
                      >
                        <X size={13} />
                        <span>Close</span>
                      </button>
                    </div>

                    {/* All Product Links Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                      {activeDropdownData.products.map((prod) => (
                        <a
                          key={prod.id}
                          href={prod.link}
                          onClick={(e) => navigateTo(prod.link, e)}
                          className="p-3 sm:p-3.5 rounded-[12px] bg-[#f8fafc] border border-slate-200/80 hover:border-amber-400 hover:shadow-md hover:bg-amber-50/40 transition-all flex items-center justify-between text-left group cursor-pointer"
                        >
                          <span className="text-[13.5px] sm:text-[14px] font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                            {prod.title}
                          </span>
                          <ArrowRight size={14} className="text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                        </a>
                      ))}
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LINE 2: 5 Standalone Product Cards in One Line */}
            <div className="max-w-6xl mx-auto mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
                {standaloneProductsData.map((prod, idx) => {
                  const ProdIcon = iconComponentMap[prod.iconName] || Building2;
                  return (
                    <motion.div
                      key={prod.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="h-full"
                    >
                      <a
                        href={prod.link}
                        onClick={(e) => navigateTo(prod.link, e)}
                        className="w-full h-full p-4 rounded-[9px] flex items-center gap-3 font-bold text-sm sm:text-[14px] transition-all duration-300 shadow-sm border border-slate-200 bg-white text-slate-800 hover:border-amber-300 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-[12px] bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-600 group-hover:text-white transition-all shadow-xs">
                          <ProdIcon size={20} />
                        </div>
                        <div className="text-left min-w-0 flex-1">
                          <span className="block font-bold leading-snug text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                            {prod.title}
                          </span>
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default CurrentJobsPage;
