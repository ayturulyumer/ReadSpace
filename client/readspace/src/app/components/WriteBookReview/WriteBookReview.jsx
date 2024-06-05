import Rating from "../Rating/Rating.jsx";
import { FaRegComment } from "react-icons/fa";
export default function WriteBookReview() {
  return (
    <div className="flex gap-4 w-full">
      <div className="avatar">
        <div className="w-12 h-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-fit  ">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered   input-md max-w-lg  bg-white md:w-screen"
        />
        <div className="flex w- flex-col items-baseline gap-4 md:flex-row md:justify-between">
          <Rating />
          <button className="btn w-fit btn-accent  text-white  ">
            Submit <FaRegComment style={{ fontSize: "2em" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
