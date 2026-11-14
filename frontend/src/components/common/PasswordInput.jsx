import { useId, useState } from "react";
import "./FormField.css";
import "./PasswordInput.css";

/**
 * Password field with a Show / Hide toggle.
 * The toggle switches the input type between "password" and "text".
 */
export default function PasswordInput({ label = "Password", error, hint, ...inputProps }) {
  const id = useId();
  const messageId = `${id}-msg`;
  const [visible, setVisible] = useState(false);

  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
      </label>

      <div className="password">
        <input
          id={id}
          type={visible ? "text" : "password"}
          className={`field__control password__input${error ? " field__control--error" : ""}`}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          {...inputProps}
        />
        <button
          type="button"
          className="password__toggle"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-controls={id}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>

      {(error || hint) && (
        <p id={messageId} className={error ? "field__error" : "field__hint"}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
