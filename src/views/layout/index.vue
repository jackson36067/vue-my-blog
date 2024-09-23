<script setup>
import layoutHeader from "./component/layoutHeader.vue";
import layoutAside from "./component/layoutAside.vue";
</script>

<template>
  <layoutHeader />
  <layoutAside />
  <router-view />
</template>
