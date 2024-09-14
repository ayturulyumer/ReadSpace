"use client";
import { useState, useEffect } from "react";
import Link from "next/link.js";
import { AnimatePresence, motion } from "framer-motion";

export default function UnderDevelopmentModal() {
  const [showModal, setShowModal] = useState(false);

  // Only show modal once per session
  useEffect(() => {
    const modalShown = sessionStorage.getItem("modalShown");
    if (!modalShown) {
      setShowModal(true);
      sessionStorage.setItem("modalShown", "true");
    }
  }, []);

  if (!showModal) return null;

  const features = [
    { icon: "🔍", text: "Search bar is still under revelopment." },
    { icon: "🛒", text: "Shopping cart will be available soon." },
    { icon: "💳", text: " Stripe integration is in progress." },
    {
      icon: "🔧",
      text: "Filters: Filter by author, publisher being developed.",
    },
  ];

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
          className="fixed inset-0  backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className=" text-primary-content rounded-lg shadow-2xl p-6 w-full max-w-md"
            data-theme="cupcake"
          >
            <h2 className="text-3xl font-bold mb-4 text-center">
              I'm Still Building! 🏗️
            </h2>
            <p className="mb-4 text-center">
              Hey there! Thanks for checking out my work-in-progress
              application.
            </p>
            <p className="mb-4">
              I'm super excited to show you what I'm working on, but just a
              heads up:
            </p>
            <ul className="space-y-3 mb-6">
              {features.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2  bg-orange-400 bg-opacity-20 rounded-lg p-2"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mb-6 text-center">
              I'm working to get everything up and running soon! For more
              details, feel free to check out
              <Link
                href="https://github.com/ayturulyumer/ReadSpace"
                className="text-blue-500 underline hover:text-blue-700 ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </Link>
              .
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(false)}
              className="btn bg-orange-400 text-white w-full text-lg font-semibold hover:bg-orange-600"
            >
              Got it, thanks! 👍
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
