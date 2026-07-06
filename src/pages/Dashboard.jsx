import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Partners",
      value: "1,284",
      change: "+12.5%",
      icon: <PeopleIcon className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      title: "Active Organizations",
      value: "856",
      change: "+8.2%",
      icon: <BusinessIcon className="w-6 h-6 text-emerald-600" />,
      color: "bg-emerald-50",
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+23.1%",
      icon: <TrendingUpIcon className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50",
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "-4.3%",
      icon: <AssessmentIcon className="w-6 h-6 text-amber-600" />,
      color: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.name || "User"}! 👋
        </h1>
        <p className="text-blue-100 mt-1">
          Here's what's happening with your workspace today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
              <span
                className={`text-sm font-medium ${
                  stat.change.startsWith("+")
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mt-3">
              {stat.value}
            </h3>
            <p className="text-sm text-slate-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">
            Recent Activity
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div>
                  <p className="text-sm text-slate-700">
                    New partner registered
                  </p>
                  <p className="text-xs text-slate-400">2 minutes ago</p>
                </div>
              </div>
              <span className="text-sm text-slate-500">View</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
