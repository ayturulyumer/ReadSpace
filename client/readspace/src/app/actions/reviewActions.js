import { createClient } from "../../../utils/supabase/client.js";

const supabase = createClient();

export async function getAllReviewsForBookById(bookId) {
  const { data, error } = await supabase
    .from("reviews")
    .select("username, rating, review_text, created_at")
    .eq("book_id", bookId)
    .order("created_at", { ascending: false });

  return { data, error };
}

export async function submitReview(bookId, userId, username, reviewText) {
  const { data, error } = await supabase.rpc("insert_review_with_rating", {
    input_book_id: bookId,
    input_user_id: userId,
    input_username: username,
    input_review_text: reviewText,
  });

  const review = data ? data[0] : null;
  return { data: review, error };
}
