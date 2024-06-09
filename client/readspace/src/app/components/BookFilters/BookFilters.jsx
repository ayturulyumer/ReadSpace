"use client";
import { useState } from "react";
import PriceRange from "../PriceRange/PriceRange.jsx";

export default function BookFilters() {
  const [openSections, setOpenSections] = useState({});
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const toggleCollapse = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      title: "Genres",
      items: ["Business", "Psychology", "Self-Help"],
    },
    {
      title: "Authors",
      items: ["Author 1", "Author 2"],
    },
    {
      title: "Publishers",
      items: ["Publisher 1", "Publisher 2"],
    },
  ];

  const handlePriceChange = ({ min, max }) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-fit w-fit  p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="p-4">
        <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
          Filters
        </h5>
      </div>
      <nav className="flex flex-col gap-1 min-w-[240px] font-sans text-base font-normal text-gray-700">
        {sections.map((section) => (
          <div
            key={section.title}
            role="button"
            tabIndex={0}
            className="flex items-center w-full p-3 text-start transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4 w-full">
              <div
                className={`collapse ${
                  openSections[section.title]
                    ? "collapse-open"
                    : "collapse-close"
                }`}
              >
                <div
                  className="collapse collapse-arrow relative flex justify-between items-center w-full cursor-pointer"
                  onClick={() => toggleCollapse(section.title)}
                >
                  <span className="collapse-title text-md font-medium">
                    {section.title}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>
                </div>
                <div className="collapse-content font-medium">
                  {section.items.map((item) => (
                    <div
                      className="form-control"
                      key={item}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label className="label cursor-pointer">
                        <span className="label-text">{item}</span>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-accent checkbox-sm"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div
          role="button"
          tabIndex={0}
          className="flex items-center w-full p-3 text-start"
        >
          <div className="grid place-items-center mr-4 w-full">
            <div
              className={`collapse ${
                openSections["priceRange"] ? "collapse-open" : "collapse-close"
              }`}
            >
              <div
                className="collapse collapse-arrow relative flex justify-between items-center w-full cursor-pointer"
                onClick={() => toggleCollapse("priceRange")}
              >
                <span className="collapse-title text-md font-medium">
                  Price Range
                </span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>
              </div>
              <PriceRange
                minPrice={minPrice}
                maxPrice={maxPrice}
                onChange={handlePriceChange}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
