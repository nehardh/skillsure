"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Outfit } from "next/font/google";
import { useEffect, useState } from "react";

const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
  const { isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);

  // For simple fade-in on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`${outfit.className} min-h-screen flex flex-col items-center bg-gradient-to-b from-white via-indigo-50 to-white text-gray-900 transition-colors duration-1000`}
    >
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-indigo-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-700 select-none cursor-default">
            SkillSure
          </h1>
          <div>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link href="/sign-in" legacyBehavior>
                <a className="inline-block px-6 py-2 font-semibold text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1">
                  Sign In
                </a>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className={`max-w-7xl w-full px-8 mt-24 mb-32 flex flex-col md:flex-row items-center gap-16 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } transition-all duration-700`}
      >
        {/* Left - Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-6xl font-extrabold leading-tight tracking-tight text-indigo-800">
            AI-Powered Study Material
            <span className="block text-indigo-500 mt-2">Tailored to How You Learn.</span>
          </h2>
          <p className="mt-8 max-w-xl mx-auto md:mx-0 text-lg text-gray-700 leading-relaxed">
            SkillSure uses advanced Transformer-based AI models to generate notes,
            quizzes, and flashcards instantly — personalized to your syllabus,
            verified for accuracy, and designed for deeper learning.
          </p>
          <div className="mt-20">
            <Link href={isSignedIn ? "/dashboard" : "/sign-in"} legacyBehavior>
              <a
                className="inline-flex items-center gap-3 px-12 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2 transition-transform hover:scale-105"
                aria-label="Get Started"
              >
                {isSignedIn ? "Go to Dashboard" : "Get Started — Free"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Link>
          </div>
        </div>

        {/* Right - Illustration */}
        <div className="flex-1 max-w-md mx-auto">
          {/* Refined SVG placeholder - soft colors */}
          <svg
            viewBox="0 0 600 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-xl rounded-3xl"
            aria-hidden="true"
          >
            <rect width="600" height="400" rx="30" fill="#e0e7ff" />
            <circle cx="300" cy="200" r="140" fill="#4f46e5" />
            <rect
              x="230"
              y="170"
              width="140"
              height="60"
              rx="15"
              fill="white"
              stroke="#4338ca"
              strokeWidth="5"
            />
            <text
              x="300"
              y="210"
              textAnchor="middle"
              fill="#4338ca"
              fontWeight="800"
              fontSize="28"
              fontFamily="Poppins, sans-serif"
              letterSpacing="0.05em"
            >
              AI Study
            </text>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl w-full px-8 grid md:grid-cols-4 gap-10 mb-36">
        <Feature
          title="⚡ Fast Generation"
          desc="Create structured study material in seconds using GPT-3 & Gemini AI."
          icon={
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          }
        />
        <Feature
          title="🎯 Personalized Learning"
          desc="Adapts to your chapter structure and individual learning style."
          icon={
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          }
        />
        <Feature
          title="🛡 Bias & Fact Checks"
          desc="Built-in bias detection and knowledge-base verification for trustworthy content."
          icon={
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          }
        />
        <Feature
          title="🎙 Accessibility"
          desc="Speech-to-text integration transforms lectures into ready-made notes."
          icon={
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M12 1v11m0 0a4 4 0 004 4H8a4 4 0 004-4zm0 11v4m-4 0h8" />
            </svg>
          }
        />
      </section>

      {/* Why It Works */}
      <section className="max-w-5xl w-full px-8 mb-36">
        <h3 className="text-4xl font-extrabold text-center text-indigo-800 mb-12">Why SkillSure Works</h3>
        <div className="grid md:grid-cols-2 gap-14 text-gray-700 text-lg leading-relaxed">
          <p className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100">
            Our system leverages cutting-edge transformer architectures, transfer learning,
            and multitask learning to generate high-quality content. We incorporate bias
            detection and fact verification to ensure accuracy and trustworthiness.
          </p>
          <p className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100">
            Accessibility is at our core — speech-to-text makes learning inclusive,
            while adaptive personalization tailors materials to each learner's style.
            The result: scalable, accurate, and highly engaging study materials in seconds.
          </p>
        </div>
      </section>

      {/* Proven Performance */}
      <section className="max-w-5xl w-full px-8 mb-36 text-center">
        <h3 className="text-4xl font-extrabold text-indigo-800 mb-14">Proven Performance</h3>
        <div className="grid md:grid-cols-3 gap-12">
          <Stat value="2.5s" label="Average Generation Time" />
          <Stat value="98%" label="Content Accuracy (post-verification)" />
          <Stat value="1000+" label="Materials Generated" />
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-5xl w-full px-8 mb-36">
        <h3 className="text-4xl font-extrabold text-indigo-800 mb-16 text-center">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-12">
          <Step step="1" title="Upload Topics" desc="Add chapters or keywords to set your learning focus." />
          <Step step="2" title="AI Generation" desc="Transformer-based models create notes, flashcards, and quizzes instantly." />
          <Step step="3" title="Review & Revise" desc="Access verified content, track progress, and retain knowledge." />
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl w-full px-8 mb-36 bg-indigo-50 rounded-3xl py-14 shadow-inner">
        <h3 className="text-4xl font-extrabold text-indigo-700 mb-16 text-center">Trusted by Students</h3>
        <div className="grid md:grid-cols-3 gap-14 max-w-5xl mx-auto">
          <Testimonial name="Anjali" quote="SkillSure saved me hours during finals. The flashcards are a lifesaver." />
          <Testimonial name="Rohit" quote="Accurate, well-structured notes that match my syllabus perfectly." />
          <Testimonial name="Sara" quote="The speech-to-text feature makes it super easy to learn on the go." />
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl w-full px-8 mb-20 text-center">
        <h2 className="text-5xl font-extrabold text-indigo-900 mb-6">Revolutionize How You Study</h2>
        <p className="max-w-xl mx-auto text-xl text-indigo-700 mb-10 leading-relaxed">
          Join students and educators transforming education with AI-powered learning.
        </p>
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"} legacyBehavior>
          <a
            className="inline-block px-16 py-5 text-lg font-semibold text-white bg-indigo-700 rounded-3xl shadow-2xl hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2 transition-transform hover:scale-110"
            aria-label="Get Started"
          >
            {isSignedIn ? "Go to Dashboard" : "Get Started Free"}
          </a>
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-indigo-100 bg-white/90 backdrop-blur-md text-center text-sm text-indigo-400 py-6 select-none">
        © {new Date().getFullYear()} SkillSure. All rights reserved.
      </footer>
    </div>
  );
}

/* --- Components --- */
function Feature({ title, desc, icon }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-indigo-100 hover:shadow-xl transition transform hover:-translate-y-1 cursor-default flex flex-col items-center text-center gap-4">
      <div className="text-indigo-600">{icon}</div>
      <h4 className="text-2xl font-semibold text-indigo-700">{title}</h4>
      <p className="text-gray-700 max-w-xs">{desc}</p>
    </div>
  );
}

function Step({ step, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-indigo-100 hover:shadow-xl transition transform hover:-translate-y-1 cursor-default">
      <span className="inline-block px-3 py-1 rounded-full text-indigo-600 font-semibold bg-indigo-100 mb-4">
        Step {step}
      </span>
      <h4 className="text-2xl font-semibold text-indigo-800 mb-3">{title}</h4>
      <p className="text-gray-700">{desc}</p>
    </div>
  );
}

function Testimonial({ name, quote }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-md border border-indigo-200 cursor-default hover:shadow-xl transition flex flex-col justify-between h-full">
      <p className="italic text-gray-800 text-lg mb-6 leading-relaxed">“{quote}”</p>
      <h5 className="text-indigo-700 font-semibold text-right text-lg">— {name}</h5>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="bg-white p-10 rounded-3xl border border-indigo-100 shadow-lg cursor-default">
      <div className="text-5xl font-extrabold text-indigo-700">{value}</div>
      <div className="text-indigo-600 mt-3 text-lg">{label}</div>
    </div>
  );
}
