"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const DashboardHeader = () => {
  return (
    <header className="px-8 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="flex items-center gap-3 hover:opacity-90 transition-opacity"
      >
        <Image
          src="/logo.svg"
          alt="SkillSure Logo"
          width={32}
          height={32}
          priority
        />
        <span className="text-xl font-bold tracking-tight text-gray-900">
          SkillSure
        </span>
      </Link>

      {/* User Avatar */}
      <UserButton afterSignOutUrl="/" appearance={{
        elements: {
          avatarBox: "w-10 h-10",
        }
      }} />
    </header>
  );
};

export default DashboardHeader;
