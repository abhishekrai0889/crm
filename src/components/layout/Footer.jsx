import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";

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
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                E
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                ENTHIS
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              The multi-tenant CRM that unifies sales, marketing, support and
              projects for growing businesses.
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-500 hover:text-blue-600 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} ENTHIS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
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
              Made with <HeartIcon className="w-4 h-4 text-red-500" /> by ENTHIS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
