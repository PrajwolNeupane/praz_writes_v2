import { NextResponse, NextRequest } from "next/server";
import BlogModal from "@/modals/blogModal";
import dbConfig from "@/config/dbConfig";

dbConfig();

export async function GET(req: NextRequest) {
  try {
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const show = Number(req.nextUrl.searchParams.get("show")) || 10;
    const blogs = await BlogModal.find()
      .sort({ createdAt: -1 })
      .skip(page - 1)
      .limit(show);
    return NextResponse.json({ message: "Blog Data", data: blogs });
  } catch (e: any) {
    console.log("----😥---");
    console.log("Error on getting blog");
    console.log(e);
    return NextResponse.json(
      { error: e.message, message: "Server while getting blog" },
      {
        status: 500,
      }
    );
  }
}
