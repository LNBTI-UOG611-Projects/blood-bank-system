import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import { useAuth } from "../../context/AuthContext";
import { ROLES, toSlug } from "../../config/roles";
import "./DashboardLayout.css";

function initials(name) {
  return name
    .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/** Sidebar + top bar shared by every role's dashboard. */
export default function DashboardLayout({ title, subtitle, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = ROLES[user.role];
  const base = `/dashboard/${role.slug}`;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="dash">
      <aside className="dash__sidebar">
        <Logo />
        <p className="dash__role">{role.label}</p>
        <nav aria-label="Dashboard">
          <ul className="dash__menu">
            {role.menu.map((item, i) => (
              <li key={item}>
                <NavLink
                  to={i === 0 ? base : `${base}/${toSlug(item)}`}
                  end={i === 0}
                  className={({ isActive }) => `dash__link${isActive ? " is-active" : ""}`}
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="dash__user">
          <span className="dash__avatar" aria-hidden="true">{initials(user.fullName)}</span>
          <span className="dash__user-text">
            <strong>{user.fullName}</strong>
            <span>{user.workplace}</span>
          </span>
        </div>
      </aside>

      <div className="dash__main">
        <header className="dash__topbar">
          <div>
            <h1 className="dash__title">{title}</h1>
            {subtitle && <p className="dash__subtitle">{subtitle}</p>}
          </div>
          <button type="button" className="btn btn--ghost" onClick={handleLogout}>
            Log out
          </button>
        </header>
        <main className="dash__content">{children}</main>
      </div>
    </div>
  );
}
