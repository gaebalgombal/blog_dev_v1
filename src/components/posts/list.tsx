import styles from "@/app/page.module.css";
import { getPostList } from "@/lib/posts";

type Props = {
  params: { lang: string; category: string };
};

export const PostList = async ({ params: { lang, category } }: Props) => {
  const postList = await getPostList(lang, category);

  return (
    <ul className={styles.card}>
      {postList.map((post, i) => (
        <li key={`${post.title}_${i}`}>
          <h2>title: {post.title}</h2>
          <br />
          <p>date: {post.dateString}</p>
          <br />
        </li>
      ))}
    </ul>
  );
};
