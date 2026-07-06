import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/found.webp";
import {
  Error,
  Home,
  Search,
  ArrowBack,
  Lightbulb,
  Refresh,
} from "@mui/icons-material";

function NotFoundPage() {
  const navigate = useNavigate();

  const suggestions = [
    { label: "Check the URL", action: () => window.location.reload() },
    { label: "Go to Homepage", action: () => navigate("/") },
    { label: "Contact Support", action: () => navigate("/contact") },
    { label: "Search the Site", action: () => navigate("/search") },
  ];

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-[#081326]/70"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[500px] overflow-hidden rounded-[28px] border border-white/20 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
        <div className="absolute -top-24 -right-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/15 ring-8 ring-red-500/10">
              <Error
                sx={{
                  fontSize: 48,
                  color: "#FF5A5F",
                }}
              />
            </div>
          </div>

          <div className="mt-5 text-center">
            <h1 className="text-[78px] font-black leading-none tracking-tight text-white">
              404
            </h1>

            <h2 className="mt-2 text-[36px] font-bold text-white">
              Page Not Found
            </h2>

            <p className="mx-auto mt-3 max-w-[360px] text-[15px] leading-7 text-white/70">
              Sorry, the page you're looking for doesn't exist, has been moved
              or is temporarily unavailable.
            </p>
          </div>

          <div className="mt-7 space-y-3">
            <button
              onClick={() => navigate("/", { replace: true })}
              className="flex h-14 w-full items-center justify-center cursor-pointer gap-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#4F7EFF] text-[16px] font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/50"
            >
              <Home />
              Go to Homepage
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex h-14 w-full items-center justify-center cursor-pointer gap-3 rounded-xl border border-white/20 bg-white/5 text-[16px] font-medium text-white transition-all duration-300 hover:bg-white/10"
            >
              <ArrowBack />
              Go Back
            </button>
          </div>

          <div className="mt-7">
            <div className="mb-4 flex items-center justify-center gap-2 text-white/70">
              <Lightbulb sx={{ fontSize: 18 }} />
              <span className="font-medium">Quick Actions</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[13px] text-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-500"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <div className="flex overflow-hidden rounded-xl border border-white/20 bg-white/5">
              <div className="flex items-center px-4 text-white/50">
                <Search />
              </div>

              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent px-2 py-4 text-white placeholder:text-white/40 focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && navigate("/search")}
              />

              <button
                onClick={() => navigate("/search")}
                className="bg-gradient-to-r from-[#2563EB] to-[#4F7EFF] px-7 font-semibold text-white transition-all duration-300 hover:brightness-110"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
