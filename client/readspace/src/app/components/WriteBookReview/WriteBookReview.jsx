import Rating from "../Rating/Rating.jsx";
import { FaRegComment } from "react-icons/fa";

import Image from "next/image.js";
import ProfilePhoto from "../../../../public/samba.jpg";

export default function WriteBookReview() {
  return (
    <div className="flex gap-4 w-full">
      <div className="avatar">
        <div className="w-12 h-12 rounded-full">
          <Image src={ProfilePhoto} />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-fit  ">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered   input-md  max-w-lg w-4/5  bg-white md:w-full  xl:w-screen"
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
