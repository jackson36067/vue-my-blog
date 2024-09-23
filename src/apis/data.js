import httpInstance from "@/util/http";
export const getEmployeeDataAPI = () => {
  return httpInstance({
    method: "get",
    url: "/admin/data/employee",
  });
};
export const getArticleDataAPI = () => {
  return httpInstance({
    method: "get",
    url: "/admin/data/article",
  });
};
export const getUserDataAPI = () => {
  return httpInstance({
    method: "get",
    url: "/admin/data/user",
  });
};
