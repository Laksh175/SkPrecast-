import React from 'react';
import { AlertCircle } from 'lucide-react';
import SearchableSelect from './SearchableSelect';
import CountryCodePicker from './CountryCodePicker';
import { allProductsList, countriesList } from '../data/homeData';
import { getMaxPhoneDigits } from '../utils/validation';

export { getMaxPhoneDigits };

/**
 * Common Field Container with Label, Asterisk, and Error Message
 */
export const FormFieldWrapper = ({
  label,
  required = false,
  error,
  touched = true,
  children,
  className = '',
  labelClassName = '',
  errorClassName = '',
  rightLabel
}) => {
  const hasError = Boolean(touched && error);

  return (
    <div className={`text-left ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-1">
          <label className={`block text-[11.5px] sm:text-[12.5px] font-semibold text-slate-200 ${labelClassName}`}>
            {label} {required && <span className="text-red-400 font-bold">*</span>}
          </label>
          {rightLabel && (
            <span className="text-[10.5px] text-slate-400 font-medium">
              {rightLabel}
            </span>
          )}
        </div>
      )}

      {children}

      {hasError && (
        <p 
          style={{ fontSize: '14px' }} 
          className={`text-[14px] leading-snug text-red-400 font-medium mt-1.5 flex items-center gap-1.5 ${errorClassName}`}
        >
          <AlertCircle size={16} className="shrink-0 text-red-400" />
          <span style={{ fontSize: '14px' }}>{error}</span>
        </p>
      )}
    </div>
  );
};

/**
 * 1. Product / Service Looking for Common Select Field
 */
export const ProductSelectField = ({
  label = 'Product / Service Looking for',
  required = true,
  name = 'product',
  value,
  onChange,
  onBlur,
  error,
  touched = true,
  options = allProductsList,
  placeholder = 'Product / Service Looking for',
  searchPlaceholder = 'Search 35+ products...',
  isTypeable = true,
  className = '',
  labelClassName = '',
  disabled = false
}) => {
  return (
    <FormFieldWrapper
      label={label}
      required={required}
      error={error}
      touched={touched}
      className={className}
      labelClassName={labelClassName}
    >
      <SearchableSelect
        name={name}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        isTypeable={isTypeable}
        value={value}
        options={options}
        onChange={onChange}
        onBlur={onBlur}
        error={Boolean(touched && error)}
        disabled={disabled}
      />
    </FormFieldWrapper>
  );
};

/**
 * 2. Your Name Common Input Field
 */
export const NameField = ({
  label = 'Your Name',
  required = true,
  name = 'name',
  value,
  onChange,
  onBlur,
  error,
  touched = true,
  placeholder = 'Your Name',
  className = '',
  inputClassName = '',
  labelClassName = '',
  disabled = false
}) => {
  const hasError = Boolean(touched && error);

  return (
    <FormFieldWrapper
      label={label}
      required={required}
      error={error}
      touched={touched}
      className={className}
      labelClassName={labelClassName}
    >
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full bg-[#162238] hover:bg-[#1a2942] focus:bg-[#1a2942] border rounded-lg sm:rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all font-medium ${
          hasError
            ? 'border-red-500 ring-2 ring-red-500/20'
            : 'border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20'
        } ${inputClassName}`}
      />
    </FormFieldWrapper>
  );
};

/**
 * 3. Email Address Common Input Field
 */
export const EmailField = ({
  label = 'Email',
  required = true,
  name = 'email',
  value,
  onChange,
  onBlur,
  error,
  touched = true,
  placeholder = 'Email',
  className = '',
  inputClassName = '',
  labelClassName = '',
  disabled = false
}) => {
  const hasError = Boolean(touched && error);

  return (
    <FormFieldWrapper
      label={label}
      required={required}
      error={error}
      touched={touched}
      className={className}
      labelClassName={labelClassName}
    >
      <input
        type="email"
        name={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck="false"
        className={`w-full bg-[#162238] hover:bg-[#1a2942] focus:bg-[#1a2942] border rounded-lg sm:rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all font-medium ${
          hasError
            ? 'border-red-500 ring-2 ring-red-500/20'
            : 'border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20'
        } ${inputClassName}`}
      />
    </FormFieldWrapper>
  );
};

/**
 * 4. Phone / Mobile Common Input Field with Country Code Picker
 */
export const PhoneField = ({
  label = 'Mobile',
  required = true,
  name = 'phone',
  value,
  selectedCountry,
  onCountryChange,
  onChange,
  onBlur,
  error,
  touched = true,
  placeholder,
  className = '',
  inputClassName = '',
  labelClassName = '',
  disabled = false
}) => {
  const hasError = Boolean(touched && error);
  const currentMaxDigits = getMaxPhoneDigits(selectedCountry);
  const defaultPlaceholder = selectedCountry?.code === 'IN' 
    ? 'Mobile' 
    : `Enter ${currentMaxDigits}-digit mobile`;

  return (
    <FormFieldWrapper
      label={label}
      required={required}
      error={error}
      touched={touched}
      className={className}
      labelClassName={labelClassName}
    >
      <div className="flex items-stretch gap-2">
        <CountryCodePicker
          selectedCountry={selectedCountry}
          onChange={onCountryChange}
          disabled={disabled}
        />
        <div className="w-full">
          <input
            type="tel"
            name={name}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={currentMaxDigits}
            placeholder={placeholder || defaultPlaceholder}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`w-full bg-[#162238] hover:bg-[#1a2942] focus:bg-[#1a2942] border rounded-lg sm:rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all font-medium h-full ${
              hasError
                ? 'border-red-500 ring-2 ring-red-500/20'
                : 'border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20'
            } ${inputClassName}`}
          />
        </div>
      </div>
    </FormFieldWrapper>
  );
};

/**
 * 5. Message / Requirement / Enquiry Details Common Textarea Field
 */
export const MessageField = ({
  label = 'Enquiry Details',
  required = true,
  name = 'message',
  value,
  onChange,
  onBlur,
  error,
  touched = true,
  rows = 3,
  placeholder = 'Your Requirement',
  maxLength,
  className = '',
  textareaClassName = '',
  labelClassName = '',
  disabled = false
}) => {
  const hasError = Boolean(touched && error);

  return (
    <FormFieldWrapper
      label={label}
      required={required}
      error={error}
      touched={touched}
      className={className}
      labelClassName={labelClassName}
      rightLabel={maxLength ? `${(value || '').length}/${maxLength}` : undefined}
    >
      <textarea
        name={name}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full bg-[#162238] hover:bg-[#1a2942] focus:bg-[#1a2942] border rounded-lg sm:rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all resize-none font-medium ${
          hasError
            ? 'border-red-500 ring-2 ring-red-500/20'
            : 'border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20'
        } ${textareaClassName}`}
      />
    </FormFieldWrapper>
  );
};

/**
 * 6. Country Select Common Combobox Field (240+ Countries)
 */
export const CountrySelectField = ({
  label = 'Country',
  required = false,
  name = 'country',
  value,
  onChange,
  onBlur,
  error,
  touched = true,
  options = countriesList,
  placeholder = 'Type or select country...',
  searchPlaceholder = 'Filter 240+ countries...',
  isTypeable = true,
  className = '',
  labelClassName = '',
  disabled = false
}) => {
  return (
    <FormFieldWrapper
      label={label}
      required={required}
      error={error}
      touched={touched}
      className={className}
      labelClassName={labelClassName}
    >
      <SearchableSelect
        name={name}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        isTypeable={isTypeable}
        value={value}
        options={options}
        onChange={onChange}
        onBlur={onBlur}
        error={Boolean(touched && error)}
        disabled={disabled}
      />
    </FormFieldWrapper>
  );
};

/**
 * 7. Generic Input Field for Other Single-Line Inputs (Quantity, Location, etc.)
 */
export const InputField = ({
  label,
  required = false,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  touched = true,
  placeholder,
  min,
  max,
  className = '',
  inputClassName = '',
  labelClassName = '',
  disabled = false,
  ...rest
}) => {
  const hasError = Boolean(touched && error);

  return (
    <FormFieldWrapper
      label={label}
      required={required}
      error={error}
      touched={touched}
      className={className}
      labelClassName={labelClassName}
    >
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        max={max}
        disabled={disabled}
        className={`w-full bg-[#162238] hover:bg-[#1a2942] focus:bg-[#1a2942] border rounded-lg sm:rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all font-medium ${
          hasError
            ? 'border-red-500 ring-2 ring-red-500/20'
            : 'border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20'
        } ${inputClassName}`}
        {...rest}
      />
    </FormFieldWrapper>
  );
};

export default {
  FormFieldWrapper,
  ProductSelectField,
  NameField,
  EmailField,
  PhoneField,
  MessageField,
  CountrySelectField,
  InputField,
  getMaxPhoneDigits
};
