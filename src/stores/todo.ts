import { Todo } from '@/views/todo/type';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useTodoStore = defineStore(
  'todo',
  () => {
    const todoList = ref<Todo[]>([]);

    /** 记录 */
    const record = ref<Todo[][]>([]);

    watch(todoList, () => {
      record.value.push(JSON.parse(JSON.stringify(todoList.value)));
    });

    // todo 应用记录

    return { todoList, record };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
