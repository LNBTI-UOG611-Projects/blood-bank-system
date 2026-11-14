import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { STOCK, IMPACT, STEPS, CAMPS, ROLES } from "../../data/landingContent";
import "./LandingPage.css";

const LEVEL = {
  ok: { label: "OK", tone: "green" },
  watch: { label: "Watch", tone: "amber" },
  low: { label: "Low", tone: "red" },
};
const MAX_UNITS = 130; // for the bar width

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ---------- Hero ---------- */}
        <section className="hero">
          <div className="container hero__inner">
            <div className="hero__copy">
              <span className="badge badge--red">Sri Lanka · Blood donation network</span>
              <h1 className="hero__title">
                Give blood. Save lives.
                <br />
                We make it simple.
              </h1>
              <p className="hero__lead">
                Register as a donor, find a camp near you and get an SMS when your blood group is needed.
                Hospitals request blood, and blood banks track every unit from donation to patient.
              </p>
              <div className="hero__actions">
                <Link to="/register" className="btn btn--primary btn--lg">
                  Register as a donor
                </Link>
                <a href="#camps" className="btn btn--ghost btn--lg">
                  Find a camp near you
                </a>
              </div>
              <dl className="hero__facts">
                <div><dt>8</dt><dd>blood groups tracked</dd></div>
                <div><dt>SMS</dt><dd>camp and call-up alerts</dd></div>
                <div><dt>24/7</dt><dd>hospital requests</dd></div>
              </dl>
            </div>

            <div className="stock-card" aria-labelledby="stock-title">
              <div className="stock-card__head">
                <h2 id="stock-title">Live blood stock</h2>
                <span className="badge badge--teal">Updated 10 min ago</span>
              </div>
              <ul className="stock-grid">
                {STOCK.map((s) => {
                  const level = LEVEL[s.level];
                  return (
                    <li key={s.group} className={`stock-tile stock-tile--${level.tone}`}>
                      <div className="stock-tile__top">
                        <strong>{s.group}</strong>
                        <span className={`badge badge--${level.tone}`}>{level.label}</span>
                      </div>
                      <span className="stock-tile__units">{s.units} units</span>
                      <span className="stock-tile__bar" aria-hidden="true">
                        <span style={{ width: `${Math.max(4, (s.units / MAX_UNITS) * 100)}%` }} />
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="alert alert--error">
                <strong>O- donors are urgently needed</strong>
                Find a camp or visit National Blood Centre this week.
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Impact strip ---------- */}
        <section className="impact" aria-label="Why donate">
          <ul className="container impact__inner">
            {IMPACT.map((item) => (
              <li key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- How it works ---------- */}
        <section className="section" id="how-it-works">
          <div className="container">
            <header className="section__head">
              <h2>How blood donation works</h2>
              <p>Four simple steps from sign-up to saving a life</p>
            </header>
            <ol className="steps">
              {STEPS.map((step, i) => (
                <li key={step.title} className="card step">
                  <span className={`step__num step__num--${step.tone}`}>{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Upcoming camps ---------- */}
        <section className="section section--muted" id="camps">
          <div className="container">
            <header className="section__head section__head--split">
              <div>
                <h2>Upcoming donation camps</h2>
                <p>Pre-register now and skip the queue on the day</p>
              </div>
              <Link to="/login" className="btn btn--ghost">
                View all camps
              </Link>
            </header>
            <ul className="camps">
              {CAMPS.map((camp) => (
                <li key={camp.venue} className="card camp">
                  <div className="camp__top">
                    <div className="camp__date" aria-label={`${camp.day} ${camp.month}`}>
                      <strong>{camp.day}</strong>
                      <span>{camp.month}</span>
                    </div>
                    <div>
                      <h3>{camp.venue}</h3>
                      <p className="camp__where">{camp.where}</p>
                    </div>
                  </div>
                  <dl className="camp__meta">
                    <div><dt>Sponsored by</dt><dd>{camp.sponsor}</dd></div>
                    <div>
                      <dt>Availability</dt>
                      <dd><span className={`badge badge--${camp.slotTone}`}>{camp.slots}</span></dd>
                    </div>
                  </dl>
                  {/* Pre-registering needs an account, so this goes to login */}
                  <Link to="/login" className="btn btn--primary btn--block">
                    Pre-register
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Roles ---------- */}
        <section className="section" id="roles">
          <div className="container">
            <header className="section__head">
              <h2>One system for everyone</h2>
              <p>Each role gets the screens it needs, nothing more</p>
            </header>
            <ul className="roles">
              {ROLES.map((role) => (
                <li key={role.title} className={`card role role--${role.tone}`}>
                  <h3>{role.title}</h3>
                  <p>{role.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Call to action ---------- */}
        <section className="cta">
          <div className="container cta__inner">
            <div>
              <h2>Your blood group may be needed today.</h2>
              <p>It takes two minutes to register as a donor.</p>
            </div>
            <div className="cta__actions">
              <Link to="/register" className="btn btn--white btn--lg">
                Register as a donor
              </Link>
              <Link to="/login" className="btn btn--outline-light btn--lg">
                I am a hospital
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
