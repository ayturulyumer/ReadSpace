import { createClient } from "../../../utils/supabase/client.js";

const supabase = createClient();

export async function getAllBooksWithOptionalAuthors(
  authors = [],
  limit = 10,
  offset = 0
) {
  // Call the RPC function with the authors array, limit, and offset for pagination
  const { data, error } = await supabase.rpc("get_all_books_with_ratings", {
    author_names_param: authors.length ? authors : null, // Authors filter or null
    limit_param: limit, // Number of books to fetch per page
    offset_param: offset, // Starting point for fetching books (used for pagination)
  });

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

export async function getBookById(bookId) {
  // rpc always returns array of objects
  const { data, error } = await supabase.rpc("get_book_with_reviews", {
    input_book_id: bookId,
  });

  // Check if data exists and return the first object (which should be the only one)
  const book = data ? data[0] : null;
  return { data: book, error };
}
