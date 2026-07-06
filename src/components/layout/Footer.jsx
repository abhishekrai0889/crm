import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Sales CRM", href: "#" },
        { label: "Marketing Automation", href: "#" },
        { label: "Customer Support", href: "#" },
        { label: "Projects & Tasks", href: "#" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "System Status", href: "#" },
        { label: "Sign In", href: "/signin" },
        { label: "Reset Password", href: "/forgot-password" },
        { label: "App Demo", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
     

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} ENTHIS. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/privacy"
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/support"
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
            >
              Support
            </Link>
            <span className="text-sm text-slate-400 flex items-center gap-1">
              Made with <FavoriteIcon className="w-4 h-4 text-red-500" /> by
              ENTHIS
            </span>
          </div>
        </div>
      </div> 
    </footer>
  );
};

export default Footer;
