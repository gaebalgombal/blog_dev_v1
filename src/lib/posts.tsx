import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { sync } from "glob";
import dayjs from "dayjs";
import { Post, PostParams, Category } from "@/config/types";
import { CATEGORY_LIST } from "@/config/const";

const BASE_PATH = "/src/resources";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

const parsePostFile = (postPath: string) => {
  const file = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(file);

  return { data, content };
};

const parsePostPath = (postPath: string) => {
  const path = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, "")
    .replace(".mdx", "");

  const [category, slug] = path.split("/");

  return { category, slug };
};

const parsePost = async (postPath: string) => {
  const { data, content } = parsePostFile(postPath);
  const { category, slug } = parsePostPath(postPath);
  const dateString = dayjs(data.date).locale("ko").format("YYYY년 MM월 DD일");

  const post = { ...data, content, category, slug, dateString } as Post;
  return post;
};

const aggregatePostPaths = (lang: string, category: string) => {
  const folder = category || "**";
  const postPaths: string[] = sync(
    `${POSTS_PATH}/${lang}/posts/${folder}/*.mdx`
  );

  return postPaths;
};

const sortList = (postList: Post[]) => {
  return postList.sort((a: Post, b: Post) => (a.date > b.date ? -1 : 1));
};

const getCategoryList = (lang: string) => {
  return CATEGORY_LIST.map(
    (category: Category) => category[lang as keyof Category]
  );
};

const getPostList = async (lang: string, category: string) => {
  const postPaths = aggregatePostPaths(lang, category);
  const postList = await Promise.all(
    postPaths.map((postPath) => parsePost(postPath))
  );

  const sortedList = sortList(postList);
  return sortedList;
};

const getPostDetail = async (params: PostParams) => {
  const filePath = `${POSTS_PATH}/${params.lang}/posts/${params.category}/${params.slug}.mdx`;
  const detail = await parsePost(filePath);

  return detail;
};

export { getPostList, getPostDetail, getCategoryList };
