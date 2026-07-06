import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 px-4 md:px-6 py-3">
      {/* <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-slate-500">
        <p>© {currentYear} ENTHIS. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link
            to="/privacy"
            className="hover:text-slate-700 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-slate-700 transition-colors">
            Terms of Service
          </Link>
          <Link
            to="/contact"
            className="hover:text-slate-700 transition-colors"
          >
            Support
          </Link>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
