<script setup>
import { getUserPage } from "@/apis/user";
import { onMounted, ref } from "vue";

const size = ref([5, 10, 20]);

const total = ref(0);
const userInfo = ref({
  username: "",
  page: 1,
  pageSize: 10,
});
const userList = ref([]);
const getUserList = async ({ username, page = 1, pageSize = 10 }) => {
  const res = await getUserPage({ username, page, pageSize });
  res.data.data.rows.forEach((article) => {
    const localDateTimeObject = new Date(article.updateTime);
    const formattedDate = localDateTimeObject.toLocaleString();
    article.updateTime = formattedDate;
  });
  userList.value = res.data.data.rows;
  total.value = res.data.data.rows.length;
};
onMounted(() => {
  const { username, page, pageSize } = userInfo.value;
  getUserList({ username, page, pageSize });
});
const pagingWithUsername = () => {
  const { username, page, pageSize } = userInfo.value;
  getUserList({ username, page, pageSize });
};

// 分页展示
const sizeChange = (pageSize) => {
  userInfo.value.pageSize = pageSize;
};

const pageChange = (currentPage) => {
  userInfo.value.page = currentPage;
};

// 当分页大小发生变化执行该函数
const handleSizeChaneg = (pageSize) => {
  console.log(pageSize);
  const { username, page } = userInfo.value;
  getUserList({ username, page, pageSize });
};

// 当分页页码发生变化执行该函数
const handleCurrentChange = (currentPage) => {
  const { username, pageSize } = userInfo.value;
  getUserList({ username, currentPage, pageSize });
};
</script>
<template>
  <div class="main">
    <div class="header">
      <div class="left">
        <span>用户名:</span>
        <el-input
          v-model="userInfo.username"
          style="width: 240px; margin-right: 20px"
          placeholder="请输入用户名"
        />
        <el-button type="primary" @click="pagingWithUsername">查找</el-button>
      </div>
    </div>
    <div style="margin: 100px 0 40px 40px">
      <el-table :data="userList" style="width: 100%; height: 500px">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          property="username"
          label="用户名"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column
          property="email"
          label="邮箱"
          width="240"
          align="center"
        />
        <el-table-column
          highlight-current-row="true"
          property="articleCount"
          label="发布文章数量"
          width="240"
          align="center"
        />
        <el-table-column
          property="updateTime"
          label="最后操作时间"
          width="240"
          align="center"
        />
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
<style scoped>
.main {
  position: fixed;
  top: 50px;
  left: 300px;
  width: 1370px;
  height: 800px;
  background-color: #fff;
  margin-top: 80px;
}
.header .left {
  margin: 40px 0 0 20px;
}
.left span {
  margin: 0 20px;
}
</style>
