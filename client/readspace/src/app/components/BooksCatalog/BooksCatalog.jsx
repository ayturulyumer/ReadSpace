import BookCard from "../BookCard/BookCard.jsx";
import { useState, useEffect } from "react";
import { createClient } from "../../../../utils/supabase/client.js";
import { useAuth } from "@/app/context/authContext.jsx";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/app/actions/wishlistActions.js";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation.js";
export default function BooksCatalog({ books, error, getBookIdHandler }) {
  const supabase = createClient();
  const [wishlistStatus, setWishlistStatus] = useState({});
  const { session } = useAuth();
  const router = useRouter();

  const userId = session?.id;

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      if (!userId || books.length === 0) return;

      try {
        const { data, error } = await supabase
          .from("wishlists")
          .select("book_id")
          .eq("user_id", userId);

        if (error) {
          console.error("Error fetching wishlist status:", error);
          return;
        }

        const initialStatus = {};
        data.forEach((item) => {
          initialStatus[item.book_id] = true;
        });

        setWishlistStatus(initialStatus);
      } catch (err) {
        console.error("Error loading wishlist:", err);
      }
    };

    fetchWishlistStatus();
  }, [userId, books]);

  const handleWishlistToggle = async (bookId) => {
    const isInWishlist = wishlistStatus[bookId];

    if (!userId) {
      router.push("/login");
      toast.error("You must be logged in to add books in wishlist");
      return;
    }

    if (isInWishlist) {
      // If the book is in the wishlist, remove it
      const { error } = await removeFromWishlist(userId, bookId);

      if (error) {
        toast.error("Error removing from wishlist: " + error.message);
        return;
      }

      toast.success("Removed from wishlist!");

      // Update the state to reflect that the book is no longer in the wishlist
      setWishlistStatus((prevState) => ({
        ...prevState,
        [bookId]: false,
      }));
    } else {
      // If the book is not in the wishlist, add it
      const { error } = await addToWishlist(userId, bookId);

      if (error) {
        toast.error("Error adding to wishlist: " + error.message);
        return;
      }

      toast.success("Added to wishlist!");

      // Update the state to reflect that the book is now in the wishlist
      setWishlistStatus((prevState) => ({
        ...prevState,
        [bookId]: true,
      }));
    }
  };

  return (
    <div className="relative flex h-full w-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="max-w-screen mx-auto">
        {error && (
          <div className="text-red-600 text-center mb-4">Error: {error}</div>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book, i) => (
            <BookCard
              key={book.book_id}
              book={book}
              isInWishlist={wishlistStatus[book.book_id]}
              handleWishlistToggle={handleWishlistToggle}
              getBookIdHandler={getBookIdHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
