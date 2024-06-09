import { BsCartPlus } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import Rating from "../Rating/Rating.jsx";

export default function BookCard({ data, isBestSeller, size }) {
  const cardSizeClasses = size === "large" ? "w-72 h-full" : "w-52 h-full";

  return (
    <div className="indicator">
      {isBestSeller && (
        <span className="indicator-item indicator-center badge font-medium badge-accent text-white md:indicator-end">
          Best Seller
        </span>
      )}
      <div
        data-theme="retro"
        className={`card card-compact bg-white shadow-xl relative group ${cardSizeClasses}`}
      >
        <figure className="relative">
          <img
            className="w-full h-80 object-fit rounded-b-3xl"
            src={data.image}
            alt={data.title}
          />
        </figure>
        <div className="card-body items-baseline align-baseline font-medium">
          <h1 className="text-lg truncate max-w-full">{data.title}</h1>
          <p>{data.author}</p>
          <Rating />
          <p className="text-red-500">${data.price}</p>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="card-actions space-x-2 flex flex-col text-center items-center">
            <button className="btn w-full btn-outline btn-accent text-white">
              Add to cart <BsCartPlus style={{ fontSize: "2em" }} />
            </button>
            <button className="btn w-full btn-outline self-center btn-primary text-white">
              Add to wishlist <CiHeart style={{ fontSize: "2em" }} />
            </button>
            <button className="btn w-full btn-outline btn-secondary">
              Details <IoIosInformationCircleOutline style={{ fontSize: "2em" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
