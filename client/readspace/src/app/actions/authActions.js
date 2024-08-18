"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation.js";

import { createClient } from "../../../utils/supabase/server.js";

export async function signUp(email, password) {
  const supabase = createClient();

  const userInfo = {
    email,
    password,
  };

  const { data, error } = await supabase.auth.signUp(userInfo);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return data;
}

export async function signIn(email, password) {
  const supabase = createClient();

  const userInfo = {
    email,
    password,
  };

  const { data, error } = await supabase.auth.signInWithPassword(userInfo);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return data;
}

export async function logout(email, password) {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
