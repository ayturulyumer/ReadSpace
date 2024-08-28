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

  // New users will be with default avatar
  const { data, error } = await supabase.auth.signUp({
    email: userInfo.email,
    password: userInfo.password,
    options: {
      data: {
        avatar:
          "https://hichunvqiqbfhkdvhaml.supabase.co/storage/v1/object/public/avatars/profile.svg",
      },
    },
  });

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

export async function updateUserProfile({ password, email, metadata }) {
  const supabase = createClient();
  // Initialize an empty object to hold the update parameters
  const updateParams = {};

  // Add the password to the updateParams object if provided
  if (password) {
    updateParams.password = password;
  }

  // Add the email to the updateParams object if provided
  if (email) {
    updateParams.email = email;
  }

  // Add the metadata to the updateParams object if provided
  if (metadata) {
    updateParams.data = metadata;
  }

  // Perform the update request using Supabase's auth.updateUser method
  const { data, error } = await supabase.auth.updateUser(updateParams);

  // Return the result or throw an error if something goes wrong
  if (error) {
    return error.message;
  }
  revalidatePath("/", "layout");
  return data;
}
