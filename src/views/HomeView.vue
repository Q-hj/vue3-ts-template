<script setup lang="ts">
import { usePersistStore } from '@/stores/testPersist'
import { onDeactivated, onUnmounted, ref, watch } from 'vue'

// #region onDeactivated 与 watch 时机问题
let isActivated = ref(true)

onDeactivated(() => {
  isActivated.value = !isActivated.value
  console.log('onDeactivated')
})

onUnmounted(() => {
  console.log('onUnmounted')
})

watch(isActivated, () => console.log('isActivated', false))
// #endregion

// #region pinia持久化存储问题
const persistStore = usePersistStore()

// #endregion
</script>

<template>
  <main>
    <p>{{ persistStore.count }}</p>
    <button @click="persistStore.increment">+1</button>
  </main>
</template>
