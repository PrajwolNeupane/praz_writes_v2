import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import handleVisitor from "./utils/handleVisitor";

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  // Check if the URL is an API route or other routes to exclude
  const excludedRoutes = ["/api/", "/favicon.ico"];
  if (excludedRoutes.some((route) => url.startsWith(route))) {
    // If it is, return the response without running the middleware
    return NextResponse.next();
  }

  const sessionCookie = cookies().get("session")?.value;
  const visitorIdCookie = cookies().get("vistor_id")?.value;

  if (!sessionCookie) {
    const response = await handleVisitor(req, visitorIdCookie);
    response.cookies.set("session", "1", { maxAge: 10 * 60 });
    // Set session cookie to expire after 10 minutes
    return response;
  }

  const response = NextResponse.next();
  return response;
}
