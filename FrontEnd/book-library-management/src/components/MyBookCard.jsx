import axios from "axios";
import { useState } from "react";

export default function MyBookCard({ myBook, refresh }) {
  const [status, setStatus] = useState(myBook.status);
  const [rating, setRating] = useState(myBook.rating || 0);

  async function handleStatusChange(e) {
    const newStatus = e.target.value;
    try {
      await axios.patch(
        `https://books-library-management-app-xo42.onrender.com/api/mybooks/${myBook.bookId._id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      setStatus(newStatus);
      if (refresh) await refresh();
    } catch {
      alert("Failed to update status");
    }
  }

  async function handleRatingChange(e) {
    const newRating = parseInt(e.target.value);
    try {
      await axios.patch(
        `https://books-library-management-app-xo42.onrender.com/api/mybooks/${myBook.bookId._id}/rating`,
        { rating: newRating },
        { withCredentials: true }
      );
      setRating(newRating);
      if (refresh) await refresh();
    } catch {
      alert("Failed to update rating");
    }
  }

  return (
    <div
      className="bg-white/30 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-gray-700 shadow-2xl rounded-3xl p-6 max-w-xs mx-auto flex flex-col items-start space-y-4 transition-shadow hover:shadow-3xl"
    >
      <h2 className="text-2xl font-extrabold text-pink-600 dark:text-yellow-300 drop-shadow-md mb-0">
        {myBook.bookId.title}
      </h2>
      <p className="italic text-purple-700 dark:text-yellow-200 font-semibold mb-2">{myBook.bookId.author}</p>

      <div className="w-full flex justify-between items-center">
        <label className="font-semibold text-purple-800 dark:text-yellow-300">Status:</label>
        <select
          value={status}
          onChange={handleStatusChange}
          className="rounded-full px-3 py-1 bg-white/90 dark:bg-black/60 text-purple-800 dark:text-yellow-100 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-yellow-400 transition"
        >
          <option value="Want to Read">Want to Read</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Read">Read</option>
        </select>
      </div>

      <div className="w-full flex justify-between items-center">
        <label className="font-semibold text-pink-600 dark:text-yellow-300">Rating:</label>
        <select
          value={rating}
          onChange={handleRatingChange}
          className="rounded-full px-3 py-1 bg-white/90 dark:bg-black/60 text-pink-600 dark:text-yellow-100 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-yellow-400 transition"
        >
          <option value={0}>Rate...</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} Star{n > 1 && "s"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
