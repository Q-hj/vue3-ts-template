<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { provide, ref } from 'vue';

import Edit from './components/edit.vue';
import { options } from './data';
import { optionsKey } from './symbol';

const { todoList } = useTodoStore();

provide<typeof options>(optionsKey, options);

function getTargetOption(key: keyof typeof options, id: number) {
  return options[key].find(({ value }) => value === id);
}

/** 弹框显示 */
const modalVisible = ref(false);

/**
 * 处理新增事件
 */
async function handleAdd() {
  modalVisible.value = true;
}

function handleDone(index: number) {
  todoList.splice(index, 1);
}
</script>

<template>
  <section class="full flex-center">
    <div class="p30 w550px border rounded-10px">
      <header class="bg-green-2 p10 flex justify-between items-center">
        <span
          class="text-18px font-bold tracking-1px text-gradient from-purple-500 to-blue-500"
          >TODO</span
        >
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <icon-plus />
          </template>
        </a-button>
      </header>
      <main>
        <div v-if="todoList.length === 0">
          <p class="text-center p40px text-18px tracking-1px text-gray-5">
            请添加代办
          </p>
        </div>
        <template v-for="(item, index) in todoList" :key="index">
          <div
            class="p10px border mt15px rounded-5px flex gap-10px flex justify-between"
          >
            <div class="flex items-center gap-10px">
              <span class="text-blue-5">{{ item.content }}</span>
              <a-tag
                bordered
                :color="getTargetOption('importance', item.importance)?.color"
                >{{
                  getTargetOption('importance', item.importance)?.label
                }}</a-tag
              >
              <a-tag
                bordered
                :color="getTargetOption('priority', item.priority)?.color"
                >{{
                  getTargetOption('priority', item.priority)?.label
                }}优先级</a-tag
              >
            </div>

            <a-space>
              <a-button type="primary" disabled @click="handleDone(index)">
                <template #icon> <icon-edit /> </template>
              </a-button>
              <a-button
                type="dashed"
                status="success"
                @click="handleDone(index)"
              >
                <template #icon> <icon-check /> </template>
              </a-button>
            </a-space>
          </div>
        </template>
      </main>
    </div>
  </section>

  <Edit v-model:visible="modalVisible" />
</template>

<style scoped>
.text-gradient {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
