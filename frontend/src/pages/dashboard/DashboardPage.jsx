import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { ROLES, toSlug } from "../../config/roles";
import "./DashboardPage.css";

/**
 * One page for every role. It reads the logged-in user's role and shows
 * that role's stats and actions from src/config/roles.js.
 * Each role will get its own real pages later; this is the placeholder.
 */
export default function DashboardPage() {
  const { user } = useAuth();
  const { section } = useParams();
  const role = ROLES[user.role];

  // A menu item other than "Dashboard" was clicked
  if (section) {
    const title = role.menu.find((item) => toSlug(item) === section) || "Page";
    return (
      <DashboardLayout title={title} subtitle={role.label}>
        <section className="dash-card dash-empty">
          <span className="badge badge--blue">Coming soon</span>
          <h2>{title}</h2>
          <p>This screen is designed in Figma and will be built in a later sprint.</p>
        </section>
      </DashboardLayout>
    );
  }

  // "Kasuni Silva" → "Kasuni"; names starting with an initial ("S. Gunawardena", "Dr. R. Fernando") stay whole
  const plainName = user.fullName.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, "");
  const firstWord = plainName.split(" ")[0];
  const greetingName = firstWord.length <= 2 ? user.fullName : firstWord;

  return (
    <DashboardLayout title={`${role.label} dashboard`} subtitle={user.workplace}>
      <section className="dash-welcome">
        <h2>Welcome back, {greetingName}</h2>
        <p>{role.welcome}</p>
      </section>

      <ul className="dash-stats">
        {role.stats.map((stat) => (
          <li key={stat.label} className={`dash-card dash-stat dash-stat--${stat.tone}`}>
            <span className="dash-stat__label">{stat.label}</span>
            <strong className="dash-stat__value">{stat.value}</strong>
            <span className="dash-stat__note">{stat.note}</span>
          </li>
        ))}
      </ul>

      <div className="dash-grid">
        <section className="dash-card">
          <h2 className="dash-card__title">Quick actions</h2>
          <ul className="dash-actions">
            {role.actions.map((action) => (
              <li key={action}>
                <button type="button" className="btn btn--ghost btn--block dash-actions__btn">
                  {action}
                  <span aria-hidden="true">→</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="dash-card">
          <h2 className="dash-card__title">Your account</h2>
          <dl className="dash-account">
            <div><dt>Name</dt><dd>{user.fullName}</dd></div>
            <div><dt>Username</dt><dd>{user.username}</dd></div>
            <div><dt>Email</dt><dd>{user.email}</dd></div>
            <div><dt>Role</dt><dd><span className="badge badge--red">{role.label}</span></dd></div>
          </dl>
        </section>
      </div>

      <p className="dash-note">
        Demo mode: figures are sample data. Real data will load from the backend once it is connected.
      </p>
    </DashboardLayout>
  );
}
