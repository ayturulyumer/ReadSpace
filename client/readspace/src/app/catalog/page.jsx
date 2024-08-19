"use client";
// TODO : fix bestseller badge color to be the same with bestsellingbook section
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";

import { getAllBooks } from "../actions/booksActions.js";

import BookFilters from "../components/BookFilters/BookFilters.jsx";
import BooksCatalog from "../components/BooksCatalog/BooksCatalog.jsx";

BookFilters;
export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await getAllBooks();
      if (error) {
        setError(error);
      } else {
        setBooks(data);
      }
    };

    fetchBooks();
  }, []);

  const getBookIdHandler = (bookId) => {
    router.push(`/catalog/details/book?bookId=${bookId}`);
  };

  return (
    <div className="max-w-fit min-h-screen flex flex-col lg:flex-row ">
      <BookFilters />
      <BooksCatalog
        books={books}
        error={error}
        getBookIdHandler={getBookIdHandler}
      />
    </div>
  );
}
