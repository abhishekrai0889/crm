// context/NotificationContext.jsx
// Shared notification state for the Header bell popup and the Notifications page.
// Mock data only — swap the initial state for an API call later.
import React, { createContext, useContext, useState, useCallback } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CampaignIcon from "@mui/icons-material/Campaign";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

const NotificationContext = createContext(null);

// Notification categories — shared by the header popup and the
// Notifications page so icons and colors stay consistent.
export const notificationTypes = {
  deal: {
    label: "Deal",
    icon: TrendingUpIcon,
    iconClasses: "bg-blue-100 text-blue-600",
    badgeClasses: "bg-blue-50 text-blue-700 border-blue-200",
  },
  lead: {
    label: "Lead",
    icon: FlashOnIcon,
    iconClasses: "bg-amber-100 text-amber-600",
    badgeClasses: "bg-amber-50 text-amber-700 border-amber-200",
  },
  ticket: {
    label: "Ticket",
    icon: SupportAgentIcon,
    iconClasses: "bg-rose-100 text-rose-600",
    badgeClasses: "bg-rose-50 text-rose-700 border-rose-200",
  },
  campaign: {
    label: "Campaign",
    icon: CampaignIcon,
    iconClasses: "bg-violet-100 text-violet-600",
    badgeClasses: "bg-violet-50 text-violet-700 border-violet-200",
  },
  team: {
    label: "Team",
    icon: GroupsIcon,
    iconClasses: "bg-emerald-100 text-emerald-600",
    badgeClasses: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  system: {
    label: "System",
    icon: SettingsSuggestIcon,
    iconClasses: "bg-slate-200 text-slate-600",
    badgeClasses: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

const initialNotifications = [
  {
    id: 1,
    title: "Deal moved to Negotiation",
    message:
      "Priya Khanna moved 'Globex — Annual license' ($48,000) from Proposal to Negotiation. Expected close date is July 18 — review the updated terms before the pricing call.",
    type: "deal",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "New lead assigned to you",
    message:
      "A new lead from the website form was assigned to you via round-robin: Initech (rahul@initech.com, UTM source: google/cpc). Qualify or disqualify it from the Leads screen.",
    type: "lead",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Ticket #4821 resolved",
    message:
      "Avneet Singh resolved ticket #4821 (login redirect loop). A CSAT survey has been sent to the customer. The ticket will auto-close in 48 hours unless the customer replies.",
    type: "ticket",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    title: "Campaign sent successfully",
    message:
      "'July product update' was delivered to 4,218 contacts (98.6% delivery rate). Early stats: 41% opens, 7.2% clicks. Full performance report is available under Marketing → Campaigns.",
    type: "campaign",
    time: "5 hours ago",
    read: true,
  },
  {
    id: 5,
    title: "New team member joined",
    message:
      "Kabir Mehta accepted the workspace invitation and joined as User. You can adjust their role from Team management.",
    type: "team",
    time: "Yesterday",
    read: true,
  },
  {
    id: 6,
    title: "Weekly summary is ready",
    message:
      "Your weekly summary is ready: 147 new leads, 23 deals won and 9 open tickets. Open Analytics to see the full report.",
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
