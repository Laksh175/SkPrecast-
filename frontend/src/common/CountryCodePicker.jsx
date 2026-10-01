import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Check } from 'lucide-react';
import { countryCodes } from '../data/homeData';
import { useClickOutside } from '../hooks';

/**
 * ============================================================================
 * SK PRECAST INDUSTRIES - REUSABLE COUNTRY CODE PICKER
 * ============================================================================
 * Standardized country phone dial code picker (+91, +1, etc.) with flags,
 * search filter, and smooth popover.
 * ============================================================================
 */
export const CountryCodePicker = ({
  selectedCountry = countryCodes[0],
  onChange,
  disabled = false,
  className = '',
  popoverWidth = 'w-72',
  size = 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);

  useClickOutside(containerRef, () => {
    setIsOpen(false);
    setSearchTerm('');
  }, isOpen);

  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) return countryCodes;
    const lower = searchTerm.toLowerCase();
    return countryCodes.filter(c =>
      c.name.toLowerCase().includes(lower) ||
      c.dialCode.includes(searchTerm) ||
      c.code.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  const handleSelect = (item) => {
    if (onChange) {
      onChange(item);
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  const sizeClasses = size === 'sm' ? 'px-2.5 py-2 text-xs min-w-[85px]' : 'px-3 py-2.5 sm:py-3 text-sm min-w-[95px]';

  return (
    <div className={`relative shrink-0 ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) setIsOpen(!isOpen);
        }}
        className={`bg-slate-50/70 hover:bg-white border border-slate-300 rounded-xl ${sizeClasses} font-bold text-slate-900 flex items-center gap-1.5 justify-center hover:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all cursor-pointer shadow-2xs h-full ${
          disabled ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''
        }`}
      >
        <span>{selectedCountry?.flag || '🇮🇳'}</span>
        <span>{selectedCountry?.dialCode || '+91'}</span>
        <ChevronDown
          size={14}
          className={`text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-600' : ''}`}
        />
      </button>

      {/* Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full left-0 ${popoverWidth} mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl z-[150] overflow-hidden`}
          >
            {/* Search Input */}
            <div className="p-2.5 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
              <Search size={14} className="text-slate-400 ml-1.5 shrink-0" />
              <input
                type="text"
                placeholder="Search country or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none w-full py-0.5"
                autoFocus
              />
            </div>

            {/* List */}
            <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
              {filteredList.length > 0 ? (
                filteredList.map((item, idx) => {
                  const isSelected = selectedCountry?.code === item.code;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(item)}
                      className={`w-full text-left px-3.5 py-2 text-xs hover:bg-yellow-50 hover:text-amber-900 transition-colors flex items-center justify-between cursor-pointer ${
                        isSelected ? 'bg-yellow-100/80 text-amber-950 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{item.flag}</span>
                        <span className="truncate">{item.name}</span>
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <span className="font-mono text-slate-500 text-[11px]">
                          {item.dialCode}
                        </span>
                        {isSelected && <Check size={12} className="text-amber-600" />}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-3.5 text-center text-xs text-slate-400">
                  No country codes match "{searchTerm}"
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountryCodePicker;
