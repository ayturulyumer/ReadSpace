import { useState } from "react";
import { CiSettings, CiLogout, CiHeart } from "react-icons/ci";
import { useRouter } from "next/navigation.js";

export default function Profile({ logoutUser, userAvatar }) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Central handler to handle clicks
  const handleClick = (action) => {
    setDropdownOpen(false);
    switch (action) {
      case "wishlist":
        router.push("/wishlist");
        break;
      case "settings":
        router.push("/settings");
        break;
      case "logout":
        logoutUser();
        break;
      default:
        break;
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
        onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
      >
        <div className="w-10 rounded-full ring-1 ring-orange-500 peer-checked:ring">
          <img src={userAvatar} alt="userAvatar" className="bg-white" />
        </div>
      </div>
      {dropdownOpen && (
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-5 z-50 p-2  shadow rounded-box w-52"
          data-theme="luxury"
        >
          <li
            className="rounded-lg hover:bg-red-300 hover:text-white group"
            onClick={() => handleClick("wishlist")} // Call handler with action
          >
            <a>
              <CiHeart
                style={{ fontSize: "2em" }}
                className="group-hover:animate-pulse"
              />
              Wishlist
            </a>
          </li>
          <li
            className="rounded-lg hover:bg-gray-400 hover:text-white group"
            onClick={() => handleClick("settings")} // Call handler with action
          >
            <a>
              <CiSettings
                style={{ fontSize: "2em" }}
                className="group-hover:animate-spin"
              />
              Settings
            </a>
          </li>
          <li
            className="rounded-lg hover:bg-red-500 hover:text-white group"
            onClick={() => handleClick("logout")} // Call handler with action
          >
            <a>
              <CiLogout
                style={{ fontSize: "2em" }}
                className="group-hover:animate-bounce"
              />
              Logout
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
