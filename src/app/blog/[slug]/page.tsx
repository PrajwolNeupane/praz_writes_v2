import { BlogCard, CustomCodeSnippets } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { tw } from "twind";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
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
      title:
        "Unraveling the Threads: A Beginner's Guide to Multithreading in C.",
    },
  ];

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

  return (
    <div className="flex flex-col items-start lg:px-44 md:px-24 px-10 gap-8 py-5 min-h-[89.3vh] bg-primary-main w-full">
      <div className="flex flex-col items-center gap-2">
        <div className="bg-gray-400 rounded-lg px-3 py-1 text-primary-main text-2xs font-sb inline-block">
          Web Frontend
        </div>
        <h1 className="text-gray-100 font-sb md:text-2xl sm:text-xl text-lg text-center mt-2 leading-[120%]">
          {slug}
        </h1>
        <div className="flex justify-center gap-[6px] items-center w-full text-gray-400 text-2xs font-mb">
          <p>Mar 3</p>
          <p className="font-b text-lg">·</p>
          <p>19m read time</p>
        </div>
      </div>
      <Image
        alt="Blog Image"
        src={
          "https://miro.medium.com/v2/resize:fit:720/format:webp/1*jWijugelR6pWM-nJzS60nA.png"
        }
        width={1500}
        height={1500}
        className="w-full xl:h-[400px] h-[350px] object-cover rounded-2xl"
      />
      <p className="sm:text-rg text-md text-gray-200 leading-[150%]">
        Staying up-to-date with everything that’s changing in React is
        incredibly difficult. In this blog post, we will go through the seven
        main things that you need to understand about React Version 19. We will
        make it as simple and quick as possible so you can get up to speed with
        everything you need to know before it even releases.
      </p>
      <h2 className="md:text-xl sm:text-lg text-rg text-gray-100 leading-[150%] font-sb">
        Introduction to React Compiler
      </h2>
      <p className="sm:text-rg text-md text-gray-200 leading-[150%]">
        For the longest time, React only ran in the browser, and there was no
        compile step at all. However, with the emergence of other frameworks
        like Astro and Svelte, which added their own compile step, React has
        decided to follow suit.
      </p>
      <p className="sm:text-rg text-md text-gray-200 leading-[150%]">
        React Version 19 will introduce a new React Compiler, which will
        automatically add its own memorization for things like
        <span className="text-orange-300 font-mb"> useMemo, useCallback, </span>
        and the <span className="text-orange-300 font-mb">memo</span> function.
        This means that you will no longer need to use these hooks or functions
        ever again, as the compiler will take care of it for you.
      </p>
      <p className="sm:text-rg text-md text-gray-200 leading-[150%]">
        This is a huge win because not only does it make your code simpler and
        easier to read and write, but it also makes your code faster. The actual
        compiler is almost always going to find more instances of where you
        should be doing memoization than where you would normally find it
        yourself.
      </p>
      <h3 className="md:text-lg sm:text-rg text-md text-gray-200 leading-[150%] font-mb">
        Actions and useClient/useServer Directives
      </h3>
      <div
        dangerouslySetInnerHTML={{
          __html: `<p class="${tw`text-gray-200  sm:text-rg text-md  leading-[150%]`}">
          If you’ve ever worked inside Next.js, you know that you can create a
          form and instead of passing an onSubmit, you pass it an action. This
          action will take in all of your different form data, and you can do
          whatever you want with this action. With React 19, they are making this
          a stable feature and adding it so it actually works inside of
          <a href="https://prajwolneupane.com.np" target="_blank" class="${tw`text-orange-300 hover:text-orange-400`}">https://prajwolneupane.com.np</a>
          client or server applications.
        </p>`,
        }}
      ></div>
      <h3 className="md:text-lg sm:text-rg text-md text-gray-200 leading-[150%] font-mb">
        List Head
      </h3>
      <div
        dangerouslySetInnerHTML={{
          __html: `
          <ol class="${tw`space-y-3`}">
          <li class="${tw`sm:text-rg text-md text-gray-200 leading-7`}">
            1. <span class="${tw`text-orange-300 font-mb`}">TensorFlow:</span> 
            Developed by Google, TensorFlow is one of the most popular open-source
            frameworks for AI and machine learning. It provides a comprehensive
            ecosystem for building and deploying machine learning models,
            including support for deep learning.
          </li>
          <li class="${tw`sm:text-rg text-md text-gray-200 leading-7`}">
            2. <span class="${tw`text-orange-300 font-mb`}">TensorFlow:</span> 
            Developed by Google, TensorFlow is one of the most popular open-source
            frameworks for AI and machine learning. It provides a comprehensive
            ecosystem for building and deploying machine learning models,
            including support for deep learning.
          </li>
        </ol>
          `,
        }}
      ></div>
      <p className="sm:text-rg text-md text-gray-200 leading-[150%]">
        Click on this link{" "}
        <Link
          href={"https://prajwolneupane.com.np"}
          target="blank"
          className="text-orange-300 font-mb hover:text-orange-400 bg-gray-800 py-1 px-[10px] mx-2 rounded-lg"
        >
          https://prajwolneupane.com.np
        </Link>
      </p>
      <CustomCodeSnippets text={text} lang="jsx" />
      <hr className="bg-white w-full" />
      <h1 className="md:text-xl sm:text-lg text-rg text-gray-100 leading-[150%] font-sb">
        Related Blogs
      </h1>
      <div className="grid xl:grid-cols-4 rg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3  gap-8 py-5 min-h-[89.3vh] bg-primary-main w-full">
        {blogs.map((curr, indx) => (
          <BlogCard key={indx} blog={curr} />
        ))}
      </div>
    </div>
  );
}
