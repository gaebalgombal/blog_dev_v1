import { PostList } from "@/components/posts/list";
import { Navbar } from "@/components/posts/navbar";
import { PostParams, PostProps } from "@/config/types";

const Page = async () => {
  const params = { lang: "en", category: "**" } as PostParams;

  return (
    <div>
      <Navbar params={params} />
      <PostList params={params} />
    </div>
  );
};

export default Page;
