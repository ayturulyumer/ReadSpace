"use client";
import { useState, useEffect } from "react";
import Link from "next/link.js";
import Image from "next/image.js";
import GithubLogo from "../../../../public/github-mark.svg";
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

  const featuresUnderDevelopment = [
    { icon: "📚", text: "Featured books section is under development!" },
    { icon: "🏆", text: "Bestsellers section is under development." },
  ];

  const featuresAdded = [
    { icon: "🔍", text: "Search by book title or author" },
    { icon: "💖", text: "Add books to your wishlist" },
    { icon: "⭐", text: "Review and rate books" },
    { icon: "🛒", text: "Add products to your cart and checkout via Stripe" },
  ];

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 text-xs backdrop-blur-sm flex items-center justify-center p-4 z-50 md:text-lg"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="text-primary-content rounded-lg shadow-2xl p-6 w-full max-w-md"
              data-theme="cupcake"
            >
              <h2 className="text-3xl font-bold mb-4 text-center">
                I&#39;m Still Building! 🏗️
              </h2>
              <p className="mb-4 text-center">
                Hey there! Thanks for checking out my work-in-progress
                application.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Features Added */}
                <div>
                  <h3 className="text-xl  text-center font-semibold mb-2">
                    Features Added
                  </h3>
                  <ul className="space-y-3">
                    {featuresAdded.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center  space-x-2 bg-green-400 bg-opacity-20 rounded-lg p-2"
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span>{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Features Under Development */}
                <div>
                  <h3 className="text-xl text-center font-semibold mb-2">
                    In Progress
                  </h3>
                  <ul className="space-y-3">
                    {featuresUnderDevelopment.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center  space-x-2 bg-orange-400 bg-opacity-20 rounded-lg p-2"
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span>{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mb-6 text-center">
                I&#39;m working to get everything up and running soon! For more
                details, feel free to check out:
                <Link
                  href="https://github.com/ayturulyumer/ReadSpace"
                  className="flex justify-center py-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={GithubLogo}
                    className="h-8 w-8 animate-pulse"
                    height={0}
                    width={0}
                  />
                </Link>
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
    </>
  );
}
