export default function BookCategorySingle({ data }) {
  return (
    <div  className="container flex flex-col justify-center items-center gap-4 p-4">
      <div className="avatar">
        <div className="w-20 mask mask-circle ">
          <img src={data.icon} />
        </div>
      </div>
      <h1 className="text-xs font-bold text-center md:text-xl text-primary-content ">{data.title}</h1>
      <p className="hidden text-sm text-center font-bold  md:block md:overflow-hidden ">{data.summary}</p>
    </div>
  );
}
