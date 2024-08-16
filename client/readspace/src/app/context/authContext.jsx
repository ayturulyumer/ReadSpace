"use client";
import { useState, createContext, useContext, useEffect } from "react";

import { createClient } from "../../../utils/supabase/client.js";

const supabase = createClient();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);
      if (user) {
        setSession(user);
      } else {
        setSession(null);
      }
    };

    loadSession();
  }, []); // This runs only once when the component mounts

  const values = {
    session,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
