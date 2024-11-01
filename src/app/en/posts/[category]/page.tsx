import { PostList } from "@/components/posts/list";
import { Navbar } from "@/components/posts/navbar";
import { PostParams, PostProps } from "@/config/types";
import { getCategoryParams } from "@/components/posts/staticParams";

const generateStaticParams = async () => {
  return getCategoryParams("en");
};

const Page = async ({ params: { category } }: PostProps) => {
  const params = { lang: "en", category } as PostParams;
  const navParams = { lang: "en" };

  return (
    <div>
      <Navbar params={navParams} />
      <PostList params={params} />
    </div>
  );
};

export { generateStaticParams };

export default Page;
