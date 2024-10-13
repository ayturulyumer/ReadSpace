import { createClient } from "../../../utils/supabase/client.js";

const supabase = createClient();

export async function getPaginatedReviewsForBookById(bookId, from = 0, to = 4) {
  const { data, count, error } = await supabase
    .from("reviews")
    .select("username, rating, review_text,user_avatar ,created_at", {
      count: "exact", // also get the count of reviews to calculate totalpages needed
    })
    .eq("book_id", bookId)
    .order("created_at", { ascending: false })
    .range(from, to);

  return { data, count, error };
}

export async function submitReview(
  bookId,
  userId,
  username,
  userAvatar,
  reviewText
) {
  const { data, error } = await supabase.rpc("insert_review_with_rating", {
    input_book_id: bookId,
    input_user_id: userId,
    input_username: username,
    input_review_text: reviewText,
    input_user_avatar: userAvatar,
  });

  const review = data ? data[0] : null;
  return { data: review, error };
}
