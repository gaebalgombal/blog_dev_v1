import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HWI's dev blog",
  // description: "HWI's dev blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Resume", link: "/resume/index" },
      { text: "Portfolio", link: "/portfolio/index" },
      { text: "Blog", link: "/blog/index" },
    ],

    sidebar: {
      "/blog/": [
        {
          text: "Blog",
          items: [
            {
              text: "Retrospects",
              items: [
                {
                  text: "two years as a developer",
                  link: "/blog/retrospects/two-years-as-a-developer",
                },
                {
                  text: "4 months with a best team",
                  link: "/blog/retrospects/4-months-with-a-best-team",
                },
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
