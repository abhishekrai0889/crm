// pages/ComingSoon.jsx
// Placeholder for dashboard sections that are on the roadmap but not
// built yet. Catches every unmatched /user/dashboard/* route so sidebar
// items always land on a real page inside the layout.
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ConstructionIcon from "@mui/icons-material/Construction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ComingSoon = () => {
  const location = useLocation();

  // Derive a readable title from the URL, e.g.
  // /user/dashboard/partners/all -> "Partners / All"
  const segments = location.pathname
    .replace("/user/dashboard/", "")
    .split("/")
    .filter(Boolean)
    .map((s) =>
      s
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    );
  const title = segments.join(" / ") || "This section";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-slate-200 rounded-2xl shadow-md px-6 py-16 text-center"
    >
      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mb-5">
        <ConstructionIcon className="text-blue-600" sx={{ fontSize: 30 }} />
      </div>
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
        This screen is on the roadmap and hasn't been built yet. The menu
        entry is here so the navigation structure is complete.
      </p>
      <Link
        to="/user/dashboard"
        className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 transition-all duration-200"
      >
        <ArrowBackIcon sx={{ fontSize: 17 }} />
        Back to Dashboard
      </Link>
    </motion.div>
  );
};

export default ComingSoon;
