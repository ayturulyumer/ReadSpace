import { createClient } from "../../../utils/supabase/client.js";

const supabase = createClient();

// Get single user rating for book
export async function getUserRatingByBook(bookId, userId) {
  const { data, error } = await supabase
    .from("ratings")
    .select("rating,id")
    .eq("book_id", bookId)
    .eq("user_id", userId)
    .single();

  return { data, error };
}

// Submit single user rating for book
export async function submitRating(bookId, userId, rating) {
  const { status, error } = await supabase.from("ratings").insert({
    book_id: bookId,
    user_id: userId,
    rating,
    created_at: new Date(),
    updated_at: new Date(),
  });

  return { status, error };
}

// Get all ratings for book
export async function getAllRatingsForBook(bookId) {
  const { data, error } = await supabase
    .from("ratings")
    .select("rating")
    .eq("book_id", bookId);

  return { data, error };
}

//
export async function updateBookRating(bookId, overallRating, totalRatings) {
  const { data, error } = await supabase
    .from("books")
    .update({
      overall_rating: overallRating,
      total_ratings: totalRatings,
      updated_at: new Date(),
    })
    .eq("id", bookId);

  return { data, error };
}
