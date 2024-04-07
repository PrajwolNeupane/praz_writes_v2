import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import handleVisitor from "./utils/handleVisitor";

function extractDeviceName(userAgent: string): string {
  const mobileRegex = /(iPhone|iPad|iPod|Android|BlackBerry|Windows Phone)/;
  const desktopRegex = /(Windows NT|Mac OS X|Linux)/;

  if (mobileRegex.test(userAgent)) {
    return "Mobile";
  } else if (desktopRegex.test(userAgent)) {
    return "Desktop";
  } else {
    return "Other";
  }
}

function extractOS(userAgent: string): string {
  const windowsRegex = /(Windows NT)/;
  const macRegex = /(Mac OS X)/;
  const linuxRegex = /(Linux)/;

  if (windowsRegex.test(userAgent)) {
    return "Windows";
  } else if (macRegex.test(userAgent)) {
    return "MacOS";
  } else if (linuxRegex.test(userAgent)) {
    return "Linux";
  } else {
    return "Other";
  }
}

export default async function middleware(req: NextRequest) {
  const sessionCookie = cookies().get("session")?.value;
  const visitorIdCookie = cookies().get("vistor_id")?.value;

  if (!sessionCookie) {
    const response = await handleVisitor(req, visitorIdCookie);
    response.cookies.set("session", "1", { maxAge: 10 * 60 }); // Set session cookie to expire after 10 minutes
    return response;
  }

  const response = NextResponse.next();
  const { pathname } = req.nextUrl;

  if (pathname.includes("/blog") || pathname.includes("/") || pathname.includes("/stack")) {
    if (pathname.includes("/blog")) {
      console.log("-------🚀🚀 MIDDLEWARE---------");
      console.log(new Date().toISOString());
      const pathAfterBlog = pathname.split("/blog")[1];
      if (pathAfterBlog) {
        console.log(`Navigating to ${pathAfterBlog}`);
      }
    }
  }

  return response;
}