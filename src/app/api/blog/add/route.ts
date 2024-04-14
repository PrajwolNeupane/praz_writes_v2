import { NextResponse, NextRequest } from "next/server";
import BlogModal from "@/modals/blogModal";
import dbConfig from "@/config/dbConfig";

dbConfig();

function countLetters(stringsArray: string[]) {
  let totalLetters = 0;

  for (const str of stringsArray) {
    // Remove HTML tags using a regular expression
    const cleanedString = str.replace(/<\/?[^>]+>/g, "");

    // Count the remaining letters
    totalLetters += cleanedString.length;
  }

  // Calculate the result of totalLetters divided by 5 without decimals
  const result = Math.floor(totalLetters / 5);

  return result;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    var blog;
    const { title, tags, description, image } = reqBody;
    if (image == undefined || image == null) {
      blog = new BlogModal({
        title,
        tags,
        description,
        read: countLetters(description),
      });
    } else {
      blog = new BlogModal({
        title,
        tags,
        description,
        image,
        read: countLetters(description),
      });
    }
    if (blog) {
      blog = await blog.save();
      return NextResponse.json(
        { message: "Blog Added" },
        {
          status: 200,
        }
      );
    }
  } catch (e: any) {
    console.log("----😥---");
    console.log("Error Post add blog");
    console.log(e);
    return NextResponse.json(
      { error: e.message, message: "Server while adding blog" },
      {
        status: 500,
      }
    );
  }
}
