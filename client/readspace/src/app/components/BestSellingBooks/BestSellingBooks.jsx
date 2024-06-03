import BestSellingBookSingle from "../BestSellingBookSingle/BestSellingBookSingle.jsx"
import { bestSellers } from "../../../../utils/dummyData.js"
export default function BestSellingBooks() {
  return (
    <section data-theme="retro" className="min-h-fit  rounded-tl-[6em] rounded-br-[6em] md:rounded-br-[8em] md:rounded-br[6em]">
      <h1 className="text-center py-8  text-5xl ">Best sellers</h1>
    <div className="grid grid-cols-1 gap-10 py-4 pb-8  place-items-center gap-x-0 md:grid-cols-2 xl:grid-cols-4 ">
  {bestSellers.map((book,i) =>(
    <BestSellingBookSingle key={i} data={book}/>
  ))}
    </div>
  </section>
  )
}
