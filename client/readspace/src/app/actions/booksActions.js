import { createClient } from "../../../utils/supabase/client.js";

const supabase = createClient();

export async function getAllBooks() {
  // fetch without details object , because we don't need that info here
  const { data, error } = await supabase
    .from("books")
    .select("id,title,thumbnail_image,author,rating,price,isBestseller");
  return { data, error };
}

export async function getBookById(id) {
  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("id", id)
    .single();
  return { data, error };
}
