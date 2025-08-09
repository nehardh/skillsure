"use client";
import React, { useState } from "react";
import SideBar from "./_components/SideBar";
import DashBoardHeader from "./_components/DashboardHeader";

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block md:w-64 fixed">
        <SideBar />
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed top-0 left-0 w-64 h-full bg-[#0F1115] z-50 p-4 overflow-y-auto">
            <SideBar />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 min-h-screen flex flex-col">
        {/* Header with mobile toggle */}
        <DashBoardHeader onMenuClick={() => setMobileOpen(true)} />

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-10 flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
