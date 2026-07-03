import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-10">
      <div className="w-full max-w-[450px]">

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

            <div>
              <label className="mb-2 block text-[14px] font-semibold text-[var(--ink-900)]">
                Email address
              </label>

              <input
                type="email"
                placeholder="you@company.com"
                className="h-[54px] w-full rounded-xl border border-[var(--line)] px-4 text-[15px] outline-none transition-all duration-200 focus:border-[var(--blue-600)] focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 block text-[14px] font-semibold text-[var(--ink-900)]">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  className="h-[54px] w-full rounded-xl border border-[var(--line)] px-4 pr-14 text-[15px] outline-none transition-all duration-200 focus:border-[var(--blue-600)] focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-[var(--ink-500)] transition hover:bg-slate-100"
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </button>

              </div>
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
              or continue with
            </span>

            <div className="h-px flex-1 bg-[var(--line)]"></div>
          </div>

          {/* Social */}

          <div className="space-y-3">

            <button
              className="flex h-[54px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[var(--line)] text-[15px] font-semibold text-[var(--ink-700)] transition hover:border-[var(--blue-400)] hover:bg-slate-50"
            >
              <GoogleIcon sx={{ color: "#EA4335" }} />

              Continue with Google
            </button>

            <button
              className="flex h-[54px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[var(--line)] text-[15px] font-semibold text-[var(--ink-700)] transition hover:border-[var(--blue-400)] hover:bg-slate-50"
            >
              <MicrosoftIcon sx={{ color: "#0078D4" }} />

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
          <Link
            to="/terms"
            className="underline"
          >
            Terms of Service
          </Link>
          .
        </p>

      </div>
    </main>
  );
};

export default LoginForm;