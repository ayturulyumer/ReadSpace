import { createClient } from "../../../utils/supabase/client.js";

const supabase = createClient();

export async function getAllBooks() {
  const { data, error } = await supabase.from("books").select();
  return { data, error };
}
