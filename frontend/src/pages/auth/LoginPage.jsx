import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import FormField from "../../components/common/FormField";
import PasswordInput from "../../components/common/PasswordInput";
import Checkbox from "../../components/common/Checkbox";
import { validateLogin } from "../../utils/validators";
import { useAuth } from "../../context/AuthContext";
import { ROLES, dashboardPath } from "../../config/roles";
import { DEMO_USERS, DEMO_PASSWORD } from "../../data/demoUsers";
import "./LoginPage.css";

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    identifier: location.state?.username || "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // Already logged in? Go straight to your dashboard.
  if (user) return <Navigate to={dashboardPath(user.role)} replace />;

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
    setServerError("");
  };

  const fillDemo = (username) => {
    setForm((f) => ({ ...f, identifier: username, password: DEMO_PASSWORD }));
    setErrors({});
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateLogin(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      const loggedIn = await login(form);
      // Each role lands on its own dashboard, e.g. manager → /dashboard/manager
      navigate(dashboardPath(loggedIn.role), { replace: true });
    } catch (err) {
      setServerError(err.message);
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      headline="Every drop counts."
      text="Manage donors, camps, testing and blood stock in one place, so the right blood reaches the right patient on time."
    >
      <h2 className="auth-title">Welcome back</h2>
      <p className="auth-subtitle">Log in to continue to your dashboard.</p>

      {location.state?.registered && (
        <div className="alert alert--success" role="status">
          <strong>Account created</strong>
          Log in with your new username and password.
        </div>
      )}
      {serverError && (
        <div className="alert alert--error" role="alert">
          <strong>Login failed</strong>
          {serverError} Check your details and try again.
        </div>
      )}

      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Username or email"
          name="identifier"
          autoComplete="username"
          placeholder="name@email.com"
          value={form.identifier}
          onChange={update}
          error={errors.identifier}
        />
        <PasswordInput
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={form.password}
          onChange={update}
          error={errors.password}
        />

        <div className="auth-row">
          <Checkbox label="Remember me" name="remember" checked={form.remember} onChange={update} />
          <Link to="/forgot-password" className="text-link">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="auth-switch">
        New donor?{" "}
        <Link to="/register" className="text-link">
          Create an account
        </Link>
      </p>

      {/* DEMO ONLY: remove this block when real accounts exist */}
      <section className="demo-accounts" aria-labelledby="demo-title">
        <h3 id="demo-title">Demo accounts</h3>
        <p>
          Password for all: <code>{DEMO_PASSWORD}</code>. Tap a role to fill in its login.
        </p>
        <ul>
          {DEMO_USERS.map((demo) => (
            <li key={demo.username}>
              <button type="button" onClick={() => fillDemo(demo.username)}>
                <span>{ROLES[demo.role].label}</span>
                <code>{demo.username}</code>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </AuthLayout>
  );
}
