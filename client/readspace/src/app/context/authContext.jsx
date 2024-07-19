"use client";
import { useState, createContext, useContext } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(false);

  const values = {
    session,
    setSession,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
