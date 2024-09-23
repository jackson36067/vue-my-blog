<script setup>
import { onMounted, ref } from "vue";
import { useLoginStore } from "@/stores/login";
const avatar = ref("");
const username = ref("");
const loginStore = useLoginStore();
onMounted(() => {
  username.value = loginStore.userInfo.username;
  avatar.value = loginStore.userInfo.avatar;
});
</script>
<template>
  <div class="header">
    <div class="logo">
      <img
        src="https://jackson1.oss-cn-beijing.aliyuncs.com/logo.png?Expires=1726999155&OSSAccessKeyId=TMP.3KiFjMnjqciLZvYogEjwv8CTzZ7Cmi6RyGG9Cy4Xg9LUK1qKo6AJh8zJAoiuX4Sy8TeyUH9W6921ChjTofNAAZyMDbT9wR&Signature=6fHAxm690RZBpaVuUgj9dirTtQ8%3D"
        alt=""
      />
    </div>
    <div class="dropDown">
      <el-dropdown>
        <span class="el-dropdown-link" style="color: brown; cursor: pointer">
          退出登录
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <p>{{ username }}</p>
    <div class="avatar">
      <img :src="avatar" />
    </div>
  </div>
</template>
<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
}
.header .logo {
  float: left;
  margin-left: 20px;
  width: 300px;
  height: 100%;
}
.logo img {
  height: 100%;
}
.header .avatar {
  float: right;
  overflow: hidden;
  margin-right: 10px;
  width: 50px;
  height: 100%;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.4);
}
.header .avatar img {
  width: 100%;
}
.header .dropDown {
  float: right;
  margin-top: 18px;
  margin-right: 240px;
}
.header p {
  float: right;
  font-size: 18px;
  color: black;
  margin-right: 60px;
  margin-top: 10px;
}
</style>
