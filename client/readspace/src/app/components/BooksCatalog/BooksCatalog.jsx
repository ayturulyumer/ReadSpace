"use client";
// TODO : fix bestseller badge color to be the same with bestsellingbook section
import { useState, useEffect } from "react";
import { getAllBooks } from "@/app/actions/booksActions.js";
import BookCard from "../BookCard/BookCard.jsx";
export default function BooksCatalog() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await getAllBooks();
      console.log(data);
      if (error) {
        setError(error);
      } else {
        setBooks(data);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="relative flex h-full w-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="max-w-screen mx-auto">
        {error && (
          <div className="text-red-600 text-center mb-4">Error: {error}</div>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book, i) => (
            <BookCard key={i} data={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
