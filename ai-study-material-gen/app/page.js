"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className={`min-h-screen flex flex-col items-center bg-white text-gray-900 ${outfit.className}`}>
      
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-4 shadow-sm bg-white fixed top-0 z-50">
        <h1 className="text-xl font-bold">AI StudyGen</h1>
        <div>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href="/sign-in">
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center pt-32 pb-20 px-6 bg-gradient-to-r from-blue-400 to-indigo-500 text-white w-full">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6">Generate Study Material in Seconds</h2>
        <p className="text-xl max-w-2xl mx-auto text-gray-200">
          AI-powered notes, quizzes, and flashcards—customized from your course layout.
        </p>
        <div className="mt-8">
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <button className="px-8 py-4 text-lg rounded-full bg-white text-blue-600 hover:bg-gray-200 transition shadow">
              {isSignedIn ? "Go to Dashboard" : "Get Started"}
            </button>
          </Link>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 px-6 max-w-6xl w-full text-center">
        <div className="grid md:grid-cols-3 gap-6">
          <Feature title="Fast Generation" desc="Get complete notes & quizzes in seconds using AI." />
          <Feature title="Personalized Output" desc="Tailored to your chapter structure and level." />
          <Feature title="Revision Tools" desc="Flashcards and practice sets included." />
        </div>
      </section>

      {/* Demo Screenshot */}
      {/* <section className="py-20 px-6 text-center bg-gray-50">
        <h3 className="text-3xl font-bold mb-6">See What You Get</h3>
        <p className="text-gray-600 mb-10">Here’s a glimpse of the study materials AI StudyGen creates for you.</p>
        <div className="flex justify-center">
          <img src="/demo-material-preview.png" alt="Study Material Preview" className="rounded-xl shadow-lg max-w-3xl w-full" />
        </div>
      </section> */}

      {/* How it Works */}
      <section className="py-20 px-6 max-w-6xl w-full text-center">
        <h3 className="text-3xl font-bold mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <Step title="1. Upload Course Layout" desc="Add your chapters or topic structure. The more detailed, the better." />
          <Step title="2. Generate with AI" desc="Our engine builds notes, flashcards, and quizzes tailored to your needs." />
          <Step title="3. Learn & Revise" desc="Access, revise, and track your study materials anytime from your dashboard." />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 w-full py-20 text-center px-6">
        <h3 className="text-3xl font-bold mb-12">What Students Say</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Testimonial name="Anjali" quote="This platform saved me hours during finals!" />
          <Testimonial name="Rohit" quote="The notes and quizzes are top-notch. Love the interface too." />
          <Testimonial name="Sara" quote="Super easy to use and really helps break down tough subjects." />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-left">
        <h3 className="text-2xl font-bold mb-6 text-center">FAQs</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Is it free to use?</h4>
            <p className="text-gray-600">You can try for free. Premium unlocks all chapters & quizzes.</p>
          </div>
          <div>
            <h4 className="font-semibold">What input does it need?</h4>
            <p className="text-gray-600">Just provide your chapter or course structure – that’s it!</p>
          </div>
          <div>
            <h4 className="font-semibold">Can I download the content?</h4>
            <p className="text-gray-600">Yes! You can export or print your notes and quizzes anytime.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Start Generating Smarter Study Material</h2>
        <p className="text-lg text-gray-600 mb-8">Join hundreds of students transforming how they learn.</p>
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <button className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg hover:bg-blue-700 transition shadow-md">
            {isSignedIn ? "Go to Dashboard" : "Get Started Free"}
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 border-t text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AI StudyGen. All rights reserved.
      </footer>
    </div>
  );
}

function Step({ title, desc }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function Testimonial({ name, quote }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-left hover:shadow-lg transition">
      <p className="italic text-gray-800 mb-3">“{quote}”</p>
      <h5 className="text-sm font-semibold text-gray-600">— {name}</h5>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
