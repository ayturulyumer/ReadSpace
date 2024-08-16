"use server";
import { createClient } from "../../../utils/supabase/server.js";

const supabase = createClient();

// Function to handle user login
export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error.message;
  return data;
};

// Function to handle user registration
export const registerUser = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) return error.message;
  return user;
};

// Function to handle user logout
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Function to get the current session
export const getSession = async () => {
  return await supabase.auth.getSession();
};

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
