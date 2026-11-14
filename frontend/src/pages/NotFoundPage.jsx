import { Link } from "react-router-dom";
import Logo from "../components/common/Logo";

export default function NotFoundPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "var(--gutter)",
        textAlign: "center",
      }}
    >
      <div style={{ display: "grid", gap: "var(--space-4)", justifyItems: "center" }}>
        <Logo />
        <h1 style={{ fontSize: "var(--fs-h2)" }}>Page not found</h1>
        <p style={{ color: "var(--color-text-muted)" }}>The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn--primary">
          Back to home
        </Link>
      </div>
    </main>
  );
}
