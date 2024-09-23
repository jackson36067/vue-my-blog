<script setup>
import { getArticlePage } from "@/apis/article";
import router from "@/router";
import { onMounted, ref } from "vue";

const size = ref([5, 10, 20]);

const total = ref(0);
const articleInfo = ref({
  title: "",
  page: 1,
  pageSize: 10,
});
const reportArticle = () => {
  router.push("/report/article");
};
const articleList = ref([]);
const getArticle = async ({ title, page = 1, pageSize = 10 }) => {
  const res = await getArticlePage({ title, page, pageSize });
  res.data.data.rows.forEach((article) => {
    const localDateTimeObject = new Date(article.updateTime);
    const formattedDate = localDateTimeObject.toLocaleString();
    article.updateTime = formattedDate;
  });
  articleList.value = res.data.data.rows;
  total.value = res.data.data.rows.length;
};
onMounted(() => {
  const { title, page, pageSize } = articleInfo.value;
  getArticle({ title, page, pageSize });
});
// 根据名字获取匹配的用户
const pageingWithTitle = async () => {
  const { title, page, pageSize } = articleInfo.value;
  getArticle({ title, page, pageSize });
};

// 分页展示
const sizeChange = (pageSize) => {
  articleInfo.value.pageSize = pageSize;
};

const pageChange = (currentPage) => {
  articleInfo.value.page = currentPage;
};

// 当分页大小发生变化执行该函数
const handleSizeChaneg = (pageSize) => {
  console.log(pageSize);
  const { title, page } = articleInfo.value;
  getArticle({ title, page, pageSize });
};

// 当分页页码发生变化执行该函数
const handleCurrentChange = (currentPage) => {
  const { title, pageSize } = articleInfo.value;
  getArticle({ title, currentPage, pageSize });
};
</script>
<template>
  <div class="main">
    <div class="header">
      <div class="left">
        <span>文章标题:</span>
        <el-input
          v-model="articleInfo.title"
          style="width: 240px; margin-right: 20px"
          placeholder="请输入文章标题"
        />
        <el-button type="primary" @click="pageingWithTitle">查找</el-button>
      </div>
      <div class="right">
        <el-button type="warning" @click="reportArticle"
          >管理举报文章</el-button
        >
      </div>
    </div>
    <div style="margin: 150px 0 40px 40px">
      <el-table :data="articleList" style="width: 100%; height: 500px">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          property="title"
          label="标题"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column
          property="text"
          label="内容"
          width="240"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          property="username"
          label="作者"
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
        :current-page="articleInfo.page"
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
  float: left;
  margin: 40px 0 0 20px;
}
.header .right {
  float: right;
  margin: 40px 20px 0 0;
}
.left span {
  margin: 0 20px;
}
</style>
