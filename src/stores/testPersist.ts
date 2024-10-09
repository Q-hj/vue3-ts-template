import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePersistStore = defineStore(
  'persist',
  () => {
    const count = ref<number[]>([])

    // BUG: reactive 定义的变量将无法被持久化保存
    // const count = reactive<number[]>([])

    function increment() {
      count.value.push(6)
    }

    return { count, increment }
  },
  {
    persist: {
      storage: localStorage
    }
  }
)
