"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation.js";

import { useAuth } from "@/app/context/authContext.jsx";

import {
  getBookById,
  getBookWithRatingsById,
} from "@/app/actions/booksActions.js";
import {
  getUserRatingByBook,
  submitRating,
} from "@/app/actions/ratingActions.js";

import BookDetails from "@/app/components/BookDetails/BookDetails.jsx";
import BookReviews from "@/app/components/BookReviews/BookReviews.jsx";
import RelatedBooks from "@/app/components/RelatedBooks/RelatedBooks.jsx";
export default function Details() {
  // get user id from context
  const { session } = useAuth();

  // saving the rating as number instead of boolean because i need to show the rating
  const [userRated, setUserRated] = useState(null);
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  // declare userID
  const userId = session?.id;
  // get the  book id from url
  const bookId = searchParams.get("bookId");

  // Fetch book and rating(if the user is logged in)
  useEffect(() => {
    const fetchBookAndRating = async () => {
      // Fetch book details and parse bookId to Number
      const { data, error } = await getBookWithRatingsById(Number(bookId));
      if (error) {
        setError(error.message);
      } else {
        setBook(data);
      }

      // Fetch user rating if userId is available
      if (userId) {
        const { data, error } = await getUserRatingByBook(bookId, userId);
        console.log(error);
        if (error) {
          setError(error.message);
        } else {
          setUserRated(data?.rating);
        }
      }
    };

    fetchBookAndRating();
  }, [bookId, userId]);

  // Submit the rating to the rating table and once it's submitted disable the rating
  const handleRatingSubmit = useCallback(
    async (newRating) => {
      if (userId && bookId) {
        const { status, error } = await submitRating(bookId, userId, newRating);
        if (error) {
          console.log("Error submitting your rating", error.message);
        } else {
          setUserRated(newRating);
          console.log("Successfully rated", newRating, status);
        }
      }
    },
    [userId, bookId]
  );

  return (
    <main data-theme="retro" className="min-h-fit bg-white">
      <BookDetails book={book} />
      <div className="flex  max-w-full items-center justify-center p-1  ">
        <div
          data-theme="retro"
          className="flex flex-col items-start justify-center my-4 ml-6 w-full gap-6 bg-white min-[1440px]:ml-24 2xl:w-4/6 2xl:ml-6"
        >
          <div className="w-full ">
            <div className="grid grid-cols-1   sm:grid-cols-2">
              <BookReviews
                bookId={bookId}
                userId={userId}
                userRated={userRated}
                handleRatingSubmit={handleRatingSubmit}
              />
              <RelatedBooks />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
