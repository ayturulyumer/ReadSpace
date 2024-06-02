import Hero from "./components/Hero/Hero.jsx";
import KeyFeatures from "./components/KeyFeatures/KeyFeatures.jsx";
import BestSellingBooks from "./components/BestSellingBooks/BestSellingBooks.jsx";
export default function Home() {
  return (
    <main className="min-h-screen self-center">
      <Hero />
      <KeyFeatures />
      <BestSellingBooks />
    </main>
  );
}
