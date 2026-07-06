import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  // Navigation & Layout
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,

  // Business & People
  People as PeopleIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Group as GroupIcon,

  // Analytics & Charts
  Assessment as AssessmentIcon,
  Analytics as AnalyticsIcon,
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,

  // Notifications & Communication
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  Email as EmailIcon,

  // Settings & Preferences
  Settings as SettingsIcon,
  SettingsSystemDaydream as SettingsSystemDaydreamIcon,
  Security as SecurityIcon,
  PrivacyTip as PrivacyTipIcon,

  // Actions
  Logout as LogoutIcon,
  Add as AddIcon,

  // Content & Media
  Folder as FolderIcon,

  // Calendar & Time
  CalendarToday as CalendarTodayIcon,

  // File & Documents
  Assignment as AssignmentIcon,

  // Alerts & Status
  CheckCircle as CheckCircleIcon,

  // Forms & Input
  Search as SearchIcon,

  // Support
  Help as HelpIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isOpen, setIsOpen, mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      path: "/user/dashboard",
      icon: <DashboardIcon />,
      label: "Dashboard",
      description: "Overview & Analytics",
    },
    {
      path: "/user/dashboard/partners",
      icon: <PeopleIcon />,
      label: "Partners",
      description: "Manage partners",
      children: [
        {
          path: "/user/dashboard/partners/all",
          label: "All Partners",
          description: "View all partners",
          icon: <GroupIcon />,
        },
        {
          path: "/user/dashboard/partners/add",
          label: "Add Partner",
          description: "Create new partner",
          icon: <AddIcon />,
        },
        {
          path: "/user/dashboard/partners/approvals",
          label: "Approvals",
          description: "Pending approvals",
          badge: "5",
          icon: <CheckCircleIcon />,
        },
      ],
    },
    {
      path: "/user/dashboard/organizations",
      icon: <BusinessIcon />,
      label: "Organizations",
      description: "Manage organizations",
    },
    {
      path: "/user/dashboard/analytics",
      icon: <AnalyticsIcon />,
      label: "Analytics",
      description: "View reports & insights",
      children: [
        {
          path: "/user/dashboard/analytics/overview",
          label: "Overview",
          icon: <BarChartIcon />,
        },
        {
          path: "/user/dashboard/analytics/reports",
          label: "Reports",
          icon: <AssessmentIcon />,
        },
        {
          path: "/user/dashboard/analytics/trends",
          label: "Trends",
          icon: <TrendingUpIcon />,
        },
      ],
    },
    {
      path: "/user/dashboard/notifications",
      icon: <NotificationsActiveIcon />,
      label: "Notifications",
      description: "Recent updates",
      badge: "3",
    },
    {
      path: "/user/dashboard/email",
      icon: <EmailIcon />,
      label: "Email",
      description: "Communications",
      badge: "12",
    },
    {
      path: "/user/dashboard/calendar",
      icon: <CalendarTodayIcon />,
      label: "Calendar",
      description: "Events & meetings",
    },
    {
      path: "/user/dashboard/tasks",
      icon: <AssignmentIcon />,
      label: "Tasks",
      description: "Manage tasks",
      badge: "8",
    },
    {
      path: "/user/dashboard/files",
      icon: <FolderIcon />,
      label: "Files",
      description: "Documents & files",
    },
    {
      path: "/user/dashboard/profile",
      icon: <PersonIcon />,
      label: "Profile",
      description: "Account settings",
    },
    {
      path: "/user/dashboard/settings",
      icon: <SettingsIcon />,
      label: "Settings",
      description: "System preferences",
      children: [
        {
          path: "/user/dashboard/settings/general",
          label: "General",
          icon: <SettingsSystemDaydreamIcon />,
        },
        {
          path: "/user/dashboard/settings/security",
          label: "Security",
          icon: <SecurityIcon />,
        },
        {
          path: "/user/dashboard/settings/privacy",
          label: "Privacy",
          icon: <PrivacyTipIcon />,
        },
      ],
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/signin", { replace: true });
  };

  const toggleExpand = (path) => {
    setExpanded((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleNavClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
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

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 280 : 72,
          x: mobileOpen ? 0 : isMobile ? -280 : 0,
        }}
        transition={{ duration: 0.3, type: "spring", damping: 20 }}
        className={`
          fixed left-0 top-0 h-full z-50
          bg-white/80 dark:bg-slate-900/80
          backdrop-blur-xl
          border-r border-slate-200/50 dark:border-slate-700/50
          shadow-2xl shadow-slate-200/20 dark:shadow-slate-900/20
          flex flex-col
          ${mobileOpen ? "block" : "hidden lg:block"}
        `}
        style={{
          width: isOpen ? 280 : 72,
          transform: mobileOpen
            ? "translateX(0)"
            : isMobile
              ? "translateX(-100%)"
              : "translateX(0)",
        }}
      >
        {/* Logo Section */}
        <div
          className={`
          flex items-center h-16 px-4 border-b border-slate-200/50 dark:border-slate-700/50
          ${isOpen ? "justify-between" : "justify-center"}
        `}
        >
          <motion.div
            className="flex items-center gap-3"
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ rotate: -10, scale: 1.05 }}
              className="relative w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/30"
            >
              <span className="relative z-10">E</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-50 blur-xl"></div>
            </motion.div>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
              >
                ENTHIS
              </motion.span>
            )}
          </motion.div>

          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors lg:hidden"
            >
              <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 dark:text-slate-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: isOpen ? 0 : 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors hidden lg:block"
            >
              {isOpen ? (
                <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 dark:text-slate-400" />
              ) : (
                <MenuIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 dark:text-slate-400" />
              )}
            </motion.button>
          </div>
        </div>

      

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.children ? (
                  <div>
                    <motion.button
                      whileHover={{ x: isOpen ? 4 : 0 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleExpand(item.path)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                        transition-all duration-200
                        hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80
                        dark:hover:from-slate-700/50 dark:hover:to-slate-700/30
                        ${isOpen ? "justify-start" : "justify-center"}
                        ${hoveredItem === item.path ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}
                      `}
                      title={!isOpen ? item.label : ""}
                    >
                      <span
                        className={`transition-colors duration-200 ${hoveredItem === item.path ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-500"}`}
                      >
                        {item.icon}
                      </span>
                      {isOpen && (
                        <>
                          <span className="flex-1 text-sm font-medium text-left">
                            {item.label}
                          </span>
                          <span className="text-xs text-slate-400">
                            {expanded[item.path] ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </span>
                        </>
                      )}
                    </motion.button>
                    <AnimatePresence>
                      {isOpen && expanded[item.path] && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-4 mt-1 space-y-1 overflow-hidden"
                        >
                          {item.children.map((child, idx) => (
                            <motion.li
                              key={child.path}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <NavLink
                                to={child.path}
                                onClick={handleNavClick}
                                className={({ isActive }) => `
                                  flex items-center justify-between px-3 py-2 rounded-lg text-sm
                                  transition-all duration-200
                                  ${
                                    isActive
                                      ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 font-medium"
                                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                                  }
                                `}
                              >
                                <span className="flex items-center gap-2">
                                  {child.icon && (
                                    <span className="text-slate-400">
                                      {child.icon}
                                    </span>
                                  )}
                                  {child.label}
                                </span>
                                {child.badge && (
                                  <span className="px-2 py-0.5 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
                                    {child.badge}
                                  </span>
                                )}
                              </NavLink>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={handleNavClick}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-2.5 rounded-xl
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400 font-medium shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                      }
                      ${isOpen ? "justify-start" : "justify-center"}
                      relative
                    `}
                    title={!isOpen ? item.label : ""}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full"
                          />
                        )}
                        <span
                          className={`transition-colors duration-200 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-500"}`}
                        >
                          {item.icon}
                        </span>
                        {isOpen && (
                          <>
                            <span className="flex-1 text-sm font-medium">
                              {item.label}
                            </span>
                            {item.badge && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="px-2 py-0.5 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg shadow-red-500/25"
                              >
                                {item.badge}
                              </motion.span>
                            )}
                          </>
                        )}
                        {!isOpen && item.badge && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-[8px] font-bold text-white flex items-center justify-center shadow-lg shadow-red-500/25">
                            {item.badge}
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="border-t border-slate-200/50 dark:border-slate-700/50 p-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              transition-all duration-200
              text-red-600 dark:text-red-400
              hover:bg-red-50 dark:hover:bg-red-500/10
              group
              ${isOpen ? "justify-start" : "justify-center"}
            `}
            title={!isOpen ? "Logout" : ""}
          >
            <motion.div
              whileHover={{ rotate: -10 }}
              className="text-red-500 dark:text-red-400"
            >
              <LogoutIcon className="w-5 h-5" />
            </motion.div>
            {isOpen && (
              <span className="text-sm font-medium group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">
                Logout
              </span>
            )}
          </motion.button>
        </div>
      </motion.aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
