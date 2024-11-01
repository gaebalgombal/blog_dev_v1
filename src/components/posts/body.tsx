import layoutStyles from "@/styles/layout.module.css";
import contentStyles from "@/styles/content.module.css";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { Post } from "@/config/types";
import { getPostDetail, getPostList } from "@/lib/posts";
import { PostParams, PostProps } from "@/config/types";

export const PostBody = async ({
  params: { lang, category, slug },
}: PostProps) => {
  const post = await getPostDetail({ lang, category, slug });

  return (
    <div className={layoutStyles.ly_main}>
      <div className={layoutStyles.ly_content}>
        <div className={layoutStyles.bl_content}>
          <div className={contentStyles.card}>
            <h1>카드</h1>
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkBreaks],
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      {
                        theme: {
                          dark: "github-dark-dimmed",
                          light: "github-light",
                        },
                      },
                    ],
                    rehypeSlug,
                  ],
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
