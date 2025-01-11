"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function M5Exchange() {
  const router = useRouter(); // Initialize useRouter for programmatic navigation

  return (
    <main className="relative flex items-center justify-center min-h-screen">
      {/* Background Banner */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/banner.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Logo */}
      <div className="absolute top-4 left-4">
        <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
      </div>

      {/* Work in Progress Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-10">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white">Work in Progress</h1>
          <p className="text-lg text-gray-300 mt-2">
            The m⁵ Exchange is under development. Stay tuned for updates!
          </p>
        </div>
        {/* Back to Homepage Button */}
        <button
          onClick={() => router.push("/")} // Navigate to the homepage
          className="px-6 py-2 rounded bg-[#FFDFDE] text-[#6A7BA2] font-semibold hover:bg-[#FFCCCC] transition"
        >
          Back to Homepage
        </button>
      </div>
    </main>
  );
}
