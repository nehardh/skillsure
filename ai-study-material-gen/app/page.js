"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
  const { isSignedIn } = useUser(); // Get the user status from Clerk
  
  return (
    <div className={`min-h-screen bg-gradient-to-r from-indigo-700 to-blue-600 text-white flex flex-col items-center justify-center px-6 ${outfit.className}`}>
      {/* Top Right Profile */}
      <div className="absolute top-6 right-6">
        <UserButton />
      </div>
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl space-y-6 mt-8">
        <h1 className="text-6xl font-extrabold mb-6 text-shadow-xl drop-shadow-lg animate-fade-in">AI Study Material Generator</h1>
        <p className="text-2xl text-gray-300 mb-10 animate-slide-up">
          Transform any topic into structured study materials with AI. Generate notes, flashcards, and quizzes instantly.
        </p>
        
        {/* Conditionally render buttons */}
        {isSignedIn ? (
          <Link href="/dashboard">
            <button className="bg-green-500 hover:bg-green-700 px-8 py-4 rounded-full text-lg font-semibold transform transition duration-300 ease-in-out hover:scale-110 shadow-xl">
              Go to Dashboard
            </button>
          </Link>
        ) : (
          <Link href="/sign-in">
            <button className="bg-blue-700 hover:bg-blue-900 px-8 py-4 rounded-full text-lg font-semibold transform transition duration-300 ease-in-out hover:scale-110 shadow-xl">
              Get Started
            </button>
          </Link>
        )}
      </div>
      
      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl px-4 animate-fade-in mb-6">
        <FeatureCard title="🚀 AI-Powered Study Material" description="Generate structured study notes, flashcards, and quizzes from any topic." />
        <FeatureCard title="📜 Real-Time Course Outline" description="Automatically break down complex subjects into easy-to-follow outlines." />
        <FeatureCard title="⚡ Automated Processing" description="Using Inngest Functions, transform outlines into detailed study material." />
        <FeatureCard title="☁️ Secure Cloud Storage" description="All generated content is safely stored in a database for future access." />
        <FeatureCard title="🎯 Personalized Learning" description="Adaptive study paths based on your strengths and weaknesses." />
        <FeatureCard title="📊 AI-Driven Insights" description="Track progress and optimize learning with analytics and feedback." />
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="p-8 bg-gray-900 rounded-2xl shadow-xl text-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl border border-gray-700 animate-pop-in">
      <h3 className="text-3xl font-semibold mb-4 text-gray-100">{title}</h3>
      <p className="text-lg text-gray-400">{description}</p>
    </div>
  );
}
