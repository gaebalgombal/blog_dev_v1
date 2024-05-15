import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export const shared = defineConfig({
  title: "HWI's dev blog",

  themeConfig: {
    langMenuLabel: "언어",
    socialLinks: [{ icon: "github", link: "https://github.com/gaebalgombal" }],
    i18nRouting: true,
  },
});
