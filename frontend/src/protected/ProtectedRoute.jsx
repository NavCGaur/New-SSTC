import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.global.auth);

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/service/login" replace />;
  }

  if (!user || user.role !== requiredRole) {
    // Redirect to unauthorized page if no user or role doesn't match
    return <Navigate to="/service/unauthorized" replace />;
  }

  return children; // Render the child component if all checks pass
};

