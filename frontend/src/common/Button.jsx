import React from 'react';
import { navigateTo } from '../utils/navigation';

/**
 * ============================================================================
 * SK PRECAST INDUSTRIES - REUSABLE UNIVERSAL BUTTON COMPONENT
 * ============================================================================
 * Centralizes button width, height, typography, padding, borders, shadows,
 * and hover animations across the entire website.
 *
 * Variants:
 *  - 'gold' / 'primary': Vibrant 3D Gold Gradient CTA ("GET BEST PRICE", "Send Enquiry")
 *  - 'dark' / 'secondary': Deep Slate-900 / Navy Button ("Request to Call", "Contact Us")
 *  - 'outline' / 'view-more': High-contrast Slate-900 button ("VIEW MORE", "View Details")
 *  - 'whatsapp': Green WhatsApp CTA with gradient & icon support
 * ============================================================================
 */

export const Button = ({
  children,
  variant = 'gold',
  size = 'md',
  href,
  onClick,
  icon: Icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  disabled = false,
  type = 'button',
  target,
  rel,
  title,
  ...props
}) => {
  // 1. Base Styles (Radius, Font-Weight, Alignment, Transitions, Shadows)
  const hasCustomCase = className.includes('normal-case') || className.includes('capitalize') || className.includes('lowercase') || className.includes('uppercase');
  const caseClass = hasCustomCase ? '' : 'capitalize';
  const baseStyles = `relative overflow-hidden inline-flex items-center justify-center font-bold tracking-wider ${caseClass} transition-all duration-300 cursor-pointer select-none group/btn text-center whitespace-nowrap active:scale-98 disabled:opacity-50 disabled:pointer-events-none`.trim();

  // 2. Sizes
  const sizeStyles = {
    sm: 'px-3 py-2 rounded-xl text-[12px] sm:text-[13px] gap-1.5',
    md: 'px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[13px] sm:text-sm gap-2',
    lg: 'px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm gap-2.5 shadow-lg'
  };

  // 3. Variant Color & Style Configurations (Black Hover with Shimmer & Distinct Box Shadows)
  const variantStyles = {
    // 1. Primary Gold Gradient CTA (Default: Gold -> Hover: Deep Black with Amber Glow & Shimmer)
    gold: 'bg-gradient-to-r from-[#fde047] via-[#facc15] to-[#eab308] hover:from-slate-950 hover:via-slate-900 hover:to-slate-950 text-slate-950 hover:text-white shadow-[0_4px_14px_rgba(234,179,8,0.28)] hover:shadow-[0_0_20px_rgba(250,204,21,0.4),0_8px_25px_rgba(0,0,0,0.9)] border border-yellow-400/90 hover:border-amber-400 hover:scale-[1.03]',
    
    // 2. Dark Slate Button (Default: Dark Slate -> Hover: Deep Black with Gold Glow)
    dark: 'bg-slate-900 hover:bg-slate-950 text-white hover:text-amber-300 border border-slate-700/90 hover:border-amber-400 shadow-md hover:shadow-[0_0_20px_rgba(250,204,21,0.35),0_8px_25px_rgba(0,0,0,0.9)] hover:scale-[1.03]',
    
    // 3. VIEW MORE / Card Action Button (Default: White -> Hover: Deep Black with White/Silver Glow & Shimmer)
    'view-more': 'bg-white hover:bg-slate-950 text-slate-950 hover:text-white border border-slate-200/90 hover:border-slate-500 shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.25),0_8px_25px_rgba(0,0,0,0.9)] hover:scale-[1.03]',
    
    // 3b. Explicit White Button
    white: 'bg-white hover:bg-slate-950 text-slate-950 hover:text-white border border-slate-200/90 hover:border-slate-500 shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.25),0_8px_25px_rgba(0,0,0,0.9)] hover:scale-[1.03]',
    
    // 4. Dark to Gold / White
    'dark-to-gold': 'bg-slate-900 hover:bg-slate-950 text-white hover:text-amber-300 border border-slate-700/90 hover:border-amber-400 shadow-md hover:shadow-[0_0_20px_rgba(250,204,21,0.35),0_8px_25px_rgba(0,0,0,0.9)] hover:scale-[1.03]',
    
    // 5. Gold to Dark Gradient
    'gold-to-dark': 'bg-gradient-to-r from-[#fde047] via-[#facc15] to-[#eab308] hover:from-slate-950 hover:via-slate-900 hover:to-slate-950 text-slate-950 hover:text-white shadow-[0_4px_14px_rgba(234,179,8,0.28)] hover:shadow-[0_0_20px_rgba(250,204,21,0.4),0_8px_25px_rgba(0,0,0,0.9)] border border-yellow-400/90 hover:border-amber-400 hover:scale-[1.03]',

    // 6. WhatsApp Button
    whatsapp: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg border border-transparent',
    
    // 7. Light / Ghost Secondary
    light: 'bg-slate-900/60 hover:bg-slate-950 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-500 shadow-xs hover:shadow-lg hover:scale-[1.03]'
  };

  const chosenSize = sizeStyles[size] || sizeStyles.md;
  const chosenVariant = variantStyles[variant] || variantStyles.gold;
  const widthStyle = fullWidth ? 'w-full' : '';

  const combinedClasses = `${baseStyles} ${chosenSize} ${chosenVariant} ${widthStyle} ${className}`.trim();

  // Click Handler with internal navigation support
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (href && !href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:') && !href.startsWith('https://wa.me')) {
      navigateTo(href, e);
    }
    if (onClick) {
      onClick(e);
    }
  };

  const content = (
    <>
      {/* Light Sweep Shining Shimmer Bar on Hover */}
      <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

      {Icon && iconPosition === 'left' && (
        <span className="relative z-1 shrink-0 group-hover/btn:-translate-x-0.5 transition-transform">
          {typeof Icon === 'function' ? <Icon size={15} /> : Icon}
        </span>
      )}
      <span className="relative z-1">{children}</span>
      {Icon && iconPosition === 'right' && (
        <span className="relative z-1 shrink-0 group-hover/btn:translate-x-1 transition-transform">
          {typeof Icon === 'function' ? <Icon size={14} /> : Icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={combinedClasses}
        target={target}
        rel={target === '_blank' ? (rel || 'noreferrer noopener') : rel}
        title={title}
        {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={combinedClasses}
      title={title}
      {...props}>
      {content}
    </button>
  );
};

export default Button;
