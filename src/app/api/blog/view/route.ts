import { NextResponse, NextRequest } from "next/server";
import Blog from "@/modals/blogModal";
import dbConfig from "@/config/dbConfig";

dbConfig();

function replaceHyphens(input: string): string {
  return input.replace(/-/g, " ");
}

// Get Single Blog Data
export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (slug) {
      console.log(slug);
      const blog = await Blog.findOne({
        title: replaceHyphens(slug),
      });
      if (blog) {
        return NextResponse.json({ message: "Blog Data", data: blog });
      } else {
        return NextResponse.json(
          { message: "No Blog Data Found" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Please provide slug" },
        { status: 400 }
      );
    }
  } catch (e: any) {
    console.log("----😥---");
    console.log("Error on getting blog");
    console.log(e);
    return NextResponse.json(
      { error: e.message, message: "Error while getting blog" },
      { status: 500 }
    );
  }
}
