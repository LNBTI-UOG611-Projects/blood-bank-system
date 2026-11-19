import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import { dashboardPath } from "../config/roles";

/** On every route change: jump to #section if the URL has one, else scroll to the top. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

/** /dashboard on its own sends you to your role's dashboard. */
function DashboardRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? dashboardPath(user.role) : "/login"} replace />;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Role dashboards: /dashboard/donor, /dashboard/manager, ... */}
        <Route path="/dashboard" element={<DashboardRedirect />} />
        <Route
          path="/dashboard/:roleSlug/:section?"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
