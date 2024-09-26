import { createClient } from "../../../utils/supabase/client.js";

const supabase = createClient();

export async function getAllAuthors() {
  const { data, error } = await supabase.from("authors").select("name");

  return { data, error };
}

export async function getSingleAuthor(authorId) {
  const { data, error } = await supabase
    .from("authors")
    .select(
      `
        name,
        bio,
        image,
        socials,
        books (
          id,
          title,
          thumbnail_image,
          price,
          "isBestseller"
        )
      `
    )
    .eq("id", authorId)
    .single();

  return { data, error };
}
