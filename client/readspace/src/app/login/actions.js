"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation.js";

import { createClient } from "../../../utils/supabase/server.js";

export async function signIn(email, password) {
  const supabase = createClient();

  const userInfo = {
    email,
    password,
  };

  const { data, error } = await supabase.auth.signInWithPassword(userInfo);

  if (error) {
    return error;
  }

  revalidatePath("/", "layout");
  return data;
}
