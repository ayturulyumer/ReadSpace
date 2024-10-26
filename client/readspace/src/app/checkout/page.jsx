"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Link from "next/link.js";
import Image from "next/image.js";
import { useSearchParams } from "next/navigation.js";

import CheckoutForm from "../components/CheckoutForm/CheckoutForm.jsx";
import CompletePage from "../components/CompletePage/CompletePage.jsx";
import CheckoutSkeleton from "./checkoutSkeleton.jsx";

import { useAppDispatch, useAppSelector } from "../lib/hooks.js";
import convertToSubcurrency from "../../../utils/convertToSubCurrency.js";
import { persistor } from "../lib/store.js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout() {
  const [clientSecret, setClientSecret] = React.useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // Get the products from redux state
  const products = useAppSelector((state) => state.cart.products);
  const totalSum = useAppSelector((state) => state.cart.totalSum);

  const amount = convertToSubcurrency(totalSum);

  React.useEffect(() => {
    setConfirmed(
      new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      )
    );
  });

  React.useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (confirmed) {
          setClientSecret(data.clientSecret);
          setDpmCheckerLink(data.dpmCheckerLink);
          setLoading(false);
          persistor.purge();
        }
        setClientSecret(data.clientSecret);
        setDpmCheckerLink(data.dpmCheckerLink);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CheckoutSkeleton />; // Render the skeleton while loading
  }

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#bc9301",
      colorText: "#000000",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <main
      className="max-w-full max-h-full  mx-auto p-10 h-full items-center text-white text-center border m-10 rounded-md lg:h-screen"
      data-theme="cupcake"
    >
      <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
        {/* Left side - User's items */}
        <div className="text-black   shadow-md p-6">
          <div className="hidden sm:flex justify-between font-semibold text-base-content/70 text-center mb-4">
            <span className="w-1/3 text-left">Product</span>
            <span className="w-1/3 ">Quantity</span>
            <span className="w-1/3 r">Price</span>
          </div>
          <hr className="bg-orange-500" />
          <ul className="divide-y max-h-[550px] overflow-y-auto text-center divide-base-300 ">
            {products?.map((item) => (
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
                  <span className=" font-medium">{item.quantity}</span>
                </div>
                <div className="w-1/3   font-medium relative">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-8 border-t border-base-300">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>{totalSum?.toFixed(2)} $</span>
            </div>
          </div>
        </div>
        {/* Right side - Checkout form */}
        <div className="max-w-xl p-6 rounded-md">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              {confirmed ? (
                <CompletePage />
              ) : (
                <CheckoutForm dpmCheckerLink={dpmCheckerLink} amount={amount} />
              )}
            </Elements>
          )}
        </div>
      </div>
    </main>
  );
}
