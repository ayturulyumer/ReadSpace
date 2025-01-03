import { BsCartPlus } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import Rating from "../Rating/Rating.jsx";
import BookActionsOverlay from "../BookActionsOverlay/BookActionsOverlay.jsx";
import { useAddToCart } from "@/app/hooks/useAddToCart.jsx";

const defaultBook = {
  title: "Book Title",
  author: "Author Name",
  thumbnail_image: "default-thumbnail.jpg",
  price: "0.00",
  overall_rating: 0,
  isBestseller: false,
};

export default function BookCard({
  body = true,
  book = defaultBook,
  size = "medium",
  actionsOverlay = false,
  getBookIdHandler = () => {},
  isInWishlist,
  handleWishlistToggle,
}) {
  const cardSizeClasses = size === "large" ? "w-64 h-full" : "w-48 h-full";

  const handleAddToCart = useAddToCart();

  // Depending from where i pass the book if it's in catalog it has book_id , if i'm passing it from  authors it's book.id
  const handleCardClick = () => {
    if (book?.book_id || book?.id) {
      getBookIdHandler(book.book_id || book.id);
    }
  };

  const onAddToCartClick = () => {
    const product = {
      id: book.book_id,
      name: book.title,
      price: book.price,
      quantity: 1,
      image: book.thumbnail_image,
    };
    handleAddToCart(product); // Call the returned function with the product
  };
  return (
    <div className="indicator">
      {book?.isBestseller && (
        <span className="indicator-item indicator-center badge font-medium badge-secondary text-primary-content md:indicator-end">
          Best Seller
        </span>
      )}
      <div
        data-theme="retro"
        className={`card card-compact bg-white shadow-xl relative group ${cardSizeClasses} border border-gray-300`}
      >
        <figure className="relative cursor-pointer" onClick={handleCardClick}>
          <img
            // if only the image is shown set bottom round to small else 3xl
            className={`w-full h-80 object-fit ${
              body ? "rounded-b-3xl" : ""
            } transition duration-300 ease-in-out hover:scale-110`}
            src={book?.thumbnail_image}
            alt={book?.title}
          />
        </figure>
        {body && (
          <div className="card-body items-start font-medium">
            <h1 className="text-lg  truncate max-w-full">{book?.title}</h1>
            <p>{book?.author}</p>
            <div className="-ml-2">
              <Rating
                rating={book?.overall_rating}
                name={book?.title}
                isDisabled={true}
              />
            </div>
            <p className="text-red-500">${book?.price}</p>
            {actionsOverlay ? (
              <BookActionsOverlay />
            ) : (
              <div className="flex self-end  gap-2">
                <button
                  type="button"
                  className="text-accent"
                  onClick={onAddToCartClick}
                >
                  <BsCartPlus style={{ fontSize: "2em" }} />
                </button>
                <button
                  className="text-primary"
                  type="button"
                  onClick={() => handleWishlistToggle(book.book_id)}
                >
                  {isInWishlist ? (
                    <IoMdHeart style={{ fontSize: "2em" }} />
                  ) : (
                    <CiHeart style={{ fontSize: "2em" }} />
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
