import { NextResponse } from "next/server";

export default async function (response: NextResponse) {
  const token = response.cookies.get("vistor_id")?.value;
  console.log("Token " + token);

  const res = await fetch("http://localhost:3000/api/vistor/create", {
    method: "POST",
    body: JSON.stringify({ device: "Laptop", token: token }),
    cache: "no-cache",
  });

  const data = await res.json();
  if (data.token) {
    response.cookies.set("vistor_id", data.token);
    console.log("Set Token " + data.token);
  } else {
    console.log("Cannot set Token " + data.token);
  }
}
