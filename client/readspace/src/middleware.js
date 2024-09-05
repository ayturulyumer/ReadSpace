import { updateSession } from "../utils/supabase/middleware.js";

export async function middleware(request) {
  // Update user's auth session
  return await updateSession(request);
}

// Middleware configuration to avoid running on static files, images, etc.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
