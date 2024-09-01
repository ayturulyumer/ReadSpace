import { createClient } from "../../../utils/supabase/client.js";

const supabase = createClient();

export const getWishlist = async (userId) => {
  const { data, error } = await supabase
    .from("wishlists")
    .select("book_id, books(title, thumbnail_image)")
    .eq("user_id", userId);

  if (error) {
    return error;
  }

  return data;
};

export const addToWishlist = async (userId, bookId) => {
  const { data, error } = await supabase
    .from("wishlists")
    .insert([{ user_id: userId, book_id: bookId }]);

  return { data, error };
};

export const removeFromWishlist = async (userId, bookId) => {
  const { data, error } = await supabase
    .from("wishlists")
    .delete()
    .match({ user_id: userId, book_id: bookId });

  return { data, error };
};
