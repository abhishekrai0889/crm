import TextInput from "../../ui/TextInput";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "john@mail.com",
    password: "changeme",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/user/dashboard", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value?.trim()) {
          error = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
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

    const emailError = validateField("email", formData.email);
    if (emailError) {
      errors.email = emailError;
      isValid = false;
    }

    const passwordError = validateField("password", formData.password);
    if (passwordError) {
      errors.password = passwordError;
      isValid = false;
    }

    setErrors(errors);
    return { isValid, errors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const { isValid, errors: validationErrors } = validateAllFields();

    if (!isValid) {
      setIsSubmitting(false);
      const firstErrorField = Object.keys(validationErrors)[0];
      const refMap = {
        email: emailRef,
        password: passwordRef,
      };

      const targetRef = refMap[firstErrorField];
      if (targetRef?.current) {
        targetRef.current.focus();
        if (targetRef.current.validate) {
          targetRef.current.validate();
        }
      }

      const errorElement = document.querySelector(`[id$="-error"]`);
      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    try {
      const result = await login(formData.email, formData.password);

      if (!result.success) {
        setSubmitError(result.error || "Invalid email or password");
        if (emailRef.current) {
          emailRef.current.focus();
        }
        setIsSubmitting(false);
        return;
      }

      // Login successful - useEffect will handle redirect
      console.log("Login successful!");
    } catch (error) {
      setSubmitError(error.message || "Failed to sign in. Please try again.");
      if (emailRef.current) {
        emailRef.current.focus();
      }
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Signing in with ${provider}`);
    alert(`Signing in with ${provider}...`);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

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
            Sign in
          </h1>
          <p className="mt-2 text-[15px] text-[var(--ink-500)]">
            Welcome back — sign in to your workspace.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email */}
            <TextInput
              ref={emailRef}
              label="Email address"
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
              autoFocus={false}
            />

            {/* Password */}
            <div className="relative">
              <TextInput
                ref={passwordRef}
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
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
                className="absolute right-3 top-[31px] flex h-10 w-10 items-center justify-center rounded-lg text-[var(--ink-500)] hover:bg-slate-100 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon fontSize="small" />
                ) : (
                  <VisibilityOutlinedIcon fontSize="small" />
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[var(--ink-700)]">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[var(--blue-600)]"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-[14px] font-semibold text-[var(--blue-600)] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

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
                flex h-[56px] w-full cursor-pointer items-center justify-center 
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
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--line)]"></div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ink-300)]">
              OR SIGN UP WITH
            </span>
            <div className="h-px flex-1 bg-[var(--line)]"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleSocialLogin("Google")}
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

            {/* Microsoft */}
            <button
              type="button"
              onClick={() => handleSocialLogin("Microsoft")}
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
          No account yet?{" "}
          <Link
            to="/signup"
            className="font-semibold text-[var(--blue-600)] hover:underline"
          >
            Start your free trial
          </Link>
        </p>

        <p className="mt-4 text-center text-[13px] leading-6 text-[var(--ink-300)]">
          Protected by 2FA and rate limiting. By signing in you agree to our{" "}
          <Link to="/terms" className="underline">
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </main>
  );
};

export default LoginForm;
