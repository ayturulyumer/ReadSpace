import { BsCartPlus } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
export default function BookActionsOverlay() {
  return (
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
  );
}
