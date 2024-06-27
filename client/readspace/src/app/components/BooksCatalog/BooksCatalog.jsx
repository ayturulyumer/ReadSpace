import { bestSellers } from "../../../../utils/dummyData.js";
import BookCard from "../BookCard/BookCard.jsx";
export default function BooksCatalog() {
  return (
    <div className="relative flex h-fit w-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="max-w-screen mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {bestSellers.map((book, i) => (
            <BookCard key={i} data={book} isBestSeller={false}  />
          ))}
        </div>
      </div>
    </div>
  );
}
