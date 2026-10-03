import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Globe, 
  Warehouse, 
  ShieldCheck, 
  Tag, 
  FileCheck, 
  Award, 
  Eye, 
  Target, 
  Newspaper,
  Briefcase,
  BookOpen,
  Image,
  MessageSquareQuote,
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import { FaDiamond } from 'react-icons/fa6';
import { Button, ContactInfoCard, ExploreProductsSection } from '../common';
import { navigateTo } from '../utils/navigation';
import { aboutCompanyData } from '../data/aboutUsData';
import { sitemapGeneralLinks, sitemapHeroData } from '../data/sitemapData';

const SitemapPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Sitemap | SK Precast Industries - Navigation Index';
  }, []);

  const generalLinks = sitemapGeneralLinks;

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
            <span className="text-amber-400 font-bold">Sitemap</span>
          </motion.div>

          {/* Main Heading - 30px */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-[30px] font-extrabold tracking-tight leading-tight mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-400 drop-shadow-sm">
              Sitemap
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
            Explore the complete navigation index and precast infrastructure solutions offered by SK Precast Industries.
          </motion.p>
        </div>
      </section>

      {/* 2. MAIN SITEMAP SECTION (Left: General Links, Right: About Us Contact Details Card) */}
      <section className="py-12 sm:py-16 bg-white text-slate-900 relative">
        <div className="max-w-[1260px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* LEFT COLUMN: General Links (Centered across total width, with Our Product Range diamond bullet icon & right-side link icon) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center h-full text-center py-2">
              
              {/* Title with decorative design accent & NO horizontal line */}
              <div className="text-center w-full mb-6 sm:mb-8">
                <h2 className="text-[24px] sm:text-3xl lg:text-[32px] font-black text-slate-900 tracking-tight leading-tight">
                  General <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">Links</span>
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2.5 mx-auto">
                  <span className="h-[2px] w-16 sm:w-24 rounded-full title-accent-bar" />
                  <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
                  <span className="h-[2px] w-16 sm:w-24 rounded-full title-accent-bar" />
                </div>
              </div>

              {/* Centered General Links List with Diamond on Left & External Link icon right after menu name */}
              <div className="w-full flex justify-center">
                <ul className="w-fit flex flex-col items-start gap-2 sm:gap-2.5 mx-auto">
                  {generalLinks.map((item, idx) => (
                    <li key={idx} className="group">
                      <a 
                        href={item.path}
                        onClick={(e) => {
                          if (item.path.startsWith('/#')) {
                            return;
                          }
                          navigateTo(item.path, e);
                        }}
                        className="inline-flex items-center gap-2.5 py-1.5 px-3 rounded-lg hover:bg-amber-50/70 hover:translate-x-1 transition-all duration-200 group cursor-pointer"
                      >
                        <FaDiamond size={8} className="text-yellow-500 shrink-0 group-hover:text-yellow-600 group-hover:scale-125 group-hover:rotate-45 transition-all duration-300" />
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`text-[15px] sm:text-[16px] font-bold transition-colors ${
                            item.isHome 
                              ? 'text-slate-950 uppercase font-black tracking-wide group-hover:text-amber-700' 
                              : 'text-slate-700 group-hover:text-amber-700'
                          }`}>
                            {item.name}
                          </span>
                          <ExternalLink size={12} className="text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* RIGHT COLUMN: Exact About Us Contact Details Card */}
            <div className="lg:col-span-5 flex flex-col gap-4 h-full text-left">
              <ContactInfoCard className="w-full flex-1" />
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
      </section>

      {/* 3. EXPLORE OUR PRODUCTS SECTION (Common Reusable Component) */}
      <ExploreProductsSection className="py-14 sm:py-18 bg-[#f8fafc] border-t border-slate-200/90" />

    </div>
  );
};

export default SitemapPage;
