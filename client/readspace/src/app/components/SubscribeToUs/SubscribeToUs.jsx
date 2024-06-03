export default function SubscribeToUs() {
  return (
    <div data-theme="retro" className="hero min-h-fit py-16 bg-white">
      <div className="hero-content flex-col  lg:flex-row ">
        <img
          src="https://www.creativefabrica.com/wp-content/uploads/2020/04/03/Reading-Book-Flat-Design-Illustration-Graphics-3789499-1.jpg"
          className="max-w-[18em]   rounded-lg  md:max-w-md lg:max-w-xl  "
        />
        <div className="lg:ml-8 text-center lg:text-left ">
          <h1 className="text-lg md:text-3xl lg:text-4xl ">
            Stay Updated with the Latest Books!
          </h1>
          <p className="py-6 text-lg md:text-xl lg:text-2xl">
            Subscribe to our newsletter for new arrivals, exclusive offers, and
            more.
          </p>
          <div className="join flex justify-center lg:justify-normal ">
            <input
              className="input input-xs input-bordered bg-white join-item md:input-md"
              placeholder="Email"
            />
            <button className="btn btn-xs btn-accent text-white  join-item rounded-r-full md:btn-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
