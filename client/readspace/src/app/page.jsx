"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Hero from "./components/Hero/Hero.jsx";
import KeyFeatures from "./components/KeyFeatures/KeyFeatures.jsx";
import BestSellingBooks from "./components/BestSellingBooks/BestSellingBooks.jsx";
import SubscribeToUs from "./components/SubscribeToUs/SubscribeToUs.jsx";
import UnderDevelopmentModal from "./components/UnderDevelopmentModal/UnderDevelopmentModal.jsx";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export default function Home() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });

  const keyFeaturesRef = useRef(null);
  const isKeyFeaturesInView = useInView(keyFeaturesRef, {
    once: true,
    amount: 0.2,
  });

  const bestSellingBooksRef = useRef(null);
  const isBestSellingBooksInView = useInView(bestSellingBooksRef, {
    once: true,
    amount: 0.2,
  });

  const subscribeToUsRef = useRef(null);
  const isSubscribeToUsInView = useInView(subscribeToUsRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <main className="min-h-screen self-center">
      <UnderDevelopmentModal />

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        variants={container}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp}>
          <Hero />
        </motion.div>
      </motion.div>

      {/* Key Features Section */}
      <motion.div
        ref={keyFeaturesRef}
        variants={container}
        initial="hidden"
        animate={isKeyFeaturesInView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp}>
          <KeyFeatures />
        </motion.div>
      </motion.div>

      {/* Best Selling Books Section */}
      <motion.div
        ref={bestSellingBooksRef}
        variants={container}
        initial="hidden"
        animate={isBestSellingBooksInView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp}>
          <BestSellingBooks />
        </motion.div>
      </motion.div>

      {/* Subscribe to Us Section */}
      <motion.div
        ref={subscribeToUsRef}
        variants={container}
        initial="hidden"
        animate={isSubscribeToUsInView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp}>
          <SubscribeToUs />
        </motion.div>
      </motion.div>
    </main>
  );
}
