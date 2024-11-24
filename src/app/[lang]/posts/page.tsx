import { PostList } from "@/components/posts/list";
import { PostProps, PostParams } from "@/config/types";
import { Navbar } from "@/components/template/navbar";

export async function generateStaticParams() {
    // Fetch or define the data for your dynamic paths
    const pages = [{ lang: "en" }, { lang: "kr" }];

    // Map over the data to create static params
    return pages.map((page) => ({
        lang: page.lang,
    }));
}

const Page = async ({ params: { lang } }: PostProps) => {
    const params = { lang, category: "**", slug: "**" } as PostParams;

    return (
        <div>
            <Navbar params={{ lang }} />
            <PostList params={params} />
        </div>
    );
};

export default Page;
