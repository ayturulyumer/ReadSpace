"use client";
import { getAllAuthors } from "@/app/actions/authorActions.js";
import { useState, useEffect } from "react";

export default function BookFilters({ onAuthorSelect, selectedAuthors }) {
  const [authors, setAuthors] = useState([]);
  const [errors, setErrors] = useState({ authors: null }); // Initialize errors for each section
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const fetchAuthors = async () => {
      const { data, error } = await getAllAuthors();
      if (error) {
        setErrors((prev) => ({ ...prev, authors: error })); // Set error for authors
      } else {
        setAuthors(data);
      }
    };
    fetchAuthors();
  }, []);

  const toggleCollapse = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      title: "Authors",
      items: errors.authors ? [errors.authors] : authors,
    },
  ];

  return (
    <div className="relative flex flex-col self-center bg-clip-border rounded-xl bg-white text-gray-700 h-fit w-fit p-4 shadow-xl shadow-blue-gray-900/5 lg:self-auto">
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
                  <span className="collapse-title text-lg font-medium">
                    {section.title}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>
                </div>
                <div className="collapse-content   font-medium">
                  {section.items.map((item, index) => (
                    <div
                      className={`form-control ${
                        errors[section.title.toLowerCase()]
                          ? "pointer-events-none"
                          : ""
                      }`} // Disable pointer events if there's an error
                      key={item.name || index} // Use index if item is an error
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the collapse
                        if (!errors.authors) {
                          onAuthorSelect(item.name);
                        }
                      }}
                    >
                      <label className="label   cursor-pointer">
                        <span
                          className={`label-text tracking-tight lg:tracking-wide ${
                            errors[section.title.toLowerCase()]
                              ? "text-red-500"
                              : ""
                          }`} // Apply red color for errors
                        >
                          {item.name || item}
                        </span>
                        {/**Show checkbox only if there is no error */}
                        {!errors[section.title.toLowerCase()] && (
                          <input
                            type="checkbox"
                            className="checkbox checkbox-accent checkbox-sm"
                            checked={selectedAuthors.includes(item.name)} // Check if the author is selected
                            readOnly // Make the checkbox read-only to prevent direct modification
                          />
                        )}
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
        ></div>
      </nav>
    </div>
  );
}
