import "./Checkbox.css";

/** Custom-styled checkbox that still uses a real <input> for accessibility. */
export default function Checkbox({ label, error, ...inputProps }) {
  return (
    <div className="checkbox-wrap">
      <label className="checkbox">
        <input type="checkbox" className="checkbox__input" {...inputProps} />
        <span className="checkbox__box" aria-hidden="true" />
        <span className="checkbox__label">{label}</span>
      </label>
      {error && <p className="field__error checkbox__error">{error}</p>}
    </div>
  );
}
