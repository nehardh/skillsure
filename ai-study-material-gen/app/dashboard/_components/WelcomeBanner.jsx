"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const WelcomeBanner = () => {
  const { user } = useUser();

  return (
    <div className="p-5 sm:p-6 md:p-8 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white w-full flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 shadow-lg">
      
      {/* Image Section */}
      <div className="flex-shrink-0 animate-float">
        <Image
          src="/laptop.png"
          alt="laptop"
          width={72} // smaller on mobile
          height={72}
          className="rounded-lg shadow-md sm:w-[90px] sm:h-[90px]"
        />
      </div>

      {/* Text Section */}
      <div className="text-center sm:text-left flex-1">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug">
          Hello, {user?.firstName || "there"} 👋
        </h2>
        <p className="mt-2 text-xs sm:text-sm md:text-base text-white/90 leading-relaxed max-w-xl mx-auto sm:mx-0">
          Welcome back! Ready to dive into a new course or finish your pending ones? 
          Let’s boost your skills today.
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomeBanner;
