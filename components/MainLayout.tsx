"use client";

import BottomNavigation from "./BottomNavigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#FEFCE8] to-[#FEF3C7] dark:from-gray-900 dark:to-gray-800 pb-24">
      <div className="max-w-2xl mx-auto">{children}</div>
      <BottomNavigation />
    </div>
  );
}
