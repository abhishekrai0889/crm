import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { NotificationProvider } from "../../context/NotificationContext";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] =useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;

      setIsMobile(mobile);

      if (!mobile) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/10 to-indigo-50/10">

        {/* Sidebar */}

        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
        />

        {/* Right Side */}

        <div
          className={`
            min-h-screen
            flex
            flex-col
            transition-all
            duration-300
            ${sidebarOpen && !isMobile ? "ml-[280px]" : ""}
            ${!sidebarOpen && !isMobile ? "ml-[72px]" : ""}
            ${isMobile ? "ml-0" : ""}
          `}
        >

          {/* Header */}

          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            setMobileSidebarOpen={setMobileSidebarOpen}
            isMobile={isMobile}
          />

          {/* Content */}

          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>

          {/* Footer */}

          <Footer />

        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={2500}
        />

      </div>
    </NotificationProvider>
  );
};

export default MainLayout;