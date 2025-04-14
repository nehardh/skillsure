"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const DashboardHeader = () => {
  return (
    <header className="px-6 py-4 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-90 transition">
        <Image
          src="/logo.svg"
          alt="SkillSure Logo"
          width={28}
          height={28}
          priority
        />
        <span className="text-xl font-semibold text-gray-800">SkillSure</span>
      </Link>

      {/* User Avatar */}
      <UserButton afterSignOutUrl="/" />
    </header>
  );
};

export default DashboardHeader;
