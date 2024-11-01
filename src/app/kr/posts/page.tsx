import styles from "../styles/globals.module.css";
import { PostList } from "@/components/posts/list";
import { PostParams, PostProps } from "@/config/types";

const Page = async () => {
  const params = { lang: "kr", category: "**" } as PostParams;
  return <PostList params={params} />;
};

export default Page;
