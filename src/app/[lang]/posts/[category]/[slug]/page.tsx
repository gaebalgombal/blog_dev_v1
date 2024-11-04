import { PostBody } from "@/components/posts/body";
import { PostParams, PostProps } from "@/config/types";

const Page = async ({ params: { lang, category, slug } }: PostProps) => {
  const params = { lang, category, slug } as PostParams;

  return <PostBody params={params} />;
};

export default Page;
