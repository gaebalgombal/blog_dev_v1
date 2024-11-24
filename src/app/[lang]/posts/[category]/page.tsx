import layoutStyles from "@/styles/layout.module.css";

import { PostList } from "@/components/posts/list";
import { Navbar } from "@/components/template/navbar";
import { getCategoryParams } from "@/components/posts/static";

import { PostParams, PostProps } from "@/config/types";

export const generateStaticParams = getCategoryParams;

const Page = async ({ params: { lang, category, slug } }: PostProps) => {
    const params = { lang, category, slug: "**" } as PostParams;

    return (
        <div className={layoutStyles.wrapper}>
            <Navbar params={{ lang }} />
            <PostList params={params} />
        </div>
    );
};

export default Page;
