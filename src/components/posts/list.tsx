import layoutStyles from "@/styles/layout.module.css";
import contentStyles from "@/styles/content.module.css";

import { getPostList } from "@/lib/posts";

type Props = {
  params: { lang: string; category: string };
};

export const PostList = async ({ params: { lang, category } }: Props) => {
  const postList = await getPostList(lang, category);

  return (
    <main>
      <div className={layoutStyles.ly_main}>
        <div className={layoutStyles.ly_content}>
          <ul className={contentStyles.bl_content}>
            {postList.map((post, i) => (
              <li className={contentStyles.card} key={`${post.title}_${i}`}>
                <h1>{post.title}</h1>
                <p>
                  <span className={contentStyles.date}>{post.dateString}</span>
                  <span className={contentStyles.category}>
                    {post.category}
                  </span>
                </p>
                <div className={contentStyles.description}>
                  Next.js is a React framework for building flil-stack web
                  applications. You use React Components to build user
                  interfaces, and Next.js for additional features and
                  optimizations. Under the hood, Next.js also abstracts and
                  automatically configures tooling needed for React, like
                  bundling, compiling, and more. This allows you to focus on
                  building your application instead of spending time with
                  configuration. Whether you're an individual developer or part
                  of a larger team, Next.js can help you build interactive,
                  dynamic, and fast React applications. Next.js is a React
                  framework for building
                </div>
                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};
