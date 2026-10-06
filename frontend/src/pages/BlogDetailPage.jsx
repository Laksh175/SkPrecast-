import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, ArrowRight, Share2, Check, Bookmark, ChevronRight, Phone, Mail, Building2, Pin, Send, AlertCircle } from 'lucide-react';
import { Button } from '../common';
import { getBlogPostBySlug, getExploreMoreBlogs, blogPostsData } from '../data/blogData';
import { navigateTo } from '../utils/navigation';
import { validateName, validateEmail, validateMessage } from '../utils/validation';
import { dispatchBlogCommentForm } from '../utils/whatsappDispatch';

const BlogDetailPage = ({ slug }) => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const currentPost = getBlogPostBySlug(slug) || blogPostsData[0];
  const exploreBlogs = getExploreMoreBlogs(currentPost.id, 3);

  // Leave a Comment / Details Form State
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    website: '',
    message: ''
  });
  const [commentErrors, setCommentErrors] = useState({});
  const [commentTouched, setCommentTouched] = useState({});
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [commentError, setCommentError] = useState('');

  const getFieldError = (name, value) => {
    if (name === 'name') return validateName(value, true);
    if (name === 'email') return validateEmail(value, true);
    if (name === 'message') return validateMessage(value, true, 5);
    return '';
  };

  const handleCommentBlur = (field) => {
    setCommentTouched((prev) => ({ ...prev, [field]: true }));
    const error = getFieldError(field, commentForm[field]);
    setCommentErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
    if (commentTouched[name]) {
      setCommentErrors((prev) => ({ ...prev, [name]: getFieldError(name, value) }));
    }
    if (commentError) setCommentError('');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    setCommentTouched({
      name: true,
      email: true,
      message: true
    });

    const nameErr = getFieldError('name', commentForm.name);
    const emailErr = getFieldError('email', commentForm.email);
    const msgErr = getFieldError('message', commentForm.message);

    const newErrors = {
      name: nameErr,
      email: emailErr,
      message: msgErr
    };

    setCommentErrors(newErrors);

    if (nameErr || emailErr || msgErr) {
      return;
    }

    setCommentSubmitted(true);

    // Dispatch structured WhatsApp message to Admin
    dispatchBlogCommentForm({
      blogTitle: currentPost?.title,
      name: commentForm.name,
      email: commentForm.email,
      website: commentForm.website,
      message: commentForm.message
    });

    setCommentForm({ name: '', email: '', website: '', message: '' });
    setCommentErrors({});
    setCommentTouched({});
    setTimeout(() => setCommentSubmitted(false), 5000);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${currentPost.title} | SK Precast Industries Blog`;
  }, [currentPost]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -170;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-full bg-[#090e1a] text-slate-100 font-sans min-h-screen">
      
      {/* 1. TOP HERO BANNER SECTION (MATCHING PRODUCT DETAIL PAGE BANNER STYLE) */}
      <section className="relative bg-[#0d1527] text-white pt-12 pb-14 sm:pt-14 sm:pb-16 overflow-hidden border-b border-amber-500/20 shadow-xl font-sans">
        {/* Background Banner Image Clearly Visible */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/assets/images/hero-page-banner.jpeg" 
            alt="SK Precast Industries Blog Detail Banner" 
            className="w-full h-full object-cover object-center opacity-85"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#090e1a]/70 via-[#090e1a]/40 to-[#090e1a]" />
        </div>

        {/* Architectural Dot Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none z-1"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Gradient Glows */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-amber-500/15 blur-[120px] pointer-events-none rounded-full z-1" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full z-1" />

        {/* Top Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.6)] z-1" />

        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Top Breadcrumb (Clean & Bold without background box) */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 text-sm sm:text-base font-semibold text-slate-300 mb-4">
            <a 
              href="/" 
              onClick={(e) => navigateTo('/', e)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </a>
            <span className="text-slate-500 font-normal">/</span>
            <a 
              href="/blog" 
              onClick={(e) => navigateTo('/blog', e)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Blog
            </a>
            <span className="text-slate-500 font-normal">/</span>
            <span className="text-amber-400 font-bold capitalize">
              {currentPost.categoryName || currentPost.category}
            </span>
          </div>

          {/* Subtitle / Brand Tagline Paragraph */}
          <p className="max-w-3xl mx-auto text-slate-300 text-[15px] font-medium leading-[26px]">
            <strong className="text-white font-bold">SK Precast Industries: </strong>
            Leading Manufacturer &amp; Supplier of Precast Boundary Walls, RCC Compound Walls, and Heavy Duty Concrete Panels in Palwal &amp; Delhi NCR.
          </p>

        </div>
      </section>

      {/* 2. MAIN HEADER: TITLE & META INFO */}
      <section className="pt-10 sm:pt-14 pb-6 sm:pb-8 bg-[#090e1a]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8 text-left">
          
          {/* Main Title - weight 600, comfortable line height */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] xl:text-[40px] font-[600] text-white tracking-tight leading-[1.38] sm:leading-[1.42] lg:leading-[52px] mb-4">
            {currentPost.title}
          </h1>

          {/* Meta Row: Date & Read Time */}
          <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-6 text-xs sm:text-sm text-slate-400 font-medium pb-5">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar size={15} className="text-amber-400 shrink-0" />
              <span>{currentPost.date}</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock size={15} className="text-amber-400 shrink-0" />
              <span>{currentPost.readTime || '4 min read'}</span>
            </div>
          </div>

          {/* Thin Horizontal Rule Divider */}
          <hr className="border-0 h-[1px] bg-slate-800 w-full mt-1" />

        </div>
      </section>

      {/* 3. CENTER BIG IMAGE */}
      <section className="pb-10 sm:pb-14 bg-[#090e1a]">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-[10px] sm:rounded-[12px] overflow-hidden bg-[#111927] border border-slate-800 shadow-xl">
            <img 
              src={currentPost.image} 
              alt={currentPost.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = currentPost.fallbackImage;
              }}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. CONTENT AREA: 3-COLUMN LAYOUT */}
      <section className="pb-16 sm:pb-20 bg-[#090e1a]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
            
            {/* LEFT COLUMN: Slim Compact Sticky [In this article] Card */}
            <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 w-full lg:max-w-[255px] lg:sticky lg:top-[140px] self-start order-2 lg:order-1">
              <div className="bg-[#111927] text-white rounded-[10px] p-3.5 sm:p-4 border border-slate-800 shadow-lg text-left">
                
                {/* Header with Pin Icon */}
                <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-slate-800">
                  <span className="text-sm">📌</span>
                  <h3 className="text-white font-bold text-[13.5px] sm:text-[14px] tracking-tight uppercase">
                    In this article
                  </h3>
                </div>

                {/* Points List - 14px font size */}
                <ul className="space-y-3 text-[14px] font-medium text-slate-300">
                  {currentPost.tableOfContents && currentPost.tableOfContents.map((point, pIdx) => {
                    const sectionId = currentPost.sections?.find(s => s.type === 'heading' && s.title.toLowerCase().includes(point.toLowerCase().slice(0, 15)))?.id;
                    return (
                      <li key={pIdx}>
                        <button
                          type="button"
                          onClick={() => sectionId && scrollToHeading(sectionId)}
                          className="flex items-start gap-2 text-left text-slate-300 hover:text-amber-400 transition-colors group cursor-pointer w-full text-[14px] leading-snug"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                          <span className="group-hover:translate-x-0.5 transition-transform">
                            {point}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Direct Contact Quick Widget with Both Numbers */}
                <div className="mt-5 pt-3.5 border-t border-slate-800 space-y-1.5">
                  <div className="font-bold text-white text-[13.5px] sm:text-[14px] flex items-center gap-1.5">
                    <Building2 size={14} className="text-amber-400 shrink-0" />
                    <span>SK Precast Industries</span>
                  </div>
                  <div className="space-y-1 pt-0.5">
                    <a 
                      href="tel:+918238902687" 
                      className="flex items-center gap-2 text-slate-300 hover:text-amber-400 font-medium text-[13.5px] sm:text-[14px] transition-colors"
                    >
                      <Phone size={13} className="text-amber-400 shrink-0" />
                      <span>+91-8238902687</span>
                    </a>
                    <a 
                      href="tel:+919896908099" 
                      className="flex items-center gap-2 text-slate-300 hover:text-amber-400 font-medium text-[13.5px] sm:text-[14px] transition-colors"
                    >
                      <Phone size={13} className="text-amber-400 shrink-0" />
                      <span>+91-9896908099</span>
                    </a>
                  </div>
                </div>

              </div>
            </aside>

            {/* MIDDLE COLUMN: Main Article Content */}
            <main className="lg:col-span-6 xl:col-span-7 w-full text-left order-1 lg:order-2">
              
              <div className="space-y-4 sm:space-y-4.5 text-slate-300 text-[16px] sm:text-[17px] leading-[28px]">
                {currentPost.sections && currentPost.sections.map((sec, idx) => {
                  if (sec.type === 'heading') {
                    return (
                      <div key={idx} id={sec.id} className="pt-2 sm:pt-3 scroll-mt-28">
                        <h2 className="text-xl sm:text-2xl md:text-[25px] font-[600] text-white tracking-tight leading-snug mt-1 mb-2">
                          {sec.title}
                        </h2>
                      </div>
                    );
                  }

                  if (sec.type === 'list') {
                    return (
                      <div key={idx} className="my-2.5">
                        <ul className="list-disc list-outside pl-6 space-y-2.5 marker:text-amber-400 text-slate-300">
                          {sec.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-[16px] sm:text-[17px] leading-[28px] pl-1">
                              <strong className="font-[600] text-white">{item.title}:</strong>{' '}
                              <span className="text-slate-300">{item.desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }

                  return (
                    <p key={idx} className="text-slate-300 text-[16px] sm:text-[17px] leading-[28px]">
                      {sec.text}
                    </p>
                  );
                })}
              </div>

            </main>

            {/* RIGHT COLUMN: Compact Sticky "Leave a Comment" & Related Articles */}
            <aside className="lg:col-span-3 xl:col-span-3 w-full lg:sticky lg:top-[140px] self-start order-3 lg:order-3 space-y-5">
              <div className="bg-[#111927] text-white rounded-[10px] p-4 sm:p-5 border border-slate-800 shadow-lg text-left">
                
                {/* Form Header */}
                <h3 className="text-white font-bold text-sm sm:text-[15px] tracking-tight mb-3.5 pb-2.5 border-b border-slate-800">
                  Leave a Comment
                </h3>

                {commentSubmitted ? (
                  <div className="bg-[#162238] border border-amber-500/30 rounded-[8px] p-4 text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mx-auto font-bold text-sm">✓</div>
                    <h4 className="text-white font-bold text-xs sm:text-sm">Thank You!</h4>
                    <p className="text-[11px] text-slate-300">Your comment has been submitted successfully.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCommentSubmit} className="space-y-3">
                    {commentError && (
                      <div className="p-2 rounded-[6px] bg-red-900/30 border border-red-500/40 text-red-400 text-[11.5px] font-medium">
                        {commentError}
                      </div>
                    )}

                    {/* Name Field */}
                    <div>
                      <label className="block text-[14px] font-semibold text-slate-200 mb-1.5">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input 
                        type="text"
                        name="name"
                        value={commentForm.name}
                        onChange={handleCommentChange}
                        onBlur={() => handleCommentBlur('name')}
                        placeholder="Your Name"
                        className={`w-full bg-[#162238] border rounded-[6px] px-3.5 py-2 text-[13.5px] text-white placeholder-slate-400 focus:outline-none transition-colors ${
                          commentTouched.name && commentErrors.name
                            ? 'border-red-500 ring-1 ring-red-500/50'
                            : 'border-slate-700/80 focus:border-amber-400 focus:bg-[#1a2942]'
                        }`}
                      />
                      {commentTouched.name && commentErrors.name && (
                        <p style={{ fontSize: '13px' }} className="text-[13px] leading-snug text-red-400 font-medium mt-1.5 flex items-center gap-1.5">
                          <AlertCircle size={14} className="shrink-0 text-red-400" />
                          <span>{commentErrors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-[14px] font-semibold text-slate-200 mb-1.5">
                        Your Email <span className="text-red-400">*</span>
                      </label>
                      <input 
                        type="email"
                        name="email"
                        value={commentForm.email}
                        onChange={handleCommentChange}
                        onBlur={() => handleCommentBlur('email')}
                        placeholder="Your Email"
                        className={`w-full bg-[#162238] border rounded-[6px] px-3.5 py-2 text-[13.5px] text-white placeholder-slate-400 focus:outline-none transition-colors ${
                          commentTouched.email && commentErrors.email
                            ? 'border-red-500 ring-1 ring-red-500/50'
                            : 'border-slate-700/80 focus:border-amber-400 focus:bg-[#1a2942]'
                        }`}
                      />
                      {commentTouched.email && commentErrors.email && (
                        <p style={{ fontSize: '13px' }} className="text-[13px] leading-snug text-red-400 font-medium mt-1.5 flex items-center gap-1.5">
                          <AlertCircle size={14} className="shrink-0 text-red-400" />
                          <span>{commentErrors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Website Field */}
                    <div>
                      <label className="block text-[14px] font-semibold text-slate-200 mb-1.5">
                        Website
                      </label>
                      <input 
                        type="text"
                        name="website"
                        value={commentForm.website}
                        onChange={handleCommentChange}
                        placeholder="Website (optional)"
                        className="w-full bg-[#162238] border border-slate-700/80 focus:border-amber-400 focus:bg-[#1a2942] focus:outline-none rounded-[6px] px-3.5 py-2 text-[13.5px] text-white placeholder-slate-400 transition-colors"
                      />
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label className="block text-[14px] font-semibold text-slate-200 mb-1.5">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea 
                        name="message"
                        rows={3}
                        value={commentForm.message}
                        onChange={handleCommentChange}
                        onBlur={() => handleCommentBlur('message')}
                        placeholder="Your Message..."
                        className={`w-full bg-[#162238] border rounded-[6px] px-3.5 py-2 text-[13.5px] text-white placeholder-slate-400 focus:outline-none transition-colors resize-none ${
                          commentTouched.message && commentErrors.message
                            ? 'border-red-500 ring-1 ring-red-500/50'
                            : 'border-slate-700/80 focus:border-amber-400 focus:bg-[#1a2942]'
                        }`}
                      />
                      {commentTouched.message && commentErrors.message && (
                        <p style={{ fontSize: '13px' }} className="text-[13px] leading-snug text-red-400 font-medium mt-1.5 flex items-center gap-1.5">
                          <AlertCircle size={14} className="shrink-0 text-red-400" />
                          <span>{commentErrors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1">
                      <Button
                        type="submit"
                        variant="gold-to-dark"
                        size="sm"
                        icon={<Send size={13} />}
                        iconPosition="right"
                        className="rounded-[6px] normal-case text-xs sm:text-[13px] font-bold w-full"
                      >
                        Submit Comment
                      </Button>
                    </div>
                  </form>
                )}

              </div>

              {/* Related Articles Title */}
              <div className="pt-2 text-center">
                <h3 className="text-white font-bold text-[22px] tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-300 to-amber-500">
                    Related Articles
                  </span>
                </h3>
                {/* Decorative Underline Accent */}
                <div className="flex items-center justify-center gap-1.5 mt-2 mb-4">
                  <span className="h-[2px] w-12 bg-amber-400 rounded-full" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_4px_#f59e0b] shrink-0" />
                  <span className="h-[2px] w-12 bg-amber-400 rounded-full" />
                </div>
              </div>

              {/* Related Articles Cards */}
              <div className="space-y-4">
                {exploreBlogs.map((otherPost) => (
                  <a
                    key={otherPost.id}
                    href={`/blog/${otherPost.slug}`}
                    onClick={(e) => navigateTo(`/blog/${otherPost.slug}`, e)}
                    className="group bg-[#111927] rounded-[10px] p-3.5 border border-slate-800 shadow-md hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col cursor-pointer block"
                  >
                    {/* Big Image on Top */}
                    <div className="w-full aspect-[16/10] rounded-[8px] overflow-hidden bg-[#162238] mb-3 border border-slate-800">
                      <img 
                        src={otherPost.image} 
                        alt={otherPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content Below Image */}
                    <h4 className="text-[13px] sm:text-[13.5px] font-bold text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-2 mb-1.5">
                      {otherPost.title}
                    </h4>
                    <p className="text-[12px] text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                      {otherPost.excerpt}
                    </p>

                    {/* Date */}
                    <div className="mt-auto pt-2.5 border-t border-slate-800 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                      <Calendar size={12} className="text-amber-400 shrink-0" />
                      <span>{otherPost.date}</span>
                    </div>
                  </a>
                ))}
              </div>

            </aside>

          </div>
        </div>
      </section>

    </div>
  );
};

export default BlogDetailPage;
