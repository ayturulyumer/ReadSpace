"use client";
import { useAuth } from "@/app/context/authContext.jsx";

import Link from "next/link.js";

import Search from "../Search/Search.jsx";
import Cart from "../Cart/Cart.jsx";
import Profile from "../Profile/Profile.jsx";

export default function Navbar() {
  const { session, logoutUser } = useAuth();

  const userAvatar = session?.user_metadata?.avatar;

  return (
    <div
      className="navbar mt-2 h-fit   fixed z-50  rounded-2xl   "
      data-theme="luxury"
    >
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl" href="/">
          ReadSpace
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <Search />
      </div>

      <div className="navbar-end">
        <ul className="menu menu-lg menu-horizontal">
          {session ? (
            <>
              <li>
                <Link href="/catalog">Catalog</Link>
              </li>
              <Cart />
              <Profile userAvatar={userAvatar} logoutUser={logoutUser} />
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
