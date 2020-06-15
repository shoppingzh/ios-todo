<template>
  <div class="page">
    <page-navbar
      :title="category.name"
      left-text="列表"
    >
      <template #right>
        <div class="more" @click="moreAction = true">
          <i class="icon-gengduo"></i>
        </div>
      </template>
    </page-navbar>
    <main @click.self="handleAddding">
      <div v-if="category" class="category-name" :class="'color--' + category.color">{{ category.name }}</div>
      <template v-if="todos && todos.length">
        <div
          v-for="todo in todos"
          :key="todo.id"
          class="todo-item">
          <todo-checkbox
            v-model="todo.done"
            class="todo-item__checkbox"
            :color="category.color"
            @input="handleTodoChange(todo)"
          />
          <div class="todo-item__input">
            <input v-model="todo.title" type="text" @input="handleTodoChange(todo)">
          </div>
        </div>
      </template>
      <div v-else-if="!adding" class="none-tips">
        没有提醒事项
      </div>
      <div v-if="adding" class="todo-item">
        <todo-checkbox
          v-model="addTodo.done"
          class="todo-item__checkbox"
          :color="category.color"
        />
        <div class="todo-item__input">
          <input v-model="addTodo.title" ref="addInput" type="text">
        </div>
      </div>
    </main>
    <footer>
      <a v-if="!!category" href="javascript:;" @click="adding = true">
        <i class="icon-jia1" :class="'bg--' + category.color" style="color: #fff; border-radius: 50%; padding: 2px;"></i>
        <span :class="'color--' + category.color" style="margin-left: 8px;">新提醒事项</span>
      </a>
    </footer>
    <!-- 底部菜单 -->
    <md-action-sheet
      v-model="moreAction"
      :options="[{ label: '选项1', value: 1 }]">

    </md-action-sheet>
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
    return {
      todos: api.listInCategory(this.category.id),
      adding: false,
      addTodo: {
        title: '',
        done: false
      },
      moreAction: false
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
    },
    handleTodoChange(todo) {
      api.update(todo)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '@/styles/var.less';
  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fff;
    > header {

    }
    > main {
      flex: 1;
      overflow-y: auto;
      padding: 5px 8px 60px;
      
    }
    > footer {
      padding: 5px 8px;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .more {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 26px;
    background-color: #eee;
    border-radius: 50%;
    i {
      font-size: 18px;
      color: @color-darkblue;
    }
  }
  .none-tips {
    color: #ccc;
    text-align: center;
    margin-top: 50%;
  }
  .category-name {
    font-size: 26px;
    font-weight: 600;
    padding: 8px 4px;
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
