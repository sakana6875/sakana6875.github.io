import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "首页",
    icon: "house",
    link: "/",
  }, 

  {
    text: "学习记录",
    icon: "book",
    prefix: "/category/",
    children: [
      { text: "没想好写啥1", link: "1"},
      { text: "没想好写啥2", link: "2"},
    ],
  },

  {
    text: "生活分享",
    icon: "heart",
    prefix: "/category/",
    children: [
      { text: "没想好写啥3", link: "3"},
      { text: "没想好写啥4", link: "4"},
    ]
  }

]);
