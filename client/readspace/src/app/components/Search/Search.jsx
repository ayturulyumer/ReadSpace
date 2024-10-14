"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function Search() {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      router.push(`/catalog?query=${query}`);
    }
  };

  const handleReset = () => {
    setQuery(""); // Clear the input field
    router.push(`/catalog`); // Optionally redirect to the catalog without a query
  };

  return (
    <form data-theme="light" onSubmit={handleSearch} className="rounded-md">
      <label className="input input-ghost flex items-center gap-2">
        <input
          type="text"
          className="grow"
          value={query}
          placeholder="Search by books or authors"
          onChange={handleInputChange}
        />

        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* Reset button */}
        {query && (
          <button type="button" onClick={handleReset} className="ml-1 ">
            x
          </button>
        )}
      </label>
    </form>
  );
}
