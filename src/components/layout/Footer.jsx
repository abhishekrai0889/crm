import React from "react";
import { Link } from "react-router-dom";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f8fafc]">

      {/* Divider */}

      <div className="h-px bg-slate-200"></div>

      <div className="max-w-7xl mx-auto px-6 py-[17px]">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

          {/* Left */}

          <div className="flex items-center gap-3">

            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-md">
              E
            </div>

            <div>

              <h4 className="text-[15px] font-semibold text-slate-800">
                ENTHIS
              </h4>

              <p className="text-xs text-slate-500">
                © {currentYear} All rights reserved.
              </p>

            </div>

          </div>

          {/* Center */}

          <div className="flex items-center gap-8">

            <Link
              to="/privacy-policy"
              className="text-sm text-slate-500 hover:text-blue-600 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-of-service"
              className="text-sm text-slate-500 hover:text-blue-600 transition"
            >
              Terms of Service
            </Link>

            <Link
              to="/contact"
              className="text-sm text-slate-500 hover:text-blue-600 transition"
            >
              Support
            </Link>

          </div>

          {/* Right */}

          <div className="flex items-center gap-2 text-sm text-slate-500">

            Made with

            <FavoriteRoundedIcon
              sx={{
                fontSize: 16,
                color: "#ef4444",
              }}
              className="animate-pulse"
            />

            <span className="font-semibold text-slate-700">
              ENTHIS
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;