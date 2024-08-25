export default function KeyFeatureSingle({ data }) {
  return (
    <div className="container flex flex-col justify-center items-center gap-2 p-4 ">
      <div className="avatar">
        <div className="w-28 mask mask-circle  ">
          <img src={data.icon} />
        </div>
      </div>
      <h1 className="text-xs font-bold text-center md:text-xl text-orange-500 ">
        {data.title}
      </h1>
      <p className="hidden text-sm text-center text-primary-content font-bold  md:block md:overflow-hidden ">
        {data.summary}
      </p>
    </div>
  );
}
