// Auth API calls. DEMO MODE: these check fixed demo accounts (src/data/demoUsers.js)
// and donors registered in this browser (saved in localStorage).
// When the backend is ready, replace each body with a real request, e.g.
//   const res = await fetch(`${API_URL}/auth/login`, { method: "POST", ... });
// and keep the same function names and return shapes so the pages do not change.

import { DEMO_USERS, DEMO_PASSWORD } from "../data/demoUsers";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
void API_URL; // used once real requests are added

const REGISTERED_KEY = "bbdms_registered_donors";

const fakeDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

function readRegistered() {
  try {
    return JSON.parse(localStorage.getItem(REGISTERED_KEY)) || [];
  } catch {
    return [];
  }
}

function saveRegistered(list) {
  try {
    localStorage.setItem(REGISTERED_KEY, JSON.stringify(list));
  } catch {
    // Storage blocked (private mode): the account works until the tab closes.
  }
}

/** Remove password before a user object leaves this file. */
function publicUser({ password, ...user }) {
  void password;
  return user;
}

function findUser(identifier) {
  const key = identifier.trim().toLowerCase();
  const all = [...DEMO_USERS.map((u) => ({ ...u, password: DEMO_PASSWORD })), ...readRegistered()];
  return all.find((u) => u.username.toLowerCase() === key || u.email.toLowerCase() === key);
}

/**
 * POST /auth/login  { identifier, password } → { user, token }
 * Throws an Error with a user-friendly message when the details are wrong.
 */
export async function login({ identifier, password }) {
  await fakeDelay();
  const user = findUser(identifier);
  if (!user || user.password !== password) {
    throw new Error("Wrong username or password.");
  }
  return { user: publicUser(user), token: `demo-token-${user.username}` };
}

/**
 * POST /auth/register-donor  → { user }
 * New accounts always get the DONOR role; staff accounts are created by the Admin.
 */
export async function registerDonor(form) {
  await fakeDelay(700);
  if (findUser(form.username)) throw new Error("That username is already taken.");
  if (findUser(form.email)) throw new Error("An account with this email already exists.");

  const user = {
    username: form.username.trim(),
    email: form.email.trim(),
    password: form.password, // DEMO ONLY: the real backend stores a hash, never the password
    role: "DONOR",
    fullName: form.fullName.trim(),
    workplace: `Donor · ${form.bloodGroup}`,
  };
  saveRegistered([...readRegistered(), user]);
  return { user: publicUser(user) };
}

/** POST /auth/forgot-password  { email } → always succeeds, so emails can't be guessed */
export async function requestPasswordReset({ email }) {
  await fakeDelay();
  void email;
  return true;
}
