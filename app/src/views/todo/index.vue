<template>
  <div class="page">
    <page-navbar
      v-if="!!category"
      :title="category.name"
      left-text="列表"
    >
      <template #right>
        <div class="more" @click="showMoreAction = true">
          <i class="icon-gengduo"></i>
        </div>
      </template>
    </page-navbar>
    <main v-if="!!category" @click.self="handleAddding">
      <div class="category-name" :class="'color--' + category.color">{{ category.name }}</div>
      <template v-if="todos && todos.length">
        <complex-todo-item
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @remove="handleRemove"
        />
      </template>
      <div v-else-if="!adding" class="none-tips">
        没有提醒事项
      </div>
      <!-- 添加 -->
      <todo-item
        v-if="adding"
        ref="addTodoItem"
        :todo="addTodo"
      />
    </main>
    <footer v-if="!!category">
      <a href="javascript:;" @click="adding = true">
        <i class="icon-jia1" :class="'bg--' + category.color" style="color: #fff; border-radius: 50%; padding: 2px;"></i>
        <span :class="'color--' + category.color" style="margin-left: 8px;">新提醒事项</span>
      </a>
    </footer>
    <!-- 底部菜单 -->
    <van-action-sheet
      v-model="showMoreAction"
      :actions="moreActions"
      @select="handleMoreAction"
      close-on-click-action
      cancel-text="取消"
      :round="false">
    </van-action-sheet>
  </div>
</template>

<script>
import PageNavbar from '@/components/PageNavbar'
import TodoItem from '@/components/TodoItem'
import ComplexTodoItem from '@/components/ComplexTodoItem'
import * as api from '@/api/todo'
import * as catApi from '@/api/category'

export default {
  components: {
    PageNavbar,
    TodoItem,
    ComplexTodoItem
  },
  data() {
    return {
      category: null,
      todos: [],
      adding: false,
      addTodo: {
        title: '',
        done: false,
        flag: false
      },
      showAll: false,
      showMoreAction: false
    }
  },
  computed: {
    moreActions() {
      const actions = [{
        name: '名称与外观', value: -1
      }, {
        name: '添加用户', value: -2
      }, {
        name: '删除列表', value: -3
      }, {
        name: '选择提醒事项', value: -4
      }]
      if (this.showAll) {
        actions.push({ name: '隐藏已完成项目', value: 1 })
      } else {
        actions.push({ name: '显示已完成项目', value: 2 })
      }
      return actions
    }
  },
  watch: {
    adding(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.addTodoItem.focus()
        })
        // 恢复
        this.addTodo = {
          title: '',
          done: false,
          flag: false
        }
      } else {
        const todo = this.addTodo
        if (todo.title.trim()) {
          const addTodo = {
            category: this.category.id,
            title: todo.title,
            done: todo.done,
            flag: todo.flag
          }
          this.todos.push(api.add(addTodo))
        }
      }
    },
    showAll(newVal) {
      if (newVal) {
        this.todos = api.listInCategory(this.category.id)
      } else {
        this.todos = api.listInCategory(this.category.id, false)
      }
    }
  },
  activated() {
    this.category = catApi.getById(this.$route.params.id)
    if (!this.category) {
      this.$toast('没有该分类！')
      this.$router.back()
      return
    }
    this.todos = api.listInCategory(this.category.id, false)
  },
  methods: {
    // 添加待办
    handleAddding() {
      this.adding = !this.adding
    },
    // 更多操作
    handleMoreAction(item) {
      switch (item.value) {
        case 1:
          this.showAll = false
          break
        case 2:
          this.showAll = true
          break
        default:
          this.$toast('暂不支持')
          break
      }
    },
    // 删除待办
    handleRemove(todo) {
      const index = this.todos.findIndex((o) => {
        return o.id === todo.id
      })
      if (index >= 0) {
        this.todos.splice(index, 1)
      }
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
      padding: 8px 12px;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .more {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    background-color: #eee;
    border-radius: 50%;
    i {
      font-size: 20px;
      color: @color-darkblue;
    }
  }
  .category-name {
    font-size: 30px;
    font-weight: 600;
    padding: 8px 4px;
  }
  
  // 更多操作
  .van-popup {
    padding: 0 5px 8px;
    background-color: transparent;
    .van-action-sheet__item {
      color: @color-darkblue;
      border-bottom: 1px solid #eee;
    }
    :nth-child(1) {
      border-radius: 8px 8px 0 0;
    }
    :nth-last-child(3) {
      border-radius: 0 0 8px 8px;
    }
    
    .van-action-sheet__gap {
      background-color: transparent;
    }
    .van-action-sheet__cancel {
      border-radius: 8px;
      color: @color-darkblue;
      font-weight: 600;
    }
  }
</style>
