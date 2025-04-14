"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon, Shield, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const SideBar = () => {
  const MenuList = [
    { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
    { name: "Upgrade", icon: Shield, path: "/dashboard/upgrade" },
    { name: "Profile", icon: UserCircle, path: "/dashboard/profile" },
  ];

  const path = usePathname();

  return (
    <aside className="h-screen w-64 bg-[#1f2937] text-white p-6 flex flex-col border-r border-gray-700">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <h1 className="text-xl font-semibold text-blue-400">SkillSure</h1>
      </div>

      {/* Create Button */}
      <Link href="/create">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 mb-8">
          Create New +
        </Button>
      </Link>

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
      </nav>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Credits */}
      <div className="bg-gray-700 p-4 rounded-lg text-sm">
        <p className="mb-2 font-semibold text-white">Available Credits: 5</p>
        <Progress value={20} />
        <p className="text-gray-300 mt-2">1 out of 5 used</p>
        <Link
          href="/dashboard/upgrade"
          className="block mt-2 text-blue-400 hover:underline"
        >
          Upgrade to get more
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
