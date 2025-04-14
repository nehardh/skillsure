"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const WelcomeBanner = () => {
  const { user } = useUser();

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-400/80 to-blue-600 text-white w-full flex flex-col md:flex-row items-center gap-6 shadow-lg transition-all duration-300">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <Image
          src="/laptop.png"
          alt="laptop"
          width={100}
          height={100}
          className="rounded-xl"
        />
      </div>

      {/* Text Section */}
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Hello, {user?.firstName || "there"}!
        </h2>
        <p className="mt-2 text-sm md:text-base text-white/90 max-w-xl">
          Welcome back! Ready to dive into a new course or finish your pending ones? Let’s boost your skills today.
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
