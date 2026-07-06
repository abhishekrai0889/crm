import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Error,
  Home,
  Search,
  ArrowBack,
  Lightbulb,
  Refresh,
} from "@mui/icons-material";

function NotFoundPage() {
  const navigate = useNavigate();

  const suggestions = [
    { label: "Check the URL", action: () => window.location.reload() },
    { label: "Go to Homepage", action: () => navigate("/") },
    { label: "Contact Support", action: () => navigate("/contact") },
    { label: "Search the Site", action: () => navigate("/search") },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-center">
            <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
              <Error sx={{ fontSize: 56, color: "#ef4444" }} />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
              404
            </h1>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-1">
              Page Not Found
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/", { replace: true })}
              className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Home sx={{ fontSize: 20 }} />
              Go to Homepage
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowBack sx={{ fontSize: 20 }} />
              Go Back
            </button>
          </div>

          {/* Suggestions */}
          <div>
            <div className="flex items-center gap-2 justify-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <Lightbulb sx={{ fontSize: 16 }} />
              <span>What would you like to do?</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={suggestion.action}
                  className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg p-2 pl-4">
            <Search sx={{ fontSize: 20, color: "#9ca3af" }} />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400"
              onKeyDown={(e) => e.key === "Enter" && navigate("/search")}
            />
            <button
              onClick={() => navigate("/search")}
              className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
