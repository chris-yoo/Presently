"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaComments, FaUsers, FaGift, FaUser } from "react-icons/fa";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: "Chat", href: "/chat", icon: <FaComments /> },
  { name: "Friends", href: "/friends", icon: <FaUsers /> },
  { name: "Products", href: "/products", icon: <FaGift /> },
  { name: "MyPage", href: "/mypage", icon: <FaUser /> },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 z-50 shadow-lg">
      <div className="flex justify-around items-center h-20 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-[#EC4899] bg-pink-50/50 dark:bg-pink-900/30"
                  : "text-gray-500 dark:text-gray-400 hover:text-[#EC4899] dark:hover:text-[#EC4899]"
              }`}
            >
              <span className="text-2xl mb-1 transform transition-transform duration-200">
                {item.icon}
              </span>
              <span
                className={`text-xs font-semibold ${
                  isActive
                    ? "text-[#EC4899]"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.name}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#EC4899] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
