import { Post, Category } from "@/config/types";
import { getPostDetail, getPostList } from "@/lib/posts";
import { PostParams, PostProps } from "@/config/types";
import { Metadata } from "next";

const getPostMetaData = async (params: PostParams): Promise<Metadata> => {
  const post = await getPostDetail(params);

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      description: post.desc,
      url: post.url,
      images: [],
      locale: post.lang ? "en-/us" : "ko-KR",
    },
  };
};

const getCategoryMetaData = (category: Category, lang: string) => {
  const title = category || "all";

  return {
    title: title,
    openGraph: {
      title: title,
      images: [],
      locale: lang ? "en-/us" : "ko-KR",
    },
  };
};

export { getPostMetaData, getCategoryMetaData };
