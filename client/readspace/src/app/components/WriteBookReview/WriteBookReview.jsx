import Rating from "../Rating/Rating.jsx";
import { FaRegComment } from "react-icons/fa";

import Image from "next/image.js";
import ProfilePhoto from "../../../../public/samba.jpg";

export default function WriteBookReview({
  bookId,
  userRated,
  userId,
  userAvatar,
  userReview,
  handleRatingSubmit,
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
          {userRated !== null ? (
            <section className="flex flex-col gap-2">
              <Rating rating={userRated} name={"userRated"} isDisabled={true} />
              <p className="text-sm font-medium text-green-500">
                You rated this book !
              </p>
            </section>
          ) : (
            <Rating
              isDisabled={false}
              name={"userNotRated"}
              handleRatingSubmit={handleRatingSubmit}
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
