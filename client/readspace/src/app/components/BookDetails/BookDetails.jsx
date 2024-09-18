import Rating from "../Rating/Rating.jsx";
import { BsCartPlus } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { useWishlist } from "@/app/context/wishlistContext.jsx";
export default function BookDetails({ book, userId }) {
  const { wishlistStatus, toggleWishlistItem } = useWishlist();

  return (
    <div className="hero mt-20  md:mt-0">
      <div className="hero-content flex-col   lg:flex-row">
        <img
          src={book?.thumbnail_image}
          className="w-80 h-[466px] object-cover shadow-2xl border rounded-lg"
        />
        <div className="text-primary-content ml-6  ">
          <section className="flex flex-col mb-4 ">
            <h1 className="text-lg font-medium">{book?.title}</h1>
            <p className="text-s"> by {book?.author}</p>
          </section>
          <section>
            <span className="mr-2 font-semibold">{book?.overall_rating}</span>
            <Rating
              rating={book?.overall_rating}
              name={"BookDetails"}
              isDisabled
            />
            <span className="ml-4 font-medium">
              {book?.total_ratings} ratings
            </span>
          </section>
          <p className="py-4">{book?.details?.description}</p>
          <div className="overflow-x-auto">
            <table className="table-sm text-left ">
              <tbody>
                <tr>
                  <th className="uppercase">Publisher</th>
                  <td>{book?.details?.publisher}</td>
                </tr>
                <tr>
                  <th className="uppercase">ISBN</th>
                  <td className="">{book?.details?.isbn}</td>
                </tr>
                <tr>
                  <th className="uppercase">Language</th>
                  <td>{book?.details?.language}</td>
                </tr>
                <tr>
                  <th className="uppercase">Pages</th>
                  <td>{book?.details?.pages}</td>
                </tr>
                <tr>
                  <th className="uppercase">Price</th>
                  <td>${book?.price}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center gap-4 mt-4 md:flex-row  md:items-start ">
            <button
              onClick={() => toggleWishlistItem(book?.book_id)}
              className="btn btn-wide btn-primary text-white font-medium md:btn-md"
            >
              {wishlistStatus[book?.book_id] ? (
                <>
                  Remove from wishlist{" "}
                  <IoMdHeart
                    className="text-white"
                    style={{ fontSize: "2em" }}
                  />
                </>
              ) : (
                <>
                  Add to wishlist <CiHeart style={{ fontSize: "2em" }} />
                </>
              )}
            </button>
            <button className="btn btn-wide btn-accent text-white md:btn-md">
              Add to cart <BsCartPlus style={{ fontSize: "2em" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
