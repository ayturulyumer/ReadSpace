"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation.js";

import { createClient } from "../../../utils/supabase/server.js";

export async function signIn(email, password) {
  const supabase = createClient();

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
