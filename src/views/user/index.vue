<script setup>
import { ref, onMounted } from "vue";
import {
  updateEmployeeStatus,
  deleteEmployeeAPI,
  getEmployeelistAPI,
  updateEmployeeAuthority,
} from "@/apis/employee";
// 手动引入ElMesssageBox样式
import "element-plus/theme-chalk/el-message-box.css";
import { ElMessage, ElMessageBox } from "element-plus";
import { useEmployeeStore } from "@/stores/employee";
import router from "@/router";
const userList = ref([]);
const total = ref(0);
const userInfo = ref({
  name: "",
  page: 1,
  pageSize: 10,
});
// 初始分页展示所有员工
const getUserList = async ({ name, page = 1, pageSize = 10 }) => {
  const res = await getEmployeelistAPI({ name, page, pageSize });
  res.data.data.rows.forEach((user) => {
    const localDateTimeObject = new Date(user.updateTime);
    const formattedDate = localDateTimeObject.toLocaleString();
    user.updateTime = formattedDate;
  });
  userList.value = res.data.data.rows;
  total.value = res.data.data.rows.length;
};
onMounted(() => {
  const { name, page, pageSize } = userInfo.value;
  getUserList({ name, page, pageSize });
});

// 根据名字获取匹配的用户
const pageingWithName = async () => {
  const { name, page, pageSize } = userInfo.value;
  getUserList({ name, page, pageSize });
};

// 删除员工
const handleDelete = async (row) => {
  // 弹出确认框
  ElMessageBox.confirm(`确定删除员工 ${row.username} 吗？`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    customClass: "custom-overlay", // 添加自定义的背景遮罩样式类
  })
    .then(() => {
      // 当用户点击"确定"时，执行删除
      confirmDelete(row);
    })
    .catch(() => {
      // 用户取消操作
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};
const confirmDelete = async (row) => {
  // 删除该员工
  await deleteEmployeeAPI(row.id);
  // 重新获取员工信息
  const { name, page, pageSize } = userInfo.value;
  getUserList({ name, page, pageSize });
  ElMessage({
    type: "success",
    message: "删除员工成功",
  });
};

// 修改员工账号状态
const handleEmployeeStatus = async (row) => {
  if (row.status === "1") {
    // 弹出确认框
    ElMessageBox.confirm(`确定禁用员工 ${row.username} 吗？`, "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      customClass: "custom-overlay", // 添加自定义的背景遮罩样式类
    })
      .then(() => {
        row.status = 0;
        // 当用户点击"确定"时，执行删除
        confirmUpdateStatus(row);
      })
      .catch(() => {
        // 用户取消操作
        ElMessage({
          type: "info",
          message: "已取消禁用",
        });
      });
  } else {
    // 弹出确认框
    ElMessageBox.confirm(`确定启用员工 ${row.username} 吗？`, "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      customClass: "custom-overlay", // 添加自定义的背景遮罩样式类
    })
      .then(() => {
        row.status = 1;
        // 当用户点击"确定"时，执行删除
        confirmUpdateStatus(row);
      })
      .catch(() => {
        // 用户取消操作
        ElMessage({
          type: "info",
          message: "已取消启用",
        });
      });
  }
};
const confirmUpdateStatus = async (row) => {
  await updateEmployeeStatus(row.id, row.status);
  ElMessage({ type: "success", message: "修改员工账号状态成功" });
};

// 修改员工账号权限
const handleEmployeeAuthority = async (row) => {
  row.authority = row.authority === "1" ? "0" : "1";
  await updateEmployeeAuthority(row.id, row.authority);
  ElMessage({ type: "success", message: "修改员工权限成功" });
};

// 分页展示
const size = ref([5, 10, 20]);
const sizeChange = (pageSize) => {
  userInfo.value.pageSize = pageSize;
};

const pageChange = (currentPage) => {
  userInfo.value.page = currentPage;
};

// 当分页大小发生变化执行该函数
const handleSizeChaneg = (pageSize) => {
  console.log(pageSize);
  const { name, page } = userInfo.value;
  getUserList({ name, page, pageSize });
};

// 当分页页码发生变化执行该函数
const handleCurrentChange = (currentPage) => {
  const { name, pageSize } = userInfo.value;
  getUserList({ name, currentPage, pageSize });
};

// 修改员工
const employeeStore = useEmployeeStore();
const updateEmployee = async (row) => {
  // 跳转到修改页面
  router.push("/update/user");
  // 将员工信息保存到pinia中
  employeeStore.doStoreEmployee(row.id);
};
</script>
<template>
  <div class="main">
    <div>
      <div class="search">
        <span style="color: #424542">员工姓名:</span>
        <el-input
          v-model="userInfo.name"
          style="width: 240px; margin-right: 20px"
          placeholder="请输入员工的姓名"
        />
        <el-button type="primary" @click="pageingWithName(name)"
          >查询</el-button
        >
      </div>
      <div class="add">
        <router-link to="add/user">
          <el-button type="warning" style="color: #424542">
            + 新增员工
          </el-button>
        </router-link>
      </div>
    </div>
    <div style="margin: 150px 0 40px 40px">
      <el-table :data="userList" style="width: 100%; height: 500px">
        <el-table-column type="selection" width="100" align="center" />
        <el-table-column
          property="name"
          label="名称"
          width="150"
          align="center"
        />
        <el-table-column
          property="username"
          label="用户名"
          width="150"
          align="center"
        />
        <el-table-column
          property="phone"
          label="手机号"
          width="150"
          align="center"
        />
        <el-table-column
          property="status"
          label="账号状态"
          width="150"
          align="center"
        >
          <template #default="scope">{{
            scope.row.status === "1" ? "启用" : "禁用"
          }}</template>
        </el-table-column>
        <el-table-column
          property="updateTime"
          label="最后操作时间"
          width="150"
          align="center"
        />
        <el-table-column
          label="操作"
          width="450"
          style="margin: 0 atuo"
          align="center"
        >
          <template #default="{ row }">
            <el-button type="danger" @click="handleDelete(row)">删除</el-button>
            <el-button type="info" @click="updateEmployee(row)"
              >修改员工</el-button
            >
            <el-button plain @click="handleEmployeeStatus(row)">
              {{ row.status === "1" ? "禁用" : "启用" }}
            </el-button>
            <el-button color="#626aef" @click="handleEmployeeAuthority(row)">
              {{ row.authority === "0" ? "设为超级管理员" : "设为普通管理员" }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page" style="margin-left: 500px">
      <el-pagination
        :page-sizes="size"
        layout="total,sizes, prev, pager, next"
        :total="total"
        :current-page="userInfo.page"
        @size-change="sizeChange"
        @current-change="pageChange"
        @update:page-size="handleSizeChaneg"
        @upate:current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<style>
.main {
  position: fixed;
  top: 50px;
  left: 300px;
  width: 1370px;
  height: 800px;
  background-color: #fff;
  margin-top: 80px;
}
.main .search {
  float: left;
  height: 30px;
  margin: 40px 0 0 20px;
}
.search span {
  margin: 0 20px;
}
.add {
  float: right;
  margin: 40px 20px 0 0;
}
/* 自定义背景透明度的类 */
.custom-overlay {
  background-color: rgba(0, 0, 0, 0.3) !important; /* 设置背景颜色透明度 */
}
</style>
