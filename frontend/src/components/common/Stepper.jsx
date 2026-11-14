import "./Stepper.css";

/** Horizontal progress steps: done (teal tick), current (red), upcoming (grey). */
export default function Stepper({ steps, current }) {
  return (
    <ol className="stepper" aria-label="Progress">
      {steps.map((label, i) => {
        const state = i < current ? "done" : i === current ? "current" : "todo";
        return (
          <li key={label} className={`stepper__item stepper__item--${state}`} aria-current={state === "current" ? "step" : undefined}>
            <span className="stepper__dot" aria-hidden="true">
              {state === "done" ? "✓" : i + 1}
            </span>
            <span className="stepper__label">
              {label}
              {state === "done" && <span className="visually-hidden"> (completed)</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
