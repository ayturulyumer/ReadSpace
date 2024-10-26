import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Function to calculate the order total
const calculateOrderAmount = (items) => {
  // Replace this with your order amount calculation logic
  return 1400; // Example fixed value
};

export async function POST(req) {
  try {
    // Parse the request body
    const { amount } = await req.json(); // Correct usage of req.json()
    console.log(amount);

    // Create a PaymentIntent with the calculated order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount should be in cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the client secret from the PaymentIntent
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
