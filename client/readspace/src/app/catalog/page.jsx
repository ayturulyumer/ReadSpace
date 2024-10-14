"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation.js";

import { getAllBooksWithOptionalAuthors } from "../actions/booksActions.js";
import useDebounce from "../hooks/debounceHook.jsx";

import BookFilters from "../components/BookFilters/BookFilters.jsx";
import BooksCatalog from "../components/BooksCatalog/BooksCatalog.jsx";
import Spinner from "../components/Spinner/Spinner.jsx";
import { scrollToTop } from "../../../utils/scrollToTop.js";

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalCount, setTotalCount] = useState(0); // Total count of books
  const booksLimit = 15;

  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParam = searchParams.get("query");

  const debouncedAuthors = useDebounce(selectedAuthors, 500); // 500ms debounce

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const offset = (currentPage - 1) * booksLimit; // Calculate offset based on current page
      const { data, error } = await getAllBooksWithOptionalAuthors(
        debouncedAuthors,
        queryParam,
        booksLimit,
        offset
      );
      if (error) {
        setError(error);
      } else {
        setBooks(data[0].book_data);
        setTotalCount(data[0].total_count); // Set total count of books
        setIsLoading(false);
      }
    };

    fetchBooks();
    scrollToTop();
  }, [debouncedAuthors, currentPage, queryParam]);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate total pages to render number of pages accordingly
  const totalPages = Math.ceil(totalCount / booksLimit);

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
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          books={books}
          error={error}
          getBookIdHandler={getBookIdHandler}
        />
      )}
    </div>
  );
}
