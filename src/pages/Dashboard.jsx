import React from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimerIcon from "@mui/icons-material/Timer";

const Dashboard = () => {
  const { user } = useAuth();

  // Sales Overview KPIs per PRD D.10.5 — mock data until the API lands.
  const stats = [
    {
      title: "Deals created vs closed",
      value: "38 / 23",
      change: "+8.1%",
      subtitle: "this month",
      icon: <ShowChartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      color: "bg-blue-50",
      changeColor: "text-emerald-600",
    },
    {
      title: "Win rate",
      value: "34.2%",
      change: "+2.4%",
      subtitle: "vs last month",
      icon: (
        <EmojiEventsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
      ),
      color: "bg-emerald-50",
      changeColor: "text-emerald-600",
    },
    {
      title: "Average deal size",
      value: "$12,400",
      change: "+5.7%",
      subtitle: "closed-won",
      icon: (
        <AttachMoneyIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
      ),
      color: "bg-purple-50",
      changeColor: "text-emerald-600",
    },
    {
      title: "Average sales cycle",
      value: "26 days",
      change: "-3 days",
      subtitle: "lead to close",
      icon: <TimerIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />,
      color: "bg-amber-50",
      changeColor: "text-emerald-600",
    },
  ];

  // Revenue by stage (PRD D.10.5) — open pipeline value per stage
  const revenueByStage = [
    { stage: "Qualified", value: 168000, label: "$168k" },
    { stage: "Demo", value: 124000, label: "$124k" },
    { stage: "Proposal", value: 96000, label: "$96k" },
    { stage: "Negotiation", value: 68000, label: "$68k" },
    { stage: "Closing", value: 26000, label: "$26k" },
  ];
  const maxStageValue = Math.max(...revenueByStage.map((s) => s.value));

  // Deals by owner (PRD D.10.5)
  const dealsByOwner = [
    { name: "Priya Khanna", initials: "PK", deals: 14, value: "$142k", color: "from-violet-500 to-purple-600" },
    { name: "Jay Dhillon", initials: "JD", deals: 11, value: "$118k", color: "from-cyan-500 to-sky-600" },
    { name: "Sumeet Sarna", initials: "SS", deals: 9, value: "$97k", color: "from-blue-500 to-indigo-600" },
    { name: "Maya Rao", initials: "MR", deals: 8, value: "$86k", color: "from-amber-500 to-orange-600" },
    { name: "Kabir Mehta", initials: "KM", deals: 5, value: "$39k", color: "from-emerald-500 to-teal-600" },
  ];

  const recentActivities = [
    { id: 1, title: "Deal 'Globex — Annual license' moved to Negotiation", time: "12 minutes ago" },
    { id: 2, title: "New lead from web form: Initech", time: "1 hour ago" },
    { id: 3, title: "Ticket #4821 resolved by Avneet Singh", time: "3 hours ago" },
    { id: 4, title: "Campaign 'July product update' sent to 4,218 contacts", time: "5 hours ago" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
        <div className="relative z-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Welcome back, {user?.name || "User"}! 👋
          </h1>
          <p className="text-blue-100 text-sm sm:text-base mt-1">
            Here's what's happening with your workspace today.
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/50 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className={`p-2 sm:p-2.5 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <span
                className={`text-xs sm:text-sm font-medium ${stat.changeColor}`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mt-2 sm:mt-3">
              {stat.value}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {stat.title}
              {stat.subtitle && (
                <span className="text-slate-400"> · {stat.subtitle}</span>
              )}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Revenue by stage + Deals by owner (PRD D.10.5) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden"
        >
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200/50 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800">
              Revenue by stage
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              Open pipeline
            </span>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {revenueByStage.map((row) => (
              <div key={row.stage} className="flex items-center gap-3">
                <span className="w-24 text-xs sm:text-sm font-medium text-slate-600 flex-shrink-0">
                  {row.stage}
                </span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(row.value / maxStageValue) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  />
                </div>
                <span className="w-14 text-right text-xs sm:text-sm font-bold text-slate-700 flex-shrink-0">
                  {row.label}
                </span>
              </div>
            ))}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">
                Weighted forecast
              </span>
              <span className="font-bold text-slate-800">$213,400</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden"
        >
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200/50 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800">
              Deals by owner
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              Open deals
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {dealsByOwner.map((owner) => (
              <div
                key={owner.name}
                className="px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-3 hover:bg-slate-50/50 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${owner.color} flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0`}
                >
                  {owner.initials}
                </div>
                <span className="flex-1 text-sm font-medium text-slate-700 truncate">
                  {owner.name}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {owner.deals} deals
                </span>
                <span className="w-14 text-right text-sm font-bold text-slate-700">
                  {owner.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden"
      >
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200/50 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800">
            Recent Activity
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="px-4 sm:px-6 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                <div>
                  <p className="text-sm sm:text-base text-slate-700">
                    {activity.title}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {activity.time}
                  </p>
                </div>
              </div>
              <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium self-end sm:self-auto">
                View →
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
