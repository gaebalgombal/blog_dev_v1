import styles from "@/app/styles/globals.module.css";
import { PostBody } from "@/components/posts/body";
import { getPostParams } from "@/components/posts/staticParams";
import { PostParams, PostProps } from "@/config/types";

const generateStaticParams = async () => {
  return getPostParams("kr");
};

const Page = async ({ params: { category, slug } }: PostProps) => {
  const params = { lang: "kr", category, slug } as PostParams;
  return <PostBody params={params} />;
};

export { generateStaticParams };

export default Page;
