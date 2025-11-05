"use client";

import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import {
  mockFriends,
  mockUser,
  getRecommendations,
  type Product,
} from "@/lib/mockData";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function FriendsPage() {
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [showFriendRequest, setShowFriendRequest] = useState(false);

  if (selectedFriend) {
    return (
      <FriendProfileView
        friendId={selectedFriend}
        onBack={() => setSelectedFriend(null)}
      />
    );
  }

  // Sort friends by upcoming birthdays and gift exchange count
  const sortedFriends = [...mockFriends].sort((a, b) => {
    if (a.giftExchangeCount && b.giftExchangeCount) {
      return b.giftExchangeCount - a.giftExchangeCount;
    }
    return 0;
  });

  return (
    <MainLayout>
      <div className="p-6">
        {/* My Profile Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-white/50 dark:border-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-linear-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
              <FaUser className="text-3xl text-gray-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                {mockUser.name}
              </h2>
              {mockUser.statusMessage && (
                <p className="text-gray-600 dark:text-gray-400">
                  {mockUser.statusMessage}
                </p>
              )}
            </div>
            <button className="text-[#EC4899] font-semibold hover:text-[#DB2777] transition-colors px-4 py-2 rounded-xl hover:bg-pink-50">
              Edit
            </button>
          </div>
        </div>

        {/* Friend List */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-linear-to-r from-[#EC4899] to-[#DB2777] bg-clip-text text-transparent">
            Friends
          </h2>
          <button
            onClick={() => setShowFriendRequest(true)}
            className="bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            + Friend Request
          </button>
        </div>

        <div className="space-y-4">
          {sortedFriends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => setSelectedFriend(friend.id)}
              className="w-full p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl card-hover flex items-center gap-4 border border-white/50 dark:border-gray-700/50"
            >
              <div className="w-16 h-16 bg-linear-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
                <FaUser className="text-2xl text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-1">
                  {friend.name}
                </div>
                {friend.statusMessage && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {friend.statusMessage}
                  </div>
                )}
                {friend.birthday && (
                  <div className="text-xs font-medium text-[#EC4899] bg-pink-50 px-2 py-1 rounded-full inline-block">
                    🎂 Birthday: {friend.birthday}
                  </div>
                )}
              </div>
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#EC4899] to-[#DB2777] flex items-center justify-center text-white shadow-lg">
                <span className="text-lg">→</span>
              </div>
            </button>
          ))}
        </div>

        {showFriendRequest && (
          <FriendRequestModal onClose={() => setShowFriendRequest(false)} />
        )}
      </div>
    </MainLayout>
  );
}

function FriendProfileView({
  friendId,
  onBack,
}: {
  friendId: string;
  onBack: () => void;
}) {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const friend = mockFriends.find((f) => f.id === friendId);

  const handleSeeRecommendations = async () => {
    setShowRecommendations(true);
    setLoading(true);

    if (mockUser.giverProfile && friend?.receiverProfile) {
      const recs = await getRecommendations(
        mockUser.giverProfile,
        friend.receiverProfile
      );
      setRecommendations(recs);
    }
    setLoading(false);
  };

  const handleNudge = () => {
    alert(
      `Nudge sent to ${friend?.name}! "Your friend is thinking about a gift for you! Want to update your wishlist?"`
    );
  };

  const handleChat = () => {
    window.location.href = `/chat?friend=${friendId}`;
  };

  if (showRecommendations) {
    return (
      <MainLayout>
        <div className="p-6">
          <button
            onClick={() => setShowRecommendations(false)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#EC4899] transition-colors"
          >
            <span className="text-xl">←</span>
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-3xl font-bold mb-6 bg-linear-to-r from-[#EC4899] to-[#DB2777] bg-clip-text text-transparent">
            Recommendations for {friend?.name}
          </h1>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-gray-500">
                <div
                  className="w-2 h-2 bg-[#EC4899] rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#EC4899] rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#EC4899] rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#EC4899] transition-colors"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back to Friends</span>
        </button>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-white/50 dark:border-gray-700/50">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
            <div className="w-20 h-20 bg-linear-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
              <FaUser className="text-3xl text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {friend?.name}
              </h1>
              {friend?.statusMessage && (
                <p className="text-gray-600 dark:text-gray-400">
                  {friend.statusMessage}
                </p>
              )}
            </div>
          </div>

          {friend?.receiverProfile && (
            <div className="space-y-5">
              <div>
                <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-100">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {friend.receiverProfile.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="bg-linear-to-r from-pink-100 to-purple-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-pink-200"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-gray-800">
                  Preferred Style
                </h3>
                <p className="text-gray-600 bg-gray-50 px-4 py-2 rounded-xl inline-block">
                  {friend.receiverProfile.style}
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-gray-800">
                  Preferred Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {friend.receiverProfile.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSeeRecommendations}
            className="w-full p-5 bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            See Recommendations
          </button>
          <button
            onClick={handleNudge}
            className="w-full p-5 bg-white dark:bg-gray-800 border-2 border-[#EC4899] text-[#EC4899] rounded-2xl font-semibold hover:bg-pink-50 dark:hover:bg-pink-900/30 transition-colors shadow-md"
          >
            Nudge
          </button>
          <button
            onClick={handleChat}
            className="w-full p-5 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-md"
          >
            Chat
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

function FriendRequestModal({ onClose }: { onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"userId" | "email" | "kakaoId">(
    "userId"
  );

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md modal-backdrop flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl modal-content border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Find Friends
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Search by
            </label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as any)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#EC4899] dark:focus:border-[#EC4899]"
            >
              <option value="userId">User ID</option>
              <option value="email">Email</option>
              <option value="kakaoId">Kakao ID</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Enter ${searchType}`}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#EC4899] dark:focus:border-[#EC4899]"
            />
          </div>

          <button
            className="w-full p-3 bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            onClick={() => {
              alert(`Searching for friend by ${searchType}: ${searchQuery}`);
              onClose();
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 card-hover">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
          <span className="font-bold text-lg text-[#EC4899]">
            ${product.price}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {product.description}
        </p>
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white px-4 py-3 rounded-xl text-center font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          View/Buy
        </a>
      </div>
    </div>
  );
}
