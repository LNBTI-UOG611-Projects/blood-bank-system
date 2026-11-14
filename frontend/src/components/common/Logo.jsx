import { Link } from "react-router-dom";
import "./Logo.css";

/**
 * Blood-drop logo + product name. Always links back to the landing page.
 * variant="light" is used on red or dark backgrounds.
 */
export default function Logo({ variant = "default", showTagline = true }) {
  return (
    <Link to="/" className={`logo logo--${variant}`} aria-label="BBDMS home">
      <svg className="logo__drop" viewBox="0 0 24 33" aria-hidden="true">
        <path d="M12 0C12 0 0 13 0 21c0 6.6 5.4 12 12 12s12-5.4 12-12C24 13 12 0 12 0Z" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">BBDMS</span>
        {showTagline && <span className="logo__tagline">Blood Bank &amp; Donor System</span>}
      </span>
    </Link>
  );
}
