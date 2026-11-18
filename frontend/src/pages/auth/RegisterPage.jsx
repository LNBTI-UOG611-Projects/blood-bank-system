import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import FormField from "../../components/common/FormField";
import PasswordInput from "../../components/common/PasswordInput";
import Checkbox from "../../components/common/Checkbox";
import Stepper from "../../components/common/Stepper";
import { validateAccountStep, validatePersonalStep } from "../../utils/validators";
import { registerDonor } from "../../services/authService";
import { BLOOD_GROUPS, DISTRICTS, SEX_OPTIONS } from "../../data/options";

const STEPS = ["Account", "Personal details"];

const INITIAL = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  dateOfBirth: "",
  sex: "",
  bloodGroup: "",
  phone: "",
  district: "",
  consentGiven: false,
  smsOptIn: true,
};

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const headingRef = useRef(null);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const focusHeading = () => setTimeout(() => headingRef.current?.focus(), 0);

  const goNext = (e) => {
    e.preventDefault();
    const found = validateAccountStep(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStep(1);
    focusHeading();
  };

  const goBack = () => {
    setErrors({});
    setStep(0);
    focusHeading();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validatePersonalStep(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("loading");
    try {
      await registerDonor(form);
      setStatus("done");
      focusHeading();
    } catch (err) {
      // Username or email already used: send the user back to step 1 to fix it
      const field = /username/i.test(err.message) ? "username" : /email/i.test(err.message) ? "email" : null;
      if (field) {
        setErrors({ [field]: err.message });
        setStep(0);
        setStatus("idle");
        focusHeading();
      } else {
        setStatus("error");
      }
    }
  };

  const layoutProps = {
    headline: "Become a blood donor.",
    text: "One donation can help up to three patients. Register once, and we will let you know when a camp is near you.",
  };

  if (status === "done") {
    return (
      <AuthLayout {...layoutProps}>
        <h2 className="auth-title" tabIndex={-1} ref={headingRef}>
          You're registered, {form.fullName.split(" ")[0]}!
        </h2>
        <div className="alert alert--success" role="status">
          <strong>Your donor account is ready (username: {form.username})</strong>
          {form.smsOptIn
            ? `We'll send camp alerts to ${form.phone}.`
            : "You can turn on SMS alerts later from your profile."}
        </div>
        <Link
          to="/login"
          state={{ username: form.username, registered: true }}
          className="btn btn--primary btn--lg btn--block"
        >
          Continue to log in
        </Link>
        <Link to="/" className="btn btn--ghost btn--lg btn--block">
          Back to home
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout {...layoutProps}>
      <Stepper steps={STEPS} current={step} />

      {step === 0 ? (
        <form className="auth__form" onSubmit={goNext} noValidate>
          <h2 className="auth-title" tabIndex={-1} ref={headingRef}>
            Create your account
          </h2>
          <p className="auth-subtitle">You will use these details to log in.</p>

          <FormField label="Username" name="username" autoComplete="username"
            placeholder="e.g. kasuni.silva" value={form.username} onChange={update} error={errors.username} />
          <FormField label="Email" name="email" type="email" autoComplete="email"
            placeholder="name@email.com" value={form.email} onChange={update} error={errors.email} />
          <div className="field-row">
            <PasswordInput name="password" autoComplete="new-password" placeholder="At least 8 characters"
              value={form.password} onChange={update} error={errors.password} />
            <PasswordInput label="Confirm password" name="confirmPassword" autoComplete="new-password"
              placeholder="Type it again" value={form.confirmPassword} onChange={update} error={errors.confirmPassword} />
          </div>

          <button type="submit" className="btn btn--primary btn--lg btn--block">
            Next: personal details
          </button>

          <p className="auth-switch">
            Already registered?{" "}
            <Link to="/login" className="text-link">Log in</Link>
          </p>
        </form>
      ) : (
        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          <h2 className="auth-title" tabIndex={-1} ref={headingRef}>
            Tell us about yourself
          </h2>
          <p className="auth-subtitle">This helps us check your eligibility and match you to camps.</p>

          {status === "error" && (
            <div className="alert alert--error" role="alert">
              <strong>Something went wrong</strong>
              Please try again in a moment.
            </div>
          )}

          <FormField label="Full name" name="fullName" autoComplete="name"
            placeholder="e.g. Kasuni Silva" value={form.fullName} onChange={update} error={errors.fullName} />
          <div className="field-row">
            <FormField label="Date of birth" name="dateOfBirth" type="date" autoComplete="bday"
              value={form.dateOfBirth} onChange={update} error={errors.dateOfBirth} />
            <FormField as="select" label="Sex" name="sex" options={SEX_OPTIONS}
              value={form.sex} onChange={update} error={errors.sex} />
          </div>
          <div className="field-row">
            <FormField as="select" label="Blood group" name="bloodGroup" options={BLOOD_GROUPS}
              placeholder="Select…" hint="Not sure? Choose your best guess; staff confirm it at your first donation."
              value={form.bloodGroup} onChange={update} error={errors.bloodGroup} />
            <FormField label="Mobile number" name="phone" type="tel" inputMode="numeric" autoComplete="tel"
              placeholder="077 123 4567" value={form.phone} onChange={update} error={errors.phone} />
          </div>
          <FormField as="select" label="District" name="district" options={DISTRICTS}
            value={form.district} onChange={update} error={errors.district} />

          <Checkbox name="consentGiven" checked={form.consentGiven} onChange={update}
            label="I consent to my details being stored for donation records" error={errors.consentGiven} />
          <Checkbox name="smsOptIn" checked={form.smsOptIn} onChange={update}
            label="Send me SMS alerts about camps and urgent call-ups" />

          <div className="auth-actions">
            <button type="button" className="btn btn--ghost btn--lg" onClick={goBack}>
              Back
            </button>
            <button type="submit" className="btn btn--primary btn--lg" disabled={status === "loading"}>
              {status === "loading" ? "Creating account…" : "Create donor account"}
            </button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
