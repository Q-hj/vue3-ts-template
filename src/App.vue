<script setup lang="ts"></script>

<template>
  <div class="full flex-col">
    <nav class="py10 flex justify-around gap-20 bg-blue-1">
      <RouterLink to="/test">测试页面</RouterLink>
      <!-- <RouterLink to="/login">login</RouterLink> -->
      <RouterLink to="/todo">todo</RouterLink>
    </nav>
    <main flex-1>
      <a-config-provider size="small" update-at-scroll>
        <router-view />
      </a-config-provider>
    </main>
  </div>
</template>

<style scoped></style>
