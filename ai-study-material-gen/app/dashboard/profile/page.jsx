"use client"
import React from "react";
import { useUser } from "@clerk/nextjs";

const ProfilePage = () => {
  const { user } = useUser();

  if (!user) {
    return <div className="text-center mt-20">Loading user profile...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
        <img
          src={user.imageUrl}
          alt="User Profile"
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h1 className="text-lg font-bold">{user.fullName}</h1>
        <p className="text-gray-600 text-sm">{user.primaryEmailAddress?.emailAddress}</p>
        <p className="text-gray-400 text-xs mt-1">
          Account Created: {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
