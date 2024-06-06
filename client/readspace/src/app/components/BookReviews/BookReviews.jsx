import WriteBookReview from "../WriteBookReview/WriteBookReview.jsx";
import SingleBookReview from "../SingleBookReview/SingleBookReview.jsx";
import BestSellingBookSingle from "../BestSellingBookSingle/BestSellingBookSingle.jsx";
import { bestSellers } from "../../../../utils/dummyData.js";

export default function BookReviews() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-medium text-lg underline-orange uppercase mb-4">
        Write review
      </h1>
      <WriteBookReview />
      <div className="w-full flex flex-col">
        <h1 className="text-lg font-medium underline-orange uppercase">
          Reviews
        </h1>
        <SingleBookReview />
        {/* Add more <SingleBookReview /> components if needed */}
      </div>
    </div>
  );
}
