import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import "./Footer.css";

const COLUMNS = [
  {
    title: "Donors",
    links: [
      { label: "Register", to: "/register" },
      { label: "Find a camp", to: "/#camps" },
      { label: "Log in", to: "/login" },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "Hospitals", to: "/login" },
      { label: "Sponsors", to: "/login" },
      { label: "Camp managers", to: "/login" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Eligibility rules", to: "/#how-it-works" },
      { label: "Forgot password", to: "/forgot-password" },
      { label: "Contact us", to: "/#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo variant="light" />
          <p>
            A student project for blood banks in Sri Lanka.
            <br />© {new Date().getFullYear()} BBDMS · Sample prototype
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} className="footer__col" aria-label={col.title}>
            <h2 className="footer__title">{col.title}</h2>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  );
}
