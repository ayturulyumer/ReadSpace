import Rating from "../Rating/Rating.jsx";
import { FaRegComment } from "react-icons/fa";

export default function WriteBookReview({
  bookId,
  userId,
  userRating,
  userAvatar,
  userReview,
  handleSetUserRating,
  handleReviewSubmit,
  handleReviewTextChange,
}) {
  return (
    <div className="flex gap-4 w-full">
      <div className="avatar">
        <div className="w-12 h-12 rounded-full">
          <img src={userAvatar} alt="user-avatar" />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-fit  ">
        <input
          type="text"
          value={userReview}
          onChange={handleReviewTextChange}
          placeholder="Type here"
          className="input input-bordered   input-md  max-w-lg w-4/5  bg-white md:w-full  xl:w-screen"
        />
        <div className="flex w- flex-col items-baseline gap-4 md:flex-row md:justify-between">
          {userRating !== null ? (
            <section className="flex flex-col gap-2">
              <Rating rating={userRating} name={"userRated"} isDisabled={true} />
            </section>
          ) : (
            <Rating
              isDisabled={false}
              name={"userNotRated"}
              handleSetUserRating={handleSetUserRating}
            /> // Allow rating if the user hasn't rated yet
          )}

          <button
            onClick={handleReviewSubmit}
            className="btn w-fit btn-accent  text-white  "
          >
            Submit <FaRegComment style={{ fontSize: "2em" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
