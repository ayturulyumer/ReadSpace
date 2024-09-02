"use client";
import { createContext, useReducer, useContext, useEffect } from "react";
import {
  addToWishlist,
  removeFromWishlist,
} from "../actions/wishlistActions.js";
import wishlistReducer from "../reducers/wishlistReducers.js";
import { createClient } from "../../../utils/supabase/client.js";
import { useRouter } from "next/navigation.js";
import { useAuth } from "./authContext.jsx";
import toast from "react-hot-toast";

const supabase = createClient();

const WishlistContext = createContext();

const initialState = {
  wishlistStatus: {},
  loading: false,
  error: null,
};

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { session } = useAuth();
  const router = useRouter();

  const fetchWishlistStatus = async (books) => {
    const userId = session?.id;
    if (!userId || books.length === 0) return;

    dispatch({ type: "SET_LOADING" });

    const { data, error } = await supabase
      .from("wishlists")
      .select("book_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching wishlist status:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
      return;
    }

    const initialStatus = {};
    data.forEach((item) => {
      initialStatus[item.book_id] = true;
    });

    dispatch({ type: "SET_WISHLIST_STATUS", payload: initialStatus });
  };

  const toggleWishlistItem = async (bookId) => {
    const userId = session?.id;
    const isInWishlist = state.wishlistStatus[bookId];

    if (!userId) {
      router.push("/login");
      toast.error("You must be logged in to add books in wishlist");
      return;
    }

    if (isInWishlist) {
      const { error } = await removeFromWishlist(userId, bookId);

      if (error) {
        toast.error("Error removing from wishlist: " + error.message);
        return;
      }

      toast.success("Removed from wishlist!");

      dispatch({
        type: "TOGGLE_WISHLIST_ITEM",
        payload: { bookId, status: false },
      });
    } else {
      const { error } = await addToWishlist(userId, bookId);

      if (error) {
        toast.error("Error adding to wishlist: " + error.message);
        return;
      }

      toast.success("Added to wishlist!");

      dispatch({
        type: "TOGGLE_WISHLIST_ITEM",
        payload: { bookId, status: true },
      });
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        ...state,
        fetchWishlistStatus,
        toggleWishlistItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
