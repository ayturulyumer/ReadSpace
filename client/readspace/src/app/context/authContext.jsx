// TODO : Show error messages in UI and remove console logs

"use client";
import { useState, createContext, useContext, useEffect } from "react";

import { createClient } from "../../../utils/supabase/client.js";
import { useRouter } from "next/navigation.js";

import { signIn, signUp, logout } from "../actions/authActions.js";
import toast from "react-hot-toast";

const supabase = createClient();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setSession(user);
      }
    };

    fetchSession();
  }, []);

  const refreshSession = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error refreshing session:", error);
    } else {
      setSession(user);
    }
  };

  const registerUser = async (email, password) => {
    toast.promise(signUp(email, password), {
      loading: "Registering...",
      success: (data) => {
        if (data) {
          setSession(data.user);
          router.push("/");
          console.log("User is successfully registered", data.user);
          return <b>Registration successful!</b>;
        }
      },
      error: (error) => {
        return <b>{error}</b>;
      },
    });
  };

  const loginUser = async (email, password) => {
    const { user, error } = await signIn(email, password);
    if (error) {
      toast.error("There was error with your login", error);
    } else if (user) {
      setSession(user);
      router.push("/");
      toast.success("Successfully login !");
    }
  };

  const logoutUser = async () => {
    await logout();
    setSession(null);
    toast.success("Logged out successfully !");
  };

  const values = {
    session,
    logoutUser,
    loginUser,
    registerUser,
    refreshSession,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
