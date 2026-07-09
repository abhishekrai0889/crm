import { FC, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import PrimaryButton from "./PrimaryButton";

interface NavLinkItem {
  name: string;
  path: string;
}

const navLinks: NavLinkItem[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Header: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <svg
            className="h-9 w-9"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="bg1" x1="0" y1="0" x2="40" y2="40">
                <stop offset="0%" stopColor="#2E6BEF" />
                <stop offset="100%" stopColor="#10399A" />
              </linearGradient>
            </defs>

            <rect width="40" height="40" rx="10" fill="url(#bg1)" />

            <path
              d="M12 11h16v4H17v3h9v4h-9v3h11v4H12V11z"
              fill="white"
            />
          </svg>

          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            ENTH<span className="text-blue-600">IS</span>
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-2">
            {navLinks.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                      isActive
                        ? "text-[var(--blue-600)]"
                        : "text-slate-600"
                    } hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)]`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/signin"
              className="rounded-lg px-4 py-2 font-medium text-slate-700 transition-all duration-200 hover:text-[#1A56DB]"
            >
              Sign In
            </Link>

            <PrimaryButton to="/signup">
              Start Free Trial
            </PrimaryButton>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
        >
          {open ? (
            <CloseIcon sx={{ fontSize: 28 }} />
          ) : (
            <MenuIcon sx={{ fontSize: 28 }} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white shadow-lg lg:hidden">
          <div className="space-y-2 p-5">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="block rounded-lg p-3 font-medium transition hover:bg-blue-50 hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-4 space-y-3">
              <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="block rounded-lg border border-slate-300 py-3 text-center font-medium transition hover:border-blue-600 hover:text-blue-600"
              >
                Sign In
              </Link>

              <PrimaryButton
                to="/signup"
                onClick={() => setOpen(false)}
                className="w-full"
              >
                Start Free Trial
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;