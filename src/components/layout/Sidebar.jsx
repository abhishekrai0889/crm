import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Store as StoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const Sidebar = ({ isOpen, setIsOpen, mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});

  const menuItems = [
    {
      path: "/dashboard",
      icon: <DashboardIcon />,
      label: "Dashboard",
    },
    {
      path: "/dashboard/partners",
      icon: <PeopleIcon />,
      label: "Partners",
      children: [
        { path: "/dashboard/partners/all", label: "All Partners" },
        { path: "/dashboard/partners/add", label: "Add Partner" },
        { path: "/dashboard/partners/approvals", label: "Approvals" },
      ],
    },
    {
      path: "/dashboard/organizations",
      icon: <BusinessIcon />,
      label: "Organizations",
    },
    {
      path: "/dashboard/analytics",
      icon: <AssessmentIcon />,
      label: "Analytics",
    },
    {
      path: "/dashboard/notifications",
      icon: <NotificationsIcon />,
      label: "Notifications",
      badge: "3",
    },
    {
      path: "/dashboard/profile",
      icon: <PersonIcon />,
      label: "Profile",
    },
    {
      path: "/dashboard/settings",
      icon: <SettingsIcon />,
      label: "Settings",
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  const toggleExpand = (path) => {
    setExpanded((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleNavClick = (e, path) => {
    // Close mobile sidebar on navigation
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 h-full bg-white border-r border-slate-200
          transition-all duration-300 z-50
          ${isOpen ? "w-64" : "w-16"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              E
            </div>
            {isOpen && (
              <span className="text-lg font-bold text-slate-800">ENTHIS</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {/* Mobile close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-100 transition-colors lg:hidden"
            >
              <CloseIcon className="w-5 h-5 text-slate-500" />
            </button>
            {/* Desktop toggle button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-lg hover:bg-slate-100 transition-colors hidden lg:block"
            >
              {isOpen ? (
                <ChevronLeftIcon className="w-5 h-5 text-slate-500" />
              ) : (
                <MenuIcon className="w-5 h-5 text-slate-500" />
              )}
            </button>
          </div>
        </div>

        {/* User Info */}
        {isOpen && user && (
          <div className="px-4 py-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                {user.name?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {user.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpand(item.path)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-all duration-200
                        hover:bg-slate-100 text-slate-600 hover:text-slate-900
                        ${isOpen ? "justify-start" : "justify-center"}
                      `}
                      title={!isOpen ? item.label : ""}
                    >
                      <span className="text-slate-500">{item.icon}</span>
                      {isOpen && (
                        <>
                          <span className="flex-1 text-sm font-medium text-left">
                            {item.label}
                          </span>
                          <span
                            className={`transform transition-transform ${
                              expanded[item.path] ? "rotate-180" : ""
                            }`}
                          >
                            ▼
                          </span>
                        </>
                      )}
                    </button>
                    {isOpen && expanded[item.path] && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.path}>
                            <NavLink
                              to={child.path}
                              onClick={(e) => handleNavClick(e, child.path)}
                              className={({ isActive }) => `
                                block px-3 py-2 rounded-lg text-sm
                                transition-all duration-200
                                ${
                                  isActive
                                    ? "bg-blue-50 text-blue-600 font-medium"
                                    : "text-slate-600 hover:bg-slate-100"
                                }
                              `}
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-slate-600 hover:bg-slate-100"
                      }
                      ${isOpen ? "justify-start" : "justify-center"}
                    `}
                    title={!isOpen ? item.label : ""}
                  >
                    <span className="text-slate-500">{item.icon}</span>
                    {isOpen && (
                      <span className="flex-1 text-sm font-medium">
                        {item.label}
                      </span>
                    )}
                    {item.badge && isOpen && (
                      <span className="px-2 py-0.5 text-xs font-medium text-white bg-red-500 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-200 p-3">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
              transition-all duration-200
              text-red-600 hover:bg-red-50
              ${isOpen ? "justify-start" : "justify-center"}
            `}
            title={!isOpen ? "Logout" : ""}
          >
            <LogoutIcon className="w-5 h-5" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
