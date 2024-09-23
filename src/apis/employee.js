import httpInstance from "@/util/http";
// 分页获取用户数据API
export const getEmployeelistAPI = (params) => {
  return httpInstance({
    method: "get",
    url: "/admin/employee/page",
    params,
  });
};
// 新增用户API
export const addEmployeeAPI = (user) => {
  return httpInstance({
    method: "post",
    url: "/admin/employee/add",
    data: user,
  });
};
// 删除员工API
export const deleteEmployeeAPI = (id) => {
  return httpInstance({
    method: "delete",
    url: `/admin/employee/delete/${id}`,
  });
};
// 更新员工状态API
export const updateEmployeeStatus = (id, status) => {
  return httpInstance({
    method: "put",
    url: "/admin/employee/update/status",
    params: {
      id,
      status,
    },
  });
};
// 更新员工权限API
export const updateEmployeeAuthority = (id, authority) => {
  return httpInstance({
    method: "put",
    url: "/admin/employee/update/authority",
    params: {
      id,
      authority,
    },
  });
};
// 员工登录
export const employeeLoginAPI = (data) => {
  return httpInstance({
    method: "post",
    url: "/admin/employee/login",
    data,
  });
};
// 根据id获取员工信息api
export const getEmployeeByIdAPI = (id) => {
  return httpInstance({
    method: "get",
    url: `/admin/employee/query/${id}`,
  });
};
// 修改员工信息api
export const updateEmployeeAPI = (data) => {
  return httpInstance({
    method: "put",
    url: "/admin/employee/update",
    data,
  });
};
