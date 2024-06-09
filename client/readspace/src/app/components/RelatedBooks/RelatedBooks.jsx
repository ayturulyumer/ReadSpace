import { bestSellers } from "../../../../utils/dummyData.js";
import BookCard from "../BookCard/BookCard.jsx";

export default function RelatedBooks() {
  return (
    <div className="flex  flex-col gap-6 mr-4 sm:ml-20 ">
      <h1 className="uppercase font-medium underline-orange  text-lg ">
        Related Books
      </h1>
      <div className="grid grid-cols-1 gap-6 ml-8 lg:grid-cols-2 sm:ml-4 md:ml-0 ">
        {bestSellers.map((book, i) => (
          <BookCard key={i} data={book} isBestSeller={false} actionsOverlay={true} />
        ))}
      </div>
    </div>
  );
}
