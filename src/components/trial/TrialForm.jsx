import TextInput from "../../ui/TextInput";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const TrialForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "Weak",
    color: "red",
  });

  const navigate = useNavigate();

  // Create refs for all form fields
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const companyRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear submit error on any change
    if (submitError) {
      setSubmitError("");
    }

    // Update password strength when password changes
    if (name === "password") {
      updatePasswordStrength(value);
    }

    // Validate confirm password when either password or confirmPassword changes
    if (name === "password" || name === "confirmPassword") {
      if (formData.confirmPassword || value) {
        const confirmValue =
          name === "password" ? formData.confirmPassword : value;
        if (confirmValue && formData.password) {
          validateField("confirmPassword", confirmValue);
        }
      }
    }
  };

  const updatePasswordStrength = (password) => {
    let score = 0;
    let label = "Weak";
    let color = "red";

    if (!password) {
      setPasswordStrength({ score: 0, label: "Weak", color: "red" });
      return;
    }

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Complexity checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    // Determine strength
    if (score <= 2) {
      label = "Weak";
      color = "red";
    } else if (score <= 4) {
      label = "Fair";
      color = "orange";
    } else if (score <= 6) {
      label = "Good";
      color = "blue";
    } else {
      label = "Strong";
      color = "green";
    }

    setPasswordStrength({ score, label, color });
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value?.trim()) {
          error = "Full name is required";
        } else if (value.trim().length < 2) {
          error = "Full name must be at least 2 characters";
        }
        break;

      case "email":
        if (!value?.trim()) {
          error = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "company":
        if (!value?.trim()) {
          error = "Company name is required";
        } else if (value.trim().length < 2) {
          error = "Company name must be at least 2 characters";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 10) {
          error = "Password must be at least 10 characters";
        } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
          error = "Password must contain uppercase and lowercase letters";
        } else if (!/[0-9]/.test(value)) {
          error = "Password must contain at least one number";
        } else if (!/[^a-zA-Z0-9]/.test(value)) {
          error = "Password must contain at least one special character";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateAllFields = () => {
    const errors = {};
    let isValid = true;

    // Validate all required fields
    const fieldsToValidate = {
      fullName: formData.fullName,
      email: formData.email,
      company: formData.company,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    Object.entries(fieldsToValidate).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        errors[name] = error;
        isValid = false;
      }
    });

    // Validate checkbox
    if (!formData.agree) {
      errors.agree =
        "You must agree to the Terms of Service and Privacy Policy";
      isValid = false;
    }

    setErrors(errors);
    return { isValid, errors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    // Validate all fields
    const { isValid, errors: validationErrors } = validateAllFields();

    if (!isValid) {
      setIsSubmitting(false);

      // Focus on the first field with an error
      const firstErrorField = Object.keys(validationErrors)[0];
      const refMap = {
        fullName: fullNameRef,
        email: emailRef,
        company: companyRef,
        password: passwordRef,
        confirmPassword: confirmPasswordRef,
      };

      const targetRef = refMap[firstErrorField];
      if (targetRef?.current) {
        // Focus on the field and trigger validation
        targetRef.current.focus();
        if (targetRef.current.validate) {
          targetRef.current.validate();
        }
      }

      // Scroll to the first error
      const errorElement = document.querySelector(`[id$="-error"]`);
      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    // If all validations pass, submit the form
    try {
      console.log("Form submitted:", {
        fullName: formData.fullName,
        email: formData.email,
        company: formData.company,
        password: formData.password,
        agree: formData.agree,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success - redirect to dashboard or verification page
      console.log("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      setSubmitError(
        error.message || "Failed to create account. Please try again.",
      );

      // Focus on email field for correction
      if (emailRef.current) {
        emailRef.current.focus();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signing up with ${provider}`);
    alert(`Signing up with ${provider}...`);
  };

  // Get password strength bars
  const getStrengthBars = () => {
    const totalBars = 4;
    const filledBars = Math.min(
      Math.ceil(passwordStrength.score / 2),
      totalBars,
    );

    return Array.from({ length: totalBars }, (_, index) => ({
      filled: index < filledBars,
      color: passwordStrength.color,
    }));
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-10">
      <div className="w-full max-w-[600px]">
        {/* Mobile Logo */}
        <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2E6BEF,#10399A)]">
            <span className="text-xl font-bold text-white">E</span>
          </div>
          <h2 className="text-[32px] font-extrabold tracking-[-0.03em] text-[var(--ink-900)]">
            ENTH
            <span className="text-[var(--blue-600)]">IS</span>
          </h2>
        </div>

        {/* Card */}
        <div className="rounded-[24px] border border-[var(--line)] bg-white p-9 shadow-[0_12px_45px_rgba(16,57,154,.08)]">
          <h1 className="text-[34px] font-bold text-[var(--ink-900)]">
            Create your account
          </h1>
          <p className="mt-2 text-[15px] text-[var(--ink-500)]">
            Start your 14-day free trial — no credit card needed.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Full Name + Email */}
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput
                ref={fullNameRef}
                label="Full name"
                name="fullName"
                placeholder="Jane Cooper"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                required
                icon={PersonOutlineOutlinedIcon}
                iconPosition="left"
                validateOnFocus={true}
                scrollToError={true}
                autoFocus={false}
              />

              <TextInput
                ref={emailRef}
                label="Work email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                icon={EmailOutlinedIcon}
                iconPosition="left"
                validateOnFocus={true}
                scrollToError={true}
              />
            </div>

            {/* Company */}
            <div>
              <TextInput
                ref={companyRef}
                label="Company / Workspace name"
                name="company"
                placeholder="Acme Inc."
                value={formData.company}
                onChange={handleChange}
                error={errors.company}
                required
                icon={BusinessOutlinedIcon}
                iconPosition="left"
                validateOnFocus={true}
                scrollToError={true}
              />

              <p className="mt-2 text-sm text-[var(--ink-500)]">
                Your workspace URL:
                <span className="font-semibold text-[var(--ink-900)]">
                  {" "}
                  {formData.company
                    ? formData.company.toLowerCase().replace(/\s+/g, "-")
                    : "your-workspace"}
                </span>
                .enthis.com
              </p>
            </div>

            {/* Password Row */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* Password */}
              <div className="relative">
                <TextInput
                  ref={passwordRef}
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 10 characters"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                  icon={LockOutlinedIcon}
                  iconPosition="left"
                  validateOnFocus={true}
                  scrollToError={true}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[31px] flex h-10 w-10 items-center justify-center rounded-lg text-[var(--ink-500)] transition hover:bg-slate-100"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOutlinedIcon fontSize="small" />
                  )}
                </button>

                {/* Password Strength */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex gap-2">
                      {getStrengthBars().map((bar, index) => (
                        <div
                          key={index}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            bar.filled ? `bg-${bar.color}-500` : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className={`mt-2 text-xs text-${passwordStrength.color}-600`}
                    >
                      {passwordStrength.label} password
                      {passwordStrength.score > 0 &&
                        ` (${passwordStrength.score}/8)`}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <TextInput
                  ref={confirmPasswordRef}
                  label="Confirm password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                  icon={LockOutlinedIcon}
                  iconPosition="left"
                  validateOnFocus={true}
                  scrollToError={true}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[31px] flex h-10 w-10 items-center justify-center rounded-lg text-[var(--ink-500)] transition hover:bg-slate-100"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <VisibilityOffOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOutlinedIcon fontSize="small" />
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <label className="flex cursor-pointer items-start gap-3 text-[15px] text-[var(--ink-700)]">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1 h-4 w-4 accent-[var(--blue-600)]"
              />
              <span>
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="font-semibold text-[var(--blue-600)] hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="font-semibold text-[var(--blue-600)] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {/* Agreement Error */}
            {errors.agree && (
              <div className="text-sm text-red-500 flex items-start gap-1.5">
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
                <span>{errors.agree}</span>
              </div>
            )}

            {/* Submit Error Message */}
            {submitError && (
              <div className="text-sm text-red-500 flex items-start gap-1.5 p-3 bg-red-50 rounded-lg border border-red-200">
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
                <span>{submitError}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                flex h-[56px] cursor-pointer w-full items-center justify-center 
                rounded-xl bg-[var(--blue-600)] text-[16px] font-semibold text-white 
                transition-all duration-300 hover:bg-[var(--blue-700)]
                ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </>
              ) : (
                "Create my account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--line)]"></div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ink-300)]">
              or sign up with
            </span>
            <div className="h-px flex-1 bg-[var(--line)]"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleSocialSignup("Google")}
              className="flex h-[54px] flex-1 cursor-pointer items-center justify-center gap-3 rounded-xl border border-[var(--line)] bg-white px-4 text-[15px] font-semibold text-[var(--ink-700)] transition-all duration-300 hover:border-[var(--blue-400)] hover:bg-slate-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1a6.6 6.6 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 002.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignup("Microsoft")}
              className="flex h-[54px] flex-1 cursor-pointer items-center justify-center gap-3 rounded-xl border border-[var(--line)] bg-white px-4 text-[15px] font-semibold text-[var(--ink-700)] transition-all duration-300 hover:border-[var(--blue-400)] hover:bg-slate-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
                <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
                <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
                <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
              </svg>
              Continue with Microsoft
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-[15px] text-[var(--ink-500)]">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-[var(--blue-600)] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default TrialForm;
