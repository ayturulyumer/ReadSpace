import Rating from "../Rating/Rating.jsx";
import { BsCartPlus } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
export default function BookDetails() {
  return (
    <div className="hero">
      <div className="hero-content flex-col   lg:flex-row">
        <img
          src="https://m.media-amazon.com/images/I/718ewn+YFJL._SY466_.jpg"
          className="shadow-2xl md:max-w-7xl"
        />
        <div className="text-primary-content ml-6  ">
          <section className="flex flex-col mb-4 ">
            <h1 className="text-lg font-medium">
              $100M Offers: How To Make Offers So Good People Feel Stupid Saying
              No (Acquisition.com $100M Series Book 1)
            </h1>
            <p className="text-s "> by Alex Hormozi</p>
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
                  <td>Acquisition.com</td>
                </tr>
                <tr>
                  <th className="uppercase">ISBN</th>
                  <td className="">1737475731</td>
                </tr>
                <tr>
                  <th className="uppercase">Language</th>
                  <td>English</td>
                </tr>
                <tr>
                  <th className="uppercase">Pages</th>
                  <td>162</td>
                </tr>
                <tr>
                  <th className="uppercase">Price</th>
                  <td>$25.99</td>
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
