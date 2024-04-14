import axios from "axios";
import { BlogPost, BlogResponse } from "@/types/Response.type";

export default async function getBlog(slug: string): Promise<BlogPost | null> {
  try {
    const response = await axios.get<BlogResponse>(
      `${process.env.API_HOST}/api/blog/view?slug=${slug}`
    );
    return response.data.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}
