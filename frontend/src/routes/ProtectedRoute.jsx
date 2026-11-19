import { Navigate, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { dashboardPath, roleFromSlug } from "../config/roles";

/**
 * Guards the dashboard URLs.
 * - Not logged in → go to /login (and come back after logging in).
 * - Logged in, but the URL is another role's dashboard → go to your own.
 */
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const { roleSlug } = useParams();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roleFromSlug(roleSlug) !== user.role) {
    return <Navigate to={dashboardPath(user.role)} replace />;
  }

  return children;
}
