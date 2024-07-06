import BookFilters from "../components/BookFilters/BookFilters.jsx";
import BooksCatalog from "../components/BooksCatalog/BooksCatalog.jsx";

BookFilters;
export default function Catalog() {
  return (
    <div className="max-w-fit min-h-screen flex flex-col lg:flex-row ">
      <BookFilters />
      <BooksCatalog />
    </div>
  );
}
