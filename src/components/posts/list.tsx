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

  const h1Category = classNames({
    [sidebarStyles["h1_category"]]: true,
    [typoStyles["signature_color"]]: true,
    ...hover,
  });

  const h2Title = classNames({
    [sidebarStyles["h2_title"]]: true,
    [typoStyles["signature_color"]]: true,
    ...hover,
  });

  const clickable = classNames({
    [contentStyles.clickable]: true,
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
                  <div className={h1Category}>
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
                        className={h2Title}
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
                    <li className={h2Title} key={`more_posts`}>
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
      <div className={layoutStyles.ly_content}>
        <div className={contentStyles.bl_content}>
          {postList.map((post, i) => (
            <Link
                href={{
                  pathname: `/${post.url}`,
                }}
                key={`link_${post.url}_${i}`}
              >
                <div className={clickable}>
                    <div className={contentStyles.summary} key={`div_${post.url}_${i}`}>
                        <h1 className={classNames(hover)}>
                          <span>
                            {post.title}
                          </span>
                        </h1>
                        <p>
                          <span>
                            {post.dateString}&nbsp;&nbsp;
                            {post.category}
                          </span>
                        </p>
                        <div className={contentStyles.description}>
                          <span>
                            {post.description?.length ? post.description : post.content}
                          </span>
                        </div>
                  </div>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
