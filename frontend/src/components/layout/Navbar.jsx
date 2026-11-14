import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Upcoming camps", href: "#camps" },
  { label: "For hospitals", href: "#roles" },
  { label: "Sponsors", href: "#roles" },
  { label: "Contact", href: "#contact" },
];

/** Landing-page navbar. Collapses into a menu button below 1024px. */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu with the Escape key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Logo />

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          <span className={`navbar__burger${open ? " is-open" : ""}`} aria-hidden="true" />
        </button>

        <nav id="main-menu" className={`navbar__menu${open ? " is-open" : ""}`} aria-label="Main">
          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="navbar__actions">
            <Link to="/login" className="btn btn--ghost" onClick={close}>
              Log in
            </Link>
            <Link to="/register" className="btn btn--primary" onClick={close}>
              Become a donor
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
