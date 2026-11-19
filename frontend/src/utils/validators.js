// Form validation rules, kept in one place so every form uses the same checks.
// Numbers match the Admin "Rule settings" screen (minimum age 18).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SL_MOBILE_RE = /^07\d{8}$/; // Sri Lankan mobile: 07X XXX XXXX
const USERNAME_RE = /^[a-zA-Z0-9_.]{3,30}$/;

export const MIN_DONOR_AGE = 18;
export const MAX_DONOR_AGE = 60;

export function isEmail(value) {
  return EMAIL_RE.test(value.trim());
}

export function validateLogin({ identifier, password }) {
  const errors = {};
  if (!identifier.trim()) errors.identifier = "Enter your username or email.";
  if (!password) errors.password = "Enter your password.";
  return errors;
}

export function validateAccountStep({ username, email, password, confirmPassword }) {
  const errors = {};
  if (!USERNAME_RE.test(username)) {
    errors.username = "Use 3–30 letters, numbers, dots or underscores.";
  }
  if (!isEmail(email)) errors.email = "Enter a valid email address.";
  if (password.length < 8) {
    errors.password = "Use at least 8 characters.";
  } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    errors.password = "Include at least one letter and one number.";
  }
  if (confirmPassword !== password) errors.confirmPassword = "Passwords do not match.";
  return errors;
}

export function ageFromDate(dateString) {
  const dob = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const beforeBirthday =
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

export function validatePersonalStep({ fullName, dateOfBirth, sex, bloodGroup, phone, district, consentGiven }) {
  const errors = {};
  if (fullName.trim().length < 3) errors.fullName = "Enter your full name.";
  if (!dateOfBirth) {
    errors.dateOfBirth = "Enter your date of birth.";
  } else {
    const age = ageFromDate(dateOfBirth);
    if (age < MIN_DONOR_AGE || age > MAX_DONOR_AGE) {
      errors.dateOfBirth = `Donors must be between ${MIN_DONOR_AGE} and ${MAX_DONOR_AGE} years old.`;
    }
  }
  if (!sex) errors.sex = "Select an option.";
  if (!bloodGroup) errors.bloodGroup = "Select your blood group.";
  if (!SL_MOBILE_RE.test(phone.replace(/\s/g, ""))) {
    errors.phone = "Enter a mobile number like 0771234567.";
  }
  if (!district) errors.district = "Select your district.";
  if (!consentGiven) errors.consentGiven = "We need your consent to keep donation records.";
  return errors;
}
