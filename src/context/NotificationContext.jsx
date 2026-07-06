// context/NotificationContext.jsx
// Shared notification state for the Header bell popup and the Notifications page.
// Mock data only — swap the initial state for an API call later.
import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext(null);

const initialNotifications = [
  {
    id: 1,
    title: "New partner application",
    message:
      "Bluewave Solutions has submitted a partner application. Review their company profile, region coverage and submitted documents, then approve or reject the application from the Partners section.",
    type: "partner",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Anshuman Singh approved",
    message:
      "The partner application for Anshuman Singh was approved by Priya Khanna. An onboarding email with workspace access instructions has been sent to the partner.",
    type: "approval",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "System maintenance",
    message:
      "Scheduled maintenance is planned for Sunday 02:00–04:00 IST. The dashboard will remain available in read-only mode during this window. No action is required.",
    type: "system",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    title: "New message from Support",
    message:
      "Support replied to your ticket #4821 (login redirect loop): \"We've identified the cause and deployed a fix. Please confirm you can sign in normally so we can close the ticket.\"",
    type: "message",
    time: "5 hours ago",
    read: true,
  },
  {
    id: 5,
    title: "New team member joined",
    message:
      "Kabir Mehta accepted the workspace invitation and joined as User. You can adjust their role from Team management.",
    type: "approval",
    time: "Yesterday",
    read: true,
  },
  {
    id: 6,
    title: "Weekly summary is ready",
    message:
      "Your weekly analytics summary is ready: 147 new leads, 23 deals won and 9 open tickets. Open Analytics to see the full report.",
    type: "system",
    time: "2 days ago",
    read: true,
  },
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const markUnread = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n)),
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markRead, markUnread, markAllRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};
