"use client";

import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { mockProducts, mockUser, type Product } from "@/lib/mockData";

export default function ProductsPage() {
  const [showGiftBundle, setShowGiftBundle] = useState(false);
  const [showGiftParty, setShowGiftParty] = useState(false);

  // Get top 5 based on Giver Profile
  const topByGiverProfile = mockProducts.slice(0, 5);

  // Group by category
  const productsByCategory = {
    Digital: mockProducts.filter((p) => p.category === "Digital"),
    Food: mockProducts.filter((p) => p.category === "Food"),
    Books: mockProducts.filter((p) => p.category === "Books"),
  };

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8 bg-linear-to-r from-[#EC4899] to-[#DB2777] bg-clip-text text-transparent">
          Products
        </h1>

        {/* Top 5 based on Giver Profile */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Top 5 based on your Giver Profile
          </h2>
          <div className="space-y-4">
            {topByGiverProfile.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Top 5 by Category */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Top 5 by Category
          </h2>
          {Object.entries(productsByCategory).map(([category, products]) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">
                {category}
              </h3>
              <div className="space-y-4">
                {products.slice(0, 5).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Gift Bundles */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Gift Bundles
          </h2>
          <button
            onClick={() => setShowGiftBundle(true)}
            className="w-full p-5 bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            Create a Gift Package
          </button>
        </section>

        {/* Group Gifting */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Group Gifting
          </h2>
          <button
            onClick={() => setShowGiftParty(true)}
            className="w-full p-5 bg-white dark:bg-gray-800 border-2 border-[#EC4899] text-[#EC4899] rounded-2xl font-semibold text-lg hover:bg-pink-50 dark:hover:bg-pink-900/30 transition-colors shadow-md"
          >
            Start a Gift Party
          </button>
        </section>

        {showGiftBundle && (
          <GiftBundleModal onClose={() => setShowGiftBundle(false)} />
        )}

        {showGiftParty && (
          <GiftPartyModal onClose={() => setShowGiftParty(false)} />
        )}
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

function GiftBundleModal({ onClose }: { onClose: () => void }) {
  const [budget, setBudget] = useState("");
  const [suggestedBundle, setSuggestedBundle] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCreateBundle = async () => {
    if (!budget) return;

    setLoading(true);
    // Simulate AI suggesting a bundle
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock bundle suggestion - 2-3 items within budget
    const budgetNum = parseInt(budget.replace(/[^0-9]/g, ""));
    const bundle = mockProducts
      .filter((p) => p.price <= budgetNum / 2) // Ensure 2+ items fit
      .slice(0, 3);

    setSuggestedBundle(bundle);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md modal-backdrop flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl modal-content border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Create a Gift Package
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {suggestedBundle.length === 0 ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Enter your budget
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="$50"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#EC4899] dark:focus:border-[#EC4899]"
              />
            </div>
            <button
              onClick={handleCreateBundle}
              disabled={loading}
              className="w-full p-3 bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white rounded-xl font-medium disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {loading ? "Creating bundle..." : "Get AI Suggestions"}
            </button>
          </>
        ) : (
          <div>
            <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Suggested Gift Package
            </h3>
            <div className="space-y-4 mb-4">
              {suggestedBundle.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-100">
              Total: $
              {suggestedBundle.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
            </div>
            <button
              onClick={onClose}
              className="w-full p-3 bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function GiftPartyModal({ onClose }: { onClose: () => void }) {
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [selectedGift, setSelectedGift] = useState<Product | null>(null);
  const [partyLink, setPartyLink] = useState("");

  const handleStartParty = () => {
    if (!selectedRecipient || !selectedGift) {
      alert("Please select a recipient and gift");
      return;
    }

    // Generate mock party link
    const link = `https://presently.app/gift-party/${Math.random()
      .toString(36)
      .substring(7)}`;
    setPartyLink(link);
  };

  if (partyLink) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-md modal-backdrop flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl modal-content border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Gift Party Created!
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Share this link with friends to contribute:
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl mb-4 break-all text-sm text-gray-800 dark:text-gray-200">
            {partyLink}
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(partyLink);
              alert("Link copied to clipboard!");
            }}
            className="w-full p-3 bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white rounded-xl font-medium mb-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Copy Link
          </button>
          <button
            onClick={onClose}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md modal-backdrop flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl modal-content border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Start a Gift Party
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
              Select Recipient
            </label>
            <input
              type="text"
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
              placeholder="Enter recipient name"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#EC4899] dark:focus:border-[#EC4899]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Select Gift
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {mockProducts.slice(0, 5).map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedGift(product)}
                  className={`w-full p-3 border rounded-xl text-left transition-colors ${
                    selectedGift?.id === product.id
                      ? "border-[#EC4899] bg-pink-50 dark:bg-pink-900/30 dark:border-[#EC4899]"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ${product.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartParty}
            className="w-full p-3 bg-[#EC4899] text-white rounded-lg font-medium"
          >
            Start Gift Party
          </button>
        </div>
      </div>
    </div>
  );
}
