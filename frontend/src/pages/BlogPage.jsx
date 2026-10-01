import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, X, Share2, Check } from 'lucide-react';
import { blogPostsData } from '../data/blogData';
import { navigateTo } from '../utils/navigation';

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'SK Precast Industries Blog | Concrete & Boundary Wall Insights';
  }, []);

  const handleShare = (post, e) => {
    e.stopPropagation();
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full bg-theme-pageBg text-theme-heading font-sans min-h-screen">
      
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
            <span className="text-amber-400 font-bold">Blog</span>
          </motion.div>

          {/* Main Heading - 30px */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-[30px] font-extrabold tracking-tight leading-tight mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-400 drop-shadow-sm">
              Latest Articles &amp; Insights
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
            Explore technical articles, industry updates, and expert insights on high-strength precast concrete boundary wall engineering.
          </motion.p>
        </div>
      </section>

      {/* 2. BLOG POSTS SECTION */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#d97706] via-amber-500 to-yellow-500">Blog Posts</span>
            </h2>
            <div className="flex items-center justify-center gap-2 my-2.5 mx-auto">
              <span className="h-[2px] w-16 sm:w-24 rounded-full title-accent-bar" />
              <span className="h-2 w-2 rounded-full title-accent-dot shrink-0" />
              <span className="h-[2px] w-16 sm:w-24 rounded-full title-accent-bar" />
            </div>
          </div>

          {/* 2 Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {blogPostsData.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group bg-white rounded-[10px] p-4 sm:p-5 border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <a
                  href={`/blog/${post.slug}`}
                  onClick={(e) => navigateTo(`/blog/${post.slug}`, e)}
                  className="block text-left"
                >
                  {/* Padded Image Container with Hover Zoom */}
                  <div className="relative aspect-[16/10] rounded-[10px] overflow-hidden bg-slate-100 border border-slate-100/80 mb-5">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = post.fallbackImage;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="px-1.5 sm:px-2 text-left">
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug mb-2.5 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* 2-line Description with '...' */}
                    <p className="text-slate-600 text-[14.5px] leading-[23px] line-clamp-2 mb-4 font-normal">
                      {post.excerpt}
                    </p>
                  </div>
                </a>

                {/* Footer Meta Row: Date with React Calendar Icon */}
                <div className="mx-1.5 sm:mx-2 pt-3.5 border-t border-dashed border-slate-200 flex items-center">
                  {/* Date with React Icon (Matching Font Color) */}
                  <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
                    <Calendar size={15} className="text-slate-500 stroke-[2] shrink-0" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default BlogPage;
