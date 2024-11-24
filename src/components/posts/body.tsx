import layoutStyles from "@/styles/layout.module.css";
import contentStyles from "@/styles/content.module.css";
import sidebarStyles from "@/styles/sidebar.module.css";
import "highlight.js/styles/obsidian.css";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { getPostDetail } from "@/lib/posts";
import { PostProps } from "@/config/types";
import { TableMDX, ContentMDX } from "@/lib/mdx";
import { Alert } from "@/components/template/alert";
import { notFound } from "next/navigation";

export const PostBody = async ({
    params: { lang, category, slug },
}: PostProps) => {
    const post = await getPostDetail({ lang, category, slug });

    if (!post) {
        notFound();
        // return (
        //     <Alert
        //         params={{
        //             message: "존재하지 않는 글입니다.",
        //             link: `/${lang}/posts`,
        //         }}
        //     />
        // );
    }

    const whatIsThisPage = (lang: string) => {
        if (lang === "en") return "ON THIS PAGE ···";
        if (lang === "kr") return "··· 목차 ···";

        return "On this page ···";
    };

    const backToList = (lang: string) => {
        if (lang === "en") return " BACK TO LIST  ＞＞＞";
        if (lang === "kr") return "··· 목록으로 ＞＞＞";

        return "On this page ···";
    };

    return (
        <div className={layoutStyles.ly_main}>
            <div className={layoutStyles.ly_sidebar}>
                <div className={sidebarStyles.bl_sidebar}>
                    <p className={sidebarStyles.p_top}>
                        {whatIsThisPage(lang)}
                    </p>
                    <ul className={sidebarStyles.ly_table}>
                        <TableMDX source={post.content} />
                    </ul>
                    <p className={sidebarStyles.p_bottom}>
                        <a href={`/${lang}/posts/${post.category}`}>
                            {backToList(lang)}
                        </a>
                    </p>
                </div>
            </div>
            <div className={layoutStyles.ly_content}>
                <div className={contentStyles.bl_content}>
                    <div className={contentStyles.full}>
                        <ContentMDX
                            source={post.content}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm, remarkBreaks],
                                    rehypePlugins: [
                                        [rehypeHighlight],
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
