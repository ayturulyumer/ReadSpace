export default function Hero() {
  return (
    <div data-theme="retro" className="hero min-h-fit rounded-br-[8em]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://img.freepik.com/premium-vector/young-woman-enjoy-sitting-reading-book-hygge-concept-vector-illustration_194708-2078.jpg"
          className="mask mask-squircle  shadow-2xl md:max-w-lg lg:max-w-7xl"
        />
        <div className="text-center text-primary-content lg:text-left">
          <h1 className="text-4xl font-bold lg:text-6xl ">
            Uncover your next favorite book with ReadSpace
          </h1>
          <p className="text-xl py-6 lg:text-2xl">
            Find books that educate, entertain, and inspire
          </p>
          <button className="btn btn-accent text-white ">Find Your Book</button>
        </div>
      </div>
    </div>
  );
}
