import { PostList } from "@/components/posts/list";
import { PostProps, PostParams } from "@/config/types";
import { Navbar } from "@/components/template/navbar";

const Page = async ({ params: { lang } }: PostProps) => {
  const params = { lang, category: "**", slug: "**" } as PostParams;

  return (
    <div>
      <Navbar params={{ lang }} />
      <PostList params={params} />;
    </div>
  );
};

export default Page;
