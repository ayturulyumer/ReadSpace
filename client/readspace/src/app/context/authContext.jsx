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
    toast.promise(
      signUp(email, password).then(async (result) => {
        const { error } = result;
        if (error) {
          throw new Error(error);
        } else {
          setSession(result.user);
          router.push("/");
          return "Successful registration!";
        }
      }),
      {
        loading: "Registering...",
        success: (message) => message,
        error: (err) => err.message || "Could not register user.",
      }
    );
  };

  const loginUser = async (email, password) => {
    const { user, error } = await signIn(email, password);
    if (error) {
      toast.error(error);
    } else if (user) {
      setSession(user);
      router.push("/");
      toast.success("Successfully logged in !");
    }
  };

  const logoutUser = async () => {
    await logout();
    setSession(null);
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
