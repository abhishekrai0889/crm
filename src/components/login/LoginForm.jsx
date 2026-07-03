import TextInput from "../../ui/TextInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
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
            Sign in
          </h1>

          <p className="mt-2 text-[15px] text-[var(--ink-500)]">
            Welcome back — sign in to your workspace.
          </p>

          {/* Form */}
          <form className="mt-8 space-y-6">
            {/* Email */}

            <TextInput
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
            />

            {/* Password */}

            <div className="relative">
              <TextInput
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
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[31px] flex h-10 w-10 items-center justify-center rounded-lg text-[var(--ink-500)] hover:bg-slate-100"
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon fontSize="small" />
                ) : (
                  <VisibilityOutlinedIcon fontSize="small" />
                )}
              </button>
            </div>

            {/* Remember */}

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[var(--ink-700)]">
                <input
                  type="checkbox"
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

            {/* Submit */}

            <button
              type="submit"
              className="flex h-[56px] w-full cursor-pointer items-center justify-center rounded-xl bg-[var(--blue-600)] text-[16px] font-semibold text-white transition-all duration-300 hover:bg-[var(--blue-700)]"
            >
              Sign in
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

          {/* Social */}

          <div className="flex gap-4">
            {/* Google */}

            <button
              type="button"
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
