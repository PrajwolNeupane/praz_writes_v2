import Image from "next/image";
import Link from "next/link";

interface PropsType {
  blog: { title: string; image: string };
}

export default function BlogCard({ blog }: PropsType) {
  return (
    <Link
      href={`/blog/${blog.title}`}
      className="h-[350px] col-span-1 relative overflow-clip cursor-pointer rounded-xl hover:shadow-xl hover:shadow-[rgb(255,150,0,0.08)] transition-all delay-200 ease-in"
    >
      <div className="h-full px-2 py-[9px] w-full bg-secondary-main shadow rounded-xl cursor-pointer">
        <div className="h-[50%] py-1 px-3 leading-[160%] space-y-3">
          <div className="bg-gray-400 rounded-lg px-2 text-primary-main text-3xs font-sb inline-block">
            Web Frontend
          </div>
          <h1 className="text-gray-50 font-sb text-lg line-clamp-3">
            {blog.title}
          </h1>
          <div className="flex gap-[6px] items-center w-full text-gray-400 text-2xs font-mb">
            <p>Mar 3</p>
            <p className="font-b text-lg">·</p>
            <p>19m read time</p>
          </div>
        </div>
        <Image
          alt="Blog Image"
          src={blog.image}
          width={1000}
          height={1000}
          className="w-full h-[50%] object-cover rounded-2xl"
        />
      </div>
      <div className="h-full w-full bg-gradient-linear opacity-[90%] absolute top-0 rounded-xl "></div>
    </Link>
  );
}
