import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/register"];
const protectedRoutes = ["/wishlist", "/settings", "/checkout"];

export async function updateSession(request) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Redirect to login if the user is not authenticated and trying to access a protected route
  if (!user && protectedRoutes.includes(path)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect to home if the user is authenticated and trying to access login or register pages
  if (user && publicRoutes.includes(path)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
