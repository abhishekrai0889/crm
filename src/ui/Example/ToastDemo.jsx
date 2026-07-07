import React, { useState } from "react";
import { useToast } from "../../context/ToastContext";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Send as SendIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Star as StarIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
} from "@mui/icons-material";

const ToastDemo = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  // Basic Toast Types
  const showSuccess = () => {
    toast.success("Operation completed successfully!");
  };

  const showError = () => {
    toast.error("Something went wrong. Please try again.");
  };

  const showWarning = () => {
    toast.warning("Please review your input before submitting.");
  };

  const showInfo = () => {
    toast.info("New update available. Refresh to install.");
  };

  // Custom Duration
  const showCustomDuration = () => {
    toast.success("This toast stays for 5 seconds", 5000);
  };

  const showShortToast = () => {
    toast.info("Quick toast - 1.5 seconds", 1500);
  };

  const showLongToast = () => {
    toast.warning("Important message - 8 seconds", 8000);
  };

  // Promise Toast
  const showPromise = async () => {
    const fakeApiCall = () =>
      new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

    await toast.promise(fakeApiCall(), {
      pending: "⏳ Saving your changes...",
      success: " Changes saved successfully!",
      error: "❌ Failed to save changes. Please try again.",
    });
  };

  const showPromiseWithError = async () => {
    const fakeApiCall = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("API Error")), 2000);
      });

    await toast
      .promise(fakeApiCall(), {
        pending: "⏳ Processing your request...",
        success: " Request completed!",
        error: "❌ Request failed. Please try again.",
      })
      .catch(() => {});
  };

  // Action Toasts
  const showSaveToast = () => {
    toast.success("Document saved successfully!");
  };

  const showDeleteToast = () => {
    toast.warning("Item moved to trash");
  };

  const showSendToast = () => {
    toast.info("Message sent successfully!");
  };

  const showDownloadToast = () => {
    toast.success("File downloaded successfully!");
  };

  const showUploadToast = () => {
    toast.success("File uploaded successfully!");
  };

  // Complex Toasts with Actions
  const showUndoToast = () => {
    toast.success(" Item deleted", 5000);
    // You can add custom actions here
  };

  const showSessionToast = () => {
    toast.warning("Your session will expire in 5 minutes", 6000);
  };

  // Simulate Loading
  const simulateLoading = async () => {
    setLoading(true);
    const id = toast.info("⏳ Loading data...", 10000);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      toast.removeToast(id);
      toast.success(" Data loaded successfully!");
    } catch (error) {
      toast.removeToast(id);
      toast.error("❌ Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Multiple Toasts
  const showMultipleToasts = () => {
    toast.success(" First toast");
    setTimeout(() => toast.info("ℹSecond toast"), 500);
    setTimeout(() => toast.warning("Third toast"), 1000);
    setTimeout(() => toast.error("Fourth toast"), 1500);
  };

  // Clear All Toasts
  const clearAllToasts = () => {
    toast.clearAll();
  };

  const toastCategories = [
    {
      title: "Basic Toasts",
      icon: <CheckCircleIcon className="w-5 h-5" />,
      toasts: [
        { label: "Success", onClick: showSuccess, color: "emerald" },
        { label: "Error", onClick: showError, color: "red" },
        { label: "Warning", onClick: showWarning, color: "amber" },
        { label: "Info", onClick: showInfo, color: "blue" },
      ],
    },
    {
      title: "Custom Duration",
      icon: <SettingsIcon className="w-5 h-5" />,
      toasts: [
        { label: "5 Seconds", onClick: showCustomDuration, color: "purple" },
        { label: "1.5 Seconds", onClick: showShortToast, color: "indigo" },
        { label: "8 Seconds", onClick: showLongToast, color: "pink" },
      ],
    },
    {
      title: "Promise Toasts",
      icon: <RefreshIcon className="w-5 h-5" />,
      toasts: [
        { label: "Success Promise", onClick: showPromise, color: "emerald" },
        { label: "Error Promise", onClick: showPromiseWithError, color: "red" },
      ],
    },
    {
      title: "Action Toasts",
      icon: <SaveIcon className="w-5 h-5" />,
      toasts: [
        { label: "Save", onClick: showSaveToast, color: "blue" },
        { label: "Delete", onClick: showDeleteToast, color: "red" },
        { label: "Send", onClick: showSendToast, color: "indigo" },
        { label: "Download", onClick: showDownloadToast, color: "purple" },
        { label: "Upload", onClick: showUploadToast, color: "emerald" },
      ],
    },
    {
      title: "Special Toasts",
      icon: <StarIcon className="w-5 h-5" />,
      toasts: [
        { label: "Loading", onClick: simulateLoading, color: "blue" },
        { label: "Session Expiry", onClick: showSessionToast, color: "amber" },
        { label: "Undo Action", onClick: showUndoToast, color: "purple" },
        {
          label: "Multiple Toasts",
          onClick: showMultipleToasts,
          color: "pink",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/10 to-indigo-50/10 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-200 mb-4">
            <span className="text-2xl font-bold text-white">🍞</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Toast Notifications
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
            Beautiful toast notifications with different types, durations, and
            animations
          </p>
        </div>

        {/* Clear All Button */}
        <div className="text-center mb-8">
          <button
            onClick={clearAllToasts}
            className="px-6 py-2.5 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-all duration-200 shadow-md shadow-slate-200"
          >
            <DeleteIcon className="w-4 h-4 inline mr-2" />
            Clear All Toasts
          </button>
        </div>

        {/* Toast Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toastCategories.map((category, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Category Header */}
              <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/50 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-slate-700">
                  {category.title}
                </h3>
              </div>

              {/* Toast Buttons */}
              <div className="p-4 space-y-2">
                {category.toasts.map((toastItem, index) => {
                  const colorClasses = {
                    emerald:
                      "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200",
                    red: "bg-red-500 hover:bg-red-600 shadow-red-200",
                    amber: "bg-amber-500 hover:bg-amber-600 shadow-amber-200",
                    blue: "bg-blue-500 hover:bg-blue-600 shadow-blue-200",
                    purple:
                      "bg-purple-500 hover:bg-purple-600 shadow-purple-200",
                    indigo:
                      "bg-indigo-500 hover:bg-indigo-600 shadow-indigo-200",
                    pink: "bg-pink-500 hover:bg-pink-600 shadow-pink-200",
                    slate: "bg-slate-500 hover:bg-slate-600 shadow-slate-200",
                  };

                  return (
                    <button
                      key={index}
                      onClick={toastItem.onClick}
                      disabled={loading && toastItem.label === "Loading"}
                      className={`
                        w-full px-4 py-2.5 rounded-xl text-white font-medium text-sm
                        transition-all duration-200 transform hover:scale-[1.02] active:scale-95
                        shadow-md ${colorClasses[toastItem.color] || colorClasses.blue}
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2
                      `}
                    >
                      {toastItem.label === "Loading" && loading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Loading...
                        </>
                      ) : (
                        toastItem.label
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                <CheckCircleIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Success</p>
                <p className="text-lg font-bold text-slate-700">✓</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 text-red-600">
                <CancelIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Error</p>
                <p className="text-lg font-bold text-slate-700">✗</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                <WarningIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Warning</p>
                <p className="text-lg font-bold text-slate-700">⚠</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <InfoIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Info</p>
                <p className="text-lg font-bold text-slate-700">ℹ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-slate-400">
          <p>Click any button to see the toast notification in action</p>
          <p className="mt-1">All toasts are animated and fully customizable</p>
        </div>
      </div>
    </div>
  );
};

export default ToastDemo;
