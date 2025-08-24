import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function BookCard({ book }) {
  const { user } = useAuth();

  async function handleAdd() {
    if (!user) {
      alert("Please log in to add to My Books!");
      return;
    }
    try {
      await axios.post(
        `https://books-library-management-app-xo42.onrender.com/api/mybooks/${book._id}`,
        {},
        { withCredentials: true }
      );
      alert("Book added to My Books!");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Could not add book."));
    }
  }

  return (
    <div
      className="bg-white/30 dark:bg-black/50 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-3xl shadow-2xl p-6 max-w-xs mx-auto
      transform transition-transform duration-300 hover:scale-105 cursor-pointer hover:shadow-3xl"
    >
      <div className="h-48 w-full overflow-hidden rounded-2xl mb-4 shadow-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className="object-cover w-full h-full rounded-2xl"
          />
        ) : (
          <div className="text-7xl text-purple-200 dark:text-yellow-300 select-none">
            📖
          </div>
        )}
      </div>
      <h2 className="text-2xl font-extrabold text-purple-800 dark:text-yellow-300 drop-shadow-md mb-1">
        {book.title}
      </h2>
      <p className="italic text-pink-600 dark:text-yellow-200 font-semibold mb-4">{book.author}</p>
      <button
        onClick={handleAdd}
        className="w-full py-3 rounded-full bg-gradient-to-r from-purple-700 via-pink-600 to-pink-400 dark:from-black dark:via-purple-900 dark:to-yellow-500
        text-white dark:text-black font-semibold shadow-lg hover:from-pink-400 hover:to-purple-700 dark:hover:from-yellow-600 dark:hover:to-black transition duration-200"
      >
        Want to Read
      </button>
    </div>
  );
}
