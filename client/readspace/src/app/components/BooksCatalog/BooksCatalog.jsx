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
import { useWishlist } from "@/app/context/wishlistContext.jsx";

export default function BooksCatalog({ books, error, getBookIdHandler }) {
  const { wishlistStatus, fetchWishlistStatus, toggleWishlistItem } =
    useWishlist();

  useEffect(() => {
    fetchWishlistStatus(books);
  }, [books]);

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
              handleWishlistToggle={() => toggleWishlistItem(book.book_id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
