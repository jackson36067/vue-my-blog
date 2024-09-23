import httpInstance from "../util/http";
export const getUserPage = (params) => {
  return httpInstance({
    url: "/admin/user/page",
    params,
  });
};
