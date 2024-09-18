import Rating from "../Rating/Rating.jsx";

export default function SingleBookReview({ review }) {
  return (
    <div className="flex flex-col gap-3 my-4 rounded border  border-gray-300 text-xs md:text-medium">
      <div className="flex flex-col gap-4 p-4">
        {/* Profile and Rating */}
        <div className="flex gap-4 justify-between ">
          <div className="flex gap-4">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full">
                <img src={review?.user_avatar} alt="userAvatar" />
              </div>
            </div>
            <span>{review?.username}</span>
          </div>
          <Rating
            rating={review?.rating}
            name={review?.review_text}
            isDisabled={true}
          />
        </div>
        <div className="font-medium">
          {review?.review_text}
          <hr className="h-[2px] mt-4 bg-gray-300" />
        </div>
        <span>{review?.created_at}</span>
      </div>
    </div>
  );
}
