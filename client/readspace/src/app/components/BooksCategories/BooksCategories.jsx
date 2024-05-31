import { bookCategories } from "../../../../utils/dummyData.js";
import BookCategorySingle from "../BookCategorySingle/BookCategorySingle.jsx";
export default function BooksCategories() {
  return (
    <section  className="flex flex-col  w-full py-4 gap-8">
      <h1 className=" text-3xl font-bold text-secondary-content text-center">Books Categories</h1>
      <div className="grid grid-cols-2 grid-rows-2 items-baseline gap-8 md:grid-cols-3   ">
      {bookCategories.map((category,i) => <BookCategorySingle key={i} data={category}/> )}
      </div>
    </section>
  );
}
