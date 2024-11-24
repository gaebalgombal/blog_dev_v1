import { Navigation, CatergoryList } from "@/config/types";

const NAVBAR_LIST: Navigation = {
    home: {
        en: "HOME",
        kr: "홈",
    },
    resume: {
        en: "RESUME",
        kr: "이력서",
    },
    portfolio: {
        en: "PORTFOLIO",
        kr: "포트폴리오",
    },
    posts: {
        en: "POSTS",
        kr: "블로그",
    },
    language: {
        en: "LANGUAGE",
        kr: "언어",
    },
};

const CATEGORY_LIST: CatergoryList = {
    retrospects: {
        en: "retrospects",
        kr: "회고",
    },
    projects: {
        en: "projects",
        kr: "프로젝트",
    },
};

export { NAVBAR_LIST, CATEGORY_LIST };
