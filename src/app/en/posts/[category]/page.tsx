import styles from "../styles/globals.module.css";
import { PostList } from "@/components/posts/list";
import { PostParams, PostProps } from "@/config/types";
import { getCategoryParams } from "@/components/posts/staticParams";

const generateStaticParams = async () => {
  return getCategoryParams("en");
};

const Page = async ({ params: { category } }: PostProps) => {
  const params = { lang: "en", category } as PostParams;
  return <PostList params={params} />;
};

export { generateStaticParams };

export default Page;
