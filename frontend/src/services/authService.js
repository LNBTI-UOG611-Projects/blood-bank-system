// Auth API calls. These are stubs for now so the pages work as a demo.
// When the backend is ready, replace each body with a real request, e.g.
//   const res = await fetch(`${API_URL}/auth/login`, { method: "POST", ... });
// and keep the same function names so the pages do not change.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fakeDelay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

/** POST /auth/login  { identifier, password } → { user, token } */
export async function login({ identifier, password }) {
  await fakeDelay();
  // Demo only: any non-empty details "work". Remove this when the API exists.
  void API_URL;
  void password;
  return { user: { username: identifier, role: "DONOR" }, token: "demo-token" };
}

/** POST /auth/register-donor  { account, personal } → { userId, donorId } */
export async function registerDonor(data) {
  await fakeDelay(800);
  void data;
  return { userId: "demo-user", donorId: "DN-00000" };
}

/** POST /auth/forgot-password  { email } → 204 (always succeed, so emails can't be guessed) */
export async function requestPasswordReset({ email }) {
  await fakeDelay();
  void email;
  return true;
}
