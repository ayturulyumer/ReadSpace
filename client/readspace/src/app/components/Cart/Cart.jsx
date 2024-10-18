import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import Image from "next/image";
import Link from "next/link.js";
import { useRouter } from "next/navigation.js";

export default function Cart() {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility
  const router = useRouter();

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
  ];

  // Function to close the dropdown
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Function to handle cart click and redirect to checkout page
  const handleCartClick = () => {
    closeDropdown(); // Close the dropdown
    router.push("/checkout"); // Redirect to checkout page
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setDropdownOpen(true)} // Open on hover
      onMouseLeave={closeDropdown} // Close when the mouse leaves
    >
      {/* Cart Button */}
      <div className="tooltip tooltip-bottom z-50" data-tip="Cart">
        <button className="btn btn-circle btn-ghost hover:bg-transparent hover:text-white">
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
        </button>
      </div>

      {/* Dropdown Content */}
      {dropdownOpen && (
        <div
          className="z-50 card card-compact absolute -right-12 w-80 shadow p-2 rounded-box"
          data-theme="luxury"
        >
          <div className="card-body gap-4">
            <span className="font-bold text-md text-white font-sans uppercase">
              8 products
            </span>
            <hr className="border-orange-400" />
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
                    className="absolute top-0 right-0 text-white hover:text-red-700 mx-2"
                    onClick={() =>
                      console.log("Delete product with id:", item.id)
                    }
                  >
                    <TiDelete style={{ height: "24px", width: "24px" }} />
                  </button>
                </div>
              ))}
            </div>
            <hr className="border-orange-400" />
            <span className="flex justify-between font-sans text-white align-baseline text-lg">
              <span className="uppercase">Subtotal:</span>
              <span className="">$ 25.99</span>
            </span>
            <div
              data-theme="retro"
              className="flex w-full bg-transparent justify-between"
            >
              <button
                type="button"
                onClick={handleCartClick} // Redirect to checkout
                className="btn w-30 uppercase btn-active btn-ghost text-white font-extrabold"
              >
                View cart
              </button>
              <button
                type="button"
                className="btn w-36 uppercase btn-accent btn-active text-white font-extrabold"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
