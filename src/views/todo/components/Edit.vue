<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { inject, nextTick, reactive, useTemplateRef, watch } from 'vue';
import { optionsKey } from '../symbol';
import { Todo } from '../type';

const options = inject(optionsKey)!;

const { todoList } = useTodoStore();

const modalVisible = defineModel<boolean>('visible');

// 监听弹框打开
watch(modalVisible, async (visible) => {
  if (!visible) return;
  await nextTick();
  contentInputRef.value?.focus();
  todoFormRef.value?.clearValidate();
});

/** 表单 */
const todoForm = reactive<Todo>({
  priority: 1,
  importance: 2,
  content: '',
  status: 0,
});

const contentInputRef = useTemplateRef('contentInputRef');

const todoFormRef = useTemplateRef('todoFormRef');

async function handleSubmit() {
  const error = await todoFormRef.value?.validate();
  if (error) {
    return false;
  }
  // 新增逻辑 在此处理
  todoList.push({ ...todoForm });
  // 处理之后要执行的的回调，父组件传入进来 在此执行
  modalVisible.value = false;
  todoForm.content = '';
}
</script>

<template>
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
</style>
