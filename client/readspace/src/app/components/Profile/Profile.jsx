import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

import Image from "next/image.js";
import ProfilePhoto from "../../../../public/samba.jpg";
import Link from "next/link.js";

import { useAuth } from "@/app/context/authContext.jsx";

export default function Profile() {
  const { logoutUser } = useAuth();
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <Image src={ProfilePhoto} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-6 z-[1] p-2 shadow rounded-box w-52 "
        data-theme=""
      >
        <li className="rounded-lg hover:bg-red-300 hover:text-white group ">
          <a>
            {" "}
            <CiHeart
              style={{ fontSize: "2em" }}
              className="group-hover:animate-pulse"
            />{" "}
            Wishlist
          </a>
        </li>
        <Link href="/settings">
          <li className="rounded-lg hover:bg-gray-400 hover:text-white group">
            <a>
              <CiSettings
                style={{ fontSize: "2em" }}
                className=" group-hover:animate-spin"
              />
              Settings
            </a>
          </li>
        </Link>
        <li
          li
          className="rounded-lg hover:bg-red-500 hover:text-white group"
          onClick={() => {
            logoutUser();
          }}
        >
          <a>
            <CiLogout
              style={{ fontSize: "2em" }}
              className=" group-hover:animate-bounce"
            />
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
