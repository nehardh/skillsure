import { UserButton } from '@clerk/nextjs';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DashboardHeader = () => {
  return (
    <div className="p-5 shadow-lg flex justify-between items-center bg-white border-b-2 border-gray-200 rounded-lg">
      {/* Logo and Title */}
      <Link href="/dashboard">
        <div className="flex gap-2 items-center cursor-pointer transition-transform hover:scale-105">
          <Image src="/logo.svg" alt="SkillSure Logo" width={30} height={30} priority={true} />
          <h2 className="font-extrabold text-2xl text-gray-800 hover:text-blue-600 transition-colors">
            SkillSure
          </h2>
        </div>
      </Link>

      {/* User Button */}
      <div className="flex items-center gap-3">
        <UserButton 
          appearance={{
            elements: {
              userButton: 'rounded-full bg-blue-500 hover:bg-blue-600 text-white p-2 transition',
            },
          }} 
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
