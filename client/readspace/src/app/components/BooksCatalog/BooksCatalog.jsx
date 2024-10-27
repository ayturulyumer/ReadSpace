import BookCard from "../BookCard/BookCard.jsx";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation.js";

import { useWishlist } from "@/app/context/wishlistContext.jsx";
import Pagination from "../Pagination/Pagination.jsx";

export default function BooksCatalog({
  books,
  error,
  getBookIdHandler,
  totalPages,
  handlePageChange,
  currentPage,
}) {
  const { wishlistStatus, fetchWishlistStatus, toggleWishlistItem } =
    useWishlist();

  const search = useSearchParams();
  const query = search.get("query");

  useEffect(() => {
    fetchWishlistStatus(books);
  }, [books]);

  return (
    <div className="relative flex h-full w-screen flex-col justify-center overflow-hidden  py-6 sm:py-12">
      {/*If there is a query and books are found  */}
      {query && books?.length > 0 && (
        <p className="text-gray-600 text-center font-bold text-lg italic md:text-2xl">
          {books?.length} result{books?.length !== 1 ? "s" : ""} found for {query}
        </p>
      )}
      {books?.length > 0 && (
        <section>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      )}
      <div className="max-w-screen mx-auto">
        {error && (
          <div className="text-red-600 text-center mb-4">Error: {error}</div>
        )}
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 gap-8 md:grid-cols-3 2xl:grid-cols-5">
          {books?.length > 0 ? (
            books.map((book) => (
              <BookCard
                size="large"
                key={book.book_id}
                book={book}
                isInWishlist={wishlistStatus[book.book_id]}
                handleWishlistToggle={() => toggleWishlistItem(book.book_id)}
                getBookIdHandler={getBookIdHandler}
              />
            ))
          ) : (
            <div className="col-span-full  flex justify-center items-center">
              {query ? (
                <p className="text-gray-600 text-center font-bold text-lg italic md:text-2xl">
                  No results found for {query}
                </p>
              ) : (
                <p className="text-gray-600 text-center font-bold text-lg italic md:text-2xl">
                  No results found
                </p>
              )}
            </div>
          )}
        </div>
        {/* Show Pagination only if there are books */}
        {books?.length > 0 && (
          <section>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </section>
        )}
      </div>
    </div>
  );
}
