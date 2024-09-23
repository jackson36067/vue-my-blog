<script setup>
import { onMounted, ref } from "vue";
import { updateEmployeeAPI } from "@/apis/employee";
import { ElMessage } from "element-plus";
import { useLoginStore } from "@/stores/login";
import { useEmployeeStore } from "@/stores/employee";
import "element-plus/theme-chalk/el-message.css";
import router from "@/router";
const user = ref({
  id: "",
  username: "",
  name: "",
  phone: "",
  sex: "1",
  avatar: "",
  idNumber: "",
});
// 从pinia中获取该用户的信息进行展示
const employeeStore = useEmployeeStore();
onMounted(() => {
  user.value = employeeStore.employee;
});
// 输入框校验
const rules = {
  username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
  name: [{ required: true, message: "员工姓名不能为空", trigger: "blur" }],
  phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
  idNumber: [{ required: true, message: "身份证号不能为空", trigger: "blur" }],
};

const userRef = ref(null);
const updateEmployee = () => {
  userRef.value.validate(async (valid) => {
    if (valid) {
      // 修改员工信息
      const { id, username, name, phone, sex, avatar, idNumber } = user.value;
      // 调用新增员工API
      await updateEmployeeAPI({
        id,
        username,
        name,
        phone,
        sex,
        avatar,
        idNumber,
      });
      // 提示成功
      ElMessage({ type: "sucess", message: "修改员工信息成功" });
      // 清空表单
      userRef.value.resetFields();
      // 隔200ms跳转页面
      setTimeout(() => {
        router.push("/user");
      }, 200);
    }
  });
};
const toUser = () => {
  router.push("/user");
};
// 文件上传
const loginStore = useLoginStore();
const headers = ref({
  Authorization: `${loginStore.userInfo.token}`,
});
//上传成功
const imguploadSuccess = (res) => {
  user.value.avatar = res.data;
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
        @click="toUser"
      >
        返回
      </span>
      <span style="font-weight: 700; padding-left: 20px">修改员工信息</span>
    </div>
    <div class="input">
      <div class="body">
        <el-form
          :model="user"
          :rules="rules"
          status-icon
          ref="userRef"
          resetFields="reset"
        >
          <el-form-item
            prop="username"
            label="账号:"
            style="margin: 40px 0 0 40px"
          >
            <el-input
              v-model="user.username"
              style="width: 220px"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item
            prop="name"
            label="员工性名:"
            style="margin: 40px 0 0 12px"
          >
            <el-input
              v-model="user.name"
              style="width: 220px"
              placeholder="请输入用户姓名"
            />
          </el-form-item>
          <el-form-item
            prop="phone"
            label="手机号:"
            style="margin: 40px 0 0 28px"
          >
            <el-input
              v-model="user.phone"
              style="width: 220px"
              placeholder="请输入手机号"
            />
          </el-form-item>
          <el-form-item prop="sex" label="性别:" style="margin: 40px 0 0 53px">
            <el-radio-group v-model="user.sex">
              <el-radio value="1">男♂</el-radio>
              <el-radio value="0">女♀</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="avatar">
            <span style="color: #f56c6c; padding-right: 3px">*</span>
            <span style="padding-right: 10px">头像:</span>
            <el-upload
              name="file"
              class="upload-demo"
              action="http://localhost:8080/my-blog/upload"
              :headers="headers"
              method="post"
              :limit="1"
              style="display: inline-block"
              :on-success="imguploadSuccess"
            >
              <template #trigger>
                <el-button type="primary">选择文件</el-button>
              </template>
            </el-upload>
          </div>
          <el-form-item
            prop="idNumber"
            label="身份证号:"
            style="margin: 40px 0 0 12px"
          >
            <el-input
              v-model="user.idNumber"
              style="width: 220px"
              placeholder="请输入身份证号"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <div>
          <el-button plain @click="toUser">取消</el-button>
          <el-button type="info" @click="updateEmployee">确认修改</el-button>
        </div>
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
  margin-top: 60px;
  background-color: #eaf2fd;
}
.main .input {
  height: 650px;
  margin-top: 30px;
  background-color: #fff;
}
.input .body {
  overflow: hidden;
  margin: 0 auto;
  width: 1200px;
  height: 550px;
}
.avatar {
  margin: 40px 0 0 40px;
}
.footer {
  width: 1200px;
  height: 100px;
  margin: 0 auto;
  border-top: 1px solid #929394;
}
.footer div {
  margin-top: 30px;
  margin-left: 450px;
}
</style>
