import { BlogCard } from "@/components";

export default function Page({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);

  const blogs: any[] = [];

  return (
    <div className="grid xl:grid-cols-4 rg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 lg:px-40 md:px-16 px-5 gap-8 py-5 min-h-[89.3vh] bg-primary-main w-full">
      <div className="xl:col-span-4 lg:col-span-3 rg:col-span-3 sm:col-span-2 col-span-1 ">
        <h2 className="text-lg text-gray-100 font-sb">{category}</h2>
      </div>
      {blogs?.map((curr, indx) => (
        <BlogCard key={indx} blog={curr} />
      ))}
    </div>
  );
}
