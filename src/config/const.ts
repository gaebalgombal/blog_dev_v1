import { Navigation } from "@/config/types";

const CATEGORY_LIST = [
  { en: "retrospects", kr: "회고" },
  { en: "projects", kr: "실전" },
];

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

export { CATEGORY_LIST, NAVBAR_LIST };
