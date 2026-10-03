import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check } from 'lucide-react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaXTwitter, 
  FaLinkedinIn, 
  FaPinterestP 
} from 'react-icons/fa6';

const ProductShareButton = ({ product, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const dropdownRef = useRef(null);

  const productName = product?.name || 'Precast Product';
  const productImage = product?.image || '';

  // Robust copy to clipboard supporting iOS Safari, Android Chrome, and WebViews
  const copyToClipboard = async (text) => {
    let success = false;
    if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch (err) {
        console.warn('navigator.clipboard failed, switching to fallback', err);
      }
    }

    if (!success && typeof document !== 'undefined') {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.setAttribute('readonly', '');
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        console.error('execCommand copy fallback failed', err);
      }
    }

    return success;
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchend', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [isOpen]);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocalhost) {
        const slug = product?.slug || window.location.pathname.replace(/^\//, '').replace(/\.htm.*$/, '') || 'concrete-folding-compound-wall';
        return `https://www.skprecast-industries.com/${slug}.htm`;
      }
      return window.location.href;
    }
    const slug = product?.slug || 'concrete-folding-compound-wall';
    return `https://www.skprecast-industries.com/${slug}.htm`;
  };

  const handleShare = async (platform, e) => {
    if (e) {
      e.stopPropagation();
    }
    const url = getShareUrl();
    const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const domainBase = isLocalhost ? 'https://www.skprecast-industries.com' : (typeof window !== 'undefined' ? window.location.origin : 'https://www.skprecast-industries.com');
    
    const fullMedia = productImage?.startsWith('http') 
      ? productImage 
      : `${domainBase}${productImage?.startsWith('/') ? '' : '/'}${productImage || 'assets/products/concrete-folding-compound-wall.jpg'}`;

    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
          'width=620,height=580,noopener,noreferrer'
        );
        break;

      case 'instagram': {
        // Copy link to clipboard and open Instagram Direct
        await copyToClipboard(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
        window.open('https://www.instagram.com/direct/inbox/', '_blank', 'noopener,noreferrer');
        break;
      }

      case 'whatsapp': {
        const wpText = `*${productName}* - SK Precast Industries\nPalwal, Haryana\n\nCheck Product Details:\n${url}`;
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(wpText)}`,
          '_blank',
          'noopener,noreferrer'
        );
        break;
      }

      case 'twitter': {
        const tweetText = `Check out ${productName} by SK Precast Industries - Palwal, Haryana:`;
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(tweetText)}`,
          '_blank',
          'width=600,height=450,noopener,noreferrer'
        );
        break;
      }

      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank',
          'width=620,height=580,noopener,noreferrer'
        );
        break;

      case 'pinterest':
        window.open(
          `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(fullMedia)}&description=${encodeURIComponent(productName + ' - SK Precast Industries')}`,
          '_blank',
          'width=750,height=600,noopener,noreferrer'
        );
        break;

      case 'copy': {
        await copyToClipboard(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
        break;
      }

      default:
        break;
    }
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Share Trigger: High-Contrast Round Circular Button */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/25 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none select-none group"
        aria-label="Share product"
        title="Share this product"
      >
        <Share2 size={17} className="text-white transition-transform duration-200 group-hover:rotate-12" />
      </button>

      {/* Floating Dark Share Popup Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 z-50 bg-[#161a22] border border-slate-700/80 rounded-2xl shadow-2xl p-3.5 min-w-[220px] text-white"
          >
            {/* Header / Label inside popup */}
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-700/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Share Product</span>
              <span className="text-[10px] text-amber-400/90 font-medium">Quick Share</span>
            </div>

            {/* Arrow Tip */}
            <div className="absolute -top-1.5 right-3.5 w-3 h-3 bg-[#161a22] border-t border-l border-slate-700/80 rotate-45" />

            {/* Social Share Icons Grid */}
            <div className="relative z-10">
              {/* Row 1: Facebook, Instagram, WhatsApp, X */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                {/* Facebook */}
                <button
                  type="button"
                  onClick={(e) => handleShare('facebook', e)}
                  className="w-9 h-9 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <FaFacebookF size={16} />
                </button>

                {/* Instagram */}
                <button
                  type="button"
                  onClick={(e) => handleShare('instagram', e)}
                  className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
                  title="Share on Instagram (Copies link)"
                  aria-label="Share on Instagram"
                >
                  <FaInstagram size={18} />
                </button>

                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={(e) => handleShare('whatsapp', e)}
                  className="w-9 h-9 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp size={19} />
                </button>

                {/* X (Twitter) */}
                <button
                  type="button"
                  onClick={(e) => handleShare('twitter', e)}
                  className="w-9 h-9 rounded-lg bg-black hover:bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
                  title="Share on X (Twitter)"
                  aria-label="Share on X"
                >
                  <FaXTwitter size={16} />
                </button>
              </div>

              {/* Row 2: LinkedIn, Pinterest, Copy Link */}
              <div className="flex items-center justify-start gap-2">
                {/* LinkedIn */}
                <button
                  type="button"
                  onClick={(e) => handleShare('linkedin', e)}
                  className="w-9 h-9 rounded-lg bg-[#0A66C2] hover:bg-[#095196] text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedinIn size={17} />
                </button>

                {/* Pinterest */}
                <button
                  type="button"
                  onClick={(e) => handleShare('pinterest', e)}
                  className="w-9 h-9 rounded-lg bg-[#E60023] hover:bg-[#cc001f] text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
                  title="Share on Pinterest"
                  aria-label="Share on Pinterest"
                >
                  <FaPinterestP size={17} />
                </button>

                {/* Copy Link */}
                <button
                  type="button"
                  onClick={(e) => handleShare('copy', e)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-sm ${
                    isCopied 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-700/80 hover:bg-slate-600 text-white'
                  }`}
                  title={isCopied ? 'Link Copied!' : 'Copy Link'}
                  aria-label="Copy Link"
                >
                  {isCopied ? <Check size={17} className="text-white" /> : <Copy size={16} />}
                </button>

                {/* Copied Feedback Label */}
                {isCopied && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[11.5px] font-bold text-emerald-400 ml-1 truncate"
                  >
                    Copied!
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductShareButton;
