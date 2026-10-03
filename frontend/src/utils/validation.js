/**
 * ============================================================================
 * SK PRECAST INDUSTRIES - PRODUCTION-GRADE CENTRALIZED FORM VALIDATION
 * ============================================================================
 * Contains reusable, comprehensive validation rules for all forms across the site.
 * ============================================================================
 */

/**
 * Standard Email Regex matching production email standards
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Valid Name Regex (Alphabetic characters, spaces, dots, hyphens, and apostrophes)
 */
export const NAME_REGEX = /^[a-zA-Z\s.'-]+$/;

/**
 * Indian Mobile Number Regex (10 digits, starts with 6, 7, 8, or 9)
 */
export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

/**
 * Computes maximum allowed phone digits based on selected country
 */
export const getMaxPhoneDigits = (country) => {
  if (!country) return 10;
  if (country.code === 'IN') return 10;
  if (['US', 'CA'].includes(country.code)) return 10;
  if (['GB', 'DE', 'FR', 'AU'].includes(country.code)) return 11;
  if (country.code === 'CN') return 11;
  if (country.code === 'AE') return 9;
  return 15;
};

/**
 * Computes minimum allowed phone digits based on selected country
 */
export const getMinPhoneDigits = (country) => {
  if (!country) return 10;
  if (country.code === 'IN') return 10;
  return 7;
};

/**
 * 1. Name Validator
 */
export const validateName = (name, required = true) => {
  const trimmed = String(name || '').trim();
  if (!trimmed) {
    return required ? 'Full name is required.' : '';
  }
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters.';
  }
  if (trimmed.length > 60) {
    return 'Name cannot exceed 60 characters.';
  }
  if (!NAME_REGEX.test(trimmed)) {
    return 'Please enter a valid name (letters only).';
  }
  return '';
};

/**
 * 2. Email Validator
 */
export const validateEmail = (email, required = true) => {
  const trimmed = String(email || '').trim();
  if (!trimmed) {
    return required ? 'Email address is required.' : '';
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Please enter a valid email address (e.g. name@domain.com).';
  }
  return '';
};

/**
 * 3. Phone / Mobile Validator (Country-aware)
 */
export const validatePhone = (phone, country = { code: 'IN', name: 'India', dialCode: '+91' }, required = true) => {
  const rawDigits = String(phone || '').replace(/\D/g, '');
  if (!rawDigits) {
    return required ? 'Mobile number is required.' : '';
  }

  // India Specific Validation
  if (!country || country.code === 'IN' || country.dialCode === '+91') {
    if (rawDigits.length !== 10) {
      return 'Please enter a 10-digit mobile number.';
    }
    if (!INDIAN_MOBILE_REGEX.test(rawDigits)) {
      return 'Mobile number must start with 6, 7, 8, or 9.';
    }
    return '';
  }

  // International Numbers
  const minDigits = getMinPhoneDigits(country);
  const maxDigits = getMaxPhoneDigits(country);
  if (rawDigits.length < minDigits || rawDigits.length > maxDigits) {
    return `Please enter a valid ${country.name || 'mobile'} number (${minDigits}-${maxDigits} digits).`;
  }
  return '';
};

/**
 * 4. Product / Service Looking For Validator
 */
export const validateProduct = (product, required = true) => {
  const trimmed = String(product || '').trim();
  if (!trimmed && required) {
    return 'Please select or type the product/service you are looking for.';
  }
  return '';
};

/**
 * 5. Estimated Quantity Validator
 */
export const validateQuantity = (quantity, required = true) => {
  const val = String(quantity || '').trim();
  if (!val) {
    return required ? 'Estimated quantity is required.' : '';
  }
  const num = Number(val);
  if (isNaN(num) || num <= 0) {
    return 'Please enter a valid quantity greater than 0.';
  }
  return '';
};

/**
 * 6. Message / Requirement Details Validator
 */
export const validateMessage = (message, required = false, minLength = 5) => {
  const trimmed = String(message || '').trim();
  if (!trimmed) {
    return required ? 'Requirement details / message is required.' : '';
  }
  if (required && trimmed.length < minLength) {
    return `Please provide at least ${minLength} characters of details.`;
  }
  return '';
};

/**
 * 7. City / Location Validator
 */
export const validateCity = (city, required = true) => {
  const trimmed = String(city || '').trim();
  if (!trimmed) {
    return required ? 'City / Location is required.' : '';
  }
  if (trimmed.length < 2) {
    return 'City name must be at least 2 characters.';
  }
  return '';
};

/**
 * 8. Experience Validator (For Careers / Jobs Form)
 */
export const validateExperience = (experience, required = true) => {
  const trimmed = String(experience || '').trim();
  if (!trimmed && required) {
    return 'Please select your total experience.';
  }
  return '';
};

/**
 * 9. Star Rating Validator (For Reviews / Testimonials)
 */
export const validateRating = (rating, required = true) => {
  const num = Number(rating || 0);
  if (num <= 0 && required) {
    return 'Please select a star rating (1 to 5 stars).';
  }
  return '';
};

/**
 * 10. Unified Field Validation Dispatcher
 * @param {string} fieldName Name of the field being validated
 * @param {any} value Value of the field
 * @param {object} context Additional context such as country, required flag, etc.
 * @returns {string} Error message or empty string if valid
 */
export const validateField = (fieldName, value, context = {}) => {
  const { selectedCountry, country, required, minLength } = context;
  const activeCountry = selectedCountry || country || { code: 'IN', name: 'India', dialCode: '+91' };

  switch (fieldName) {
    case 'name':
    case 'fullName':
    case 'reviewerName':
    case 'applicantName':
    case 'yourName':
      return validateName(value, required !== false);

    case 'email':
    case 'emailAddress':
      return validateEmail(value, required === true);

    case 'phone':
    case 'mobile':
    case 'mobileNumber':
    case 'phoneNumber':
      return validatePhone(value, activeCountry, required !== false);

    case 'product':
    case 'productService':
    case 'service':
      return validateProduct(value, required === true);

    case 'quantity':
    case 'estimatedQuantity':
      return validateQuantity(value, required !== false);

    case 'message':
    case 'details':
    case 'requirementDetails':
    case 'coverLetter':
    case 'reviewText':
      return validateMessage(value, required === true, minLength || 5);

    case 'city':
    case 'location':
      return validateCity(value, required === true);

    case 'experience':
    case 'totalExperience':
      return validateExperience(value, required !== false);

    case 'rating':
      return validateRating(value, required !== false);

    default:
      if (required && (!value || !String(value).trim())) {
        return 'This field is required.';
      }
      return '';
  }
};

/**
 * 11. Multi-Field Form Validator
 * @param {object} formData Key-value map of form data
 * @param {object} rulesMap Map of field names to their validation options { required, minLength, etc. }
 * @param {object} context Global context (e.g. selectedCountry)
 * @returns {{ isValid: boolean, errors: object }}
 */
export const validateForm = (formData, rulesMap = {}, context = {}) => {
  const errors = {};
  let isValid = true;

  Object.keys(rulesMap).forEach((field) => {
    const fieldOptions = typeof rulesMap[field] === 'object' ? rulesMap[field] : { required: Boolean(rulesMap[field]) };
    const error = validateField(field, formData[field], { ...context, ...fieldOptions });
    if (error) {
      errors[field] = error;
      isValid = false;
    } else {
      errors[field] = '';
    }
  });

  return { isValid, errors };
};

export default {
  validateName,
  validateEmail,
  validatePhone,
  validateProduct,
  validateQuantity,
  validateMessage,
  validateCity,
  validateExperience,
  validateRating,
  validateField,
  validateForm,
  getMaxPhoneDigits,
  getMinPhoneDigits,
  EMAIL_REGEX,
  NAME_REGEX,
  INDIAN_MOBILE_REGEX
};
