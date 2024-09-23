<script setup>
import { ref } from "vue";
import { useLoginStore } from "@/stores/login";
import { ElMessage } from "element-plus";
import router from "@/router";
const userInfo = ref({
  username: "",
  password: "",
});
const rules = {
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
};
const userRef = ref(null);
const loginStore = useLoginStore();
const doLogin = () => {
  userRef.value.validate(async (valid) => {
    if (valid) {
      const { username, password } = userInfo.value;
      await loginStore.doEmployeeLogin({ username, password });
      ElMessage({ type: "success", message: "登录成功" });
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  });
};
</script>
<template>
  <div class="main">
    <h2>hope you happy</h2>
    <div class="login">
      <p>welcome come to jackson home</p>
      <el-form :model="userInfo" :rules="rules" status-icon ref="userRef">
        <el-form-item
          prop="username"
          label="用户名:"
          style="margin: 60px 0 0 60px"
        >
          <el-input
            v-model="userInfo.username"
            style="width: 220px"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码:"
          style="margin: 60px 0 0 75px"
        >
          <el-input
            type="password"
            v-model="userInfo.password"
            style="width: 220px"
            placeholder="请输入密码"
          />
        </el-form-item>
      </el-form>
      <div style="width: 300px; margin: 60px auto; background-color: pink">
        <el-button
          type="success"
          plain
          style="width: 300px; height: 50px; font-size: 28px"
          @click="doLogin"
          >log in</el-button
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
}
h2 {
  position: fixed;
  top: 40%;
  left: 30%;
  text-align: center;
  color: skyblue;
  font-size: 28px;
}
.login {
  position: fixed;
  top: 20%;
  left: 50%;
  width: 400px;
  height: 400px;
  border: 1px dashed black;
  background-color: plum;
}
.login p {
  font-size: 24px;
  text-align: center;
  color: salmon;
}
</style>
