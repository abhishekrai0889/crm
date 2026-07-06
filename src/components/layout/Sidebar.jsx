import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import {
  // Navigation & layout
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,

  // CRM
  Person as PersonIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarTodayIcon,
  Folder as FolderIcon,

  // Manage
  People as PeopleIcon,
  Group as GroupIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Analytics as AnalyticsIcon,
  BarChart as BarChartIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  Email as EmailIcon,
  NotificationsActive as NotificationsActiveIcon,

  // Admin
  Settings as SettingsIcon,
  Security as SecurityIcon,
  PrivacyTip as PrivacyTipIcon,
  SettingsSystemDaydream as SettingsSystemDaydreamIcon,

  // Actions
  Logout as LogoutIcon,
} from "@mui/icons-material";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CampaignIcon from "@mui/icons-material/Campaign";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import GroupsIcon from "@mui/icons-material/Groups";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isOpen, setIsOpen, mobileOpen, setMobileOpen }) => {
  const { logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Grouped menu: single items navigate directly; items with children
  // expand as an accordion (only one group open at a time) so the
  // sidebar never becomes a long scroll.
  const sections = [
    {
      label: null,
      items: [
        {
          path: "/user/dashboard",
          end: true,
          icon: <DashboardIcon />,
          label: "Dashboard",
        },
        {
          path: "/user/dashboard/notifications",
          icon: <NotificationsActiveIcon />,
          label: "Notifications",
          badge: unreadCount > 0 ? String(unreadCount) : null,
        },
        {
          path: "/user/dashboard/email",
          icon: <EmailIcon />,
          label: "Email",
          badge: "12",
        },
      ],
    },
    {
      label: "CRM",
      items: [
        {
          key: "sales",
          icon: <ShowChartIcon />,
          label: "Sales",
          children: [
            {
              path: "/user/dashboard/leads",
              label: "Leads",
              icon: <FlashOnIcon />,
            },
            {
              path: "/user/dashboard/contacts",
              label: "Contacts",
              icon: <PersonIcon />,
            },
            {
              path: "/user/dashboard/companies",
              label: "Companies",
              icon: <BusinessIcon />,
            },
            {
              path: "/user/dashboard/deals",
              label: "Deals",
              icon: <TrendingUpIcon />,
            },
          ],
        },
        {
          key: "marketing",
          icon: <CampaignIcon />,
          label: "Marketing",
          children: [
            {
              path: "/user/dashboard/campaigns",
              label: "Campaigns",
              icon: <CampaignIcon />,
            },
            {
              path: "/user/dashboard/forms",
              label: "Forms & Lists",
              icon: <ListAltIcon />,
            },
          ],
        },
        {
          key: "support",
          icon: <SupportAgentIcon />,
          label: "Support",
          children: [
            {
              path: "/user/dashboard/tickets",
              label: "Tickets",
              icon: <SupportAgentIcon />,
              badge: "9",
            },
            {
              path: "/user/dashboard/knowledge-base",
              label: "Knowledge Base",
              icon: <MenuBookIcon />,
            },
          ],
        },
        {
          key: "projects",
          icon: <ViewKanbanIcon />,
          label: "Projects",
          children: [
            {
              path: "/user/dashboard/projects",
              label: "Projects",
              icon: <ViewKanbanIcon />,
            },
            {
              path: "/user/dashboard/tasks",
              label: "Tasks",
              icon: <AssignmentIcon />,
              badge: "8",
            },
            {
              path: "/user/dashboard/calendar",
              label: "Calendar",
              icon: <CalendarTodayIcon />,
            },
            {
              path: "/user/dashboard/files",
              label: "Files",
              icon: <FolderIcon />,
            },
          ],
        },
      ],
    },
    {
      label: "Manage",
      items: [
        {
          key: "partners",
          icon: <PeopleIcon />,
          label: "Partners",
          children: [
            {
              path: "/user/dashboard/partners/all",
              label: "All Partners",
              icon: <GroupIcon />,
            },
            {
              path: "/user/dashboard/partners/add",
              label: "Add Partner",
              icon: <AddIcon />,
            },
            {
              path: "/user/dashboard/partners/approvals",
              label: "Approvals",
              icon: <CheckCircleIcon />,
              badge: "5",
            },
          ],
        },
        {
          path: "/user/dashboard/organizations",
          icon: <BusinessIcon />,
          label: "Organizations",
        },
        {
          key: "analytics",
          icon: <AnalyticsIcon />,
          label: "Analytics",
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
      ],
    },
    {
      label: "Admin",
      items: [
        {
          path: "/user/dashboard/team",
          icon: <GroupsIcon />,
          label: "Team",
        },
        {
          key: "settings",
          icon: <SettingsIcon />,
          label: "Settings",
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
            {
              path: "/user/dashboard/profile",
              label: "My Profile",
              icon: <PersonIcon />,
            },
          ],
        },
      ],
    },
  ];

  // Auto-expand the group that contains the active route.
  useEffect(() => {
    for (const section of sections) {
      for (const item of section.items) {
        if (
          item.children?.some((child) =>
            location.pathname.startsWith(child.path),
          )
        ) {
          setExpandedGroup(item.key);
          return;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/signin", { replace: true });
  };

  const toggleGroup = (key) => {
    // Expand the rail first if it's collapsed, so children are visible.
    if (!isOpen && !isMobile) {
      setIsOpen(true);
      setExpandedGroup(key);
      return;
    }
    setExpandedGroup((prev) => (prev === key ? null : key));
  };

  const handleNavClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const isGroupActive = (item) =>
    item.children?.some((child) => location.pathname.startsWith(child.path));

  const badgePill = (badge) => (
    <span className="px-2 py-0.5 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg shadow-red-500/25">
      {badge}
    </span>
  );

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
          flex-col
          ${mobileOpen ? "flex" : "hidden lg:flex"}
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
        <nav className="flex-1 min-h-0 overflow-y-auto py-3 px-3 custom-scrollbar">
          {sections.map((section, sectionIndex) => (
            <div key={section.label || sectionIndex}>
              {section.label && isOpen && (
                <p className="px-3 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                  {section.label}
                </p>
              )}
              {section.label && !isOpen && (
                <div className="my-3 mx-2 border-t border-slate-200/70 dark:border-slate-700/70" />
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.key || item.path}>
                    {item.children ? (
                      <div>
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleGroup(item.key)}
                          className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                            transition-all duration-200
                            ${
                              isGroupActive(item)
                                ? "text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-slate-700/40 font-medium"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                            }
                            ${isOpen ? "justify-start" : "justify-center"}
                          `}
                          title={!isOpen ? item.label : ""}
                        >
                          <span
                            className={
                              isGroupActive(item)
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-slate-500 dark:text-slate-500"
                            }
                          >
                            {item.icon}
                          </span>
                          {isOpen && (
                            <>
                              <span className="flex-1 text-sm font-medium text-left">
                                {item.label}
                              </span>
                              <motion.span
                                animate={{
                                  rotate: expandedGroup === item.key ? 180 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                                className="text-slate-400 flex items-center"
                              >
                                <ExpandMoreIcon sx={{ fontSize: 18 }} />
                              </motion.span>
                            </>
                          )}
                        </motion.button>
                        <AnimatePresence>
                          {isOpen && expandedGroup === item.key && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="mt-0.5 space-y-0.5 overflow-hidden border-l border-slate-200 dark:border-slate-700 ml-[21px] pl-2"
                            >
                              {item.children.map((child) => (
                                <li key={child.path}>
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
                                    <span className="flex items-center gap-2.5">
                                      {child.icon && (
                                        <span className="text-slate-400 flex items-center [&>svg]:!text-[17px]">
                                          {child.icon}
                                        </span>
                                      )}
                                      {child.label}
                                    </span>
                                    {child.badge && badgePill(child.badge)}
                                  </NavLink>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <NavLink
                        to={item.path}
                        end={item.end}
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
                              className={
                                isActive
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-slate-500 dark:text-slate-500"
                              }
                            >
                              {item.icon}
                            </span>
                            {isOpen && (
                              <>
                                <span className="flex-1 text-sm font-medium">
                                  {item.label}
                                </span>
                                {item.badge && badgePill(item.badge)}
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
                  </li>
                ))}
              </ul>
            </div>
          ))}
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

      <style>{`
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
