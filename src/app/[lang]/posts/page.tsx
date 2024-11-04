import { PostList } from "@/components/posts/list";
import { PostProps, PostParams } from "@/config/types";
import Template from "@/app/template";

const Page = async ({ params: { lang } }: PostProps) => {
  const params = { lang, category: "**", slug: "**" } as PostParams;

  return (
    <Template params={params}>
      <PostList params={params} />;
    </Template>
  );
};

export default Page;
