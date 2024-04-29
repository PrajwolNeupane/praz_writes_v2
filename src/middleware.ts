import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { handleVisitor, updateVisitor } from "./utils/handleVisitor";

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  // Check if the URL is an API route or other routes to exclude
  const excludedRoutes = ["/api/", "/favicon.ico", "/_next/", "/blog/","/stack"];
  if (excludedRoutes.some((route) => url.startsWith(route))) {
    // If it is, return the response without running the middleware
    return NextResponse.next();
  }

  const sessionCookie = cookies().get("session")?.value;
  const visitorIdCookie = cookies().get("vistor_id")?.value;
  console.log(req.nextUrl);
  if (!sessionCookie) {
    //Creating Vistor if not exist (Unique Vistor)
    const response = await handleVisitor(req);
    response.cookies.set("session", "1");
    // Set session cookie to expire after 10 minutes
    return response;
  } else {
    if (visitorIdCookie) {
      const response = await updateVisitor(req, visitorIdCookie);
      response.cookies.set("session", "1");
      return response;
    }
    //Add Existing Vistor Vist Count
  }

  const response = NextResponse.next();
  return response;
}
