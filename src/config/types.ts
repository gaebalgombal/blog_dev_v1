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
    category: string;
    description: string;

    date: Date;
    dateString: string;

    desc: string;
    url: string;

    content: string;
}

interface PostPackage {
    category: string;
    categoryString: string;
    postList: Post[];
}

interface Word {
    en: string;
    kr: string;
}

interface Navigation {
    home: Word;
    resume: Word;
    portfolio: Word;
    posts: Word;
    language: Word;
}

interface CatergoryList {
    retrospects: Word;
    projects: Word;
}

export type {
    PostParams,
    PostProps,
    Post,
    PostPackage,
    Word,
    Navigation,
    CatergoryList,
};
