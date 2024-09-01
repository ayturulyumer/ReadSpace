"use client";
import BookCard from "../components/BookCard/BookCard.jsx";
import EmptyState from "../components/EmptyState/EmptyState.jsx";
import { useEffect, useState } from "react";
import { getWishlist } from "../actions/wishlistActions.js";
import { useAuth } from "../context/authContext.jsx";
import Spinner from "../components/Spinner/Spinner.jsx";
import toast from "react-hot-toast";

export default function Wishlist() {
  const { session } = useAuth();
  const [wishlist, setWishlist] = useState();
  const [loading, setIsLoading] = useState(true);

  const userId = session?.id;

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

  console.log(wishlist);

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
          <div className="grid border py-4 grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlist.map((item) => (
              <div
                key={item.book_id}
                className="flex items-center justify-center"
              >
                <BookCard book={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
