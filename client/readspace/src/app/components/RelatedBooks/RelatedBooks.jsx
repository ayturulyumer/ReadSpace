import BestSellingBookSingle from "../BestSellingBookSingle/BestSellingBookSingle.jsx"
import { bestSellers } from "../../../../utils/dummyData.js"

export default function RelatedBooks() {
  return (
    <div className="flex flex-col gap-6">
    <h1 className="uppercase font-medium underline-orange text-lg">Related Books</h1>
    <div className="grid grid-cols-1 gap-4">
      {bestSellers.map((book, i) => (
        <BestSellingBookSingle key={i} data={book} />
      ))}
    </div>
  </div>
  )
}
