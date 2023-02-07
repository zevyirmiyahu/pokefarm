import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth MUST be used within the AuthProvider");
  }
  return useContext(AuthContext);
};
