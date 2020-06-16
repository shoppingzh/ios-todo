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
      <div v-if="category" class="category-name" :class="'color--' + category.color">{{ category.name }}</div>
      <template v-if="todos && todos.length">
        <van-swipe-cell
          v-for="todo in todos"
          :key="todo.id">
          <div class="todo-item">
            <todo-checkbox
              v-model="todo.done"
              class="todo-item__checkbox"
              :color="category.color"
              @input="handleTodoChange(todo)"
            />
            <div class="todo-item__inner">
              <input v-model="todo.title" type="text" class="todo-item__input" @input="handleTodoChange(todo)">
              <i v-if="todo.flag" class="icon-qizhi todo-item__flag"></i>
            </div>
          </div>
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
      <div v-else-if="!adding" class="none-tips">
        没有提醒事项
      </div>
      <!-- 添加 -->
      <div v-if="adding" class="todo-item">
        <todo-checkbox
          v-model="addTodo.done"
          class="todo-item__checkbox"
          :color="category.color"
        />
        <div class="todo-item__inner">
          <input v-model="addTodo.title" ref="addInput" class="todo-item__input" type="text">
        </div>
      </div>
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
import TodoCheckbox from '@/components/TodoCheckbox'
import * as api from '@/api/todo'
import * as catApi from '@/api/category'

export default {
  components: {
    PageNavbar,
    TodoCheckbox
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
          this.$refs.addInput.focus()
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
    this.category = catApi.getById(this.$route.query.category)
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
    // 修改待办信息
    handleTodoChange(todo) {
      api.update(todo)
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
    // 添加旗标
    handleSetFlag(todo, flag) {
      todo.flag = flag
      api.setFlag(todo.id, flag)
    },
    // 删除待办
    handleRemove(todo) {
      const index = this.todos.findIndex((o) => {
        return o.id === todo.id
      })
      if (index >= 0) {
        api.remove(todo.id)
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
  .none-tips {
    color: #ccc;
    text-align: center;
    margin-top: 50%;
  }
  .category-name {
    font-size: 30px;
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
