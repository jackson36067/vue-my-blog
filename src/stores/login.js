import { defineStore } from "pinia";
import { employeeLoginAPI } from "@/apis/employee";
import { ref } from "vue";
export const useLoginStore = defineStore(
  "user",
  () => {
    const userInfo = ref({});
    const doEmployeeLogin = async ({ username, password }) => {
      const res = await employeeLoginAPI({ username, password });
      userInfo.value = res.data.data;
    };
    const clearLoginData = () => {
      userInfo.value = {};
    };
    return { userInfo, doEmployeeLogin, clearLoginData };
  },
  {
    persist: true,
  }
);
