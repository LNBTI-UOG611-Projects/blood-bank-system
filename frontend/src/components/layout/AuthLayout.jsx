import Logo from "../common/Logo";
import "./AuthLayout.css";

const STATS = [
  { value: "8", label: "Blood groups tracked" },
  { value: "24/7", label: "Hospital requests" },
  { value: "SMS", label: "Camp alerts" },
];

/**
 * Split screen used by Login, Register and Forgot password.
 * Desktop: red brand panel on the left, form on the right.
 * Below 900px the panel turns into a short red header above the form.
 */
export default function AuthLayout({ headline, text, children }) {
  return (
    <div className="auth">
      <aside className="auth__panel">
        <Logo variant="light" />
        <div className="auth__panel-body">
          <h1 className="auth__headline">{headline}</h1>
          <p className="auth__text">{text}</p>
          <ul className="auth__stats">
            {STATS.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="auth__footnote">Sri Lankan blood bank network · Sample prototype</p>
      </aside>

      <main className="auth__main">
        <div className="auth__form">{children}</div>
      </main>
    </div>
  );
}
