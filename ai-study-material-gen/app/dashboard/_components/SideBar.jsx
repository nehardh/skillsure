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
        {
            name: "Dashboard",
            icon: LayoutDashboardIcon,
            path: "/dashboard",
        },
        {
            name: "Upgrade",
            icon: Shield,
            path: "/dashboard/upgrade",
        },
        {
            name: "Profile",
            icon: UserCircle,
            path: "/dashboard/profile",
        },
    ];

    const path = usePathname();

    return (
        <div className="h-screen flex flex-col shadow-lg p-6 bg-gray-800 text-white">
            <div className="flex gap-2 items-center">
                <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
                <h2 className="font-extrabold text-2xl text-blue-400">SkillSure</h2>
            </div>

            {/* Create New Button */}
            <div className="mt-10">
                <Link href={"/create"}>
                    <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-all">
                        + Create New
                    </Button>
                </Link>
            </div>

            {/* Menu List */}
            <div className="space-y-3 mt-5">
                {MenuList.map((menu, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-3 p-2 cursor-pointer hover:bg-blue-600 rounded-md transition-colors 
                            ${path === menu.path ? "bg-blue-600 text-white" : "text-gray-300"}`}
                    >
                        <menu.icon className="w-6 h-6" />
                        <h2 className="text-lg font-medium">{menu.name}</h2>
                    </div>
                ))}
            </div>

            {/* Push the Credits Section to the Bottom */}
            <div className="flex-grow"></div>

            {/* Credits Section */}
            <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                <h2 className="text-lg mb-2">Available Credits: 5</h2>
                <Progress value={30} className="bg-gray-500 rounded-md">
                    <div
                        className="h-full bg-blue-500 rounded-md"
                        style={{ width: "30%" }}
                    ></div>
                </Progress>
                <h2 className="text-sm pt-2 text-gray-300">1 out of 5 credits used</h2>
                <Link href={"/dashboard/upgrade"} className="text-xs mt-3 block text-blue-400 hover:text-white">
                    Upgrade to Create more
                </Link>
            </div>
        </div>
    );
};

export default SideBar;
