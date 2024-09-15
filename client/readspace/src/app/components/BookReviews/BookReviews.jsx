import WriteBookReview from "../WriteBookReview/WriteBookReview.jsx";
import SingleBookReview from "../SingleBookReview/SingleBookReview.jsx";
import { FaBook } from "react-icons/fa";

export default function BookReviews({
  bookId,
  userRated,
  userId,
  userAvatar,
  handleRatingSubmit,
  handleReviewSubmit,
  handleReviewTextChange,
  userReview,
  allReviews,
}) {
  return (
    <div className="flex flex-col gap-6">
      {userId && (
        <div>
          <h1 className="font-medium text-lg underline-orange uppercase mb-4">
            Write review
          </h1>
          <WriteBookReview
            userAvatar={userAvatar}
            bookId={bookId}
            userId={userId}
            userReview={userReview}
            userRated={userRated}
            handleRatingSubmit={handleRatingSubmit}
            handleReviewSubmit={handleReviewSubmit}
            handleReviewTextChange={handleReviewTextChange}
          />
        </div>
      )}

      <div className="w-full flex flex-col">
        <h1 className="text-lg font-medium underline-orange uppercase">
          Reviews
        </h1>
        {allReviews.length > 0 ? (
          allReviews.map((review, i) => (
            <SingleBookReview key={i} review={review} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-6  rounded-lg shadow-md max-w-sm mx-auto">
            <FaBook className="w-12 h-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Reviews Yet
            </h2>
            <p className="text-gray-600 text-center">
              This book has not received any reviews. Be the first to share your
              thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
