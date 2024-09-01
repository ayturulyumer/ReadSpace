"use client";
import BookCard from "../components/BookCard/BookCard.jsx";
import EmptyState from "../components/EmptyState/EmptyState.jsx";

export default function Wishlist() {
  return (
    <div className="text-secondary" data-theme="cupcake">
      <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
        <h1 className="border-b my-6 text-4xl font-semibold">Wishlist</h1>
        <EmptyState />
        <div className="grid py-4 grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* {[...Array(24)].map((_, index) => (
            <div key={index} className="flex items-center justify-center">
              <BookCard />
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
