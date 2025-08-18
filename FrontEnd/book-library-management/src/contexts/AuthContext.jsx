import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
const AuthContext = createContext();

// Hook to use Auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Login function
  async function login(email, password) {
    console.log("[AUTH] Attempting login for:", email);
    try {
      const res = await axios.post(
        "https://books-library-management-app-xo42.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("[AUTH] Login response:", res.data);
      // Assuming backend sends { user: {...} } or similar
      setUser(res.data.user || res.data);
      alert(`Welcome back, ${res.data.user?.email || email}!`);
    } catch (err) {
      console.error("[AUTH] Login error:", err.response?.data || err.message);
      throw err; // so AuthForm can catch and display error
    }
  }

  // Register function
  async function register(email, password) {
    console.log("[AUTH] Attempting registration for:", email);
    try {
      const res = await axios.post(
        "https://books-library-management-app-xo42.onrender.com/api/auth/register",
        { email, password }
      );
      console.log("[AUTH] Registration response:", res.data);
      alert(`Account created for ${email}. Please log in.`);
    } catch (err) {
      console.error("[AUTH] Registration error:", err.response?.data || err.message);
      throw err; // so AuthForm can catch and display error
    }
  }

  // Logout function
  async function logout() {
    console.log("[AUTH] Logging out user:", user?.email || "No user");
    try {
      const res = await axios.get("https://books-library-management-app-xo42.onrender.com/api/auth/logout", {
        withCredentials: true,
      });
      console.log("[AUTH] Logout response:", res.data);
      alert(res.data.message || "You have been logged out successfully. See you again soon!");
      setUser(null);
    } catch (err) {
      console.error("[AUTH] Logout error:", err.response?.data || err.message);
      alert("Error during logout. Please try again.");
    }
  }

  // On mount: Check if user is already logged in (session cookie)
  useEffect(() => {
    async function fetchMe() {
      console.log("[AUTH] Checking if user is already logged in...");
      try {
        const res = await axios.get("https://books-library-management-app-xo42.onrender.com/api/auth/me", {
          withCredentials: true,
        });
        // Ensure correct user data extraction
        setUser(res.data.user || res.data || null);
        console.log("[AUTH] Current user:", res.data.user || res.data);
      } catch (err) {
        console.warn("[AUTH] No logged in user found.");
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
