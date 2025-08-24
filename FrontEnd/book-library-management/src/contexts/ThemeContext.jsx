import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false; // SSR safety

    try {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return stored === "true";
    } catch {
      // localStorage inaccessible (private mode etc.)
      return false;
    }
    return false; // default light mode
  });

  useEffect(() => {
    const root = document.documentElement; // <html> element
    if (darkMode) {
      root.classList.add("dark");
      try {
        localStorage.setItem("darkMode", "true");
      } catch {}
    } else {
      root.classList.remove("dark");
      try {
        localStorage.setItem("darkMode", "false");
      } catch {}
    }
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
