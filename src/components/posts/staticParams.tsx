import { getPostDetail, getPostList, getCategoryList } from "@/lib/posts";
import { Post } from "@/config/types";

export const getPostParams = async (lang: string) => {
  const paramsList: Post[] = await getPostList(lang, "**");
  return paramsList;
};

// export const getCategoryParams = async (lang: string) => {
//   const categoryList: string[] = getCategoryList(lang);
//   return categoryList;
// };
