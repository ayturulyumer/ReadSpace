"use client";
import { useAuth } from "@/app/context/authContext.jsx";
import { createClient } from "../../../../utils/supabase/client.js";

import Link from "next/link.js";

import Search from "../Search/Search.jsx";
import Cart from "../Cart/Cart.jsx";
import Profile from "../Profile/Profile.jsx";

export default function Navbar() {
  const { session } = useAuth();

  return (
    <div className="navbar " data-theme="retro">
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
              <Profile />
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
