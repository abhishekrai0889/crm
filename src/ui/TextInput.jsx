import React, { useState, useEffect, useRef } from "react";

const TextInput = ({
  label,
  required = false,
  minLength,
  maxLength,
  error: externalError,
  placeholder,
  value,
  onChange,
  onBlur,
  type = "text",
  className = "",
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",
  containerClassName = "",
  showCharCount = false,
  disabled = false,
  readOnly = false,
  autoFocus = false,
  icon: Icon,
  iconPosition = "left",
  helperText,
  success = false,
  successMessage,
  scrollToError = true,
  ...props
}) => {
  const [internalError, setInternalError] = useState("");
  const [touched, setTouched] = useState(false);
  const [charCount, setCharCount] = useState(value?.length || 0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Use external error if provided, otherwise internal
  const displayError = externalError || internalError;

  // Scroll to error and focus on input when error appears
  useEffect(() => {
    if (displayError && scrollToError && containerRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Focus on the input after scrolling
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
            // Optional: highlight the input by selecting text
            // inputRef.current.select();
          }
        }, 300); // Wait for scroll to complete
      }, 100);
    }
  }, [displayError, scrollToError]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setCharCount(newValue.length);

    // Validate on change if touched
    if (touched) {
      validateField(newValue);
    }

    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e) => {
    setTouched(true);
    validateField(e.target.value);

    if (onBlur) {
      onBlur(e);
    }
  };

  const validateField = (value) => {
    let error = "";

    // Required validation
    if (required && !value?.trim()) {
      error = `${label} is required`;
    }
    // Min length validation
    else if (minLength && value?.length < minLength) {
      error = `${label} must be at least ${minLength} characters`;
    }
    // Max length validation
    else if (maxLength && value?.length > maxLength) {
      error = `${label} must be at most ${maxLength} characters`;
    }

    setInternalError(error);
    return error;
  };

  const getInputClasses = () => {
    let baseClasses = `
      w-full 
      px-4 
      py-2.5 
      text-slate-700 
      bg-white 
      border 
      rounded-lg 
      transition-all 
      duration-200 
      ease-in-out
      focus:outline-none 
      focus:ring-2 
      focus:ring-offset-0
      placeholder:text-slate-400 
      placeholder:text-sm
      disabled:bg-slate-50 
      disabled:text-slate-500 
      disabled:cursor-not-allowed
      read-only:bg-slate-50 
      read-only:cursor-default
    `;

    // Border and ring classes based on state
    if (displayError) {
      baseClasses += `
        border-red-500 
        focus:border-red-500 
        focus:ring-red-500/20 
        hover:border-red-400
        animate-shake
      `;
    } else if (success && !displayError) {
      baseClasses += `
        border-emerald-500 
        focus:border-emerald-500 
        focus:ring-emerald-500/20 
        hover:border-emerald-400
      `;
    } else {
      baseClasses += `
        border-slate-300 
        focus:border-blue-500 
        focus:ring-blue-500/20 
        hover:border-slate-400
      `;
    }

    // Icon padding
    if (Icon) {
      baseClasses += iconPosition === "left" ? " pl-10" : " pr-10";
    }

    return `${baseClasses} ${inputClassName}`;
  };

  return (
    <div ref={containerRef} className={`w-full ${containerClassName}`}>
      {/* Label */}
      <label
        className={`
          block 
          text-sm 
          font-semibold 
          text-slate-700 
          mb-1.5
          ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ""}
          ${labelClassName}
        `}
      >
        {label}
      </label>

      {/* Input wrapper */}
      <div className="relative">
        {/* Left Icon */}
        {Icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon
              className={`w-5 h-5 ${displayError ? "text-red-400" : success ? "text-emerald-400" : "text-slate-400"}`}
            />
          </div>
        )}

        {/* Input */}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          className={getInputClasses()}
          aria-invalid={!!displayError}
          aria-describedby={displayError ? `${label}-error` : undefined}
          {...props}
        />

        {/* Right Icon */}
        {Icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon
              className={`w-5 h-5 ${displayError ? "text-red-400" : success ? "text-emerald-400" : "text-slate-400"}`}
            />
          </div>
        )}

        {/* Character Count */}
        {showCharCount && maxLength && (
          <div
            className={`
            absolute 
            inset-y-0 
            right-0 
            pr-3 
            flex 
            items-center 
            text-xs 
            font-medium
            ${charCount > maxLength ? "text-red-500" : "text-slate-400"}
          `}
          >
            {charCount}/{maxLength}
          </div>
        )}
      </div>

      {/* Error Message */}
      {displayError && (
        <div
          id={`${label}-error`}
          className={`
            mt-1.5 
            text-sm 
            text-red-500 
            flex 
            items-start 
            gap-1.5
            animate-slideDown
            ${errorClassName}
          `}
          role="alert"
        >
          <svg
            className="w-4 h-4 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{displayError}</span>
        </div>
      )}

      {/* Success Message */}
      {success && !displayError && successMessage && (
        <div className="mt-1.5 text-sm text-emerald-500 flex items-start gap-1.5">
          <svg
            className="w-4 h-4 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {/* Helper Text */}
      {helperText && !displayError && (
        <div className="mt-1.5 text-xs text-slate-500">{helperText}</div>
      )}
    </div>
  );
};

export default TextInput;
