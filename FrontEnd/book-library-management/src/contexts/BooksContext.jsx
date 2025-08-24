import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BooksContext = createContext();

export function useBooks() {
  return useContext(BooksContext);
}

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // track error state

  async function fetchBooks() {
    setLoading(true);
    setError(null); // reset error before fetching
    try {
      const res = await axios.get("https://books-library-management-app-xo42.onrender.com/api/books/", {
        withCredentials: true,
      });
      setBooks(res.data.data || []);
    } catch (err) {
      setBooks([]);
      setError(err.message || "Failed to fetch books");
      console.error("Failed to fetch books:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, loading, error, fetchBooks }}>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksProvider;
