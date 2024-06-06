import BookDetails from "../components/BookDetails/BookDetails.jsx";
import BookReviews from "../components/BookReviews/BookReviews.jsx";
import RelatedBooks from "../components/RelatedBooks/RelatedBooks.jsx";
export default function Details() {
  return (
    <main data-theme="retro" className="min-h-fit bg-white">
      <BookDetails />
      <div className="flex  max-w-full items-center justify-center p-1  ">
        <div
          data-theme="retro"
          className="flex flex-col items-start justify-center my-4 ml-6 w-full gap-6 bg-white min-[1440px]:ml-24 2xl:w-4/6 2xl:ml-6"
        >
          <div className="w-full ">
            <div className="grid grid-cols-1 gap-64 md:grid-cols-2">
              <BookReviews />
              <RelatedBooks />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
