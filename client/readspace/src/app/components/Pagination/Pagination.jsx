import { getPaginationRange } from "../../../../utils/getPaginationRange.js";
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex justify-center py-6 text-black">
      {/* Pagination container */}
      <div className="join flex flex-wrap justify-center gap-2">
        {/* Previous button */}
        <button
          className="btn  join-item"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>

        {/* Page numbers */}
        {paginationRange.map((page) => (
          <button
            key={page}
            className={`btn join-item ${
              currentPage === page ? "btn-accent" : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {/* Next button */}
        <button
          className="btn  join-item"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
