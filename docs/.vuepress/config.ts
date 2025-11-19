import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "摸鱼博客",
  description: "MiaoBolo 的摸鱼博客",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
