<script setup>
import { ref } from "vue";
const data = ref([
  { text: "数据台", active: true, path: "/" },
  { text: "文章管理", active: false, path: "/article" },
  { text: "用户管理", active: false, path: "/employee" },
  { text: "员工管理", active: false, path: "/user" },
]);
const addActive = (index) => {
  data.value.forEach((item, i) => {
    item.active = i === index;
  });
};
</script>

<template>
  <div class="aside">
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <router-link :to="item.path">
          <a
            href="#"
            :class="{ active: item.active }"
            @mousedown="addActive(index)"
          >
            {{ item.text }}
          </a>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
.aside {
  position: fixed;
  left: 0;
  top: 50px;
  height: 100%;
  width: 250px;
  background-color: #fff;
}
.aside ul li {
  overflow: hidden;
  margin-top: 34px;
  height: 62px;
  line-height: 62px;
}
.aside ul li a {
  display: block;
  margin: 3px auto;
  width: 220px;
  height: 56px;
  color: #70737a;
  text-align: center;
}
.aside ul li a:hover {
  color: #434fed;
  background-color: #eaf2fd;
  border-radius: 10px;
}
.aside .active {
  border-radius: 10px;
  background-color: #4d4d4d;
  color: #eaf2fd;
}
</style>
