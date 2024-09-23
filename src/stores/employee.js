import { defineStore } from "pinia";
import { getEmployeeByIdAPI } from "@/apis/employee";
import { ref } from "vue";
export const useEmployeeStore = defineStore(
  "employee",
  () => {
    const employee = ref({});
    const doStoreEmployee = async (id) => {
      const res = await getEmployeeByIdAPI(id);
      employee.value = res.data.data;
    };
    return { employee, doStoreEmployee };
  },
  {
    persist: true,
  }
);
