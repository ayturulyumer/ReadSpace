"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation.js";


import { createClient } from "../../../utils/supabase/server.js";

export async function logout(email, password) {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  // TODO : Show proper error message
  if (error) {
    console.log(error);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
