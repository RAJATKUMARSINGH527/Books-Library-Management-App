import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    try {
      const res = await axios.post(
        "https://books-library-management-app-xo42.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user || res.data);
      alert(`Welcome back, ${res.data.user?.email || email}!`);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      throw err;
    }
  }

  async function register(email, password) {
    try {
      const res = await axios.post(
        "https://books-library-management-app-xo42.onrender.com/api/auth/register",
        { email, password }
      );
      alert(`Account created for ${email}. Please log in.`);
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      throw err;
    }
  }

  async function logout() {
    try {
      await axios.get("https://books-library-management-app-xo42.onrender.com/api/auth/logout", {
        withCredentials: true,
      });
      alert("You have been logged out successfully. See you again soon!");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
      alert("Error during logout. Please try again.");
    }
  }

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await axios.get("https://books-library-management-app-xo42.onrender.com/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user || res.data || null);
      } catch {
        setUser(null);
      }
    }
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
