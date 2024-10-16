import { TiDelete } from "react-icons/ti";
import Image from "next/image";

export default function Cart() {
  const products = [
    {
      id: 1,
      name: "$100M Offers: How To Make Offers So Good People Feel Stupid Saying No (Acquisition.com $100M Series Book 1)",
      price: 20,
      quantity: 1,
      image: "https://m.media-amazon.com/images/I/718ewn+YFJL._SY466_.jpg",
    },
    {
      id: 2,
      name: "The Almanack of Naval Ravikant",
      price: 29.99,
      quantity: 2,
      image:
        "https://m.media-amazon.com/images/I/31EQXd8E9eL._SY445_SX342_.jpg",
    },
    {
      id: 3,
      name: "The Almanack of Naval Ravikant",
      price: 29.99,
      quantity: 2,
      image:
        "https://m.media-amazon.com/images/I/31EQXd8E9eL._SY445_SX342_.jpg",
    },
    {
      id: 4,
      name: "The Almanack of Naval Ravikant",
      price: 29.99,
      quantity: 2,
      image:
        "https://m.media-amazon.com/images/I/31EQXd8E9eL._SY445_SX342_.jpg",
    },
  ];

  // Placeholder function for handling delete action
  const handleDelete = (id) => {
    console.log("Delete product with id:", id);
    // Add logic to remove the product from the cart
  };

  return (
    <div className="dropdown dropdown-end group">
      <div className="tooltip tooltip-bottom z-50" data-tip="Cart">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle btn-ghost hover:bg-transparent hover:text-white"
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm badge-secondary text-white indicator-item animate-pulse">
              8
            </span>
          </div>
        </div>
      </div>

      {/* This div will now show on hover */}
      <div
        tabIndex={0}
        className="z-50 card card-compact dropdown-content w-80 shadow p-2 rounded-box opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200"
        data-theme="luxury"
      >
        <div className="card-body gap-4">
          <span className="font-bold text-lg">8 products</span>
          <div className="max-h-96 overflow-auto">
            {products.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 mb-4 relative"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md"
                  unoptimized
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-md w-9/12 text-gray-400">
                    {item.name}
                  </h3>
                  <p className="text-lg font-bold mt-2 text-white">
                    $ {Math.floor(item.price)}
                    <span className="relative top-[-5px] text-sm">
                      .{(item.price % 1).toFixed(2).split(".")[1]}
                    </span>
                  </p>
                </div>
                {/* Delete Icon */}
                <button
                  className="absolute top-0 right-0 text-white  hover:text-red-700 mx-2"
                  onClick={() => handleDelete(item.id)}
                >
                  <TiDelete style={{ height: "24px", width: "24px" }} />
                </button>
              </div>
            ))}
          </div>
          <span className="flex justify-between font-sans text-white align-baseline text-lg">
            <span className="uppercase">Subtotal:</span>
            <span className="">$ 25.99</span>
          </span>
          <div
            data-theme="retro"
            className="flex w-full  bg-transparent justify-between"
          >
            <button className="btn w-30 uppercase  btn-active glass text-white font-extrabold ">
              View cart
            </button>
            <button className="btn w-36 uppercase     btn-accent btn-active text-white font-extrabold ">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
