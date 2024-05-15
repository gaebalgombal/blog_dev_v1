import { defineConfig } from "vitepress";
import { en } from "./en";
import { kr } from "./kr";
import { shared } from "./shared";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...shared,
  lang: "en",

  locales: {
    en: {
      label: "English",
      ...en,
    },
    kr: {
      label: "한국어",
      ...kr,
    },
  },
});
