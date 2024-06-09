import { BsCartPlus } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import Rating from "../Rating/Rating.jsx";
import BookActionsOverlay from "../BookActionsOverlay/BookActionsOverlay.jsx";

export default function ({ data, isBestSeller, size, actionsOverlay }) {
  const cardSizeClasses = size === "large" ? "w-64 h-full" : "w-52 h-full";

  return (
    <div className="indicator">
      {isBestSeller && (
        <span className="indicator-item indicator-center badge font-medium badge-secondary text-primary-content md:indicator-end">
          Best Seller
        </span>
      )}
      <div
        data-theme="retro"
        className={`card card-compact bg-white shadow-xl relative group ${cardSizeClasses} transition duration-300 ease-in-out hover:scale-105`}
      >
        <figure className="relative">
          <img
            className="w-full h-80 object-fit rounded-b-3xl transition duration-300 ease-in-out hover:scale-110 "
            src={data.image}
            alt={data.title}
          />
        </figure>
        <div className="card-body items-baseline align-baseline font-medium">
          <h1 className="text-lg truncate max-w-full">{data.title}</h1>
          <p>{data.author}</p>
          <Rating />
          <p className="text-red-500">${data.price}</p>
          {actionsOverlay ? (
            <BookActionsOverlay />
          ) : (
            <div className="flex self-end gap-2">
              <button className="text-accent">
                <BsCartPlus style={{ fontSize: "2em",  }} />
              </button>
              <button className="text-primary">
                <CiHeart style={{ fontSize: "2em" }} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
