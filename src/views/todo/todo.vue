<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { nextTick, reactive, ref, useTemplateRef } from 'vue';
import { Todo } from './type';

const { todoList } = useTodoStore();

const options = {
  importance: [
    {
      value: 1,
      label: '很重要',
      color: 'orangered',
    },
    {
      value: 2,
      label: '比较重要',
      color: 'orange',
    },
    {
      value: 3,
      label: '一般重要',
      color: 'blue',
    },
    {
      value: 4,
      label: '略微重要',
      color: 'green',
    },
  ],
  priority: [
    {
      value: 1,
      label: '高',
      color: 'gold',
    },
    {
      value: 2,
      label: '中',
      color: 'arcoblue',
    },
    {
      value: 3,
      label: '低',
      color: 'lime',
    },
  ],
};

function getTargetOption(key: keyof typeof options, id: number) {
  return options[key].find(({ value }) => value === id);
}

const modalVisible = ref(false);

const todoForm = reactive<Todo>({
  priority: 1,
  importance: 2,
  content: '',
  status: 0,
});

const contentInputRef = useTemplateRef('contentInputRef');

async function handleAdd() {
  modalVisible.value = true;
  await nextTick();
  contentInputRef.value?.focus();
  todoFormRef.value?.clearValidate();
}

const todoFormRef = useTemplateRef('todoFormRef');

async function handleSubmit() {
  const error = await todoFormRef.value?.validate();
  if (error) {
    return false;
  }
  todoList.push({ ...todoForm });
  modalVisible.value = false;
  todoForm.content = '';
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

  <a-modal
    v-model:visible="modalVisible"
    title="新建代办"
    width="550px"
    draggable
    body-class=""
    @before-ok="handleSubmit"
  >
    <a-form ref="todoFormRef" :model="todoForm" auto-label-width>
      <a-form-item show-colon field="priority" label="优先级" required>
        <a-radio-group v-model="todoForm.priority">
          <a-radio
            v-for="item in options.priority"
            :key="item.value"
            :value="item.value"
            :style="{
              '---color': item.color,
            }"
            >{{ item.label }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item show-colon field="importance" label="重要程度" required>
        <a-radio-group v-model="todoForm.importance">
          <a-radio
            v-for="item in options.importance"
            :key="item.value"
            :value="item.value"
            :style="{
              '---color': item.color,
            }"
            >{{ item.label }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item show-colon field="content" label="代办内容" required>
        <a-input
          ref="contentInputRef"
          v-model="todoForm.content"
          placeholder="请输入代办内容"
          @keyup.enter="handleSubmit"
        ></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
:deep(.arco-radio-label) {
  color: var(---color);
}
/* :deep(.arco-radio-icon) {
  background-color: var(---color);
  border-color: var(---color);
} */

.text-gradient {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
