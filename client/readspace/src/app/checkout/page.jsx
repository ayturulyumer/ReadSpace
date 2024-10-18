"use client";

import { useState } from "react";
import { MdShoppingCart, MdAdd, MdRemove, MdArrowBack } from "react-icons/md";
import Image from "next/image";
import Link from "next/link.js";

export default function Checkout() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 79.99,
      quantity: 1,
      image:
        "https://m.media-amazon.com/images/I/31EQXd8E9eL._SY445_SX342_.jpg",
    },
    {
      id: 2,
      name: "Smart WatchSmart WatchSmart WatchSmart WatchSmart WatchSmart WatchSmart WatchSmart WatchSmart Watch",
      price: 14.99,
      quantity: 2,
      image:
        "https://m.media-amazon.com/images/I/31EQXd8E9eL._SY445_SX342_.jpg",
    },
    {
      id: 3,
      name: "Portable Charger",
      price: 39.99,
      quantity: 1,
      image:
        "https://m.media-amazon.com/images/I/31EQXd8E9eL._SY445_SX342_.jpg",
    },
  ]);

  const updateQuantity = (id, increment) => {
    setItems(
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + increment) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div data-theme="light" className="min-h-screen flex flex-col">
      <header className="bg-base-100 shadow-md py-4">
        <div className="container mx-auto px-4">
          <h1 className="py-6 text-4xl font-semibold">Your Shopping Cart</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {items.length > 0 ? (
          <div className="bg-base-100 rounded-box shadow-lg p-6">
            {/* Table Header */}
            <div className="hidden sm:flex justify-between font-semibold text-base-content/70 text-center mb-4">
              <span className="w-1/3 text-left">Product</span>
              <span className="w-1/3 text-center">Quantity</span>
              <span className="w-1/3 text-right">Price</span>
            </div>
            {/* End of Table Header */}

            <ul className="divide-y divide-base-300">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="py-6 flex items-center justify-between"
                >
                  <div className="flex items-center w-1/3">
                    <div className="flex-shrink-0 w-24 h-36 bg-base-200 rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="ml-4 hidden flex-1 md:block">
                      <h3 className="text-lg  font-semibold break-words">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-base-content/70">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/3 flex justify-center items-center space-x-2">
                    <button
                      className="btn btn-circle btn-sm"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <MdRemove size={16} />
                    </button>
                    <span className="text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      className="btn btn-circle btn-sm"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <MdAdd size={16} />
                    </button>
                  </div>
                  <div className="w-1/3 text-right font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-base-300">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-base-100 rounded-box shadow-lg p-6 text-center">
            <MdShoppingCart
              size={48}
              className="mx-auto text-base-content/50 mb-4"
            />
            <p className="text-xl font-medium">Your cart is empty</p>
            <button className="btn bg-blue-600 text-white w-full sm:w-auto">
              <MdArrowBack className="mr-2" size={20} />
              Continue Shopping
            </button>
          </div>
        )}
      </main>
      {items.length > 0 && (
        <footer className="bg-base-100 shadow-md py-6">
          <div className="container mx-auto px-4">
            <div
              data-theme="retro"
              className="flex bg-transparent flex-col sm:flex-row justify-between items-center gap-4"
            >
              <Link href="/catalog">
                <button
                  type="button"
                  className="btn btn-info text-white  w-full sm:w-auto"
                >
                  <MdArrowBack className="mr-2" size={20} />
                  Continue Shopping
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-accent w-full text-white sm:w-auto"
              >
                Proceed to Checkout
                <MdShoppingCart className="ml-2" size={20} />
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
