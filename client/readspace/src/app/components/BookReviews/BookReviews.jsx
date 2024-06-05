import WriteBookReview from "../WriteBookReview/WriteBookReview.jsx";
import SingleBookReview from "../SingleBookReview/SingleBookReview.jsx";
import BestSellingBookSingle from "../BestSellingBookSingle/BestSellingBookSingle.jsx";
import { bestSellers } from "../../../../utils/dummyData.js";
export default function BookReviews() {
  return (
    <div
      data-theme="retro"
      className="flex flex-col items-start justify-center my-4 ml-6 w-full gap-6 bg-white min-[1440px]:ml-24 2xl:w-4/6 2xl:ml-6    "
    >
      <h1 className="font-bold uppercase ">Write review</h1>
      <WriteBookReview />
      <div className="grid w-full grid-cols-2 justify-items-stretch ">
        <div className=" w-full  flex flex-col  ">
          <h1 className=" text-lg font-medium uppercase">Reviews</h1>
          {/* Item Container */}
          <SingleBookReview />
        </div>
        <div className="grid grid-cols-1 grid-rows-1 gap-4 ml-24">
          {bestSellers.map((book, i) => (
            <BestSellingBookSingle key={i} data={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
