import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyBooks from "./pages/MyBooks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/mybooks"
            element={
              <ProtectedRoute>
                <MyBooks />
              </ProtectedRoute>
            }
          />

          {/* AddBook accessible to any logged-in user */}
          <Route
            path="/add-book"
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            }
          />

          {/* Admin-only route example */}
          <Route
            path="/admin-panel"
            element={
              <AdminRoute>
                {/* Your AdminPanel component */}
                <div className="text-white text-center text-2xl p-8">
                  Admin Panel Goes Here
                </div>
              </AdminRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}
