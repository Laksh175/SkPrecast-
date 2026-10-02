import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { aboutCompanyData } from '../data/aboutUsData';

/**
 * Common Reusable Contact Information Card Component
 * Used across About Us, Testimonials, Catalogues, Manufacturing Unit, Gallery, Current Jobs, Sitemap etc.
 */
const ContactInfoCard = ({
  badge,
  companyName,
  address,
  phones,
  email,
  className = ''
}) => {
  const defaultCard = aboutCompanyData?.contactCard || {};

  const displayBadge = badge || defaultCard.badge || 'CONTACT US';
  const displayCompanyName = companyName || defaultCard.companyName || 'SK Precast Industries';
  const displayAddress = address || defaultCard.address || 'Opp. Adani CNG Pump, Delhi-Mathura Road Near Hanuman Mandir, Palwal, Haryana - 121102, India';
  const displayPhones = phones || defaultCard.phones || ['+91-8238902687', '+91-9896908099'];
  const displayEmail = email || defaultCard.email || 'info@skprecast-industries.com';

  return (
    <div className={`relative rounded-[15px] p-6 sm:p-7 bg-theme-pageBg border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-300/40 transition-all duration-300 group ${className}`}>
      
      {/* Top Header */}
      <div className="mb-5 pb-4 border-b border-slate-200">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-[5px] text-[11px] font-extrabold uppercase tracking-wider bg-slate-200/80 text-slate-700 mb-1 border border-slate-300/60">
          {displayBadge}
        </span>
        <h2 className="text-[26px] leading-tight font-black text-theme-heading tracking-tight">
          {displayCompanyName}
        </h2>
      </div>

      {/* Info List */}
      <div className="flex flex-col gap-3.5">
        
        {/* Address */}
        <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
          <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
            <MapPin size={20} className="text-white drop-shadow-xs" />
          </div>
          <div className="text-left">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Address</span>
            <p className="caption-text text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-medium">
              {displayAddress}
            </p>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
          <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
            <Phone size={20} className="text-white drop-shadow-xs" />
          </div>
          <div className="text-left">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Mobile</span>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {displayPhones.map((phone, idx) => (
                <React.Fragment key={phone}>
                  {idx > 0 && <span className="text-slate-300 font-bold">•</span>}
                  <a 
                    href={`tel:${phone.replace(/[^0-9+]/g, '')}`} 
                    className="caption-text text-[13.5px] sm:text-[14px] font-medium text-slate-800 hover:text-amber-600 transition-colors">
                    {phone}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* E-mail */}
        <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-[14px] bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-xs">
          <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-amber-400 via-amber-500 to-[#f3f0ed] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-[0_6px_14px_rgba(217,119,6,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.2)] ring-1 ring-amber-300/50">
            <Mail size={20} className="text-white drop-shadow-xs" />
          </div>
          <div className="text-left overflow-hidden">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">E-mail</span>
            <a 
              href={`mailto:${displayEmail}`} 
              className="caption-text text-[13.5px] sm:text-[14px] font-medium text-slate-800 hover:text-amber-600 transition-colors truncate block">
              {displayEmail}
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ContactInfoCard;
