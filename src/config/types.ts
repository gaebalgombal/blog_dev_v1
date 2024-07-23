interface PostParams {
  category: string;
  slug: string;
  lang: string;
}

interface PostProps {
  params: PostParams;
}

interface Post extends PostParams {
  title: string;
  date: Date;
  dateString: string;
  desc: string;
  url: string;
  content: string;
}

interface Category {
  en: string;
  kr: string;
}

export type { PostParams, PostProps, Post, Category };
