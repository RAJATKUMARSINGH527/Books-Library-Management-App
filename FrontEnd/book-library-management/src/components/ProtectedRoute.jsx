import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

// Children will only render if user is authenticated
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // You can return a loading spinner or placeholder here
    return <div className="text-center p-8 text-purple-600">Checking authentication...</div>;
  }

  if (!user) {
    // Redirect to login page if not logged in, preserve original location for redirect after login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
