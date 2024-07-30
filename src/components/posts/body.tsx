import styles from "@/app/styles/page.module.css";
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
    <main className={styles.main}>
      <MDXRemote
        source={post.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkBreaks],
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: { dark: "github-dark-dimmed", light: "github-light" },
                },
              ],
              rehypeSlug,
            ],
          },
        }}
      />
    </main>
  );
};
