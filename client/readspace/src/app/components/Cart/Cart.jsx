export default function Cart() {
  return (
    <div className="dropdown dropdown-end ">
      <div className="tooltip tooltip-bottom z-50" data-tip="Cart">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle  btn-ghost hover:bg-transparent hover:text-white "
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm badge-secondary text-white indicator-item animate-pulse">
              8
            </span>
          </div>
        </div>
      </div>
      <div
        tabIndex={0}
        className="mt-6 z-50 card card-compact dropdown-content w-52 shadow  p-2  rounded-box "
        data-theme="luxury"
      >
        <div className="card-body gap-4">
          <span className="font-bold text-lg">8 products</span>
          <span>
            <span className="">Subtotal:</span>
            <span className=" text-success font-bold ml-1">$ 25</span>
          </span>
          <div className="card-actions">
            <button className="btn btn-outline btn-primary-content text-white  btn-block">
              View cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
