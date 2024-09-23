<script setup>
import router from "@/router";
import { onMounted, ref } from "vue";
import { getPagingReportArticleAPI, isViolation } from "@/apis/article";
const size = ref([5, 10, 20]);

const total = ref(0);
const artilceReportInfo = ref({
  title: "",
  page: 1,
  pageSize: 10,
});
const toArticle = () => {
  router.push("/article");
};
// 获取被举报文章的列表
const violationArticleList = ref([]);
const getPagingReportArticle = async ({ title, page = 1, pageSize = 10 }) => {
  const res = await getPagingReportArticleAPI({ title, page, pageSize });
  res.data.data.rows.forEach((article) => {
    const localDateTimeObject = new Date(article.updateTime);
    const formattedDate = localDateTimeObject.toLocaleString();
    article.updateTime = formattedDate;
  });
  violationArticleList.value = res.data.data.rows;
  total.value = res.data.data.rows.length;
};
onMounted(() => {
  const { title, page, pageSize } = violationArticleList.value;
  getPagingReportArticle({ title, page, pageSize });
});
const pagingWithTitle = () => {
  const { title, page, pageSize } = violationArticleList.value;
  getPagingReportArticle({ title, page, pageSize });
};

// 分页展示
const sizeChange = (pageSize) => {
  artilceReportInfo.value.pageSize = pageSize;
};

const pageChange = (currentPage) => {
  artilceReportInfo.value.page = currentPage;
};

// 当分页大小发生变化执行该函数
const handleSizeChaneg = (pageSize) => {
  console.log(pageSize);
  const { title, page } = artilceReportInfo.value;
  getPagingReportArticle({ title, page, pageSize });
};

// 当分页页码发生变化执行该函数
const handleCurrentChange = (currentPage) => {
  const { title, pageSize } = artilceReportInfo.value;
  getPagingReportArticle({ title, currentPage, pageSize });
};
// 未违规
const unViolation = async (row) => {
  await isViolation(false, row.title, row.username);
  const { title, page, pageSize } = violationArticleList.value;
  // 这里还要重新获取被举报文章的信息
  getPagingReportArticle({ title, page, pageSize });
};
</script>
<template>
  <div class="main">
    <div class="nav">
      <span
        style="
          color: #929394;
          padding: 0 20px;
          border-right: 1px solid #929394;
          cursor: pointer;
        "
        @click="toArticle"
      >
        返回
      </span>
      <span style="font-weight: 700; padding-left: 20px">管理举报文章</span>
    </div>
    <div class="report">
      <div class="header">
        <div class="left">
          <span>文章标题:</span>
          <el-input
            v-model="artilceReportInfo.title"
            style="width: 240px; margin-right: 20px"
            placeholder="请输入被举报的文章标题"
          />
          <el-button type="primary" @click="pagingWithTitle">查找</el-button>
        </div>
      </div>
      <div style="margin: 100px 0 40px 40px">
        <el-table
          :data="violationArticleList"
          style="width: 100%; height: 500px"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            property="username"
            label="举报用户名"
            width="200"
            align="center"
          >
          </el-table-column>
          <el-table-column
            property="reportUsername"
            label="作者"
            width="140"
            align="center"
          />
          <el-table-column property="title" label="标题" width="100">
          </el-table-column>
          <el-table-column
            property="reportReason"
            label="举报原因"
            width="200"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column label="操作" width="200" align="center">
            <template #default="{ row }">
              <el-link
                target="_blank"
                @click="unViolation(row)"
                style="margin-right: 10px"
                >未违规</el-link
              >
              <el-link type="danger" @click="violation(row)">违规</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page" style="margin-left: 500px">
        <el-pagination
          :page-sizes="size"
          layout="total,sizes, prev, pager, next"
          :total="total"
          :current-page="artilceReportInfo.page"
          @size-change="sizeChange"
          @current-change="pageChange"
          @update:page-size="handleSizeChaneg"
          @upate:current-change="handleCurrentChange"
        />
      </div>
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
  margin-top: 60px;
  background-color: #eaf2fd;
}
.report {
  margin-top: 50px;
  overflow: hidden;
  height: 750px;
  background-color: #fff;
}
.header {
  margin-bottom: 60px;
}
.header .left {
  margin: 40px 0 0 20px;
}
.left span {
  margin: 0 20px;
}
</style>
