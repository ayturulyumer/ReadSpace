import { createClient } from "../../../utils/supabase/client.js";

const supabase = createClient();

export const getWishlist = async (userId) => {
  const { data, error } = await supabase.rpc("get_user_wishlist_with_details", {
    p_user_id: userId,
  });

  return { data, error };
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
