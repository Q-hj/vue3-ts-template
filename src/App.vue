<script setup lang="ts">
import { ref } from 'vue';

const obj = ref({
  x: 0,
  y: 0,
});

setTimeout(() => {
  // 可以触发响应式
  Object.assign(obj.value, { x: 1, y: 2 });
}, 2000);
</script>

<template>
  <p>{{ obj }}</p>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/login">login</RouterLink>
  </nav>
  <router-view />
</template>

<style scoped>
a.router-link-active {
  color: rgb(56, 139, 139);
}
</style>
