import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { resetCart } from "../Cart/cartSlice.js";
import { useAppDispatch } from "@/app/lib/hooks.js";
import { persistor } from "@/app/lib/store.js";
import Spinner from "../Spinner/Spinner.jsx";

export default function CheckoutForm({ dpmCheckerLink, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();

  const resetCartProducts = () => {
    dispatch(resetCart());
  };

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/checkout`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else {
      // Reset the cart if the payment is successful
      persistor.purge();
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <form id="payment-form" className="h-96" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="btn btn-accent btn-active font-bolder  tracking-wide mt-4 text-white "
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          {isLoading ? (
            <span className="  loading loading-spinner"></span>
          ) : (
            // Convert amount to dollars from cents
            `Pay now  $${amount / 100} `
          )}
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
