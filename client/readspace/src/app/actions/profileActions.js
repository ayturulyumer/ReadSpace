import { createClient } from "../../../utils/supabase/client.js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabase = createClient();

export async function uploadAvatar(file, userId) {
  const filePath = `${userId}/avatar.png`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600", // Caches the file for an hour
      upsert: true, // Overwrite any existing file with the same name
    });

  if (error) {
    console.error("Error uploading avatar:", error.message);
    return null;
  }

  return `${supabaseUrl}/storage/v1/object/public/${data.fullPath}`;
}
