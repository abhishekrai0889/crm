import React, { useState, useEffect, useRef } from "react";

const Selectbox = ({
  label,
  required = false,
  error: externalError,
  placeholder = "Select an option",
  value,
  onChange,
  onBlur,
  options = [],
  className = "",
  labelClassName = "",
  selectClassName = "",
  errorClassName = "",
  containerClassName = "",
  disabled = false,
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
  const selectRef = useRef(null);
  const containerRef = useRef(null);

  // Use external error if provided, otherwise internal
  const displayError = externalError || internalError;

  // Scroll to error when error appears
  useEffect(() => {
    if (displayError && scrollToError && containerRef.current) {
      setTimeout(() => {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        setTimeout(() => {
          if (selectRef.current) {
            selectRef.current.focus();
          }
        }, 300);
      }, 100);
    }
  }, [displayError, scrollToError]);

  const handleChange = (e) => {
    const newValue = e.target.value;

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
    if (required && !value) {
      error = `${label} is required`;
    }

    setInternalError(error);
    return error;
  };

  const getSelectClasses = () => {
    let baseClasses =
      "w-full px-4 py-2.5 pr-10 text-slate-700 bg-white border rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 appearance-none cursor-pointer disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed";

    // Border and ring classes based on state
    if (displayError) {
      baseClasses +=
        " border-red-500 focus:border-red-500 focus:ring-red-500/20 hover:border-red-400 animate-shake";
    } else if (success && !displayError) {
      baseClasses +=
        " border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20 hover:border-emerald-400";
    } else {
      baseClasses +=
        " border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-400";
    }

    // Icon padding
    if (Icon) {
      baseClasses += iconPosition === "left" ? " pl-10" : " pr-10";
    }

    return `${baseClasses} ${selectClassName}`;
  };

  return (
    <div ref={containerRef} className={`w-full ${containerClassName}`}>
      {/* Label */}
      <label
        className={`block text-sm font-semibold text-slate-700 mb-1.5 ${
          required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ""
        } ${labelClassName}`}
      >
        {label}
      </label>

      {/* Select wrapper */}
      <div className="relative">
        {/* Left Icon */}
        {Icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <Icon
              className={`w-5 h-5 ${
                displayError
                  ? "text-red-400"
                  : success
                    ? "text-emerald-400"
                    : "text-slate-400"
              }`}
            />
          </div>
        )}

        {/* Select */}
        <select
          ref={selectRef}
          value={value || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          autoFocus={autoFocus}
          className={getSelectClasses()}
          aria-invalid={!!displayError}
          aria-describedby={displayError ? `${label}-error` : undefined}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              displayError
                ? "text-red-400"
                : success
                  ? "text-emerald-400"
                  : "text-slate-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Right Icon (if position is right) */}
        {Icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-8 pr-3 flex items-center pointer-events-none z-10">
            <Icon
              className={`w-5 h-5 ${
                displayError
                  ? "text-red-400"
                  : success
                    ? "text-emerald-400"
                    : "text-slate-400"
              }`}
            />
          </div>
        )}
      </div>

      {/* Error Message */}
      {displayError && (
        <div
          id={`${label}-error`}
          className={`mt-1.5 text-sm text-red-500 flex items-start gap-1.5 animate-slideDown ${errorClassName}`}
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

export default Selectbox;
