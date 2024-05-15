import { defineConfig, type DefaultTheme } from "vitepress";

export const en = defineConfig({
  themeConfig: {
    nav: [
      { text: "Home", link: "/en/" },
      { text: "Resume", link: "/en/resume/index" },
      { text: "Portfolio", link: "/en/portfolio/index" },
      { text: "Blog", link: "/en/blog/index" },
    ],

    sidebar: {
      "/en/resume/": { base: "/en/resume", items: sidebarResume() },
      "/en/portfolio/": { base: "/en/portfolio", items: sidebarPortfolio() },
      "/en/blog/": { base: "/en/blog", items: sidebarBlog() },
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
              link: "/projects/implementing-cicd",
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
