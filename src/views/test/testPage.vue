<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const flag = ref(true);

function toogle() {
  flag.value = !flag.value;
}
</script>

<template>
  <header>
    <span></span>
  </header>

  <button @click="toogle">toogle</button>
  <nav class="py10 mt30 flex justify-around gap-20">
    <RouterLink to="/home">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <router-view v-if="flag" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
