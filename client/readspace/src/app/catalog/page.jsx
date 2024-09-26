"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";

import { getAllBooksWithOptionalAuthors } from "../actions/booksActions.js";
import useDebounce from "../hooks/debounceHook.jsx";

import BookFilters from "../components/BookFilters/BookFilters.jsx";
import BooksCatalog from "../components/BooksCatalog/BooksCatalog.jsx";
import Spinner from "../components/Spinner/Spinner.jsx";

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();

  const debouncedAuthors = useDebounce(selectedAuthors, 500); // 500ms debounce

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const { data, error } = await getAllBooksWithOptionalAuthors(
        debouncedAuthors
      );
      if (error) {
        setError(error);
      } else {
        setBooks(data);
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedAuthors]);

  const getBookIdHandler = (bookId) => {
    setIsLoading(true);
    router.push(`/catalog/details/book?bookId=${bookId}`);
  };

  const handleAuthorSelect = (author) => {
    setSelectedAuthors((prev) => {
      const isSelected = prev.includes(author);
      const newSelection = isSelected
        ? prev.filter((a) => a !== author)
        : [...prev, author];

      return newSelection;
    });
  };

  return (
    <div className="max-w-fit min-h-screen flex flex-col lg:flex-row  ">
      <BookFilters
        selectedAuthors={selectedAuthors}
        onAuthorSelect={handleAuthorSelect}
      />
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
