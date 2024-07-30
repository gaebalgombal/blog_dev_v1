import styles from "@/app/styles/page.module.css";
import { PostList } from "@/components/posts/list";
import { PostParams, PostProps } from "@/config/types";
import { getCategoryParams } from "@/components/posts/staticParams";

const generateStaticParams = async () => {
  return getCategoryParams("kr");
};

const Page = async ({ params: { category } }: PostProps) => {
  const params = { lang: "kr", category } as PostParams;
  return <PostList params={params} />;
};

export { generateStaticParams };

export default Page;
