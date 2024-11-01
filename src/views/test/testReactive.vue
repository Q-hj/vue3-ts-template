<script setup lang="ts">
import { ref } from 'vue';

const obj = ref({
  x: 0,
  y: 0,
});

setTimeout(() => {
  // 可以触发响应式 (value)
  Object.assign(obj.value, { x: 1, y: 2 });
}, 2000);
</script>

<template>
  <section>
    <p>{{ obj }}</p>
  </section>
</template>

<style scoped></style>
