import React from "react";
import { motion } from "framer-motion";

const PageLayout = ({
  title,
  subtitle,
  children,
  actions = [],
  className = "",
  containerClassName = "",
  headerClassName = "",
  animation = true,
}) => {
  return (
    <motion.div
      initial={animation ? { opacity: 0 } : {}}
      animate={animation ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/10 to-indigo-50/10 p-4 md:p-6 ${containerClassName}`}
    >
      <div className={`max-w-7xl mx-auto ${className}`}>
        {/* Header */}
        <div className={`mb-6 ${headerClassName}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              {title && (
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
              )}
            </div>
            {actions.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium
                      transition-all duration-200
                      flex items-center gap-1.5
                      ${
                        action.variant === "primary"
                          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200"
                          : action.variant === "success"
                            ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200"
                            : action.variant === "danger"
                              ? "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-200"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }
                    `}
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <motion.div
          initial={animation ? { y: 20, opacity: 0 } : {}}
          animate={animation ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PageLayout;
