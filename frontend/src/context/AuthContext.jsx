import { createContext, useContext, useState } from "react";
import * as authService from "../services/authService";

// Holds the logged-in user for the whole app.
// Any component can call useAuth() to read the user or to log in / out.

const SESSION_KEY = "bbdms_session";
const AuthContext = createContext(null);

function loadSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  // sessionStorage keeps you logged in on refresh, and logs you out when the tab closes
  const [session, setSession] = useState(loadSession);

  const login = async (credentials) => {
    const result = await authService.login(credentials);
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(result));
    } catch {
      // ignore: the session still lives in memory
    }
    setSession(result);
    return result.user;
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    setSession(null);
  };

  const value = { user: session?.user ?? null, token: session?.token ?? null, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
