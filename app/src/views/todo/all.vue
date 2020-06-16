<template>
  <div class="page">
    <page-navbar
      left-text="列表"
      title="全部"
    />
    <main>
      <div class="big-title color--darkgray">全部</div>
      <div class="category-list">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category">
          <div class="category__name" :class="'color--' + category.color">{{ category.name }}</div>
          <complex-todo-item
            v-for="todo in category.todos"
            :key="todo.id"
            :todo="todo"
          />  
        </div>
      </div>
    </main>

  </div>
</template>

<script>
import PageNavbar from '@/components/PageNavbar'
import ComplexTodoItem from '@/components/ComplexTodoItem'

import * as catApi from '@/api/category'
import * as todoApi from '@/api/todo'

export default {
  components: {
    PageNavbar,
    ComplexTodoItem
  },
  data() {
    return {
      categories: []
    }
  },
  activated() {
    this.categories = catApi.listAll()
    this.categories.forEach((cat) => {
      cat.todos = todoApi.listInCategory(cat.id, false)
    })
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
  .category {
    &__name {
      font-size: 20px;
      font-weight: 600;
      padding: 8px 4px;
    }
  }
</style>