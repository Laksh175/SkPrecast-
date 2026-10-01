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
  const baseStyles = `inline-flex items-center justify-center font-bold tracking-wider ${caseClass} transition-all duration-300 cursor-pointer select-none group/btn text-center whitespace-nowrap active:scale-98 disabled:opacity-50 disabled:pointer-events-none`.trim();

  // 2. Sizes
  const sizeStyles = {
    sm: 'px-3 py-2 rounded-xl text-[12px] sm:text-[13px] gap-1.5',
    md: 'px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[13px] sm:text-sm gap-2',
    lg: 'px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm gap-2.5 shadow-lg'
  };

  // 3. Variant Color & Style Configurations
  const variantStyles = {
    // 1. Primary Gold Gradient CTA (Get Best Price, Send Enquiry, etc.)
    gold: 'bg-gradient-to-r from-[#fde047] via-[#facc15] to-[#eab308] hover:bg-gradient-to-r hover:from-white hover:via-white hover:to-white text-slate-950 hover:text-slate-900 shadow-[0_4px_14px_rgba(234,179,8,0.28)] hover:shadow-md border border-yellow-400/90 hover:border-slate-300 hover:scale-[1.02]',
    
    // 2. Dark Slate-900 Button (Request to Call, Submit, etc.)
    dark: 'bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg border border-transparent',
    
    // 3. VIEW MORE / Card Dual Action Button (Black default -> White hover with Slate border)
    'view-more': 'bg-slate-900 hover:bg-white text-white hover:text-slate-900 border border-slate-900 hover:border-slate-900 shadow-sm hover:shadow-md',
    
    // 4. Dark to Gold Gradient Hover (Special CTAs in Hero / About)
    'dark-to-gold': 'bg-slate-900 hover:bg-gradient-to-r hover:from-[#fef08a] hover:via-[#fde047] hover:to-[#facc15] text-white hover:text-slate-950 shadow-md hover:shadow-yellow-500/25 hover:-translate-y-0.5 border border-transparent hover:border-yellow-300/80',
    
    // 5. WhatsApp Green Button
    whatsapp: 'bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg border border-transparent',
    
    // 6. Light / Ghost Secondary
    light: 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200/90 shadow-xs'
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
      {Icon && iconPosition === 'left' && (
        <span className="shrink-0 group-hover/btn:-translate-x-0.5 transition-transform">
          {typeof Icon === 'function' ? <Icon size={15} /> : Icon}
        </span>
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <span className="shrink-0 group-hover/btn:translate-x-1 transition-transform">
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
        {...props}
      >
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
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
