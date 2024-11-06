<script setup lang="ts">
import { inject, nextTick, reactive, ref, useTemplateRef } from 'vue';
import { optionsKey } from '../symbol';
import { Todo } from '../type';

const options = inject(optionsKey)!;

const modalVisible = ref(false);

const contentInputRef = useTemplateRef('contentInputRef');

const todoFormRef = useTemplateRef('todoFormRef');

/** 表单 */
const todoForm = reactive<Todo>({
  priority: 1,
  importance: 2,
  content: '',
  status: 0,
});

let onSubmit: (info: Todo) => void;

async function handleAdd() {
  todoForm.content = '';
  modalVisible.value = true;

  await nextTick();
  contentInputRef.value?.focus();
  todoFormRef.value?.clearValidate();

  // 将处理函数给外部，突破Promise作用域
  return new Promise<Todo>((resolve, reject) => {
    onSubmit = resolve;
    // rejectFn = reject;
  });
}

async function handleSubmit() {
  const error = await todoFormRef.value?.validate();
  if (error) {
    return false;
  }
  onSubmit && onSubmit(todoForm);

  // todo 由父组件控制弹框关闭
  // return false;//取消默认关闭
}

defineExpose({
  handleAdd,
});
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
