import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { BooksProvider } from "./contexts/BooksContext";
import { ThemeProvider } from "./contexts/ThemeContext"; 
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BooksProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BooksProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
