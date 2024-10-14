"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation.js";

import { useAuth } from "@/app/context/authContext.jsx";
import { addToWishlist } from "@/app/actions/wishlistActions.js";

import {
  getBookById,
  getBookWithRatingsById,
} from "@/app/actions/booksActions.js";
import {
  getUserReviewByBook,
  submitRating,
} from "@/app/actions/ratingActions.js";

import BookDetails from "@/app/components/BookDetails/BookDetails.jsx";
import BookReviews from "@/app/components/BookReviews/BookReviews.jsx";
import RelatedBooks from "@/app/components/RelatedBooks/RelatedBooks.jsx";
import {
  getPaginatedReviewsForBookById,
  submitReview,
} from "@/app/actions/reviewActions.js";
import toast from "react-hot-toast";
import { scrollToTop } from "../../../../../utils/scrollToTop.js";

export default function Details() {
  // get user id from context
  const { session } = useAuth();
  const router = useRouter();

  const [isUserAlreadyReviewed, setIsUserAlreadyReviewed] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [userReview, setUserReview] = useState("");
  const [paginatedReviews, setPaginatedReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviewsCount, setTotalReviewsCount] = useState(0);
  const [book, setBook] = useState(null);

  const reviewsLimit = 5;

  const searchParams = useSearchParams();
  // declare userID
  const userId = session?.id;
  const username = session?.email;
  const userAvatar = session?.user_metadata?.avatar;
  // get the  book id from url
  const bookId = searchParams.get("bookId");

  // Fetch book and rating(if the user is logged in)
  useEffect(() => {
    const fetchBookAndRating = async () => {
      // Fetch book details and parse bookId to Number
      const { data: bookData, error: bookError } = await getBookById(
        Number(bookId)
      );
      // If there's an error or no book data, trigger 404
      if (bookError || !bookData) {
        router.push("/404");
      } else {
        setBook(bookData);
      }

      // Fetch user review  only if userId is available
      if (userId) {
        const {
          data: userAlreadyReviewedData,
          error: userAlreadyReviewedError,
        } = await getUserReviewByBook(bookId, userId);

        if (userAlreadyReviewedError) {
          console.error(userAlreadyReviewedError.message);
        } else {
          setIsUserAlreadyReviewed(userAlreadyReviewedData);
        }
      }
      // Calculate the `from` and `to` based on the current page and reviewsLimit
      const from = (currentPage - 1) * reviewsLimit;
      const to = from + reviewsLimit - 1;

      //Get all book reviews
      const {
        data: reviewsData,
        count: reviewsCount,
        error: reviewsError,
      } = await getPaginatedReviewsForBookById(bookId, from, to);
      if (reviewsError) {
        console.error(reviewsError.message);
      } else {
        setPaginatedReviews(reviewsData);
        setTotalReviewsCount(reviewsCount);
      }
    };

    fetchBookAndRating();
    scrollToTop();
  }, [bookId, userId, currentPage]);

  // Handle pagination page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalReviewsCount / reviewsLimit);

  const handleSetUserRating = useCallback(async (newRating) => {
    setUserRating(newRating);
  }, []);

  const handleReviewTextChange = (event) => {
    setUserReview(event.target.value);
  };

  // Handle Rating & Review Submit
  const handleSubmit = async () => {
    if (!userReview || !userRating) {
      toast.error("Please provide both a rating and a review!");
      return;
    }

    toast.promise(
      Promise.all([
        submitRating(bookId, userId, userRating),
        submitReview(bookId, userId, username, userAvatar, userReview),
      ]).then(async ([ratingResult, reviewResult]) => {
        const { error: ratingError } = ratingResult;
        const { data: reviewData, error: reviewError } = reviewResult;

        if (ratingError) {
          throw new Error(ratingError.message);
        }
        if (reviewError) {
          throw new Error(reviewError.message);
        }

        setPaginatedReviews((prevReviews) => [reviewData, ...prevReviews]); // Add the new review to existing reviews immediately
        setIsUserAlreadyReviewed((reviews) => [reviewData, ...reviews]); // Flag that the user already reviewed , so writeReview component disable immediately
        return "Successfully submitted your rating and review!";
      }),
      {
        loading: "Submitting...",
        success: (message) => message,
        error: (err) =>
          err.message ||
          "There was a problem submitting your review and rating.",
      }
    );
  };

  return (
    <main data-theme="retro" className="min-h-fit bg-white ">
      <BookDetails book={book} userId={userId} />
      <div className="flex  max-w-full items-center justify-center p-1  ">
        <div
          data-theme="retro"
          className="flex flex-col items-start justify-center my-4 ml-6 w-full gap-6 bg-white min-[1440px]:ml-24 2xl:w-4/6 2xl:ml-6"
        >
          <div className="w-full ">
            <div className="grid grid-cols-1    [@media(min-width:600px)]:grid-cols-2">
              <BookReviews
                bookId={bookId}
                userId={userId}
                userAvatar={userAvatar}
                isUserAlreadyReviewed={isUserAlreadyReviewed}
                userRating={userRating}
                userReview={userReview}
                handleSetUserRating={handleSetUserRating}
                handleReviewSubmit={handleSubmit}
                handleReviewTextChange={handleReviewTextChange}
                paginatedReviews={paginatedReviews}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                totalPages={totalPages}
              />
              <RelatedBooks />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
