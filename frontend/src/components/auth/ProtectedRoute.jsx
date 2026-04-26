import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../state/auth";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();

  // If no user is logged in (using our mock default check)
  // In a real app, you'd check if a token exists.
  if (!user || !user.role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the user's role is in the allowedRoles array
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their own dashboard or a 403 page
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "seller") return <Navigate to="/seller" replace />;
    return <Navigate to="/buyer/stores" replace />;
  }

  return children;
}
