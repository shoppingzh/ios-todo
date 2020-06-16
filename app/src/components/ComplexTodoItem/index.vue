<template>
  <van-swipe-cell>
    <todo-item
      :todo="todo"
      @change="handleUpdate"
    />
    <template #right>
      <van-button
        square
        type="warning"
        style="width: 90px; height: 100%;"
        @click="handleSetFlag(todo, !todo.flag)">{{ todo.flag ? '取消旗标' : '旗标' }}</van-button>
      <van-button
        square
        type="danger"
        style="width: 90px; height: 100%;"
        @click="handleRemove(todo)">删除</van-button>
    </template>
  </van-swipe-cell>
</template>

<script>
import TodoItem from '@/components/TodoItem'
import * as api from '@/api/todo'

export default {
  components: {
    TodoItem
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 修改待办
    handleUpdate(todo) {
      api.update(todo)
      this.$emit('update', todo)
    },
    // 添加/取消旗标
    handleSetFlag(todo, flag) {
      todo.flag = flag
      api.setFlag(todo.id, flag)
      this.$emit('update', todo)
    },
    // 删除待办
    handleRemove(todo) {
      api.remove(todo.id)
      this.$emit('remove', todo)
    }
  }
}
</script>

<style>

</style>
