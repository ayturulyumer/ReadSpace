import { createClient } from "../../../utils/supabase/client.js";

const supabase = createClient();

export async function getAllBooks() {
  // this fetch returns all books without details and calculated ratings & rating count
  const { data, error } = await supabase.rpc("get_all_books_with_ratings");

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

export async function getBookWithRatingsById(bookId) {
  // rpc always returns array of objects
  const { data, error } = await supabase.rpc("get_book_with_ratings", {
    input_book_id: bookId,
  });

  // Check if data exists and return the first object (which should be the only one)
  const book = data ? data[0] : null;
  return { data: book, error };
}
