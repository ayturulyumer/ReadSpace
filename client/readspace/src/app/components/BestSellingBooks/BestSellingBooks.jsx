import { bestSellers } from "../../../../utils/dummyData.js";
import BookCard from "../BookCard/BookCard.jsx";
export default function BestSellingBooks() {
  return (
    <section
      data-theme="retro"
      className="min-h-fit  rounded-tl-[6em] rounded-br-[6em] md:rounded-br-[8em] md:rounded-br[6em]"
    >
      <h1 className="text-center py-8  text-5xl ">Best sellers</h1>
      <div className="grid grid-cols-1 gap-10 py-4 pb-8  place-items-center gap-x-0 md:grid-cols-2 xl:grid-cols-4 ">
        {bestSellers.map((book, i) => (
          <BookCard
            key={i}
            data={book}
            size="large"
            actionsOverlay={true}
          />
        ))}
      </div>
    </section>
  );
}
