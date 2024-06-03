import Rating from "../Rating/Rating.jsx";

export default function BestSellingBookSingle({ data }) {
  return (
    <div className="indicator">
  <span className="indicator-item  indicator-center badge  font-bold badge-accent text-white md:indicator-end  ">Best Seller</span> 
    <div
      data-theme="retro"
      className="card card-compact  bg-white  w-72 shadow-xl relative group "
    >
        
      <figure className="relative">
        <img
          className="h-80 w-72 object-fit rounded-b-3xl"
          src={data.image}
          alt={data.title}
        />
      </figure>
      <div className="card-body items-baseline align-baseline font-bold  ">
        <h1 className="text-lg truncate max-w-full">{data.title}</h1>
        <p>{data.author}</p>
        <Rating />
        <p className=" text-red-500">${data.price}</p>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="card-actions space-x-2">
          <button className="btn btn-outline btn-secondary">Details</button>
          <button className="btn btn-outline btn-accent text-white">
            Add to cart
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
