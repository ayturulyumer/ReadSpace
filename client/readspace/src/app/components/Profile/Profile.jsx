import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";


export default function Profile() {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
      >
        <li>
          <a> <CiHeart style={{ fontSize: "2em" }} /> Wishlist</a>
        </li>
        <li>
          <a>
            <CiSettings style={{ fontSize: "2em" }} /> Settings
          </a>
        </li>
        <li>
          <a>
            <CiLogout style={{ fontSize: "2em" }} />
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
