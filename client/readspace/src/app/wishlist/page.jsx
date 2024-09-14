"use client";
import { useEffect, useState } from "react";
import { getWishlist } from "../actions/wishlistActions.js";
import { useWishlist } from "../context/wishlistContext.jsx";
import { useAuth } from "../context/authContext.jsx";
import BookCard from "../components/BookCard/BookCard.jsx";
import EmptyState from "../components/EmptyState/EmptyState.jsx";
import Spinner from "../components/Spinner/Spinner.jsx";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation.js";

export default function Wishlist() {
  const { session } = useAuth();
  const [wishlist, setWishlist] = useState();
  const [loading, setIsLoading] = useState(true);
  const { wishlistStatus, fetchWishlistStatus, toggleWishlistItem } =
    useWishlist();

  const userId = session?.id;
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      const fetchWishlist = async () => {
        setIsLoading(true);
        const { data, error } = await getWishlist(userId);
        if (error) {
          toast.error(error.message);
          return;
        }
        setWishlist(data);
        setIsLoading(false);
      };
      fetchWishlist();
    }
  }, [userId]);

  const getBookIdHandler = (bookId) => {
    setIsLoading(true);
    router.push(`/catalog/details/book?bookId=${bookId}`);
  };

  useEffect(() => {
    fetchWishlistStatus(wishlist);
  }, [wishlist]);

  if (loading) {
    return <Spinner />; // Show spinner while loading
  }

  return (
    <div className="text-secondary" data-theme="cupcake">
      <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
        <h1 className="border-b my-6 text-4xl font-semibold">Your Wishlist</h1>

        {wishlist.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <p className="mb-4 text-gray-500">
              {wishlist.length} {wishlist.length > 1 ? "books" : "book"}
            </p>
            <div className="grid border py-4 grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {wishlist.map((item) => (
                <div
                  key={item.book_id}
                  className="flex items-center justify-center"
                >
                  <BookCard
                    book={item}
                    isInWishlist={wishlistStatus[item.book_id]}
                    handleWishlistToggle={() =>
                      toggleWishlistItem(item.book_id)
                    }
                    getBookIdHandler={getBookIdHandler}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
