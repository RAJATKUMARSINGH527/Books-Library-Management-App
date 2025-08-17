import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { BooksProvider } from "./contexts/BooksContext";
import "./index.css"; // Tailwind

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BooksProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BooksProvider>
    </AuthProvider>
  </React.StrictMode>
);
// This file is the entry point for the React application.