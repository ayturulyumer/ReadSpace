import Rating from "../Rating/Rating.jsx";
import { BsCartPlus } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
export default function BookDetails({book}) {
  return (
    <div className="hero">
      <div className="hero-content flex-col   lg:flex-row">
        <img
          src={book?.thumbnail_image}
        className="w-80 h-[466px] object-cover shadow-2xl"
        />
        <div className="text-primary-content ml-6  ">
          <section className="flex flex-col mb-4 ">
            <h1 className="text-lg font-medium">
             {book?.title}
            </h1>
            <p className="text-s "> by {book?.author}</p>
          </section>
          <Rating />
          <p className="py-4">
            $100M Offers by Alex Hormozi is a business book that provides
            strategies for entrepreneurs and business owners to generate more
            revenue and increase profits by creating compelling offers that
            serve and add value to their clients.
          </p>
          <div className="overflow-x-auto">
            <table className="table-sm text-left ">
              <tbody>
                <tr>
                  <th className="uppercase">Publisher</th>
                  <td>{book?.details.publisher}</td>
                </tr>
                <tr>
                  <th className="uppercase">ISBN</th>
                  <td className="">{book?.details.isbn}</td>
                </tr>
                <tr>
                  <th className="uppercase">Language</th>
                  <td>{book?.details.language}</td>
                </tr>
                <tr>
                  <th className="uppercase">Pages</th>
                  <td>{book?.details.pages}</td>
                </tr>
                <tr>
                  <th className="uppercase">Price</th>
                  <td>${book?.price}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center gap-4 mt-4 md:flex-row  md:items-start ">
            <button className="btn btn-wide btn-primary text-white font-medium md:btn-md">
              Add to wishlist <CiHeart style={{ fontSize: "2em" }} />
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
