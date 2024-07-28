import styles from "@/app/styles/page.module.css";
import { PostList } from "@/components/posts/list";
import { PostParams, PostProps } from "@/config/types";

const Page = async () => {
  const params = { lang: "kr", category: "**" } as PostParams;
  return <PostList params={params} />;
};

export default Page;
