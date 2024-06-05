import BookDetails from "../components/BookDetails/BookDetails.jsx";
import BookReviews from "../components/BookReviews/BookReviews.jsx";
export default function Details() {
  return (
    <main data-theme="retro" className="min-h-fit bg-white">
      <BookDetails />
      <div className="flex  max-w-full items-center justify-center p-1  ">
        <BookReviews />
      </div>
    </main>
  );
}
