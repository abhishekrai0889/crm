import React, { useEffect, useRef } from "react";
import { Close, Warning, CheckCircle, Info, Error } from "@mui/icons-material";

const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  size = "md",
  variant = "default", // default, success, error, warning, info
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showHeader = true,
  showFooter = true,
  footerContent,
  actions,
  className = "",
  overlayClassName = "",
  contentClassName = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  animation = "scale", // scale, slide, fade, none
  position = "center", // center, top
  padding = "default", // default, none, small, large
  zIndex = 50,
  ...props
}) => {
  const modalRef = useRef(null);

  // Size configurations
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    full: "max-w-full mx-4",
  };

  // Padding configurations
  const paddingClasses = {
    none: "p-0",
    small: "p-3",
    default: "p-6",
    large: "p-8",
  };

  // Position configurations
  const positionClasses = {
    center: "items-center",
    top: "items-start pt-20",
  };

  // Animation configurations
  const animationClasses = {
    scale: {
      enter:
        "transition-all duration-300 ease-out transform scale-95 opacity-0",
      enterActive: "scale-100 opacity-100",
      exit: "transition-all duration-200 ease-in transform scale-100 opacity-100",
      exitActive: "scale-95 opacity-0",
    },
    slide: {
      enter:
        "transition-all duration-300 ease-out transform translate-y-8 opacity-0",
      enterActive: "translate-y-0 opacity-100",
      exit: "transition-all duration-200 ease-in transform translate-y-0 opacity-100",
      exitActive: "translate-y-8 opacity-0",
    },
    fade: {
      enter: "transition-opacity duration-300 ease-out opacity-0",
      enterActive: "opacity-100",
      exit: "transition-opacity duration-200 ease-in opacity-100",
      exitActive: "opacity-0",
    },
    none: {
      enter: "",
      enterActive: "",
      exit: "",
      exitActive: "",
    },
  };

  // Variant configurations
  const variantClasses = {
    default: {
      header: "text-slate-800 border-slate-200",
      icon: "text-slate-600",
      iconBg: "bg-slate-100",
    },
    success: {
      header: "text-emerald-800 border-emerald-200",
      icon: "text-emerald-600",
      iconBg: "bg-emerald-100",
    },
    error: {
      header: "text-red-800 border-red-200",
      icon: "text-red-600",
      iconBg: "bg-red-100",
    },
    warning: {
      header: "text-amber-800 border-amber-200",
      icon: "text-amber-600",
      iconBg: "bg-amber-100",
    },
    info: {
      header: "text-blue-800 border-blue-200",
      icon: "text-blue-600",
      iconBg: "bg-blue-100",
    },
  };

  // Icon mapping
  const iconMap = {
    success: CheckCircle,
    error: Error,
    warning: Warning,
    info: Info,
    default: null,
  };

  const IconComponent = iconMap[variant];

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (closeOnEscape && e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const currentAnimation = animationClasses[animation];
  const currentVariant = variantClasses[variant];
  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentPadding = paddingClasses[padding] || paddingClasses.default;
  const currentPosition = positionClasses[position] || positionClasses.center;

  return (
    <div
      className={`
        fixed inset-0 z-${zIndex} 
        flex justify-center 
        ${currentPosition}
        bg-black/50 backdrop-blur-sm
        transition-all duration-300
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        ${overlayClassName}
      `}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      {...props}
    >
      <div
        ref={modalRef}
        className={`
          w-full ${currentSize}
          bg-white rounded-xl shadow-2xl
          ${currentPadding}
          ${currentAnimation.enter}
          ${isOpen ? currentAnimation.enterActive : currentAnimation.exitActive}
          ${className}
        `}
      >
        {/* Header */}
        {showHeader && (
          <div
            className={`
            flex items-start justify-between 
            pb-4 border-b 
            ${currentVariant.header}
            ${headerClassName}
          `}
          >
            <div className="flex items-center gap-3 flex-1">
              {IconComponent && (
                <div
                  className={`
                  p-2 rounded-full 
                  ${currentVariant.iconBg}
                  ${currentVariant.icon}
                `}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
              )}
              <h2
                id="modal-title"
                className="text-xl font-semibold text-slate-800"
              >
                {title}
              </h2>
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="
                  p-1.5 rounded-lg
                  text-slate-400 hover:text-slate-600
                  hover:bg-slate-100
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  flex-shrink-0
                "
                aria-label="Close modal"
              >
                <Close className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div
          className={`
          ${!showHeader ? "pt-0" : "pt-4"}
          ${!showFooter ? "pb-0" : "pb-4"}
          ${bodyClassName}
        `}
        >
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div
            className={`
            flex items-center justify-end gap-3
            pt-4 border-t border-slate-200
            ${footerClassName}
          `}
          >
            {footerContent
              ? footerContent
              : actions &&
                actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    className={`
                    px-4 py-2 rounded-lg font-medium
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${
                      action.variant === "primary"
                        ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                        : action.variant === "danger"
                          ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                          : action.variant === "success"
                            ? "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300 focus:ring-slate-400"
                    }
                    ${action.disabled ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                  >
                    {action.label}
                  </button>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Confirmation Modal variant
export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning",
  isLoading = false,
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant={variant}
      size="sm"
      {...props}
    >
      <div className="space-y-4">
        <p className="text-slate-600">{message}</p>
        <div className="flex items-center gap-3 justify-end">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-lg font-medium
              text-slate-700 hover:bg-slate-100
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-slate-400
            "
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`
              px-4 py-2 rounded-lg font-medium text-white
              ${
                variant === "danger"
                  ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  : variant === "success"
                    ? "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              }
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-2
            `}
          >
            {isLoading && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Drawer Modal (side panel)
export const DrawerModal = ({
  isOpen,
  onClose,
  title,
  children,
  position = "right", // right, left
  size = "md",
  ...props
}) => {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    full: "max-w-full",
  };

  const positionClasses = {
    right: "justify-end",
    left: "justify-start",
  };

  const transformClasses = {
    right: {
      enter: "translate-x-full",
      enterActive: "translate-x-0",
      exit: "translate-x-0",
      exitActive: "translate-x-full",
    },
    left: {
      enter: "-translate-x-full",
      enterActive: "translate-x-0",
      exit: "translate-x-0",
      exitActive: "-translate-x-full",
    },
  };

  const currentTransform = transformClasses[position];
  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentPosition = positionClasses[position];

  return (
    <div
      className={`
        fixed inset-0 z-50 flex
        ${currentPosition}
        bg-black/50 backdrop-blur-sm
        transition-all duration-300
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`
          h-full ${currentSize} w-full
          bg-white shadow-2xl
          transition-all duration-300 ease-out
          ${currentTransform.enter}
          ${isOpen ? currentTransform.enterActive : currentTransform.exitActive}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="
              p-1.5 rounded-lg
              text-slate-400 hover:text-slate-600
              hover:bg-slate-100
              transition-all duration-200
            "
          >
            <Close className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
