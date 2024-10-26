import React from "react";

export default function CheckoutSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Left side (Products Skeleton) */}
      <div className="flex justify-between mb-4">
        <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
      </div>
      <hr className="bg-gray-200" />
      <ul className="divide-y divide-gray-200 mt-6">
        {Array(3)
          .fill("")
          .map((_, i) => (
            <li key={i} className="py-6 flex items-center justify-between">
              <div className="flex items-center w-1/3">
                <div className="w-24 h-36 bg-gray-300 rounded-md"></div>
                <div className="ml-4 hidden md:block">
                  <div className="w-24 h-4 bg-gray-300 rounded mt-2"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded mt-1"></div>
                </div>
              </div>
              <div className="w-1/3 flex justify-center items-center space-x-2">
                <div className="w-10 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-1/3 text-right">
                <div className="w-12 h-4 bg-gray-300 rounded"></div>
              </div>
            </li>
          ))}
      </ul>
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="w-20 h-6 bg-gray-300 rounded"></span>
          <span className="w-16 h-6 bg-gray-300 rounded"></span>
        </div>
      </div>

      {/* Right side (Form Skeleton) */}
      <div className="h-96 p-6 mt-10 bg-gray-100 rounded-md shadow-md">
        {/* Payment Element Skeleton */}
        <div className="h-24 mb-6 bg-gray-200 rounded-md"></div>

        {/* Button Skeleton */}
        <div className="w-full md:w-auto px-6 py-3 bg-gray-300 text-white font-medium text-md rounded-md my-4">
          <span className="block bg-gray-300 w-full h-6"></span>
        </div>

        {/* Message Skeleton */}
        <div className="mt-4 h-6 w-3/4 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
}
