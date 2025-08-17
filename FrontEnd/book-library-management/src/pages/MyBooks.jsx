import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import MyBookCard from "../components/MyBookCard";

export default function MyBooks() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyBooks() {
      if (!user) return;
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/api/mybooks/", {
          withCredentials: true,
        });
        setBooks(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (err) {
        setBooks([]);
      }
      setLoading(false);
    }
    fetchMyBooks();
  }, [user]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-extrabold text-pink-600 mb-12 text-center drop-shadow-lg">
        My Bookshelf
      </h1>

      {!user ? (
        <p className="text-purple-400 text-center text-3xl font-extrabold">
          Please log in to see your books.
        </p>
      ) : loading ? (
        <div className="flex justify-center items-center py-28">
          <p className="text-purple-700 text-3xl font-extrabold animate-pulse">
            Loading your books...
          </p>
        </div>
      ) : books.length === 0 ? (
        <div className="flex justify-center items-center py-28">
          <p className="text-pink-600 text-3xl font-extrabold">
            No books in your bookshelf yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {books.map((myBook) => (
            <MyBookCard
              key={myBook._id}
              myBook={myBook}
              refresh={async () => {
                const res = await axios.get("http://localhost:8000/api/mybooks/", {
                  withCredentials: true,
                });
                setBooks(Array.isArray(res.data) ? res.data : res.data.data || []);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
