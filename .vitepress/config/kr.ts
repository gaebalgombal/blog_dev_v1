import { defineConfig, type DefaultTheme } from "vitepress";

export const kr = defineConfig({
  themeConfig: {
    nav: [
      { text: "Home", link: "/kr/" },
      { text: "Resume", link: "/kr/resume/index" },
      { text: "Portfolio", link: "/kr/portfolio/index" },
      { text: "Blog", link: "/kr/blog/index" },
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
      text: "Blog",
      items: [
        {
          text: "Retrospects",
          items: [
            {
              text: "two years as a developer",
              link: "/retrospects/two-years-as-a-developer",
            },
            {
              text: "4 months with a best team",
              link: "/retrospects/4-months-with-a-best-team",
            },
          ],
        },
        {
          text: "Projects",
          items: [
            {
              text: "implementing ci/cd",
              link: "/projects/implementing-ci/cd",
            },
            {
              text: "refactoring legacy structure",
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
