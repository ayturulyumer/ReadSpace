import { getPaginationRange } from "../../../../utils/getPaginationRange.js";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  size = "md",
}) {
  const paginationRange = getPaginationRange(currentPage, totalPages);

  // Map the size prop to the appropriate Tailwind class
  const sizeClassMap = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  // Determine the size class based on the provided size prop
  const buttonSize = sizeClassMap[size] || sizeClassMap.md;

  return (
    <div className="flex justify-center  py-6 ">
      {/* Pagination container */}
      <div
        data-theme="cupcake"
        className="join flex flex-wrap justify-center gap-2"
      >
        {/* Previous button */}
        <button
          className={`btn join-item ${buttonSize}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>

        {/* Page numbers */}
        {paginationRange.map((page) => (
          <button
            key={page}
            className={`btn join-item ${buttonSize} ${
              currentPage === page ? "btn-accent" : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {/* Next button */}
        <button
          className={`btn join-item ${buttonSize}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
