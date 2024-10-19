"use client";

import { MdShoppingCart, MdAdd, MdRemove, MdArrowBack } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "../lib/hooks.js";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../components/Cart/cartSlice.js";
import Image from "next/image";
import Link from "next/link.js";

export default function Checkout() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.cart.products);
  const totalSum = useAppSelector((state) => state.cart.totalSum);

  const productsQuantity = products.reduce(
    (accumulator, product) => accumulator + product.quantity,
    0
  );

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  return (
    <div data-theme="light" className="min-h-screen flex flex-col">
      <header className="bg-base-100 shadow-md py-4">
        <div className="container mx-auto px-4">
          <h1 className="py-6 text-4xl font-semibold">Your Shopping Cart</h1>
          <h3 className="py-2 text-xl font-medium">
            {productsQuantity} {productsQuantity === 1 ? "item" : "items"}
          </h3>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {products.length > 0 ? (
          <div className="bg-base-100 rounded-box shadow-lg p-6">
            {/* Table Header */}
            <div className="hidden sm:flex justify-between font-semibold text-base-content/70 text-center mb-4">
              <span className="w-1/3 text-left">Product</span>
              <span className="w-1/3 text-center">Quantity</span>
              <span className="w-1/3 text-right">Price</span>
            </div>
            {/* End of Table Header */}

            <ul className="divide-y divide-base-300">
              {products.map((item) => (
                <li
                  key={item.id}
                  className="py-6 flex items-center justify-between relative"
                >
                  <div className="flex items-center w-1/3">
                    <div className="flex-shrink-0 w-24 h-36 bg-base-200 rounded-md overflow-hidden">
                      <Link href={`/catalog/details/book?bookId=${item.id}`}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </Link>
                    </div>
                    <div className="ml-4 hidden flex-1 md:block">
                      <h3 className="text-lg font-semibold break-words">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-base-content/70">${item.price}</p>
                    </div>
                  </div>
                  <div className="w-1/3 flex ml-6 justify-center items-center space-x-2">
                    <button
                      type="button"
                      className="btn btn-circle btn-sm"
                      onClick={() => handleDecreaseQuantity(item.id)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <MdRemove size={16} />
                    </button>
                    <span className="text-center  font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="btn btn-circle btn-sm"
                      onClick={() => handleIncreaseQuantity(item.id)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <MdAdd size={16} />
                    </button>
                  </div>
                  <div className="w-1/3  text-right font-medium relative">
                    ${(item.price * item.quantity).toFixed(2)}
                    {/* Remove Button */}
                    <button
                      className="absolute -top-10 -right-10  text-black hover:text-red-700 mx-2"
                      onClick={() => dispatch(removeItem(item.id))}
                    >
                      <TiDelete style={{ height: "24px", width: "24px" }} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-base-300">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span>${totalSum.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-96 flex flex-col justify-center items-center gap-4 rounded-box shadow-lg text-center">
            <MdShoppingCart
              size={100}
              className="mx-auto text-base-content/50 mb-4"
            />
            <p className="text-xl font-medium">Your cart is empty</p>
            <Link href="/catalog">
              <button className="btn btn-info btn-active text-white">
                <MdArrowBack className="mr-2" size={20} />
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </main>
      {products.length > 0 && (
        <footer className="shadow-md py-8">
          <div className="container mx-auto px-4">
            <div
              data-theme="retro"
              className="flex   bg-transparent flex-col sm:flex-row  justify-between items-center gap-4"
            >
              <Link href="/catalog">
                <button
                  type="button"
                  className="btn btn-info text-white    flex items-center justify-center px-4 py-2 min-w-[200px]"
                >
                  <MdArrowBack className="mr-2" size={16} />
                  Continue Shopping
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-accent text-white   flex items-center justify-center px-4 py-2 min-w-[200px]"
              >
                Proceed to Checkout
                <MdShoppingCart className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
