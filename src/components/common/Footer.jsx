import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0F1D3A] pt-20 pb-8 text-[#B9C4D6]">
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Top */}
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 flex items-center gap-3">
              <svg
                className="h-10 w-10"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="bgf" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#2E6BEF" />
                    <stop offset="100%" stopColor="#10399A" />
                  </linearGradient>
                </defs>

                <rect width="40" height="40" rx="10" fill="url(#bgf)" />

                <path
                  d="M12 11h16v4H17v3h9v4h-9v3h11v4H12V11z"
                  fill="#fff"
                />
              </svg>

              <h2 className="text-2xl font-bold text-white">
                ENTH<span className="text-blue-400">IS</span>
              </h2>
            </Link>

            <p className="max-w-[280px] text-sm leading-7">
              The multi-tenant CRM that unifies sales, marketing, support and
              projects for growing businesses.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              <Link
                to="/"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600"
              >
                <LinkedInIcon sx={{ fontSize: 20, color: "#fff" }} />
              </Link>

              <Link
                to="/"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600"
              >
                <XIcon sx={{ fontSize: 20, color: "#fff" }} />
              </Link>

              <Link
                to="/"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600"
              >
                <YouTubeIcon sx={{ fontSize: 20, color: "#fff" }} />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Product
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/sales-crm" className="transition hover:text-white">
                  Sales CRM
                </Link>
              </li>

              <li>
                <Link
                  to="/marketing-automation"
                  className="transition hover:text-white"
                >
                  Marketing Automation
                </Link>
              </li>

              <li>
                <Link
                  to="/customer-support"
                  className="transition hover:text-white"
                >
                  Customer Support
                </Link>
              </li>

              <li>
                <Link
                  to="/projects"
                  className="transition hover:text-white"
                >
                  Projects & Tasks
                </Link>
              </li>

              <li>
                <Link to="/pricing" className="transition hover:text-white">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Company
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="transition hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="transition hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Resources
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/system-status"
                  className="transition hover:text-white"
                >
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Get Started
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/signup" className="transition hover:text-white">
                  Create Account
                </Link>
              </li>

              <li>
                <Link to="/login" className="transition hover:text-white">
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  to="/forgot-password"
                  className="transition hover:text-white"
                >
                  Reset Password
                </Link>
              </li>

              <li>
                <Link to="/demo" className="transition hover:text-white">
                  App Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 text-sm text-slate-400 md:flex-row">
          <span>
            © 2026 ENTHIS by Engenia Technologies. All rights reserved.
          </span>

          <div className="flex flex-wrap gap-5">
            <Link to="/privacy-policy" className="transition hover:text-white">
              Privacy Policy
            </Link>

            <Link to="/terms-of-service" className="transition hover:text-white">
              Terms of Service
            </Link>

            <Link to="/gdpr-dpa" className="transition hover:text-white">
              GDPR DPA
            </Link>

            <Link to="/cookies" className="transition hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;