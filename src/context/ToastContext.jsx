// context/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", options = {}) => {
    const {
      duration = 4000,
      title = "",
      action = null,
      position = "top-right",
    } = options;

    const id = Date.now() + Math.random();
    const newToast = {
      id,
      message,
      type,
      duration,
      title,
      action,
      position,
      isVisible: true,
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message, options = {}) => {
      return addToast(message, "success", { duration: 4000, ...options });
    },
    [addToast],
  );

  const error = useCallback(
    (message, options = {}) => {
      return addToast(message, "error", { duration: 5000, ...options });
    },
    [addToast],
  );

  const warning = useCallback(
    (message, options = {}) => {
      return addToast(message, "warning", { duration: 4500, ...options });
    },
    [addToast],
  );

  const info = useCallback(
    (message, options = {}) => {
      return addToast(message, "info", { duration: 4000, ...options });
    },
    [addToast],
  );

  const promise = useCallback(
    async (promise, messages, options = {}) => {
      const id = addToast(messages.pending || "Loading...", "info", {
        duration: 10000,
        ...options,
      });

      try {
        const result = await promise;
        removeToast(id);
        success(
          messages.success || "Operation completed successfully!",
          options,
        );
        return result;
      } catch (error) {
        removeToast(id);
        error(messages.error || "Operation failed. Please try again.", options);
        throw error;
      }
    },
    [addToast, removeToast, success, error],
  );

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    promise,
    clearAll,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
