import layoutStyles from "@/styles/layout.module.css";
import contentStyles from "@/styles/content.module.css";
import sidebarStyles from "@/styles/sidebar.module.css";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { getPostDetail } from "@/lib/posts";
import { PostProps } from "@/config/types";
import { TableMDX } from "@/lib/mdx";

export const PostBody = async ({
  params: { lang, category, slug },
}: PostProps) => {
  const post = await getPostDetail({ lang, category, slug });

  return (
    <div className={layoutStyles.ly_main}>
      <div className={layoutStyles.ly_sidebar}>
        <div className={sidebarStyles.bl_sidebar}>
          <p>On this page ···</p>
          <ul className={sidebarStyles.ly_table}>
            <TableMDX source={post.content} />
          </ul>
        </div>
      </div>
      <div className={layoutStyles.ly_content}>
        <div className={layoutStyles.bl_content}>
          <div className={contentStyles.card}>
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
