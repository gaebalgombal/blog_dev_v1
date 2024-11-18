import Link from "next/link";
import classNames from "classnames";

import layoutStyles from "@/styles/layout.module.css";
import contentStyles from "@/styles/content.module.css";
import sidebarStyles from "@/styles/sidebar.module.css";
import typoStyles from "@/styles/typography.module.css";

import { getPostList } from "@/lib/posts";
import { PostProps, PostPackage } from "@/config/types";

export const PostList = async ({
  params: { lang, category, slug },
}: PostProps) => {
  const { postList, postPackageList } = await getPostList(lang, category);

  const hover = {
    [typoStyles["signature_en"]]: lang === 'en' ? true : false,
    [typoStyles["signature_kr"]]: lang === 'kr' ? true : false,
  }

  const summary = classNames({
    [contentStyles["summary"]]: true,
    ...hover,
  });

  const h1_category = classNames({
    [sidebarStyles["h1_category"]]: true,
    [typoStyles["signature_color"]]: true,
    ...hover,
  });

  const h2_title = classNames({
    [sidebarStyles["h2_title"]]: true,
    [typoStyles["signature_color"]]: true,
    ...hover,
  });


  return (
    <div className={layoutStyles.ly_main}>
      <div className={layoutStyles.ly_sidebar}>
        <div className={sidebarStyles.bl_sidebar}>
          <p>{lang === "en" ? "On this site ···" : "··· 글 목록 ···"}</p>
          <div className={sidebarStyles.ly_table} key={`cateogory_and_titles`}>
            <ul>
              {postPackageList.map((postPackage: PostPackage, i) => (
                <li key={`${postPackage.category}_${i}`}>
                  <div className={h1_category}>
                    <Link
                      href={{
                        pathname: `/${lang}/posts/${postPackage.category}`,
                      }}
                    >
                      {postPackage.category}
                    </Link>
                  </div>
                  <ul>
                    {postPackage.postList.map((post, j) => (
                      <li
                        className={h2_title}
                        key={`${postPackage.category}_${i}_${post.title}_${j}`}
                      >
                        <Link
                          href={{
                            pathname: `/${post.url}`,
                          }}
                        >
                          {`${post.title} > `}
                        </Link>
                      </li>
                    ))}
                    <li className={h2_title} key={`more_posts`}>
                      <Link
                        href={{
                          pathname: `/${lang}/posts/${postPackage.category}`,
                        }}
                      >
                        {lang === "en" ? `MORE ··· >` : `더보기 ··· >`}
                      </Link>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={layoutStyles.ly_content} >
        <ul className={contentStyles.bl_content}>
          {postList.map((post, i) => (
            <Link
              href={{
                pathname: `/${post.url}`,
              }}
            >
              <li className={summary} key={`${post.url}_${i}`}>
                <h1>{post.title}</h1>
                <p>
                  <span className={contentStyles.date}>{post.dateString}</span>
                  <span className={contentStyles.category}>
                    {post.category}
                  </span>
                </p>
                <div className={contentStyles.description}>{post.content}</div>
                <br />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
