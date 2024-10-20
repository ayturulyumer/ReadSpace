import { bestSellers } from "../../../../utils/dummyData.js";
import BookCard from "../BookCard/BookCard.jsx";

export default function RelatedBooks() {
  return (
    <div className="flex flex-col gap-6 mr-4 sm:ml-20">
      <h1 className="uppercase font-medium underline-orange text-lg">
        Related Books
      </h1>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 justify-items-center mx-auto">
        {bestSellers.map((book, i) => (
          <BookCard
            key={i}
            book={book}
            size="large"
            isBestSeller={false}
            actionsOverlay={true}
          />
        ))}
      </div>
    </div>
  );
}
