<template>
  <div class="todo-item">
    <todo-checkbox
      v-model="todo.done"
      class="todo-item__checkbox"
      @input="handleTodoChange(todo)"
    />
    <div class="todo-item__inner">
      <input
        ref="input"
        v-model="todo.title"
        type="text"
        class="todo-item__input"
        @input="handleTodoChange(todo)"
        @blur="$emit('blur', todo)">
      <i v-if="todo.flag" class="icon-qizhi todo-item__flag"></i>
    </div>
  </div>
</template>

<script>
import TodoCheckbox from '@/components/TodoCheckbox'

export default {
  components: {
    TodoCheckbox
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleTodoChange(todo) {
      this.$emit('change', todo)
    },
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="less" scoped>
  .todo-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    &__checkbox {
      margin-right: 8px;
    }

    &__inner {
      flex: 1;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
    }

    &__input {
      display: block;
      width: 100%;
      appearance: none;
      padding: 12px 7px;
      border: 0;
      outline: 0;
      font-size: 16px;
      color: #333;
    }
    &__flag {
      color: #666;
      padding: 0 10px;
    }
  }
</style>
