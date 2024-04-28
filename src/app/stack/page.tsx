// "use client";
// import React from "react";
// import tw from "twin.macro";

// export default function Page() {
//   const [htmlContent, setHtmlContent] = React.useState("");

//   const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setHtmlContent(event.target.value);
//     console.log(htmlContent);
//   };
//   return (
//     <div className="flex flex-col h-full w-full">
//       <textarea
//         tw="flex-grow p-4 bg-gray-900 text-gray-200 border border-gray-600 rounded-md resize-none"
//         value={htmlContent}
//         onChange={handleChange}
//         placeholder="Enter HTML content..."
//       ></textarea>
//       <div
//         tw="p-4 bg-gray-900 text-gray-200 border border-gray-600 rounded-md overflow-auto"
//         dangerouslySetInnerHTML={{ __html: htmlContent }}
//       ></div>
//     </div>
//   );
// }
import { BlogCard } from "@/components";
import Image from "next/image";

export default function Page() {
  const reasons = [
    {
      title: "Tailwind CSS",
      description:
        "Tailwind CSS is chosen for its utility-first approach, facilitating rapid development by applying small, single-purpose utility classes directly in the HTML markup. It simplifies responsive design, offers extensive customization options, and enhances performance by generating optimized CSS bundles.",
    },
    {
      title: "Next.js",
      description:
        "Next.js is preferred for its built-in support for server-side rendering (SSR) and automatic code splitting, leading to faster initial page loads and improved performance. Its static site generation (SSG) capabilities ensure fast loading times and reduced server load, while built-in API routes simplify backend logic and data fetching.",
    },
    {
      title: "MongoDB",
      description:
        "MongoDB is selected for its flexible schema design, scalability, rich query language, and document-based storage. It accommodates the varied content structures of a blog application, scales horizontally to handle increased data and traffic, and provides efficient data retrieval and manipulation, seamlessly integrating with the application's frontend.",
    },
    {
      title: "Vercel",
      description:
        "Vercel's free hosting service is utilized for deploying the blog application. Vercel offers seamless deployment and scaling, along with features such as automatic SSL certificate provisioning and custom domains. Its integration with Next.js ensures smooth deployment workflows and optimal performance.",
    },
    {
      title: "TypeScript",
      description:
        "TypeScript is employed for its static typing capabilities, enhancing code quality and maintainability by catching errors during development. It provides a more robust development experience by enabling developers to define explicit types, leading to fewer runtime errors and improved code documentation.",
    },
  ];

  const blogs: any[] = [];

  return (
    <div className="min-h-screen gap-10 flex flex-col bg-primary-main items-center py-5 lg:px-40 rg:px-16 px-5">
      <div className="grid lg:grid-cols-5 rg:grid-cols-5 md:grid-cols-3 grid-cols-2  gap-10 items-center bg-gray-100 p-5 rounded-xl mt-5 white-glow">
        <Image
          alt="Tailwind CSS Image"
          height={2000}
          width={2000}
          className="md:w-[150px] w-[100px] object-contain"
          src={"https://www.svgrepo.com/show/374118/tailwind.svg"}
        />
        <Image
          alt="Next.js Image"
          height={2000}
          width={2000}
          className="md:w-[150px] w-[100px] object-contain"
          src={"https://www.datocms-assets.com/98835/1684410508-image-7.png"}
        />
        <Image
          alt="Typescript Image"
          height={2000}
          width={2000}
          className="md:w-[150px] w-[100px] object-contain"
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png"
          }
        />
        <Image
          alt="MongoDB Image"
          height={2000}
          width={2000}
          className="md:w-[150px] w-[100px] object-fill"
          src={"https://www.svgrepo.com/show/331488/mongodb.svg"}
        />
        <div className="md:col-span-1 h-[40px] rg:hidden md:block hidden"></div>
        <Image
          alt="Tailwind CSS Image"
          height={2000}
          width={2000}
          className="w-[150px] object-fill"
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vercel_logo_black.svg/2560px-Vercel_logo_black.svg.png"
          }
        />
      </div>
      <div className="flex flex-col gap-8 w-full">
        <h2 className="rg:text-3xl md:text-2xl text-xl font-sb text-gray-100 text-center">
          💻 Tech Stack Used
        </h2>
        <p className="leading-[150%] text-gray-300 text-rg">
          I have used Tailwind CSS for Styling, Next.js with Typescript for
          Frontend and Backend as it is Full Stack Framework and for database
          Mongo DB.
        </p>
        {reasons.map((curr, indx) => (
          <p key={indx} className="leading-[150%] text-gray-300 text-rg">
            <span className="font-mb text-gray-100">
              {indx + 1}. {curr.title + ": "}
            </span>
            {curr.description}
          </p>
        ))}
      </div>
      <div className="w-full flex flex-col gap-5">
        <hr className="bg-white w-full" />
        <h1 className="md:text-xl text-start sm:text-lg text-rg text-gray-100 leading-[150%] font-sb">
          Related Blogs
        </h1>
        <div className="grid xl:grid-cols-4 rg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3  gap-8 py-5 bg-primary-main w-full">
          {blogs.map((curr, indx) => (
            <BlogCard key={indx} blog={curr} />
          ))}
        </div>
      </div>
    </div>
  );
}
