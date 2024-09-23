import { createRouter, createWebHistory } from "vue-router";
import layout from "@/views/layout/index.vue";
import data from "@/views/data/index.vue";
import user from "@/views/user/index.vue";
import login from "@/views/login/index.vue";
import article from "@/views/article/index.vue";
import reportArticle from "@/views/article/component/report.vue";
import addUserDialog from "@/views/user/component/addDialog.vue";
import updateUserDialog from "@/views/user/component/updateDialog.vue";
import employee from "@/views/employee/index.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: layout,
      children: [
        {
          path: "",
          component: data,
        },
        {
          path: "user",
          component: user,
        },
        {
          path: "add/user",
          component: addUserDialog,
        },
        {
          path: "article",
          component: article,
        },
        {
          path: "report/article",
          component: reportArticle,
        },
        {
          path: "employee",
          component: employee,
        },
        {
          path: "update/user",
          component: updateUserDialog,
        },
      ],
    },
    {
      path: "/login",
      component: login,
    },
  ],
});

export default router;
