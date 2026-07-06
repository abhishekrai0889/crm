import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ sidebarOpen, setSidebarOpen, setMobileSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors lg:hidden"
        >
          <MenuIcon className="w-5 h-5 text-slate-600" />
        </button>

        {/* Desktop toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors hidden lg:block"
        >
          <MenuIcon className="w-5 h-5 text-slate-600" />
        </button>

        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
          <span className="font-medium text-slate-700">Dashboard</span>
          <span>/</span>
          <span>Overview</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden lg:flex items-center relative">
          <SearchIcon className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 w-48 transition-all duration-200"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors relative"
          >
            <NotificationsIcon className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-30">
              <div className="px-4 py-2 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700">
                  Notifications
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                  <p className="text-sm text-slate-700">
                    New partner application received
                  </p>
                  <p className="text-xs text-slate-400">2 minutes ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                  <p className="text-sm text-slate-700">
                    Anshuman Singh approved your request
                  </p>
                  <p className="text-xs text-slate-400">1 hour ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                  <p className="text-sm text-slate-700">
                    System maintenance scheduled for tomorrow
                  </p>
                  <p className="text-xs text-slate-400">3 hours ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-slate-700">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-400">{user?.role || "Admin"}</p>
            </div>
            <ExpandMoreIcon className="w-4 h-4 text-slate-400 hidden md:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-1 z-30">
              <div className="px-4 py-3 border-b border-slate-200">
                <p className="text-sm font-medium text-slate-700">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-slate-400">
                  {user?.email || "user@example.com"}
                </p>
              </div>
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <PersonIcon className="w-4 h-4" />
                Profile
              </Link>
              <Link
                to="/dashboard/settings"
                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <SettingsIcon className="w-4 h-4" />
                Settings
              </Link>
              <div className="border-t border-slate-200"></div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogoutIcon className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
