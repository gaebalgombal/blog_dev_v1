import { NAME } from "@/config/types";

const CATEGORY_LIST = [
  { en: "retrospects", kr: "회고" },
  { en: "projects", kr: "실전" },
];

const NAVBAR_LIST = {
  home: {
    en: "HOME",
    kr: "홈",
  } as NAME,
  resume: {
    en: "RESUME",
    kr: "이력서",
  } as NAME,
  portfolio: {
    en: "PORTFOLIO",
    kr: "포트폴리오",
  } as NAME,
  posts: {
    en: "POSTS",
    kr: "블로그",
  } as NAME,
  language: {
    en: "LANGUAGE",
    kr: "언어",
  } as NAME,
};

export { CATEGORY_LIST, NAVBAR_LIST };
