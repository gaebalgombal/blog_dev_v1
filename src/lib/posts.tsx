import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { sync } from "glob";
import dayjs from "dayjs";
import {
  Post,
  PostParams,
  PostPackage,
  Word,
  CatergoryList,
} from "@/config/types";
import { CATEGORY_LIST } from "@/config/const";

const BASE_PATH = "/src/resources";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

const ifPostFileExists = (postPath: string) => {
  return fs.existsSync(postPath)
}

const parsePostFile = async (postPath: string) => {
    const file = fs.readFileSync(postPath, "utf8");    
    const { data, content } = matter(file);
    
    return { data, content };
};

const parsePostPath = (postPath: string) => {
  const path = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, "")
    .replace(`en/posts/`, "")
    .replace(`kr/posts/`, "")
    .replace(".mdx", "");

  const url = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, "")
    .replace(`.mdx`, "");

  const [category, slug] = path.split("/");

  return { category, slug, url };
};

const parsePost = async (postPath: string) => {
  const { data, content } = await parsePostFile(postPath);
  const { category, slug, url } = parsePostPath(postPath);
  const dateString = dayjs(data.date).locale("ko").format("YYYY년 MM월 DD일");

  const post = { ...data, content, category, slug, dateString, url } as Post;

  return post;
};

const aggregatePostPaths = (lang: string, category: string) => {
  const folder = category || "**";
  const postPaths: string[] = sync(
    `${POSTS_PATH}/${lang}/posts/${folder}/*.mdx`
  );

  return postPaths;
};

const sortByDate = (postList: Post[]) => {
  return postList.sort((a: Post, b: Post) => (a.date > b.date ? -1 : 1));
};

const arrangeByCategory = (postList: Post[], lang: string) => {
  const reduced = postList.reduce<PostPackage[]>(
    (acc: PostPackage[], cur: Post) => {
      const categoryString =
        CATEGORY_LIST?.[cur.category as keyof CatergoryList]?.[
          lang as keyof Word
        ];

      const curIndex = acc.findIndex((v) => v.category === cur.category);

      if (curIndex < 0) {
        acc.push({
          category: cur.category,
          categoryString: categoryString,
          postList: [cur],
        });
      } else {
        acc[curIndex].postList.push(cur);
      }

      return acc;
    },
    []
  );

  return reduced;
};

const getPostList = async (lang: string, category: string) => {
  const postPaths = aggregatePostPaths(lang, category);
  const postList = await Promise.all(
    postPaths.map((postPath) => parsePost(postPath))
  );

  const sorted = sortByDate(postList);
  const arranged = arrangeByCategory(sorted, lang);

  return { postList: sorted, postPackageList: arranged };
};

const getPostDetail = async (params: PostParams) => {
  const filePath = `${POSTS_PATH}/${params.lang}/posts/${params.category}/${params.slug}.mdx`;
  
  if (!ifPostFileExists(filePath)) { 
    return false;
  }
  const detail = await parsePost(filePath);

  return detail;
};

export { getPostList, getPostDetail };
