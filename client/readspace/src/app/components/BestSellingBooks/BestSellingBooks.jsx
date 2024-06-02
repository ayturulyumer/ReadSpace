import BestSellingBookSingle from "../BestSellingBookSingle/BestSellingBookSingle.jsx"
import { bestSellers } from "../../../../utils/dummyData.js"
export default function BestSellingBooks() {
  return (
    <section data-theme="retro" className="min-h-fit min-w-screen rounded-tl-[20em] ">
      <h1 className="text-center py-4 text-6xl">Bestsellers</h1>
    <div className="grid grid-cols-3 py-4 place-items-center">
  {bestSellers.map((book,i) =>(
    <BestSellingBookSingle key={i} data={book}/>
  ))}
    </div>
  </section>
  )
}
