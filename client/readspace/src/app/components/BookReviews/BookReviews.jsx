import WriteBookReview from "../WriteBookReview/WriteBookReview.jsx";
import SingleBookReview from "../SingleBookReview/SingleBookReview.jsx";
import { bestSellers } from "../../../../utils/dummyData.js";

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
      <div className="w-full flex flex-col">
        <h1 className="text-lg font-medium underline-orange uppercase">
          Reviews
        </h1>
        {allReviews.length > 0 ? (
          allReviews.map((review, i) => (
            <SingleBookReview
              key={i} // Assuming each review has a unique `id`
              review={review}
            />
          ))
        ) : (
          <p className="my-10">No reviews available.</p>
        )}

        {/* Add more <SingleBookReview /> components if needed */}
      </div>
    </div>
  );
}
