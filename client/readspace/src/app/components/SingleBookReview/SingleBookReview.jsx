import Rating from "../Rating/Rating.jsx";
export default function SingleBookReview() {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="flex flex-col gap-4 p-4">
        {/* Profile and Rating */}
        <div className="flex gap-4 justify-between ">
          <div className="flex gap-4">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <span>Jess Hopkins</span>
          </div>
          <Rating />
        </div>
        <div className="font-medium">
          Gorgeous design! Even more responsive than the previous version. A
          pleasure to use!
        </div>
        <span>Feb 13, 2021</span>
      </div>
    </div>
  );
}
