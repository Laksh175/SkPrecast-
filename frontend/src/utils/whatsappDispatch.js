/**
 * ============================================================================
 * SK PRECAST INDUSTRIES - CENTRALIZED WHATSAPP LEAD DISPATCH UTILITY
 * ============================================================================
 * 
 */

export const ADMIN_WHATSAPP_NUMBER = '918238902687';

export const openWhatsApp = (formattedText, phoneNumber = ADMIN_WHATSAPP_NUMBER) => {
  if (typeof window === 'undefined') return;
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(formattedText);
  const url = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedText}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * 1. Contact Us Page Form Dispatcher
 */
export const dispatchContactUsForm = ({ product, name, email, phone, selectedCountry, message }) => {
  const dialCode = selectedCountry?.dialCode || '+91';
  const fullPhone = phone ? `${dialCode} ${phone.trim()}` : 'Not provided';
  
  const text = 
`🏢 *NEW INQUIRY - CONTACT US PAGE*
--------------------------------------------
🔹 *Product / Service:* ${product?.trim() || 'General Inquiry'}
👤 *Customer Name:* ${name?.trim() || 'Not provided'}
📞 *Mobile Number:* ${fullPhone}
📧 *Email Address:* ${email?.trim() || 'Not provided'}
📝 *Requirement Details:*
"${message?.trim() || 'Kindly contact me for details.'}"
--------------------------------------------
🌐 _Submitted from: skprecast-industries.com/contact-us.htm_`;

  openWhatsApp(text);
};

/**
 * 2. Home Page "Let's Get In Touch" Form Dispatcher
 */
export const dispatchHomeContactForm = ({ product, name, email, country, phone, selectedCountry, message }) => {
  const dialCode = selectedCountry?.dialCode || '+91';
  const fullPhone = phone ? `${dialCode} ${phone.trim()}` : 'Not provided';

  const text = 
`🏢 *NEW INQUIRY - HOME PAGE CONTACT*
--------------------------------------------
🔹 *Product / Service:* ${product?.trim() || 'Precast Boundary Wall'}
👤 *Customer Name:* ${name?.trim() || 'Not provided'}
📞 *Mobile Number:* ${fullPhone}
📧 *Email Address:* ${email?.trim() || 'Not provided'}
📍 *Country:* ${country || 'India'}
📝 *Requirement Details:*
"${message?.trim() || 'Interested in your products. Please share quote.'}"
--------------------------------------------
🌐 _Submitted from: skprecast-industries.com_`;

  openWhatsApp(text);
};

/**
 * 3. Product Detail Page Lead Form Dispatcher
 */
export const dispatchProductDetailForm = ({ productName, name, email, mobile, selectedCountry, quantity, unit, purpose, details }) => {
  const dialCode = selectedCountry?.dialCode || '+91';
  const fullPhone = mobile ? `${dialCode} ${mobile.trim()}` : 'Not provided';

  const text = 
`🏢 *NEW PRODUCT INQUIRY*
--------------------------------------------
🔹 *Product:* ${productName || 'Precast Product'}
👤 *Customer Name:* ${name?.trim() || 'Not provided'}
📞 *Mobile Number:* ${fullPhone}
📧 *Email Address:* ${email?.trim() || 'Not provided'}
📊 *Estimated Quantity:* ${quantity ? `${quantity} ${unit || 'Square Feet'}` : 'Not specified'}
🎯 *Purpose:* ${purpose || 'End Use'}
📝 *Requirement / Notes:*
"${details?.trim() || 'Please share factory quotation & delivery timeline.'}"
--------------------------------------------
🌐 _Submitted from: skprecast-industries.com_`;

  openWhatsApp(text);
};

/**
 * 4. Quick Quote Modal Form Dispatcher
 */
export const dispatchQuickQuoteForm = ({ productName, name, email, mobile, selectedCountry, quantity, unit, purpose, details }) => {
  const dialCode = selectedCountry?.dialCode || '+91';
  const fullPhone = mobile ? `${dialCode} ${mobile.trim()}` : 'Not provided';

  const text = 
`⚡ *QUICK QUOTE REQUEST*
--------------------------------------------
🔹 *Product:* ${productName || 'Precast Boundary Wall'}
👤 *Customer Name:* ${name?.trim() || 'Not provided'}
📞 *Mobile Number:* ${fullPhone}
📧 *Email Address:* ${email?.trim() || 'Not provided'}
📊 *Estimated Quantity:* ${quantity ? `${quantity} ${unit || 'Square Feet'}` : 'Not specified'}
🎯 *Purpose:* ${purpose || 'End Use'}
📝 *Requirement / Notes:*
"${details?.trim() || 'Please share best factory quote.'}"
--------------------------------------------
🌐 _Submitted from: skprecast-industries.com_`;

  openWhatsApp(text);
};

/**
 * Upload Resume File to Cloud Storage (Free tmpfiles API) with fallback
 * Returns direct download/view URL string
 */
export const uploadResumeToCloud = async (file) => {
  if (!file) return null;
  try {
    const formData = new FormData();
    formData.append('file', file);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second timeout

    const response = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data?.status === 'success' && data?.data?.url) {
        // Convert to direct download/view link
        return data.data.url.replace('https://tmpfiles.org/', 'https://tmpfiles.org/dl/');
      }
    }
  } catch (err) {
    console.warn('Cloud resume upload failed or timed out, sending filename fallback:', err);
  }
  return null;
};

/**
 * 5. Current Jobs / Career Application Form Dispatcher
 */
export const dispatchJobApplicationForm = (formData, resumeUrl = null) => {
  const dialCode = formData.selectedCountry?.dialCode || '+91';
  const fullPhone = formData.mobile ? `${dialCode} ${formData.mobile.trim()}` : 'Not provided';

  // Clean Total Experience string
  let expDisplay = 'Fresher';
  if (formData.expYears && formData.expYears !== 'Fresher') {
    const isOtherExp = String(formData.expYears).toLowerCase().includes('other');
    const yearsPart = isOtherExp ? (formData.otherExpYears || formData.expYears) : formData.expYears;
    const monthsPart = (formData.expMonths && formData.expMonths !== '0 Months') ? ` ${formData.expMonths}` : '';
    expDisplay = `${yearsPart}${monthsPart}`;
  }

  // Clean Salary string
  let salaryDisplay = 'Not specified';
  const isOtherSal = String(formData.salaryLakhs).toLowerCase().includes('other');
  if (isOtherSal) {
    salaryDisplay = formData.otherSalary || 'Other';
  } else if (formData.salaryLakhs) {
    const lakhsPart = `₹${formData.salaryLakhs} Lakhs`;
    const thousandsPart = (formData.salaryThousands && formData.salaryThousands !== '0') ? ` ${formData.salaryThousands} K` : '';
    salaryDisplay = `${lakhsPart}${thousandsPart} / Year`;
  }

  const resumeSection = resumeUrl
    ? `📎 *Resume Link (Click to Open PDF):*\n${resumeUrl}\n📄 *File Name:* ${formData.resumeFile?.name || 'Resume.pdf'}`
    : `📎 *Resume Attached:* ${formData.resumeFile?.name || 'File attached via form'}\n📌 _(Note: Candidate can attach ${formData.resumeFile?.name || 'resume file'} in this chat)_`;

  const text = 
`💼 *NEW JOB APPLICATION - SK PRECAST*
--------------------------------------------
👤 *Applicant Name:* ${formData.name?.trim()} (${formData.gender || 'Male'})
📞 *Mobile Number:* ${fullPhone}
📧 *Email Address:* ${formData.email?.trim()}
📍 *Location:* ${formData.city?.trim()}, ${formData.locality?.trim()} (${formData.country || 'India'})
🎓 *Qualification:* ${formData.qualification || 'Graduate'}
🏢 *Functional Area:* ${formData.functionalArea || 'Production'}
⏳ *Total Experience:* ${expDisplay}
💰 *Expected Salary:* ${salaryDisplay}
⏱️ *Notice Period:* ${formData.noticePeriod || 'Immediate'}
🛠️ *Key Skills:* ${formData.keySkills?.trim() || 'Not provided'}
${resumeSection}
--------------------------------------------
🌐 _Submitted from: skprecast-industries.com/current-jobs.htm_`;

  openWhatsApp(text);
};

/**
 * 6. Customer Review / Feedback Dispatcher
 */
export const dispatchProductReviewForm = ({ product, name, email, mobile, selectedCountry, review, rating, likes }) => {
  const dialCode = selectedCountry?.dialCode || '+91';
  const fullPhone = mobile ? `${dialCode} ${mobile.trim()}` : 'Not provided';
  
  const likedAspects = likes ? Object.entries(likes)
    .filter(([_, val]) => val === 'like')
    .map(([key]) => key)
    .join(', ') : '';

  const text = 
`⭐ *NEW CUSTOMER REVIEW & RATING*
--------------------------------------------
🔹 *Product Reviewed:* ${product?.trim() || 'SK Precast Products'}
👤 *Customer Name:* ${name?.trim()}
📞 *Mobile Number:* ${fullPhone}
📧 *Email:* ${email?.trim() || 'Not provided'}
⭐ *Overall Rating:* ${rating || 5}/5 Stars
${likedAspects ? `👍 *Liked Features:* ${likedAspects}\n` : ''}📝 *Customer Review:*
"${review?.trim() || 'Great product and quick delivery!'}"
--------------------------------------------
🌐 _Submitted from: skprecast-industries.com_`;

  openWhatsApp(text);
};

/**
 * 7. Blog Comment Dispatcher
 */
export const dispatchBlogCommentForm = ({ blogTitle, name, email, website, message }) => {
  const text = 
`📝 *NEW BLOG COMMENT & INQUIRY*
--------------------------------------------
📰 *Blog Article:* ${blogTitle || 'SK Precast Blog'}
👤 *Name:* ${name?.trim()}
📧 *Email:* ${email?.trim()}
${website?.trim() ? `🌐 *Website:* ${website.trim()}\n` : ''}📝 *Comment / Question:*
"${message?.trim() || ''}"
--------------------------------------------
🌐 _Submitted from: skprecast-industries.com/blog_`;

  openWhatsApp(text);
};
