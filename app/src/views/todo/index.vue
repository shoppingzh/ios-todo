<template>
  <div class="app" @click.self="handleAddding">
    <page-navbar
      title="列表"
    />
    <main>
      <div
        v-for="todo in todos"
        :key="todo.id"
        class="todo-item">
        <todo-checkbox
          v-model="todo.done"
          class="todo-item__checkbox"
        />
        <div class="todo-item__input">
          <input v-model="todo.title" type="text">
        </div>
      </div>
      <div v-if="adding" class="todo-item">
        <todo-checkbox
          v-model="addTodo.done"
          class="todo-item__checkbox"
        />
        <div class="todo-item__input">
          <input v-model="addTodo.title" ref="addInput" type="text">
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import PageNavbar from '@/components/PageNavbar'
import TodoCheckbox from '@/components/TodoCheckbox'
import * as api from '@/api/todo'
import * as catApi from '@/api/category'

export default {
  components: {
    PageNavbar,
    TodoCheckbox
  },
  data() {
    this.category = catApi.getById(this.$route.query.category)
    console.log(this.category)
    return {
      todos: api.listInCategory(this.category.id),
      adding: false,
      addTodo: {
        title: '',
        done: false
      }
    }
  },
  watch: {
    adding(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.addInput.focus()
        })
        // 恢复
        this.addTodo = {
          title: '',
          done: false
        }
      } else {
        const todo = this.addTodo
        if (todo.title.trim()) {
          const addTodo = {
            category: this.category.id,
            title: todo.title,
            done: todo.done
          }
          api.add(addTodo)
          this.todos.push(addTodo)

        }
      }
    }
  },
  methods: {
    handleAddding() {
      this.adding = !this.adding
    }
  }
}
</script>

<style lang="less" scoped>
  .app {
    height: 100%;
  }
  main {
    margin-top: 40px;
    padding: 5px 8px;
  }
  .todo-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    &__checkbox {
      margin-right: 8px;
    }

    &__input {
      flex: 1;
      border-bottom: 1px solid #eee;
      input {
        display: block;
        width: 100%;
        appearance: none;
        padding: 12px 7px;
        border: 0;
        outline: 0;
        font-size: 16px;
        color: #333;
      }
    }
  }
</style>
