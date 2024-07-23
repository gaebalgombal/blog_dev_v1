import styles from "@/app/page.module.css";
import { PostBody } from "@/components/posts/body";
import { getPostParams } from "@/components/posts/staticParams";
import { getPostMetaData } from "@/components/posts/metaData";
import { PostParams, PostProps } from "@/config/types";
import { Metadata } from "next";

const generateMetadata = async ({
  params: { category, slug },
}: PostProps): Promise<Metadata> => {
  const params = { lang: "en", category, slug } as PostParams;
  return getPostMetaData({ lang: "en", category, slug });
};

const generateStaticParams = async ({
  params: { category, slug },
}: PostProps) => {
  return getPostParams("en");
};

const Page = async ({ params: { category, slug } }: PostProps) => {
  const params = { lang: "en", category, slug } as PostParams;
  return <PostBody params={params} />;
};

export { generateMetadata, generateStaticParams };

export default Page;
