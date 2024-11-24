import { getPostList } from "@/lib/posts";
import { PostProps, PostPackage } from "@/config/types";

export const getPostParams = async ({}: PostProps) => {
    // Fetch or define the data for your dynamic paths
    // Fetch or define the data for your dynamic paths
    const { postPackageList: enPackageList } = await getPostList("en", "**");
    const { postPackageList: krPackageList } = await getPostList("en", "**");

    const params = [];

    for (const enPackage of enPackageList) {
        for (const post of enPackage.postList) {
            params.push({
                lang: "en",
                category: enPackage.category,
                slug: post.title,
            });
        }
    }

    for (const krPackage of krPackageList) {
        for (const post of krPackage.postList) {
            params.push({
                lang: "kr",
                category: krPackage.category,
                slug: post.title,
            });
        }
    }

    // Map over the data to create static params
    return params;
};

export const getCategoryParams = async () => {
    // Fetch or define the data for your dynamic paths
    const { postPackageList: enPackageList } = await getPostList("en", "**");
    const { postPackageList: krPackageList } = await getPostList("en", "**");

    const params = [];

    for (const enPackage of enPackageList) {
        params.push({
            lang: "en",
            category: enPackage.category,
        });
    }

    for (const krPackage of krPackageList) {
        params.push({
            lang: "kr",
            category: krPackage.category,
        });
    }

    // Map over the data to create static params
    return params;
};
