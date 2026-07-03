import { useState } from "react";
import { Link } from "react-router-dom";

import TextInput from "../../ui/TextInput";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const ForgotForm = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(formData);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-10">
      <div className="w-full max-w-[520px]">

        {/* Card */}

        <div className="rounded-[24px] border border-[var(--line)] bg-white p-9 shadow-[0_12px_45px_rgba(16,57,154,.08)]">

          <h1 className="text-[34px] font-bold text-[var(--ink-900)]">
            Forgot your password?
          </h1>

          <p className="mt-2 text-[15px] text-[var(--ink-500)]">
            Enter your email and we'll send you a secure password reset link.
          </p>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
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
            />

         <button
  type="submit"
  className="flex h-[56px] w-full cursor-pointer items-center justify-center rounded-xl bg-[var(--blue-600)] text-[16px] font-semibold text-white transition-all duration-300 hover:bg-[var(--blue-700)]"
>
  Send reset link
</button>
          </form>

        </div>

        {/* Back */}

        <div className="mt-8 text-center">
          <Link
            to="/signin"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--blue-600)] transition hover:underline"
          >
            <ArrowBackRoundedIcon sx={{ fontSize: 18 }} />
            Back to sign in
          </Link>
        </div>

        {/* Footer */}

        <p className="mt-8 text-center text-[13px] leading-6 text-[var(--ink-300)]">
          Didn't get an email? Check your spam folder or wait a minute
          before requesting another reset link. Requests are rate-limited
          for your security.
        </p>

      </div>
    </main>
  );
};

export default ForgotForm;