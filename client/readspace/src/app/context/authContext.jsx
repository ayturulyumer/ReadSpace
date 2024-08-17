"use client";
import { useState, createContext, useContext, useEffect } from "react";

import { createClient } from "../../../utils/supabase/client.js";

import { logout } from "../logout/actions.js";
import { signIn } from "../login/actions.js";

const supabase = createClient();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setSession(session);
      }
    };

    fetchSession();
  }, []);

  const loginUser = async (email, password) => {
    const user = await signIn(email, password);
    if (user) {
      setSession(user);
    } else {
      console.log("No user");
    }
  };

  const logoutUser = async () => {
    await logout();
    setSession(null);
    console.log("user logged out");
  };

  const values = {
    session,
    logoutUser,
    loginUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
