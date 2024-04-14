import { getBlogs } from "@/actions";
import { BlogCard } from "@/components";
import { BlogPost } from "@/types/Response.type";

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

export default async function Home() {
  const data: BlogPost[] = await getBlogs();

  return (
    <div className="grid xl:grid-cols-4 rg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 lg:px-40 md:px-16 px-5 gap-8 py-5 min-h-[89.3vh] bg-primary-main w-full">
      {data?.map((curr, indx) => (
        <BlogCard key={indx} blog={curr} />
      ))}
    </div>
  );
}
