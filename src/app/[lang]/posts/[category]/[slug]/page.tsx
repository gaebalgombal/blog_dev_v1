import { PostBody } from "@/components/posts/body";
import { PostParams, PostProps } from "@/config/types";
import { Navbar } from "@/components/template/navbar";
import { getPostParams } from "@/components/posts/static";

export const generateStaticParams = getPostParams;

const Page = async ({ params: { lang, category, slug } }: PostProps) => {
    const params = { lang, category, slug } as PostParams;

    return (
        <div>
            <Navbar params={{ lang }} />
            <PostBody params={params} />
        </div>
    );
};

export default Page;
