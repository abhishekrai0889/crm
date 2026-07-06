import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Help as HelpIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({
  sidebarOpen,
  setSidebarOpen,
  setMobileSidebarOpen,
  isMobile,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/signin", { replace: true });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const notifications = [
    { id: 1, title: "New partner application", time: "2 min ago", read: false },
    {
      id: 2,
      title: "Anshuman Singh approved",
      time: "1 hour ago",
      read: false,
    },
    { id: 3, title: "System maintenance", time: "3 hours ago", read: true },
    {
      id: 4,
      title: "New message from Support",
      time: "5 hours ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left section */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
          >
            <MenuIcon className="w-5 h-5 text-slate-600" />
          </button>

          {/* Desktop toggle button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex p-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
          >
            <MenuIcon className="w-5 h-5 text-slate-600" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 font-medium">Dashboard</span>
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all duration-200"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Mobile search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
          >
            <SearchIcon className="w-5 h-5 text-slate-600" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 relative"
            >
              <NotificationsIcon className="w-5 h-5 text-slate-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-700">
                      Notifications
                    </h3>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                          !notification.read ? "bg-blue-50/30" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-1.5 ${!notification.read ? "bg-blue-500" : "bg-slate-300"}`}
                          ></div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-700">
                              {notification.title}
                            </p>
                            <p className="text-xs text-slate-400">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-200">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-semibold shadow-md">
                {getInitials(user?.name)}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-slate-700">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-slate-400">
                  {user?.role || "Admin"}
                </p>
              </div>
              <ExpandMoreIcon className="w-4 h-4 text-slate-400 hidden lg:block" />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-1 z-50"
                >
                  <div className="px-4 py-3 border-b border-slate-200">
                    <p className="text-sm font-semibold text-slate-700">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/user/dashboard/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <PersonIcon className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      to="/user/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <SettingsIcon className="w-4 h-4" />
                      Settings
                    </Link>
                    <Link
                      to="/user/dashboard"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <DashboardIcon className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link
                      to="/help"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <HelpIcon className="w-4 h-4" />
                      Help & Support
                    </Link>
                  </div>
                  <div className="border-t border-slate-200 py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogoutIcon className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-4 pb-3"
          >
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
