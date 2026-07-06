// pages/Notifications.jsx
// Notification details page — reached from the header bell popup
// ("View all notifications" or clicking a single notification).
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  useNotifications,
  notificationTypes,
} from "../context/NotificationContext";

const typeConfig = notificationTypes;

const Notifications = () => {
  const { notifications, unreadCount, markRead, markUnread, markAllRead } =
    useNotifications();
  const { id } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const selected = notifications.find((n) => n.id === Number(id)) || null;
  const filtered =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const handleSelect = (notification) => {
    markRead(notification.id);
    navigate(`/user/dashboard/notifications/${notification.id}`);
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
          <p className="text-sm text-slate-500 mt-1">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "You're all caught up"}
          </p>
        </div>
        <button
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <DoneAllIcon className="w-4 h-4" />
          Mark all read
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* List pane */}
        <div
          className={`lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden ${
            selected ? "hidden lg:block" : ""
          }`}
        >
          {/* Filter tabs */}
          <div className="flex items-center gap-1 px-3 pt-3 pb-2 border-b border-slate-200">
            {[
              { key: "all", label: "All" },
              { key: "unread", label: `Unread (${unreadCount})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === tab.key
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="divide-y divide-slate-100 max-h-[60vh] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-16 text-center">
                <div className="w-14 h-14 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
                  <NotificationsNoneIcon className="w-7 h-7 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-600">
                  No unread notifications
                </p>
              </div>
            ) : (
              filtered.map((notification) => {
                const config =
                  typeConfig[notification.type] || typeConfig.system;
                const Icon = config.icon;
                const isActive = selected?.id === notification.id;
                return (
                  <button
                    key={notification.id}
                    onClick={() => handleSelect(notification)}
                    className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors duration-150 ${
                      isActive
                        ? "bg-blue-50/60 border-l-2 border-l-blue-600"
                        : !notification.read
                          ? "bg-blue-50/25 hover:bg-slate-50 border-l-2 border-l-transparent"
                          : "hover:bg-slate-50 border-l-2 border-l-transparent"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${config.iconClasses}`}
                    >
                      <Icon sx={{ fontSize: 18 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm truncate ${
                          notification.read
                            ? "text-slate-600"
                            : "font-semibold text-slate-800"
                        }`}
                      >
                        {notification.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Detail pane */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-md"
              >
                <div className="px-6 py-5 border-b border-slate-200">
                  <button
                    onClick={() => navigate("/user/dashboard/notifications")}
                    className="lg:hidden flex items-center gap-1.5 text-sm text-blue-600 font-medium mb-3"
                  >
                    <ArrowBackIcon className="w-4 h-4" />
                    All notifications
                  </button>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        (typeConfig[selected.type] || typeConfig.system)
                          .badgeClasses
                      }`}
                    >
                      {(typeConfig[selected.type] || typeConfig.system).label}
                    </span>
                    <span className="text-xs text-slate-400">
                      {selected.time}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">
                    {selected.title}
                  </h2>
                </div>
                <div className="px-6 py-5">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selected.message}
                  </p>
                </div>
                <div className="px-6 py-4 border-t border-slate-200 flex items-center gap-3">
                  <button
                    onClick={() =>
                      selected.read
                        ? markUnread(selected.id)
                        : markRead(selected.id)
                    }
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all duration-200"
                  >
                    <MarkEmailUnreadIcon className="w-4 h-4" />
                    Mark as {selected.read ? "unread" : "read"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden lg:flex bg-white border border-dashed border-slate-300 rounded-2xl min-h-[320px] items-center justify-center"
              >
                <div className="text-center px-6">
                  <div className="w-14 h-14 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
                    <NotificationsNoneIcon className="w-7 h-7 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    Select a notification
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Choose an item from the list to see its details
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
