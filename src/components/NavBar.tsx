"use client";
import {
  CustomModelOverlay,
  SearchInput,
  SearchModel,
} from "@/components/index";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { useSearchStore } from "@/store";

export default function NavBar() {
  const [openCategory, setOpenCategory] = React.useState<boolean>(false);
  const { isOpen, setOpen } = useSearchStore();

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Category",
    },
    {
      title: "Tech Stack",
      link: "/stack",
    },
    {
      title: "About Us",
      link: "https://www.prajwolneupane.com.np/",
      target: "blank",
    },
  ];

  const catgory = [
    { title: "Web Frontend", link: "/category/Web Frontend" },
    { title: "Mobile Frontend", link: "/category/Mobile Frontend" },
    { title: "AI", link: "/category/AI" },
    { title: "Backend", link: "/category/Backend" },
    { title: "UI/UX", link: "/category/UIUX" },
    { title: "Web Frontend", link: "/category/Web Frontend" },
  ];

  return (
    <>
      <div className="flex md:flex-row flex-col items-center justify-between w-full md:py-5 py-2 lg:px-40 rg:px-16 px-5 bg-primary-main sticky top-0 z-[10]">
        <Link href={"/"}>
          <h1 className="font-b text-lg text-orange-400">Praz Writes</h1>
        </Link>
        <div className="flex md:flex-row flex-col rg:gap-10 md:gap-5 gap-2 items-center relative">
          <SearchInput
            placeholder="Search Blogs"
            disableInput={true}
            onClick={() => {
              setOpen(true);
            }}
            outerClassName="xl:w-[420px] rg:w-[350px] md:w-[250px] w-[300px]"
            lastChild={
              <h2 className="text-center p-1 rounded-lg border border-gray-600 text-gray-300 text-3xs font-mb w-20 bg-primary-main">
                Ctrl + K
              </h2>
            }
          />
          <div className="flex flex-row items-center rg:gap-10 gap-5 relative">
            {links.map((curr, indx) => {
              if (curr.link) {
                return (
                  <Link
                    href={curr.link}
                    key={indx}
                    target={curr.target && curr.target}
                    onMouseLeave={() => {
                      setOpenCategory(false);
                    }}
                    onMouseEnter={() => {
                      setOpenCategory(false);
                    }}
                  >
                    <h2 className="text-glow font-r text-xs text-gray-100 drop-shadow-md hover:text-orange-400 transition-colors delay-100 ease-in-out">
                      {curr.title}
                    </h2>
                  </Link>
                );
              } else {
                return (
                  <h2
                    key={indx}
                    className={classNames(
                      "text-glow font-r text-xs cursor-pointer hover:text-orange-400 transition-colors delay-100 ease-in-out",
                      `${
                        !openCategory
                          ? "text-gray-100"
                          : "text-orange-400 text-glow-always"
                      }`
                    )}
                    onMouseEnter={() => {
                      setOpenCategory(true);
                    }}
                  >
                    {curr.title}
                  </h2>
                );
              }
            })}
            <div
              className={classNames(
                `${
                  openCategory ? "opacity-[100%] grid" : "opacity-[0%] hidden"
                }`,
                "absolute top-[40px] bg-primary-main transition-all delay-100 ease-in-out rounded-md px-4 py-2 gap-2 grid-cols-1 items-center justify-start white-mid-glow left-[40px] w-[200px]"
              )}
              onMouseEnter={() => {
                setOpenCategory(true);
              }}
              onMouseLeave={() => {
                setOpenCategory(false);
              }}
            >
              {catgory.map((curr, indx) => (
                <Link
                  href={curr.link}
                  key={indx}
                  className="text-white text-2xs px-1"
                >
                  {curr.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isOpen && <CustomModelOverlay child={<SearchModel />} />}
    </>
  );
}
