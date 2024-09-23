import httpInstance from "../util/http.js";
// 判断是否违规
export const isViolation = (isViolation, title, username) => {
  return httpInstance({
    method: "post",
    url: "/admin/article/isViolation",
    params: {
      isViolation,
      title,
      username,
    },
  });
};
export const getArticlePage = (params) => {
  return httpInstance({
    url: "/admin/article/page",
    params,
  });
};
export const getPagingReportArticleAPI = (params) => {
  return httpInstance({
    method: "get",
    url: "/admin/article/report",
    params,
  });
};
