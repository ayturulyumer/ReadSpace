"use client";
import { useAuth } from "@/app/context/authContext.jsx";

import Link from "next/link.js";
import Image from "next/image.js";
import Logo from "../../../../public/readspace.jpg";

import Search from "../Search/Search.jsx";
import Cart from "../Cart/Cart.jsx";
import Profile from "../Profile/Profile.jsx";

export default function Navbar() {
  const { session, logoutUser } = useAuth();

  const userAvatar = session?.user_metadata?.avatar;

  return (
    <div className="navbar h-fit " data-theme="luxury">
      <div className="navbar-start">
        <Link
          className="ml-2 h-fit  text-2xl text-gray-500 font-medium flex items-center"
          href="/"
        >
          <Image
            className="mask w-11 h-11 mask-circle mr-2"
            src={Logo}
            width={0}
            height={0}
            alt="Logo"
          />
          ReadSpace
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <Search />
      </div>

      <div className="navbar-end">
        <ul className="menu menu-sm menu-vertical font-bold items-center md:menu-horizontal md:menu-lg">
        <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/catalog">Catalog</Link>
          </li>
          {session ? (
            <>
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
