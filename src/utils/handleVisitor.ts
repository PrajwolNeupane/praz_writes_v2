import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

export default async function handleVisitor(
  req: NextRequest,
  token?: string
): Promise<NextResponse> {
  const userAgent = req.headers.get("user-agent") || "";
  const deviceOS = extractOS(userAgent);
  const deviceType = extractDeviceName(userAgent);

  const res = await fetch("http://localhost:3000/api/vistor/create", {
    method: "POST",
    body: JSON.stringify({ device: `${deviceType}-${deviceOS}`, token }),
    cache: "no-cache",
  });

  const data = await res.json();
  const response = NextResponse.next();
  response.cookies.set("vistor_id", data.token);

  return response;
}
