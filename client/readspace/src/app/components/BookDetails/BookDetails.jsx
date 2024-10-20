import Rating from "../Rating/Rating.jsx";
import { BsCartPlus } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { useWishlist } from "@/app/context/wishlistContext.jsx";
import Image from "next/image.js";
import Link from "next/link.js";
import { useAddToCart } from "@/app/hooks/useAddToCart.jsx";

export default function BookDetails({ book, userId }) {
  const { wishlistStatus, toggleWishlistItem } = useWishlist();
  const handleAddToCart = useAddToCart();

  const onAddToCartClick = () => {
    const product = {
      id: book.book_id,
      name: book.title,
      price: book.price,
      quantity: 1,
      image: book.thumbnail_image,
    };
    handleAddToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20 md:mt-0">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
        <div className="lg:sticky lg:top-8 lg:self-start mb-8 lg:mb-0 w-full lg:w-1/3">
          <img
            src={book?.thumbnail_image}
            alt={`Cover of ${book?.title}`}
            className="w-full h-auto max-h-[600px] object-contain shadow-2xl border rounded-lg"
          />
        </div>
        <div className="flex-grow lg:w-2/3">
          <section className="flex flex-col mb-4">
            <h1 className="text-3xl mb-4 font-medium">{book?.title}</h1>
            <Link
              className="flex gap-4 items-center "
              href={`/authors/author?authorId=${encodeURIComponent(
                book?.author_id
              )}`}
            >
              <p className="text-xl "> by {book?.author_name}</p>
              <span className="avatar mask ring-2  mask-circle w-12 h-12">
                {book?.author_image && (
                  <Image
                    src={book?.author_image}
                    alt="Author Image"
                    width={0}
                    height={0}
                    unoptimized
                  />
                )}
              </span>
            </Link>
          </section>
          <section className="mb-4 badge badge-outline badge-primary-content badge-lg">
            <span className="mr-2 font-semibold text-lg">
              {book?.overall_rating}
            </span>
            <Rating
              rating={book?.overall_rating}
              name={"BookDetails"}
              isDisabled
            />
            <span className="ml-4 font-medium text-lg">
              {book?.total_ratings} ratings
            </span>
          </section>
          <hr className="border-orange-200 my-2" />
          <p className="py-4 text-base tracking-wide">
            {book?.details?.description}
          </p>
          <hr className="border-orange-200 my-2" />
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <th className="uppercase pr-4 py-2 text-sm">Publisher</th>
                  <td className="text-base">{book?.details?.publisher}</td>
                </tr>
                <tr>
                  <th className="uppercase pr-4 py-2 text-sm">ISBN</th>
                  <td className="text-base">{book?.details?.isbn}</td>
                </tr>
                <tr>
                  <th className="uppercase pr-4 py-2 text-sm">Language</th>
                  <td className="text-base">{book?.details?.language}</td>
                </tr>
                <tr>
                  <th className="uppercase pr-4 py-2 text-sm">Pages</th>
                  <td className="text-base">{book?.details?.pages}</td>
                </tr>
                <tr>
                  <th className="uppercase pr-4 py-2 text-sm">Price</th>
                  <td className="text-base">${book?.price}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-start gap-4 mt-4 md:flex-row">
            <button
              onClick={() => toggleWishlistItem(book?.book_id)}
              className="w-full md:w-auto px-6 py-3 bg-primary text-white font-medium text-md rounded-md transition-colors duration-200 hover:bg-primary-dark"
            >
              {wishlistStatus[book?.book_id] ? (
                <>
                  Remove from wishlist{" "}
                  <IoMdHeart
                    className="inline-block ml-2"
                    style={{ fontSize: "1.5em" }}
                  />
                </>
              ) : (
                <>
                  Add to wishlist{" "}
                  <CiHeart
                    className="inline-block ml-2"
                    style={{ fontSize: "1.5em" }}
                  />
                </>
              )}
            </button>
            <button
              onClick={onAddToCartClick}
              className="w-full md:w-auto px-6 py-3 bg-accent text-white font-medium text-md rounded-md transition-colors duration-200 hover:bg-accent-dark"
            >
              Add to cart{" "}
              <BsCartPlus
                className="inline-block ml-2"
                style={{ fontSize: "1.5em" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
