import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function AddBook() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    author: "",
    coverImage: "",
    availability: true,
  });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">Access Denied</h1>
        <p className="text-lg text-red-400">You must be logged in to add books.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://books-library-management-app-xo42.onrender.com/api/books", form, {
        withCredentials: true,
      });
      alert("Book added successfully!");
      setForm({ title: "", author: "", coverImage: "", availability: true });
    } catch (err) {
      alert("Failed to add book: " + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-8 max-w-lg">
      <h1 className="text-5xl font-extrabold text-pink-600 mb-10 text-center drop-shadow-lg">
        Add a New Book
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-pink-400"
      >
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          className="w-full rounded-lg border border-pink-300 px-4 py-3 text-purple-900 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={form.title}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          className="w-full rounded-lg border border-pink-300 px-4 py-3 text-purple-900 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={form.author}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image URL (optional)"
          className="w-full rounded-lg border border-pink-300 px-4 py-3 text-purple-900 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={form.coverImage}
          onChange={handleChange}
          disabled={loading}
        />
        <label className="inline-flex items-center space-x-3">
          <input
            type="checkbox"
            name="availability"
            checked={form.availability}
            onChange={handleChange}
            className="form-checkbox h-6 w-6 text-pink-500"
            disabled={loading}
          />
          <span className="text-purple-800 font-semibold select-none">Available</span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-purple-900 text-white font-extrabold shadow-xl hover:from-purple-700 hover:to-pink-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
