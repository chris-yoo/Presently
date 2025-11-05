"use client";

import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import {
  mockUser,
  mockGiftHistory,
  type GiftHistory,
  type WishlistItem,
} from "@/lib/mockData";
import { FaUser } from "react-icons/fa";

export default function MyPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(
    mockUser.receiverProfile?.wishlist || []
  );
  const [showAddWishlist, setShowAddWishlist] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8 bg-linear-to-r from-[#EC4899] to-[#DB2777] bg-clip-text text-transparent">
          MyPage
        </h1>

        {/* Profile Section */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-white/50 dark:border-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-linear-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
              <FaUser className="text-3xl text-gray-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {mockUser.name}
              </h2>
              {mockUser.statusMessage && (
                <p className="text-gray-600">{mockUser.statusMessage}</p>
              )}
            </div>
            <button className="text-[#EC4899] font-semibold hover:text-[#DB2777] transition-colors px-4 py-2 rounded-xl hover:bg-pink-50">
              Edit
            </button>
          </div>
        </section>

        {/* Gift History */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Gift History
          </h2>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-5 bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-gray-100">
                Sent
              </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockGiftHistory
                .filter((h) => h.type === "sent")
                .map((history) => (
                  <GiftHistoryItem key={history.id} history={history} />
                ))}
            </div>
            <div className="p-5 bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-t border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-gray-100">
                Received
              </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockGiftHistory
                .filter((h) => h.type === "received")
                .map((history) => (
                  <GiftHistoryItem key={history.id} history={history} />
                ))}
            </div>
          </div>
        </section>

        {/* Show to Me - Private Feedback */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Show to Me
          </h2>
          <button
            onClick={() => setShowFeedback(true)}
            className="w-full p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-[#EC4899] text-[#EC4899] rounded-2xl font-semibold hover:bg-pink-50 dark:hover:bg-pink-900/30 transition-colors shadow-md"
          >
            Rate Received Gifts (Private)
          </button>
        </section>

        {/* Profile & Preference Management */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Preferences
          </h2>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 space-y-5">
            <div>
              <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-100">
                My Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {mockUser.receiverProfile?.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="bg-linear-to-r from-pink-100 to-purple-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-pink-200"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <button className="w-full p-4 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Re-take Preference Survey
            </button>
          </div>
        </section>

        {/* Wishlist Management */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Wishlist
            </h2>
            <button
              onClick={() => setShowAddWishlist(true)}
              className="text-[#EC4899] font-semibold hover:text-[#DB2777] transition-colors px-4 py-2 rounded-xl hover:bg-pink-50"
            >
              + Add Item
            </button>
          </div>
          {wishlist.length === 0 ? (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-10 text-center shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg">
                Your wishlist is empty
              </p>
              <button
                onClick={() => setShowAddWishlist(true)}
                className="text-[#EC4899] font-semibold hover:text-[#DB2777] transition-colors"
              >
                Add your first wishlist item
              </button>
            </div>
          ) : (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="p-5 flex justify-between items-center hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setWishlist(wishlist.filter((i) => i.id !== item.id))
                    }
                    className="text-red-500 ml-4 hover:text-red-600 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Settings & Support */}
        <section>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
            <button className="w-full p-5 text-left font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
              Notice Board
            </button>
            <button className="w-full p-5 text-left font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
              Settings
            </button>
            <button className="w-full p-5 text-left font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
              Support
            </button>
          </div>
        </section>

        {showAddWishlist && (
          <AddWishlistModal
            onClose={() => setShowAddWishlist(false)}
            onAdd={(item) => setWishlist([...wishlist, item])}
          />
        )}

        {showFeedback && (
          <PrivateFeedbackModal onClose={() => setShowFeedback(false)} />
        )}
      </div>
    </MainLayout>
  );
}

function GiftHistoryItem({ history }: { history: GiftHistory }) {
  return (
    <div className="p-5 flex items-center gap-4 hover:bg-gray-50/30 transition-colors">
      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md shrink-0">
        <img
          src={history.product.image}
          alt={history.product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 mb-1 truncate">
          {history.product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          {history.type === "sent" ? "To" : "From"}: {history.recipientOrSender}
        </p>
        <p className="text-xs text-gray-500">{history.date}</p>
      </div>
      <span className="font-bold text-lg text-[#EC4899] shrink-0">
        ${history.product.price}
      </span>
    </div>
  );
}

function AddWishlistModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (item: WishlistItem) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;

    onAdd({
      id: `wishlist-${Date.now()}`,
      name,
      description,
      link,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md modal-backdrop flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700 modal-content">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add to Wishlist</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Wireless Headphones"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#EC4899] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any details..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#EC4899] transition-colors"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Link (Optional)
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#EC4899] transition-colors"
            />
          </div>
          <button
            onClick={handleAdd}
            className="w-full p-4 bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

function PrivateFeedbackModal({ onClose }: { onClose: () => void }) {
  const [selectedGift, setSelectedGift] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const receivedGifts = mockGiftHistory.filter((h) => h.type === "received");

  const handleSubmit = () => {
    if (!selectedGift || rating === 0) return;

    alert(
      `Private feedback saved! This will only be used to improve your future recommendations.`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md modal-backdrop flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700 modal-content">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Private Feedback
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-xl border border-pink-100 dark:border-pink-800/30">
          Your feedback is 100% private and will only be used to improve your
          future recommendations.
        </p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Select Gift
            </label>
            <select
              value={selectedGift}
              onChange={(e) => setSelectedGift(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-[#EC4899] dark:focus:border-[#EC4899] transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option value="">Choose a gift...</option>
              {receivedGifts.map((gift) => (
                <option key={gift.id} value={gift.id}>
                  {gift.product.name} (from {gift.recipientOrSender})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Rating
            </label>
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-4xl transition-transform hover:scale-110 ${
                    star <= rating
                      ? "text-yellow-400 dark:text-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {["Loved it", "Not for me"].map((label) => (
                <button
                  key={label}
                  onClick={() => setFeedback(label)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    feedback === label
                      ? "bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full p-4 bg-linear-to-r from-[#EC4899] to-[#DB2777] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
