import { BsCartPlus } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import Rating from "../Rating/Rating.jsx";

export default function RelatedBookSingle({ data }) {
  return (
    <div className="relative group card card-compact text-center w-52 shadow-xl">
      <figure className="relative">
        <img
          src={data.image}
          alt="Shoes"
          className="w-full h-full object-cover rounded-b-3xl"
        />
      </figure>
      <div className="card-body">
        <div className="card-actions justify-center">
          <Rating />
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="card-actions space-x-2 flex flex-col  text-center items-center">
          <button className="btn w-full btn-outline btn-accent text-white">
            Add to cart <BsCartPlus style={{ fontSize: "2em" }} />
          </button>
          <button className="btn w-full btn-outline self-center btn-primary text-white">
            Add to wishlist <CiHeart style={{ fontSize: "2em" }} />
          </button>
          <button className="btn w-full btn-outline btn-secondary">
            Details{" "}
            <IoIosInformationCircleOutline style={{ fontSize: "2em" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
