"use client";
import { useAuth } from "@/app/context/authContext.jsx";
import Link from "next/link.js";
import Image from "next/image.js";
import Logo from "../../../../public/readspace.jpg";

import Search from "../Search/Search.jsx";
import Cart from "../Cart/Cart.jsx";
import Profile from "../Profile/Profile.jsx";
import { useState } from "react"; // Import useState to toggle menu

export default function Navbar() {
  const { session, logoutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle

  const userAvatar = session?.user_metadata?.avatar;

  return (
    <div className="navbar h-fit" data-theme="luxury">
      {/* Navbar Start */}
      <div className="navbar-start">
        <Link
          className="ml-2 h-fit text-2xl text-gray-500 font-medium flex items-center"
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

      {/* Search for larger screens */}
      <div className="navbar-center hidden lg:flex">
        <Search />
      </div>

      {/* Navbar End with Menu */}
      <div className="navbar-end">
        {/* Hamburger Icon for tablets (md) */}
        <div className="block md:hidden">
          <button
            className="btn btn-ghost hover:bg-transparent  hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Dropdown Menu for Tablets/Mobile */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden absolute top-16 right-0 bg-black z-50 p-4 mr-2 shadow-lg rounded-lg`}
        >
          <ul className="menu menu-sm tracking-wide  font-bold items-center flex flex-col ">
            <li>
              <Link
                className="btn btn-ghost hover:bg-transparent hover:text-white"
                href="/catalog"
              >
                Catalog
              </Link>
            </li>
            <li>
              <Link
                className="btn btn-ghost hover:bg-transparent hover:text-white"
                href="/about"
              >
                About
              </Link>
            </li>
            {session ? (
              <>
                <Cart />
                <Profile userAvatar={userAvatar} logoutUser={logoutUser} />
              </>
            ) : (
              <>
                <li>
                  <Link
                    className="btn btn-ghost hover:bg-transparent hover:text-white"
                    href="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="btn btn-ghost hover:bg-transparent hover:text-white"
                    href="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Normal Menu for larger screens */}
        <ul className="hidden md:flex menu menu-horizontal tracking-wide font-bold items-center">
          <li>
            <Link
              className="btn btn-ghost hover:bg-transparent hover:text-white"
              href="/catalog"
            >
              Catalog
            </Link>
          </li>
          <li>
            <Link
              className="btn btn-ghost hover:bg-transparent hover:text-white"
              href="/about"
            >
              About
            </Link>
          </li>
          {session ? (
            <>
              <Link href="/checkout">
                <Cart />
              </Link>
              <Profile userAvatar={userAvatar} logoutUser={logoutUser} />
            </>
          ) : (
            <>
              <li>
                <Link
                  className="btn btn-ghost hover:bg-transparent hover:text-white"
                  href="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="btn btn-ghost hover:bg-transparent hover:text-white"
                  href="/register"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
