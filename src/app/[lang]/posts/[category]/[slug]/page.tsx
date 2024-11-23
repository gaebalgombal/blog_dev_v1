import { PostBody } from "@/components/posts/body";
import { PostParams, PostProps } from "@/config/types";
import { Navbar } from "@/components/template/navbar";

const Page = async ({ params: { lang, category, slug } }: PostProps) => {
  const params = { lang, category, slug } as PostParams;

  return (
    <div>
      <Navbar params={{ lang }} />
      <PostBody params={params} />;
    </div>
  )
};

export default Page;
