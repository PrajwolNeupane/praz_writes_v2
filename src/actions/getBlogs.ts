import axios from "axios";
import { BlogPost, BlogsResponse } from "@/types/Response.type";

export default async function getBlogs(): Promise<BlogPost[]> {
  try {
    const response = await axios.get<BlogsResponse>(
      `${process.env.API_HOST}/api/blog`
    );
    return response.data.data;
  } catch (e) {
    console.log(e);
    return [];
  }
}
 