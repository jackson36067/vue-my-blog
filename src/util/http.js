import axios from "axios";
import { useLoginStore } from "@/stores/login";
import router from "@/router";
import { ElMessage } from "element-plus";
const httpInstance = axios.create({
  // 配置接口的基地址
  baseURL: "http://localhost:8080",
  // 配置接口的过期时间(ms)
  timeout: 5000,
});
// 添加请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    // 获取到登录后返回到数据
    const loginStore = useLoginStore();
    // 获取token
    const token = loginStore.userInfo.token;
    // 给每次请求的请求头中添加token
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器;
httpInstance.interceptors.response.use(
  (result) => {
    return result;
  },
  (error) => {
    // console.log(error);
    // token过去,退回到登录页,并且清除localstorage中存储的用户数据
    if (error.response.status === 401) {
      const loginStore = useLoginStore();
      loginStore.clearLoginData();
      router.push("/login");
    }
    // 同意错误提示
    const errorMsg = error.response.data.msg || "请求失败";
    ElMessage({ type: "warning", message: errorMsg });
    return Promise.reject(error);
  }
);
export default httpInstance;
