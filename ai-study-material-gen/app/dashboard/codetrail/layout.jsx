import React from 'react'

const CodeTrailLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white text-gray-900">
      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
        CodeTrail
      </h1>

      {/* Subheading */}
      <p className="text-gray-600 text-lg md:text-xl mb-10 text-center max-w-lg">
        We’re crafting something amazing. Stay tuned for the launch!
      </p>

      {/* Tag */}
      <span className="px-8 py-3 text-lg font-medium bg-blue-600 text-white rounded-full shadow hover:shadow-lg transition">
        🚀 Coming Soon
      </span>
    </div>
  );
};

export default CodeTrailLayout;
