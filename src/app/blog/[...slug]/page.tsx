import { getBlogs, getBlog } from "@/actions";
import { BlogCard, CustomCodeSnippets } from "@/components";
import { BlogPost } from "@/types/Response.type";
import Image from "next/image";
import Link from "next/link";
import { tw } from "twind";
import "tailwindcss/tailwind.css";

function extractTextFromCodeTag(text: string): string {
  const regex = /<code>([\s\S]*?)<\/code>/; // Match any character including new lines
  const match = text.match(regex);
  return match ? match[1] : "";
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const data: BlogPost | null = await getBlog(slug);
  const blogs: BlogPost[] = await getBlogs();

  const text = `  import React from 'react';
  import ReactDOM from 'react-dom';
  
  class App extends React.Component {
    render() {
      return (
        <div>
          <h1>Hello, World!</h1>
        </div>
      );
    }
  }
  
  ReactDOM.render(<App />, document.getElementById('root'));`;

  if (data === null) return <h1>Not Found</h1>;

  return (
    <div className="flex flex-col items-start lg:px-44 md:px-24 px-10 gap-8 py-5 min-h-[89.3vh] bg-primary-main w-full">
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="bg-gray-400 rounded-lg px-3 py-1 text-primary-main text-2xs font-sb inline-block">
          {data.tags}
        </div>
        <h1 className="text-gray-100 font-sb md:text-2xl sm:text-xl text-lg text-center mt-2 leading-[120%]">
          {data.title}
        </h1>
        <div className="flex justify-center gap-[6px] items-center w-full text-gray-400 text-2xs font-mb">
          <p>{data.createdAt}</p>
          <p className="font-b text-lg">·</p>
          <p>{Math.floor(data.read / 60)} minutes</p>
        </div>
      </div>
      <Image
        alt="Blog Image"
        src={data.image}
        width={1500}
        height={1500}
        className="w-full xl:h-[400px] h-[350px] object-cover rounded-2xl"
      />
      {data.description.map((curr, indx) => {
        if (!curr.includes("<code>")) {
          return (
            <div
              key={indx}
              dangerouslySetInnerHTML={{
                __html: curr,
              }}
            ></div>
          );
        } else {
          return (
            <CustomCodeSnippets
              key={indx}
              text={extractTextFromCodeTag(curr)}
              lang="jsx"
            />
          );
        }
      })}
      <hr className="bg-white w-full" />
      <h1 className="md:text-xl sm:text-lg text-rg text-gray-100 leading-[150%] font-sb">
        Related Blogs
      </h1>
      <div className="grid xl:grid-cols-4 rg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3  gap-8 py-5 bg-primary-main w-full">
        {blogs.map((curr: BlogPost, indx) => (
          <BlogCard key={indx} blog={curr} />
        ))}
      </div>
    </div>
  );
}
