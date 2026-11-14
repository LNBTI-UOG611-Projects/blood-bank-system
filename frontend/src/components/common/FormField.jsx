import { useId } from "react";
import "./FormField.css";

/**
 * Label + input (or select) + help/error text, wired up for screen readers.
 * Pass `as="select"` with `options` for a dropdown.
 */
export default function FormField({
  label,
  error,
  hint,
  as = "input",
  options = [],
  placeholder,
  className = "",
  ...inputProps
}) {
  const id = useId();
  const messageId = `${id}-msg`;
  const describedBy = error || hint ? messageId : undefined;

  const shared = {
    id,
    className: `field__control${error ? " field__control--error" : ""}`,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": describedBy,
    ...inputProps,
  };

  return (
    <div className={`field ${className}`}>
      <label htmlFor={id} className="field__label">
        {label}
      </label>

      {as === "select" ? (
        <select {...shared}>
          <option value="">{placeholder || "Select…"}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input placeholder={placeholder} {...shared} />
      )}

      {(error || hint) && (
        <p id={messageId} className={error ? "field__error" : "field__hint"}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
