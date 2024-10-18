"use client";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { GiShoppingCart } from "react-icons/gi"; // Import an icon for the empty cart
import Image from "next/image";
import Link from "next/link.js";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks.js";
import { removeItem } from "./cartSlice.js";

export default function Cart() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.cart.products);
  const totalSum = useAppSelector((state) => state.cart.totalSum);

  const productsQuantity = products.reduce(
    (accumulator, product) => accumulator + product.quantity,
    0
  );

  const closeDropdown = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    }
  };

  const handleCartClick = () => {
    closeDropdown();
    router.push("/checkout");
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setDropdownOpen(true)} // Open on hover
      onMouseLeave={closeDropdown} // Close when the mouse leaves
    >
      {/* Cart Button */}
      <div className="tooltip tooltip-bottom z-50" data-tip="Cart">
        <button
          type="button"
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
            {products.length > 0 && (
              <span className="badge badge-sm bg-orange-500 text-white font-extrabold indicator-item animate-pulse">
                {productsQuantity}
              </span>
            )}
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
            {products.length > 0 ? (
              <>
                <span className="font-bold text-md text-white font-sans uppercase">
                  {products.length} {products.length === 1 ? "item" : "items"}
                </span>
                <hr className="border-orange-400" />
                <div className="max-h-96 overflow-auto">
                  {products.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 mb-4 relative"
                    >
                      <Link href={`/catalog/details/book?bookId=${item.id}`}>
                        <div className="h-32 w-20 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={0}
                            height={0}
                            className="h-full w-full object-fit rounded-md" // Use h-full and w-full
                            unoptimized
                            layout="fixed"
                          />
                        </div>
                      </Link>

                      <div className="flex-grow">
                        <h3 className="font-semibold text-md w-9/12 text-gray-400">
                          {item.name}
                        </h3>
                        <p className="text-lg font-bold mt-1 text-white">
                          $ {Math.floor(item.price)}
                          <span className="relative top-[-5px] text-sm">
                            .{(item.price % 1).toFixed(2).split(".")[1]}
                          </span>
                          <p className="text-md font-bold text-white">
                            x {item.quantity}
                          </p>
                        </p>
                      </div>
                      {/* Delete Icon */}
                      <button
                        className="absolute top-0 right-0 text-white hover:text-red-700 mx-2"
                        onClick={() => dispatch(removeItem(item.id))}
                      >
                        <TiDelete style={{ height: "24px", width: "24px" }} />
                      </button>
                    </div>
                  ))}
                </div>
                <hr className="border-orange-400" />
                <span className="flex justify-between font-sans text-white align-baseline text-lg">
                  <span className="uppercase">Subtotal:</span>
                  <span className="">{totalSum.toFixed(2)} $</span>
                </span>
                <div
                  data-theme="retro"
                  className="flex w-full bg-transparent justify-between"
                >
                  <button
                    type="button"
                    onClick={handleCartClick}
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
              </>
            ) : (
              // Render Empty Cart message
              <div className="flex flex-col items-center justify-center p-4 text-gray-400">
                <GiShoppingCart className="h-16 w-16" /> {/* Cart icon */}
                <p className="mt-2 text-lg font-semibold">Empty Cart</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
