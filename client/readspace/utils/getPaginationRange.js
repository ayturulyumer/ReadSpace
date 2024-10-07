/**
 * Helper function to calculate the pagination range
 */
export function getPaginationRange(currentPage, totalPages) {
  const totalPageNumbersToShow = 5; // Adjust how many page numbers to show
  const range = [];

  const showEllipsisBefore = currentPage > 3;
  const showEllipsisAfter = currentPage < totalPages - 2;

  if (totalPages <= totalPageNumbersToShow) {
    // Show all pages if totalPages is small
    return [...Array(totalPages).keys()].map((i) => i + 1);
  }

  // Always show the first page
  range.push(1);

  if (showEllipsisBefore) {
    range.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (showEllipsisAfter) {
    range.push("...");
  }

  // Always show the last page
  range.push(totalPages);

  return range;
}
