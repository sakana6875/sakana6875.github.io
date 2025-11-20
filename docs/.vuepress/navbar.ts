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
    link: "/category/study/",
  },

  {
    text: "生活分享",
    icon: "heart",
    link: "/category/life/",
  }

]);
