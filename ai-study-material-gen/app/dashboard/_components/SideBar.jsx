"use client";
import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboardIcon, Shield, UserCircle, Compass } from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const SideBar = () => {
  const path = usePathname();
  const { user } = useUser();

const MenuList = [
  { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
  { name: "Code Trail", icon: Compass, path: "/dashboard/codetrail" },
  // { name: "Upgrade", icon: Shield, path: "/dashboard/upgrade" },
  { name: "Profile", icon: UserCircle, path: "/dashboard/profile" },
];

  return (
    <aside className="h-screen w-64 bg-[#0F1115] text-white flex flex-col border-r border-gray-800">
      {/* Logo */}
      <div className="px-6 py-8">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <Image src="/logo.svg" alt="SkillSure logo" width={28} height={28} />
          <span className="text-lg font-semibold tracking-tight group-hover:opacity-80 transition">
            SkillSure
          </span>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 px-2">
        {MenuList.map((menu, index) => {
          const isActive = path === menu.path;
          return (
            <Link key={index} href={menu.path} className="block w-full">
              <div
                className={`flex items-center gap-4 px-4 py-2 rounded-md transition-all duration-200 cursor-pointer relative w-full
                  ${isActive ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}
                `}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-blue-400 rounded-r" />
                )}
                <menu.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{menu.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="flex-grow" />

      {/* Credits */}

      <div className="px-4 py-4 border-t border-gray-800">
        {/* <div className="bg-[#1A1C20] p-4 rounded-lg text-sm">
          <p className="mb-2 font-medium text-white">Available Credits: 5</p>
          <Progress value={20} className="h-2 bg-gray-700" />
          <p className="text-gray-400 mt-2">1 of 5 used</p>
          <Link
            href="/dashboard/upgrade"
            className="block mt-3 text-blue-400 hover:underline"
          >
            Upgrade to get more
          </Link>
        </div> */}
        <div className="py-4">
          <div className="flex items-center gap-3">
            {/* User Avatar + Dropdown */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
            {/* Name */}
            {user && (
              <span className="text-sm font-medium text-gray-300 truncate max-w-[200px]">
                {user.fullName || user.firstName || "User"}
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
