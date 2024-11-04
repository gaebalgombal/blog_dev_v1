import { PostList } from "@/components/posts/list";

import { PostParams, PostProps } from "@/config/types";

const Page = async ({ params: { lang, category, slug } }: PostProps) => {
  const params = { lang, category, slug: "**" } as PostParams;

  return (
    <div>
      <PostList params={params} />
    </div>
  );
};

export default Page;
