"use client";
import { useAuth } from "@/app/context/authContext.jsx";
import { createClient } from "../../../../utils/supabase/client.js";
import { useEffect, useState } from "react";

import Search from "../Search/Search.jsx";
import Cart from "../Cart/Cart.jsx";
import Profile from "../Profile/Profile.jsx";

export default function Navbar() {
  const { session } = useAuth();

  return (
    <div className="navbar " data-theme="retro">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">ReadSpace</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <Search />
      </div>

      <div className="navbar-end">
        <ul className="menu menu-lg menu-horizontal">
          {session ? (
            <>
              <li>
                <a>Catalog</a>
              </li>
              <Cart />
              <Profile />
            </>
          ) : (
            <>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
