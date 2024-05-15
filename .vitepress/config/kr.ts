import { defineConfig, type DefaultTheme } from "vitepress";

export const kr = defineConfig({
  themeConfig: {
    nav: [
      { text: "Home", link: "/kr/" },
      { text: "이력서", link: "/kr/resume/index" },
      { text: "포트폴리오", link: "/kr/portfolio/index" },
      { text: "블로그", link: "/kr/blog/index" },
    ],

    sidebar: {
      "/kr/resume/": { base: "/kr/resume", items: sidebarResume() },
      "/kr/portfolio/": { base: "/kr/portfolio", items: sidebarPortfolio() },
      "/kr/blog/": { base: "/kr/blog", items: sidebarBlog() },
    },
  },
});

function sidebarBlog(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "블로그",
      items: [
        {
          text: "회고",
          items: [
            {
              text: "개발자 2년 회고",
              link: "/retrospects/two-years-as-a-developer",
            },
            {
              text: "프로젝트 4개월 회고",
              link: "/retrospects/4-months-with-a-best-team",
            },
          ],
        },
        {
          text: "프로젝트",
          items: [
            {
              text: "CI/CD 구현",
              link: "/projects/implementing-ci/cd",
            },
            {
              text: "레거시 구조 리팩토링",
              link: "/projects/refactoring-legacy-structure",
            },
          ],
        },
      ],
    },
  ];
}

function sidebarResume(): DefaultTheme.SidebarItem[] {
  return [{ text: "Resume" }];
}

function sidebarPortfolio(): DefaultTheme.SidebarItem[] {
  return [{ text: "Portfolio" }];
}
