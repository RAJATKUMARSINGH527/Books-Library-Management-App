import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

// Children will only render if user is authenticated
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" replace />;
  }
  return children;
}
