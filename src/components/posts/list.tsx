import layoutStyles from "@/styles/layout.module.css";
import contentStyles from "@/styles/content.module.css";
import sidebarStyles from "@/styles/sidebar.module.css";

import { getPostList } from "@/lib/posts";
import { PostProps, PostPackage } from "@/config/types";

export const PostList = async ({
  params: { lang, category, slug },
}: PostProps) => {
  const { postList, postPackageList } = await getPostList(lang, category);

  return (
    <div className={layoutStyles.ly_main}>
      <div className={layoutStyles.ly_sidebar}>
        <div className={sidebarStyles.bl_sidebar}>
          <p>On this site ···</p>
          <div className={sidebarStyles.ly_table} key={`cateogory_and_titles`}>
            <ul>
              {postPackageList.map((postPackage: PostPackage, i) => (
                <li key={`${postPackage.category}_${i}`}>
                  <div className={sidebarStyles.h1_category}>
                    <a href={`/${lang}/posts/${postPackage.category}`}>
                      {postPackage.category}
                    </a>
                  </div>
                  <ul>
                    {postPackage.postList.map((post, j) => (
                      <li
                        className={sidebarStyles.h2_title}
                        key={`${postPackage.category}_${i}_${post.title}_${j}`}
                      >
                        <a href={`/${post.url}`}>{`${post.title} > `}</a>
                      </li>
                    ))}
                    <li className={sidebarStyles.h2_title} key={`more_posts`}>
                      <a href={`/${postPackage.category}`}>{`MORE ··· >`}</a>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={layoutStyles.ly_content}>
        <ul className={contentStyles.bl_content}>
          {postList.map((post, i) => (
            <li className={contentStyles.card} key={`${post.title}_${i}`}>
              <h1>{post.title}</h1>
              <p>
                <span className={contentStyles.date}>{post.dateString}</span>
                <span className={contentStyles.category}>{post.category}</span>
              </p>
              <div className={contentStyles.description}>
                Next.js is a React framework for building flil-stack web
                applications. You use React Components to build user interfaces,
                and Next.js for additional features and optimizations. Under the
                hood, Next.js also abstracts and automatically configures
                tooling needed for React, like bundling, compiling, and more.
                This allows you to focus on building your application instead of
                spending time with configuration. Whether you're an individual
                developer or part of a larger team, Next.js can help you build
                interactive, dynamic, and fast React applications. Next.js is a
                React framework for building
              </div>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
