import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Partners",
      value: "1,284",
      change: "+12.5%",
      icon: <PeopleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      color: "bg-blue-50",
      changeColor: "text-emerald-600",
    },
    {
      title: "Active Organizations",
      value: "856",
      change: "+8.2%",
      icon: <BusinessIcon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />,
      color: "bg-emerald-50",
      changeColor: "text-emerald-600",
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+23.1%",
      icon: (
        <TrendingUpIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
      ),
      color: "bg-purple-50",
      changeColor: "text-emerald-600",
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "-4.3%",
      icon: <AssessmentIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />,
      color: "bg-amber-50",
      changeColor: "text-red-600",
    },
  ];

  const recentActivities = [
    { id: 1, title: "New partner registered", time: "2 minutes ago" },
    { id: 2, title: "Anshuman Singh approved", time: "1 hour ago" },
    { id: 3, title: "System maintenance completed", time: "3 hours ago" },
    { id: 4, title: "New message from Support", time: "5 hours ago" },
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
            <p className="text-xs sm:text-sm text-slate-500">{stat.title}</p>
          </motion.div>
        ))}
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
