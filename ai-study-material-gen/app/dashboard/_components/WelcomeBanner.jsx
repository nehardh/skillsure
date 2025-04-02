"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const WelcomeBanner = () => {
    const { user } = useUser();
    
    return (
        <div className="p-6 md:p-8 rounded-lg bg-gradient-to-r from-blue-200 to-blue-700 text-white w-full flex flex-col md:flex-row items-center gap-6 shadow-xl">
            {/* Image Section */}
            <div className="flex-shrink-0">
                <Image 
                    src={"/laptop.png"}
                    alt="laptop"
                    width={120}
                    height={120}
                    className="rounded-lg"
                />
            </div>

            {/* Text Section */}
            <div className="text-center md:text-left">
                <h2 className="font-extrabold text-3xl md:text-4xl tracking-wide">
                    Hello, {user?.firstName || "there"}!
                </h2>
                <p className="mt-3 text-lg md:text-xl max-w-xl mx-auto md:mx-0">
                    Welcome back! It's time to start a new course and complete your pending ones. Let's get started and make some progress.
                </p>
            </div>
        </div>
    );
};

export default WelcomeBanner;
