import Rating from "../Rating/Rating.jsx";

export default function BestSellingBookSingle({ data }) {
  return (
    <div
      data-theme="retro"
      className="card card-compact bg-white  w-80 shadow-xl relative group "
    >
      <figure className="relative">
        <img
          className="h-80 w-80 object-fit"
          src={data.image}
          alt={data.title}
        />
      </figure>
      <div className="card-body items-center font-bold text-center ">
        <h1 className="text-lg truncate max-w-full">{data.title}</h1>
        <p>{data.author}</p>
        <p className="badge badge-outline">${data.price}</p>
        <Rating />
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
  );
}
