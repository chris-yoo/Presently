"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [isLoggedIn] = useState(false); // Mock: assume not logged in initially

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#FEFCE8] to-[#FEF3C7] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/50 dark:border-gray-700/50">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 bg-linear-to-r from-[#EC4899] to-[#DB2777] bg-clip-text text-transparent">
              Welcome to Presently
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              AI-Powered Personalized Gift Recommendation Service
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <button className="w-full p-4 bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Sign in with Google
            </button>
            <button className="w-full p-4 bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Sign in with Kakao
            </button>
            <button className="w-full p-4 bg-black text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Sign in with Apple
            </button>
          </div>

          <div className="mt-8 text-center space-y-3">
            <Link
              href="/onboarding"
              className="block text-[#EC4899] font-semibold hover:text-[#DB2777] transition-colors"
            >
              Skip to onboarding (Demo)
            </Link>
            <Link
              href="/chat"
              className="block text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Skip to app (Demo)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEFCE8] flex items-center justify-center">
      <Link
        href="/chat"
        className="bg-[#EC4899] text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-pink-600 transition"
      >
        Go to App
      </Link>
    </div>
  );
}
