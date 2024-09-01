"use client";
// TODO : fix bestseller badge color to be the same with bestsellingbook section
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";

import { getAllBooks } from "../actions/booksActions.js";

import BookFilters from "../components/BookFilters/BookFilters.jsx";
import BooksCatalog from "../components/BooksCatalog/BooksCatalog.jsx";
import Spinner from "../components/Spinner/Spinner.jsx";

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const { data, error } = await getAllBooks();
      if (error) {
        setError(error);
      } else {
        setBooks(data);
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const getBookIdHandler = (bookId) => {
    setIsLoading(true);
    router.push(`/catalog/details/book?bookId=${bookId}`);
  };
  return (
    <div className="max-w-fit min-h-screen flex flex-col lg:flex-row  ">
      <BookFilters />
      {loading ? (
        <Spinner />
      ) : (
        <BooksCatalog
          books={books}
          error={error}
          getBookIdHandler={getBookIdHandler}
        />
      )}
    </div>
  );
}
