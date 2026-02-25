import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until auth is fully initialized
  if (loading) {
    return null; // or loading spinner
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Logged in but not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Authorized admin
  return children;
};

export default AdminRoute;