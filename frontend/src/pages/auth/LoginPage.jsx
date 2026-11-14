import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import FormField from "../../components/common/FormField";
import PasswordInput from "../../components/common/PasswordInput";
import Checkbox from "../../components/common/Checkbox";
import { validateLogin } from "../../utils/validators";
import { login } from "../../services/authService";

export default function LoginPage() {
  const [form, setForm] = useState({ identifier: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [user, setUser] = useState(null);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateLogin(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("loading");
    try {
      const result = await login(form);
      setUser(result.user);
      setStatus("success");
      // TODO: save the token and navigate to the dashboard for result.user.role
    } catch {
      setStatus("error");
    }
  };

  return (
    <AuthLayout
      headline="Every drop counts."
      text="Manage donors, camps, testing and blood stock in one place, so the right blood reaches the right patient on time."
    >
      <h2 className="auth-title">Welcome back</h2>
      <p className="auth-subtitle">Log in to continue to your dashboard.</p>

      {status === "success" && (
        <div className="alert alert--success" role="status">
          <strong>Logged in as {user.username}</strong>
          Demo mode: role dashboards will be connected in the next sprint.
        </div>
      )}
      {status === "error" && (
        <div className="alert alert--error" role="alert">
          <strong>Login failed</strong>
          Check your username and password and try again.
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

        <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === "loading"}>
          {status === "loading" ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="auth-switch">
        New donor?{" "}
        <Link to="/register" className="text-link">
          Create an account
        </Link>
      </p>

      <div className="alert alert--info">
        <strong>One login for every role</strong>
        You will be taken to the dashboard for your role.
      </div>
    </AuthLayout>
  );
}
