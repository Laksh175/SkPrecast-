import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Check } from 'lucide-react';
import { useClickOutside } from '../hooks';

/**
 * ============================================================================
 * SK PRECAST INDUSTRIES - UNIVERSAL SEARCHABLE SELECT / DROPDOWN COMPONENT
 * ============================================================================
 * Provides an accessible, responsive, searchable dropdown and combobox.
 * Supports:
 *  - Flat array of strings: ['Option 1', 'Option 2']
 *  - Array of objects: [{ label: 'Option 1', value: 'opt1' }]
 *  - Grouped categories: [{ group: 'Category A', options: ['A1', 'A2'] }]
 *  - Direct typing (combobox) or click-to-select
 *  - Live search filter inside the popover
 *  - Click outside detection & keyboard accessibility
 * ============================================================================
 */
export const SearchableSelect = ({
  value = '',
  onChange,
  options = [],
  placeholder = 'Select an option...',
  searchPlaceholder,
  isTypeable = false,
  showSearch = true,
  disabled = false,
  required = false,
  name,
  id,
  error,
  className = '',
  triggerClassName = '',
  popoverClassName = '',
  placement = 'bottom',
  size = 'md',
  onBlur,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);

  useClickOutside(containerRef, () => {
    setIsOpen(false);
    setSearchTerm('');
  }, isOpen);

  // Normalize options structure
  const isGrouped = useMemo(() => {
    return options.length > 0 && typeof options[0] === 'object' && 'group' in options[0];
  }, [options]);

  // Flatten options for search & display
  const allFlattenedOptions = useMemo(() => {
    if (isGrouped) {
      return options.flatMap(g => (g.options || []).map(opt => ({
        label: typeof opt === 'object' ? opt.label : opt,
        value: typeof opt === 'object' ? opt.value : opt,
        group: g.group
      })));
    }
    return options.map(opt => ({
      label: typeof opt === 'object' ? opt.label : opt,
      value: typeof opt === 'object' ? opt.value : opt
    }));
  }, [options, isGrouped]);

  // Filtered options based on search term
  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) {
      return isGrouped ? options : allFlattenedOptions;
    }
    const lower = searchTerm.toLowerCase();
    if (isGrouped) {
      return options
        .map(g => ({
          ...g,
          options: (g.options || []).filter(opt => {
            const label = typeof opt === 'object' ? opt.label : opt;
            return String(label).toLowerCase().includes(lower);
          })
        }))
        .filter(g => g.options.length > 0);
    }
    return allFlattenedOptions.filter(opt =>
      String(opt.label).toLowerCase().includes(lower)
    );
  }, [options, allFlattenedOptions, isGrouped, searchTerm]);

  const defaultSearchPlaceholder = useMemo(() => {
    if (searchPlaceholder) return searchPlaceholder;
    const count = allFlattenedOptions.length;
    return count > 0 ? `Filter ${count}+ options...` : 'Search...';
  }, [searchPlaceholder, allFlattenedOptions.length]);

  const handleSelect = (selectedValue) => {
    if (onChange) {
      onChange({ target: { name, value: selectedValue } });
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const currentDisplayLabel = useMemo(() => {
    const found = allFlattenedOptions.find(o => String(o.value) === String(value));
    return found ? found.label : value;
  }, [allFlattenedOptions, value]);

  const sizeClasses = size === 'sm' ? 'px-3 py-2 text-xs' : 'px-3.5 py-2.5 sm:py-3 text-sm';

  return (
    <div className={`relative w-full ${className}`} ref={containerRef} {...props}>
      {/* Input / Trigger Area */}
      <div className="relative">
        {isTypeable ? (
          <input
            type="text"
            id={id}
            name={name}
            value={value}
            disabled={disabled}
            required={required}
            onChange={handleInputChange}
            onClick={() => !disabled && setIsOpen(true)}
            onFocus={() => !disabled && setIsOpen(true)}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`w-full bg-[#162238] hover:bg-[#1a2942] focus:bg-[#1a2942] border rounded-xl ${sizeClasses} pr-10 text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all shadow-inner cursor-pointer ${
              error
                ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20'
            } ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-900' : ''} ${triggerClassName}`}
          />
        ) : (
          <button
            type="button"
            id={id}
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onBlur={onBlur}
            className={`w-full bg-[#162238] hover:bg-[#1a2942] focus:bg-[#1a2942] border rounded-xl ${sizeClasses} pr-10 text-left transition-all shadow-inner flex items-center justify-between cursor-pointer ${
              error
                ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20'
            } ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-900' : ''} ${triggerClassName}`}
          >
            <span className={`truncate ${currentDisplayLabel ? 'text-slate-100 font-medium' : 'text-slate-500'}`}>
              {currentDisplayLabel || placeholder}
            </span>
          </button>
        )}

        {/* Right Chevron Toggle Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) setIsOpen(!isOpen);
          }}
          className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400' : ''}`}
          />
        </button>
      </div>

      {/* Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: placement === 'top' ? -5 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === 'top' ? -5 : 5 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${placement === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'} left-0 right-0 bg-[#0d1527] border border-slate-700 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[150] overflow-hidden ${popoverClassName}`}
          >
            {/* Search Filter Header */}
            {showSearch && allFlattenedOptions.length > 5 && (
              <div className="p-2.5 border-b border-slate-800 bg-[#111927] flex items-center gap-2">
                <Search size={14} className="text-slate-400 ml-1 shrink-0" />
                <input
                  type="text"
                  placeholder={defaultSearchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-xs text-slate-100 placeholder:text-slate-500 outline-none w-full py-0.5"
                  autoFocus
                />
              </div>
            )}

            {/* Scrollable Options List */}
            <div className="max-h-56 overflow-y-auto divide-y divide-slate-800/60 custom-scrollbar">
              {isGrouped ? (
                (filteredList).length > 0 ? (
                  (filteredList).map((grp, gIdx) => (
                    <div key={gIdx} className="py-1">
                      <div className="px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-amber-400 bg-[#162238] sticky top-0 z-10 border-y border-slate-700/60">
                        {grp.group}
                      </div>
                      <div className="divide-y divide-slate-800/40">
                        {grp.options.map((opt, optIdx) => {
                          const optLabel = typeof opt === 'object' ? opt.label : opt;
                          const optVal = typeof opt === 'object' ? opt.value : opt;
                          const isSelected = String(value) === String(optVal);
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelect(optVal)}
                              className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-800/80 hover:text-amber-300 transition-colors flex items-center justify-between cursor-pointer ${
                                isSelected ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-300'
                              }`}
                            >
                              <span className="truncate">{optLabel}</span>
                              {isSelected && <Check size={14} className="text-amber-400 shrink-0 ml-2" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3.5 text-center text-xs text-slate-400">
                    No options match "{searchTerm}"
                  </div>
                )
              ) : (
                (filteredList).length > 0 ? (
                  (filteredList).map((opt, idx) => {
                    const optLabel = opt.label;
                    const optVal = opt.value;
                    const isSelected = String(value) === String(optVal);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelect(optVal)}
                        className={`w-full text-left px-3.5 py-2.5 text-xs hover:bg-slate-800/80 hover:text-amber-300 transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <span className="truncate">{optLabel}</span>
                        {isSelected && <Check size={14} className="text-amber-400 shrink-0 ml-2" />}
                      </button>
                    );
                  })
                ) : isTypeable && value ? (
                  <div className="p-3 text-left text-xs text-slate-400">
                    Use custom: "<span className="text-amber-400 font-semibold">{value}</span>"
                  </div>
                ) : (
                  <div className="p-3.5 text-center text-xs text-slate-400">
                    No options match "{searchTerm}"
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchableSelect;
