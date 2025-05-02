"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon, Shield, UserCircle, Bell, Sun, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const SideBar = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [isDashboardOpen, setDashboardOpen] = React.useState(false);
  const path = usePathname();

  const MenuList = [
    { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
    { name: "Upgrade", icon: Shield, path: "/dashboard/upgrade" },
    { name: "Profile", icon: UserCircle, path: "/dashboard/profile" },
  ];

  const toggleDashboardMenu = () => setDashboardOpen(!isDashboardOpen);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // You can add logic here to apply theme change globally
  };

  return (
    <aside className="h-screen w-64 bg-[#1f2937] text-white p-6 flex flex-col border-r border-gray-700">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <h1 className="text-xl font-semibold text-blue-400">SkillSure</h1>
      </div>

      {/* User Info */}
      {/* <div className="flex items-center gap-3 mb-6">
        <Image src="/user-avatar.png" alt="User Avatar" width={36} height={36} className="rounded-full" />
        <div className="text-sm">
          <p className="font-semibold">John Doe</p>
          <p className="text-gray-400">johndoe@example.com</p>
        </div>
      </div> */}

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-md text-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {MenuList.map((menu, index) => {
          const isActive = path === menu.path;
          return (
            <Link key={index} href={menu.path}>
              <div
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
              >
                <menu.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{menu.name}</span>
              </div>
            </Link>
          );
        })}

        {/* Collapsible Dashboard Menu */}
        {/* <div onClick={toggleDashboardMenu} className="cursor-pointer">
          <h3 className="text-sm font-semibold text-gray-300">Dashboard</h3>
          {isDashboardOpen && (
            <div className="flex flex-col pl-4">
              <Link href="/dashboard/overview" className="text-sm text-gray-400">Overview</Link>
              <Link href="/dashboard/stats" className="text-sm text-gray-400">Statistics</Link>
            </div>
          )}
        </div> */}
      </nav>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Notifications */}
      {/* <div className="relative">
        <button className="text-gray-300">
          <Bell className="w-5 h-5" />
        </button>
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
      </div> */}

      {/* Credits */}
      <div className="bg-gray-700 p-4 rounded-lg text-sm mb-6">
        <p className="mb-2 font-semibold text-white">Available Credits: 5</p>
        <Progress value={20} />
        <p className="text-gray-300 mt-2">1 out of 5 used</p>
        <Link href="/dashboard/upgrade" className="block mt-2 text-blue-400 hover:underline">
          Upgrade to get more
        </Link>
      </div>

      {/* Theme Toggle */}
      <div onClick={toggleTheme} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer">
        <Sun className="w-5 h-5" />
        <span className="text-sm font-medium">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
      </div>

      {/* Settings Link */}
      <Link href="/dashboard/settings">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </div>
      </Link>

      {/* Logout Button */}
      <Button className="mt-4 w-full bg-red-800 hover:bg-red-600 text-white">
        Logout
      </Button>
    </aside>
  );
};

export default SideBar;
