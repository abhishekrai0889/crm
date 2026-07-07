import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Premium SVG Icons
const Icons = {
  success: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="12"
        fill="url(#successGrad)"
        className="opacity-20"
      />
      <path
        d="M7 13l3 3 7-7"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
    </svg>
  ),
  error: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="12"
        fill="url(#errorGrad)"
        className="opacity-20"
      />
      <path
        d="M8 8l8 8M16 8l-8 8"
        stroke="#ef4444"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="errorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#f87171" />
        </linearGradient>
      </defs>
    </svg>
  ),
  warning: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="12"
        fill="url(#warningGrad)"
        className="opacity-20"
      />
      <path
        d="M12 8v5M12 16h.01"
        stroke="#f59e0b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="warningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
    </svg>
  ),
  info: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="12"
        fill="url(#infoGrad)"
        className="opacity-20"
      />
      <path
        d="M12 12v4M12 8h.01"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="infoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
    </svg>
  ),
  close: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M6 18L18 6M6 6l12 12" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
};

const Toast = ({ toast, onRemove }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (toast.duration / 100);
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [toast.duration]);

  const getToastConfig = (type) => {
    const configs = {
      success: {
        bg: "bg-gradient-to-br from-emerald-50/90 to-white",
        border: "border-emerald-200",
        text: "text-emerald-900",
        subtext: "text-emerald-600",
        icon: Icons.success,
        progressBg: "bg-gradient-to-r from-emerald-400 to-emerald-500",
        shadow: "shadow-emerald-100/50",
        ring: "ring-emerald-400/20",
        glow: "shadow-emerald-500/20",
      },
      error: {
        bg: "bg-gradient-to-br from-red-50/90 to-white",
        border: "border-red-200",
        text: "text-red-900",
        subtext: "text-red-600",
        icon: Icons.error,
        progressBg: "bg-gradient-to-r from-red-400 to-red-500",
        shadow: "shadow-red-100/50",
        ring: "ring-red-400/20",
        glow: "shadow-red-500/20",
      },
      warning: {
        bg: "bg-gradient-to-br from-amber-50/90 to-white",
        border: "border-amber-200",
        text: "text-amber-900",
        subtext: "text-amber-600",
        icon: Icons.warning,
        progressBg: "bg-gradient-to-r from-amber-400 to-amber-500",
        shadow: "shadow-amber-100/50",
        ring: "ring-amber-400/20",
        glow: "shadow-amber-500/20",
      },
      info: {
        bg: "bg-gradient-to-br from-blue-50/90 to-white",
        border: "border-blue-200",
        text: "text-blue-900",
        subtext: "text-blue-600",
        icon: Icons.info,
        progressBg: "bg-gradient-to-r from-blue-400 to-blue-500",
        shadow: "shadow-blue-100/50",
        ring: "ring-blue-400/20",
        glow: "shadow-blue-500/20",
      },
    };
    return configs[type] || configs.info;
  };

  const config = getToastConfig(toast.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: -40, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.85 }}
      transition={{
        duration: 0.5,
        type: "spring",
        damping: 22,
        stiffness: 200,
      }}
      className={`
        relative w-full max-w-sm overflow-hidden rounded-2xl 
        border ${config.border} ${config.shadow}
        shadow-2xl ${config.glow}
        backdrop-blur-xl backdrop-filter
        ring-1 ${config.ring}
        group
      `}
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 ${config.bg} opacity-90`} />

      <div className="relative p-5">
        <div className="flex items-start gap-4">
          {/* Icon with floating animation */}
          <motion.div
            className="flex-shrink-0"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
              delay: 0.08,
            }}
          >
            <div className="relative">
              <div
                className={`absolute inset-0 blur-xl ${config.progressBg} opacity-30 rounded-full`}
              />
              {config.icon}
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0 pt-0.5">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
            >
              <p className={`text-sm font-bold leading-relaxed ${config.text}`}>
                {toast.title || ""}
              </p>
              <p className={`text-sm ${config.subtext} mt-0.5`}>
                {toast.message}
              </p>
              {toast.action && (
                <button
                  onClick={toast.action.onClick}
                  className={`mt-2 text-xs font-semibold ${config.subtext} hover:underline transition-all`}
                >
                  {toast.action.label}
                </button>
              )}
            </motion.div>
          </div>

          {/* Close Button with glow */}
          <motion.button
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            onClick={() => onRemove(toast.id)}
            className="flex-shrink-0 p-1.5 rounded-full hover:bg-black/5 transition-all duration-200 text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100"
          >
            {Icons.close}
          </motion.button>
        </div>

        {/* Progress Bar with animated gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5 rounded-b-2xl overflow-hidden">
          <motion.div
            className={`h-full ${config.progressBg} rounded-b-2xl relative`}
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Toast Container with modern design
export const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-8 right-8 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className="pointer-events-auto"
            layout
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Toast toast={toast} onRemove={onRemove} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
