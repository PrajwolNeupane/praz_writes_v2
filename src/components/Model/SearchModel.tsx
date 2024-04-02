"use client";

import React from "react";
import SearchInput from "../Inputs/SearchInput";
import Image from "next/image";
import classNames from "classnames";
import useDivNavigation from "@/hooks/useDivNavigation";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/store";

const blogs = [
  {
    image:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*ZewMtCc-bWBIZZm4j_nVEA.png",
    title:
      "React Version 19: A Comprehensive Overview of the Upcoming Release.",
  },
  {
    image:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*jWijugelR6pWM-nJzS60nA.png",
    title: "Tailwind CSS Best Classes: Unlocking the Power of Tailwind.",
  },
  {
    image:
      "https://web.dev/static/articles/virtualize-long-lists-react-window/image/difference-scrolling-bet-517c003019905_856.jpg",
    title: "Harnessing the Power of Visualize List in React.",
  },
  {
    image:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*Mou3DPI0Nbg8BH4LvYGwWw.png",
    title: "Understanding Two-Way Data Binding in Angular.",
  },

  {
    image:
      "https://compile7.org/static/1847e80ca7619de97f337dc7850aacfd/b444b/protected-routes-in-react.png",
    title: "Authentication Protected routes in React.",
  },

  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtxTDkELSEthGxIu_PtbSjFYlIdk2qtvAmDA&usqp=CAU",
    title: "Unraveling the Threads: A Beginner's Guide to Multithreading in C.",
  },
  {
    image:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*ZewMtCc-bWBIZZm4j_nVEA.png",
    title:
      "React Version 19: A Comprehensive Overview of the Upcoming Release.",
  },
  {
    image:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*jWijugelR6pWM-nJzS60nA.png",
    title: "Tailwind CSS Best Classes: Unlocking the Power of Tailwind.",
  },
  {
    image:
      "https://web.dev/static/articles/virtualize-long-lists-react-window/image/difference-scrolling-bet-517c003019905_856.jpg",
    title: "Harnessing the Power of Visualize List in React.",
  },
  {
    image:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*Mou3DPI0Nbg8BH4LvYGwWw.png",
    title: "Understanding Two-Way Data Binding in Angular.",
  },

  {
    image:
      "https://compile7.org/static/1847e80ca7619de97f337dc7850aacfd/b444b/protected-routes-in-react.png",
    title: "Authentication Protected routes in React.",
  },

  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtxTDkELSEthGxIu_PtbSjFYlIdk2qtvAmDA&usqp=CAU",
    title: "Unraveling the Threads: A Beginner's Guide to Multithreading in C.",
  },
  {
    image:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*ZewMtCc-bWBIZZm4j_nVEA.png",
    title:
      "React Version 19: A Comprehensive Overview of the Upcoming Release.",
  },
  {
    image:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*jWijugelR6pWM-nJzS60nA.png",
    title: "Tailwind CSS Best Classes: Unlocking the Power of Tailwind.",
  },
  {
    image:
      "https://web.dev/static/articles/virtualize-long-lists-react-window/image/difference-scrolling-bet-517c003019905_856.jpg",
    title: "Harnessing the Power of Visualize List in React.",
  },
  {
    image:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*Mou3DPI0Nbg8BH4LvYGwWw.png",
    title: "Understanding Two-Way Data Binding in Angular.",
  },

  {
    image:
      "https://compile7.org/static/1847e80ca7619de97f337dc7850aacfd/b444b/protected-routes-in-react.png",
    title: "Authentication Protected routes in React.",
  },

  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtxTDkELSEthGxIu_PtbSjFYlIdk2qtvAmDA&usqp=CAU",
    title: "Unraveling the Threads: A Beginner's Guide to Multithreading in C.",
  },
];

export default function SearchModel() {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const router = useRouter();
  const { setOpen } = useSearchStore();

  const blogList = React.useMemo(() => {
    if (searchValue) {
      return blogs
        .filter((blog) => {
          if (blog.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return blog;
          }
        })
        .slice(0, 5);
    } else {
      return [];
    }
  }, [searchValue]);

  const [blogIndex, setBlogIndex] = useDivNavigation(0, blogList, (path) => {
    setOpen(false);
    router.push(`/blog/${path}`);
  });

  return (
    <div className="w-[50%] flex flex-col items-stretch bg-secondary-main p-5 mx-auto mt-[30px] white-mid-glow rounded-md">
      <SearchInput
        placeholder="Search Blog"
        outerClassName="border border-orange-400 w-[100%]"
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchValue(e.target.value);
        }}
      />
      <div className="flex flex-col gap-3 mt-5">
        {blogList.map((blog, index) => (
          <div
            key={index}
            className={classNames(
              "flex items-start gap-5 hover:bg-primary-main cursor-pointer p-[6px] rounded-md transition-colors delay-200 ease-in-out",
              `${blogIndex == index ? "bg-primary-main" : "bg-transparent"}`
            )}
            onMouseEnter={() => {
              setBlogIndex(index);
            }}
            onClick={() => {
              setOpen(false);
              router.push(`/blog/${blog.title}`);
            }}
          >
            <Image
              src={blog.image}
              alt="Blog Image"
              width={200}
              height={200}
              className="h-[80px] w-[150px] object-cover rounded-lg"
            />
            <div className="flex flex-col">
              <h3 className="line-clamp-2 font-mb text-sm text-gray-100">
                {blog.title}
              </h3>
              <div className="flex gap-[6px] items-center w-full text-gray-400 text-2xs font-mb">
                <p>Mar 3</p>
                <p className="font-b text-lg">·</p>
                <p>19m read time</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
