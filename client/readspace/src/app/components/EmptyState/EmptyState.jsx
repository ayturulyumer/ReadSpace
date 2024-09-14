import { useState } from "react";
import { FaBook, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation.js";

export default function EmptyState() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div className="flex   items-center justify-center h-fit p-4">
      <div className="max-w-md w-full  rounded-lg shadow-2xl p-8 text-center">
        <div className="mb-8 relative">
          <FaBook
            className={`text-9xl text-gray-300 transition-transform duration-300 ${
              isHovered ? "transform scale-110" : ""
            }`}
            aria-hidden="true"
          />
          <FaPlus
            className={`absolute text-4xl text-green-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your wishlist is looking a bit empty
        </h2>
        <p className="text-gray-600 mb-8">
          Discover and save your favorite books to your wishlist.
        </p>
        <button
          className="bg-blue-500 hover:bg-accent text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => router.push("/catalog")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Add Book to Wishlist"
        >
          Explore and Add Books
        </button>
      </div>
    </div>
  );
}
