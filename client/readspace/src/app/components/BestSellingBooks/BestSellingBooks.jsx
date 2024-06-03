import BestSellingBookSingle from "../BestSellingBookSingle/BestSellingBookSingle.jsx"
import { bestSellers } from "../../../../utils/dummyData.js"
export default function BestSellingBooks() {
  return (
    <section data-theme="retro" className="min-h-fit min-w-screen gap-20 rounded-tl-[20em] ">
      <h1 className="text-center py-8 text-5xl font-bold">Best sellers</h1>
    <div className="grid grid-cols-1 gap-10 py-4 place-items-center gap-x-0 md:grid-cols-2 xl:grid-cols-4 ">
  {bestSellers.map((book,i) =>(
    <BestSellingBookSingle key={i} data={book}/>
  ))}
    </div>
  </section>
  )
}
