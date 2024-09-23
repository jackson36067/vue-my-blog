<script setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts";
import axios from "axios";
import { ref, onMounted, onBeforeMount } from "vue";
import {
  getEmployeeDataAPI,
  getArticleDataAPI,
  getUserDataAPI,
} from "@/apis/data";
import { useLoginStore } from "@/stores/login";
const employeeData = ref(null);
const articleData = ref(null);
const userData = ref(null);
const employeedata = ref({});
const articledata = ref({});
const userdata = ref({});
const getEmployeeData = async () => {
  const res = await getEmployeeDataAPI();
  employeedata.value = res.data.data;
};
const getArticleData = async () => {
  const res = await getArticleDataAPI();
  articledata.value = res.data.data;
};
const getUserData = async () => {
  const res = await getUserDataAPI();
  userdata.value = res.data.data;
};
onBeforeMount(() => {
  // 获取数据
  getEmployeeData();
  getArticleData();
  getUserData();
});
onMounted(() => {
  // 新增员工折线图
  const employee = echarts.init(employeeData.value); // 绘制图表
  employee.resize({
    width: 600,
    height: 300,
  });
  const option1 = {
    title: {
      text: "新增员工",
    },
    legend: {},
    tooltip: {},
    dataset: {
      // 提供一份数据。
      source: [
        // ["product", "2015", "2016", "2017"],
        ["最近半年", 200],
        ["最近一个月", 123],
        ["最近7日", 98],
        ["昨日", 56],
        ["今天", 24],
      ],
    },
    xAxis: {
      type: "category",
      // data: ["最近半年", "最近一个月", "最近7日", "昨日", "今天"],
    },
    yAxis: {},
    series: [
      {
        type: "line",
        // 普通样式。
        itemStyle: {
          // 点的颜色。
          color: "orange",
        },
      },
    ],
  };
  employee.setOption(option1);

  // 新增文章折线图
  const article = echarts.init(articleData.value);
  article.resize({
    width: 600,
    height: 300,
  });
  const option2 = {
    title: {
      text: "新增文章",
    },
    legend: {},
    tooltip: {},
    dataset: {
      // 提供一份数据。
      source: [
        // ["product", "2015", "2016", "2017"],
        ["最近半年", 1000],
        ["最近一个月", 500],
        ["最近7日", 100],
        ["昨日", 50],
        ["今天", 30],
      ],
    },
    xAxis: {
      type: "category",
      // data: ["最近半年", "最近一个月", "最近7日", "昨日", "今天"],
    },
    yAxis: {},
    series: [
      {
        type: "line",
        // 普通样式。
        itemStyle: {
          // 点的颜色。
          color: "red",
        },
      },
    ],
  };
  article.setOption(option2);

  // 新增用户折线图
  const user = echarts.init(userData.value);
  user.resize({
    width: 1200,
    height: 300,
  });
  const option3 = {
    title: {
      text: "新增用户",
    },
    legend: {},
    tooltip: {},
    dataset: {
      // 提供一份数据。
      source: [
        // ["product", "2015", "2016", "2017"],
        ["最近一年", 1000],
        ["最近半年", 600],
        ["最近三个月", 550],
        ["最近一个月", 500],
        ["最近7日", 100],
        ["昨日", 50],
        ["今天", 30],
      ],
    },
    xAxis: {
      type: "category",
      // data: ["最近半年", "最近一个月", "最近7日", "昨日", "今天"],
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        // 普通样式。
        itemStyle: {
          // 点的颜色。
          color: "skyblue",
        },
      },
    ],
  };
  user.setOption(option3);
});

// 数据导出
const loginStore = useLoginStore();
const downloadExcel = async () => {
  try {
    const response = await axios({
      url: "http://localhost:8080/admin/report", // 后端接口地址，注意修改为你的实际路径
      method: "post",
      responseType: "blob", // 设置响应类型为blob，接收二进制数据
      headers: {
        Authorization: loginStore.userInfo.token,
      },
    });

    // 处理文件名
    const fileName = "my-blog.xlsx"; // 默认文件名
    // const contentDisposition = response.headers["content-disposition"];
    // if (contentDisposition && contentDisposition.includes("filename=")) {
    //   const startIndex = contentDisposition.indexOf("filename=") + 9;
    //   fileName = contentDisposition.substring(startIndex).replace(/['"]/g, "");
    // }

    // 创建下载链接并触发下载
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    // 释放内存
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error("下载失败:", error);
  }
};
</script>
<template>
  <div class="export">
    <el-button type="success" @click="downloadExcel">+ 导出数据</el-button>
  </div>
  <div class="main">
    <div ref="employeeData" class="employee"></div>
    <div ref="articleData" class="article"></div>
    <div ref="userData" class="user"></div>
  </div>
</template>
<style scoped>
.main {
  position: fixed;
  top: 50px;
  left: 300px;
  background-color: #fff;
  margin: 80px auto;
}
.export {
  position: fixed;
  top: 50px;
  right: 250px;
  margin-top: 20px;
  /* float: right; */
}
.employee {
  float: left;
  margin-top: 50px;
  margin-left: 50px;
}
.article {
  margin-top: 50px;
  float: left;
}
.user {
  /* width: 1200px; */
  float: left;
  margin-top: 100px;
  margin-left: 50px;
}
</style>
