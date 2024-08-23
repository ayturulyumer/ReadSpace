"use client"
import Hero from "./components/Hero/Hero.jsx";
import KeyFeatures from "./components/KeyFeatures/KeyFeatures.jsx";
import BestSellingBooks from "./components/BestSellingBooks/BestSellingBooks.jsx";
import SubscribeToUs from "./components/SubscribeToUs/SubscribeToUs.jsx";
export default function Home() {
  return (
    <main className="min-h-screen  self-center">
      <Hero />
      <KeyFeatures />
      <BestSellingBooks />
      <SubscribeToUs/>
    </main>
  );
}
