import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "admin") {
    return (
      <div className="p-8 text-center text-red-600 font-extrabold text-2xl select-none">
        Access Denied. Admins only.
      </div>
    );
  }
  return children;
}
