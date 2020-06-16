<template>
  <div>
    <page-navbar
      left-text="列表"
      title="全部"
    />
    <main>
      <div class="big-title color--red">旗标</div>
      <div v-if="todos && todos.length">
        <complex-todo-item
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
        />
      </div>
      <div v-else class="none-tips">
        没有提醒事项
      </div>
    </main>

  </div>
</template>

<script>
import PageNavbar from '@/components/PageNavbar'
import ComplexTodoItem from '@/components/ComplexTodoItem'

import * as todoApi from '@/api/todo'
export default {
  components: {
    PageNavbar,
    ComplexTodoItem
  },
  data() {
    return {
      todos: []
    }
  },
  activated() {
    this.todos = todoApi.list({ done: false, flag: true })
  }
}
</script>

<style lang="less" scoped>
  main {
    background-color: #fff;
    padding: 8px;
  }
  .big-title {
    font-size: 30px;
    font-weight: 600;
    padding: 8px 4px;
  }
</style>
