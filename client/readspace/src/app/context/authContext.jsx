// TODO : Show error messages in UI and remove console logs

"use client";
import { useState, createContext, useContext, useEffect } from "react";

import { createClient } from "../../../utils/supabase/client.js";
import { useRouter } from "next/navigation.js";

import { signIn, signUp, logout } from "../actions/authActions.js";

const supabase = createClient();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const router = useRouter();

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

  const registerUser = async (email, password) => {
    const { user, error } = await signUp(email, password);
    if (error) {
      console.log("Registration Error:", error);
    } else if (user) {
      console.log("User is successfully registered", user);
    }
  };

  const loginUser = async (email, password) => {
    const { user, error } = await signIn(email, password);
    if (error) {
      console.log("Login Error:", error);
    } else if (user) {
      setSession(user);
      router.push("/");
      console.log("User is successfully logged in");
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
    registerUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
