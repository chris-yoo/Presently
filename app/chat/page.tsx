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

export default function ChatPage() {
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [showGiverForm, setShowGiverForm] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    Array<{ type: "ai" | "user"; content: string; products?: Product[] }>
  >([]);

  const handleFriendSelect = async (friendId: string) => {
    setSelectedFriend(friendId);
    setLoading(true);

    const friend = mockFriends.find((f) => f.id === friendId);
    if (friend && mockUser.giverProfile && friend.receiverProfile) {
      const recs = await getRecommendations(
        mockUser.giverProfile,
        friend.receiverProfile
      );
      setRecommendations(recs);
      setChatMessages([
        {
          type: "ai",
          content: `Here are some gift recommendations for ${friend.name}!`,
          products: recs,
        },
      ]);
    }
    setLoading(false);
  };

  const handleRecommendForNonFriend = () => {
    setShowGiverForm(true);
  };

  const handleGiverFormSubmit = async (formData: any) => {
    setLoading(true);
    const recs = await getRecommendations(formData);
    setRecommendations(recs);
    setChatMessages([
      {
        type: "ai",
        content:
          "Here are some gift recommendations based on your preferences!",
        products: recs,
      },
    ]);
    setShowGiverForm(false);
    setLoading(false);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages([...chatMessages, { type: "user", content: chatInput }]);
    setChatInput("");
    setLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const refinedRecs = recommendations.slice(0, 3); // Simple mock refinement
    setRecommendations(refinedRecs);
    setChatMessages((prev) => [
      ...prev,
      {
        type: "ai",
        content: "Here are some refined recommendations based on your request!",
        products: refinedRecs,
      },
    ]);
    setLoading(false);
  };

  if (showGiverForm) {
    return (
      <MainLayout>
        <GiverProfileForm
          onSubmit={handleGiverFormSubmit}
          onBack={() => setShowGiverForm(false)}
        />
      </MainLayout>
    );
  }

  if (selectedFriend) {
    const friend = mockFriends.find((f) => f.id === selectedFriend);
    return (
      <MainLayout>
        <div className="p-6">
          <button
            onClick={() => {
              setSelectedFriend(null);
              setRecommendations([]);
              setChatMessages([]);
            }}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#EC4899] transition-colors"
          >
            <span className="text-xl">←</span>
            <span className="font-medium">Back to Friends</span>
          </button>

          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
            <div className="w-14 h-14 bg-linear-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
              <FaUser className="text-2xl text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {friend?.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>

          <div className="space-y-4 mb-6 min-h-[400px]">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] ${
                    msg.type === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-4 rounded-2xl shadow-md ${
                      msg.type === "user"
                        ? "bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white rounded-tr-none"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-700"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.products && (
                    <div className="mt-3 space-y-3">
                      {msg.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {loading && (
            <div className="text-center py-8">
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
          )}

          <form
            onSubmit={handleChatSubmit}
            className="flex gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/50 dark:border-gray-700/50"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Refine your search (e.g., 'Show me something more practical')"
              className="flex-1 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#EC4899] dark:focus:border-[#EC4899] transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Send
            </button>
          </form>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-[#EC4899] to-[#DB2777] bg-clip-text text-transparent">
            Select a Friend
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Choose someone to get personalized gift recommendations
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {mockFriends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => handleFriendSelect(friend.id)}
              className="w-full p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl card-hover flex items-center gap-4 border border-white/50 dark:border-gray-700/50"
            >
              <div className="w-16 h-16 bg-linear-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
                <FaUser className="text-3xl text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-1">
                  {friend.name}
                </div>
                {friend.statusMessage && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {friend.statusMessage}
                  </div>
                )}
              </div>
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#EC4899] to-[#DB2777] flex items-center justify-center text-white shadow-lg">
                <span className="text-lg">→</span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleRecommendForNonFriend}
          className="w-full p-5 bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
        >
          Recommend for someone not on my list
        </button>
      </div>
    </MainLayout>
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

function GiverProfileForm({
  onSubmit,
  onBack,
}: {
  onSubmit: (data: any) => void;
  onBack: () => void;
}) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [formData, setFormData] = useState({
    recipientType: [] as string[],
    occasion: "",
    budget: "",
    ageRange: "",
    interests: [] as string[],
    categories: [] as string[],
  });

  const screens = [
    {
      question: "Who do you primarily give gifts to?",
      type: "multi-select",
      options: ["Friends", "Partner", "Parents", "Work Colleagues", "Siblings"],
      field: "recipientType",
    },
    {
      question: "What's the main occasion?",
      type: "select",
      options: [
        "Birthday",
        "Anniversary",
        "Housewarming",
        "Promotion",
        "Thank You",
        "Holiday",
        "Other",
      ],
      field: "occasion",
    },
    {
      question: "What's your usual budget?",
      type: "select",
      options: ["<$10", "$10-$30", "$30-$50", "$50-$80", "$80+"],
      field: "budget",
    },
    {
      question: "What's the recipient's usual age range?",
      type: "select",
      options: ["10s", "20s", "30s", "40s", "50s", "60s+"],
      field: "ageRange",
    },
    {
      question: "What interests do you often consider?",
      type: "multi-select",
      options: [
        "Sports",
        "Cooking",
        "Travel",
        "Reading",
        "Fashion",
        "Interior",
        "Wellness",
        "Beauty",
        "Tech",
      ],
      field: "interests",
    },
    {
      question: "What categories do you prefer?",
      type: "multi-select",
      options: [
        "Digital",
        "Fashion",
        "Accessories",
        "Beauty",
        "Food",
        "Kitchen",
        "Sports",
        "Books",
        "Vouchers",
      ],
      field: "categories",
    },
  ];

  const currentScreenData = screens[currentScreen];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    } else {
      onBack();
    }
  };

  const handleSelect = (value: string) => {
    if (currentScreenData.type === "multi-select") {
      const current = formData[
        currentScreenData.field as keyof typeof formData
      ] as string[];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setFormData({ ...formData, [currentScreenData.field]: updated });
    } else {
      setFormData({ ...formData, [currentScreenData.field]: value });
    }
  };

  const isValueSelected = (value: string) => {
    if (currentScreenData.type === "multi-select") {
      const current = formData[
        currentScreenData.field as keyof typeof formData
      ] as string[];
      return current.includes(value);
    } else {
      return (
        formData[currentScreenData.field as keyof typeof formData] === value
      );
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-500">
            Question {currentScreen + 1} of {screens.length}
          </div>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-[#EC4899] to-[#DB2777] rounded-full transition-all duration-300"
              style={{
                width: `${((currentScreen + 1) / screens.length) * 100}%`,
              }}
            />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-8 text-gray-800 leading-tight">
          {currentScreenData.question}
        </h2>
      </div>

      <div className="space-y-3 mb-8">
        {currentScreenData.options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`w-full p-5 rounded-2xl text-left transition-all duration-200 transform ${
              isValueSelected(option)
                ? "bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white shadow-lg scale-[1.02]"
                : "bg-white text-gray-800 hover:bg-gray-50 hover:shadow-md border-2 border-gray-100"
            }`}
          >
            <span className="font-semibold text-lg">{option}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleBack}
          className="flex-1 p-4 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 p-4 bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          {currentScreen === screens.length - 1
            ? "Get Recommendations"
            : "Next"}
        </button>
      </div>
    </div>
  );
}
