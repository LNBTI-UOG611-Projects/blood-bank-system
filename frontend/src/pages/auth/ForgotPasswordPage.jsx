import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import FormField from "../../components/common/FormField";
import { isEmail } from "../../utils/validators";
import { requestPasswordReset } from "../../services/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | sent

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("Enter the email address you registered with.");
      return;
    }
    setStatus("loading");
    await requestPasswordReset({ email });
    setStatus("sent");
  };

  return (
    <AuthLayout
      headline="Locked out? We'll help."
      text="Enter the email on your account and we'll send you a link to set a new password."
    >
      <h2 className="auth-title">Forgot your password?</h2>

      {status === "sent" ? (
        <>
          <div className="alert alert--success" role="status">
            <strong>Check your email</strong>
            If an account exists for {email}, a reset link is on its way. It expires in 30 minutes.
          </div>
          <button type="button" className="btn btn--ghost btn--lg btn--block" onClick={() => setStatus("idle")}>
            Use a different email
          </button>
        </>
      ) : (
        <>
          <p className="auth-subtitle">We'll email you a link to reset it.</p>
          <form className="auth__form" onSubmit={handleSubmit} noValidate>
            <FormField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              error={error}
            />
            <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send reset link"}
            </button>
          </form>
        </>
      )}

      <p className="auth-switch">
        Remembered it?{" "}
        <Link to="/login" className="text-link">
          Back to log in
        </Link>
      </p>
    </AuthLayout>
  );
}
