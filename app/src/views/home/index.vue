<template>
  <div style="height: 100%;">

    <div class="page">

      <header class="top-bar">
        <a href="javascript:;">编辑</a>
      </header>

      <main>
        <search-input class="index-search-input" />

        <div class="todo-card-list">
          <router-link :to="{ path: '/todo/date/today' }" tag="div" class="todo-card-wrap">
            <todo-card title="今天" color="darkblue" icon="rili" :count="counts.today"/>
          </router-link>
          <router-link :to="{ path: '/todo/date/plan' }" tag="div" class="todo-card-wrap">
            <todo-card title="计划" color="orange" icon="shijian" :count="counts.plan"/>
          </router-link>
          <router-link :to="{ path: '/todo' }" tag="div" class="todo-card-wrap">
            <todo-card title="全部" color="darkgray" icon="konghezi" :count="counts.all"/>
          </router-link>
          <router-link :to="{ path: '/todo/flag' }" tag="div" class="todo-card-wrap">
            <todo-card title="旗标" color="red" icon="qizhi" :count="counts.flag"/>
          </router-link>
        </div>

        <div class="heading">我的列表</div>
        <div class="category-list">
          <router-link 
            v-for="category in categories"
            :key="category.name"
            :to="{ path: '/todo/category/' + category.id }"
            tag="div"
            style="overflow: hidden;">
            <van-swipe-cell>
              <div class="category__item">
                <div class="category__item__icon" :class="'bg--' + category.color">
                  <i :class="'icon-' + category.icon"></i>
                </div>
                <div class="category__item__inner">
                  <div class="category__item__name">{{ category.name }}</div>
                  <div class="category__item__count">{{ category.todoCount }}</div>
                  <div class="category__item__route"><i class="icon-you"></i></div>
                </div>
              </div>
              <template #right>
                <van-button 
                  square
                  type="primary"
                  class="bg--darkgray"
                  style="height:100%;font-size: 20px;border-color: transparent;"
                  @click="handleUpdateCategory(category)"><i class="icon-xinxi"></i></van-button>
                <van-button
                  square
                  type="danger"
                  style="height:100%;font-size: 20px;"
                  @click="handleRemoveCategory(category)"><i class="icon-lajitong"></i></van-button>
              </template>
            </van-swipe-cell>
          </router-link>
        </div>
      </main>

      <footer class="foot-bar">
        <a href="javascript:;" @click="handleAddCategory">添加列表</a>
      </footer>
    </div>


    <van-popup
      v-model="adding"
      position="bottom"
      round
      overlay-class="add-overlay"
      @open="handleStartAdd"
      @close="handleEndAdd">
      <add-category
        ref="addCategory"
        :category="updateCategory"
        @cancel="adding = false"
        @done="handleAddDone"
      />
    </van-popup>

  </div>
</template>

<script>
import TodoCard from './TodoCard'
import SearchInput from '@/components/SearchInput'
import AddCategory from './AddCategory'
import * as api from '@/api/category'
import * as todoApi from '@/api/todo'

export default {
  components: {
    TodoCard,
    SearchInput,
    AddCategory
  },
  data() {
    return {
      counts: {
        tody: 0,
        plan: 0,
        all: 0,
        flag: 0
      },
      categories: [],
      adding: false,
      updateCategory: undefined
    }
  },
  mounted() {
  },
  activated() {
    this.loadAll()
    this.counts.all = todoApi.list({ done: false }).length
    this.counts.flag = todoApi.list({ done: false, flag: true }).length
  },
  methods: {
    loadAll() {
      this.categories = [...api.listAll(true)]
    },
    handleAddCategory() {
      this.adding = true
      this.updateCategory = undefined
    },
    handleUpdateCategory(category) {
      this.adding = true
      this.updateCategory = category
    },
    handleRemoveCategory(category) {
      this.$dialog.confirm({
        title: `删除“${category.name}”`,
        message: '这将删除此列表中的所有提醒事项。'
      }).then(() => {
        api.remove(category.id)
        const index = this.categories.findIndex((o) => {
          return o.id === category.id
        })
        if (index >= 0) {
          this.categories.splice(index, 1)
        }
      }).catch(() => {})
    },
    handleAddDone() {
      this.adding = false
      this.updateCategory = null
      this.loadAll()
    },
    handleStartAdd() {
      this.$el.querySelector('.page').classList.add('page--back')
    },
    handleEndAdd() {
      this.$el.querySelector('.page').classList.remove('page--back')
    }
  }
}
</script>

<style lang="less" scoped>
  @import '@/styles/var.less';
  .page {
    display: flex;
    flex-direction: column;
    padding: 12px;
    transition: all .3s;
    overflow: hidden;
    &--back {
      border-radius: 15px;
      transform: scale(.95);
    }
    > header {
      padding: 0 12px;
      text-align: right;
    }
    > main {
      flex: 1;
      overflow-y: auto;
    }
    > footer {
      margin-top: 12px;
      padding: 0 12px;
      text-align: right;
    }
  }
  .heading {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    padding: 0 5px;
  }
  // 搜索
  .index-search-input {
    margin: 15px 0;
  }
  // 卡片
  .todo-card-list {
    margin-bottom: 15px;
    .todo-card-wrap {
      float: left;
      width: 50%;
      padding: 5px;
      margin-bottom: 5px;
    }
    &:after {
      content: '';
      display: table;
      clear: both;
      visibility: hidden;
      width: 0;
      height: 0;
    }
  }
  // 分类
  .category-list {
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
  }
  .category {
    &__item {
      display: flex;
      align-items: center;
      padding: 0 8px;

      &:active {
        background-color: #eee;
      }

      &__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        overflow: hidden;
        float: left;
        padding: 5px;
        border-radius: 50%;
        color: #fff;
        font-size: 20px;
      }
      &__name {
        flex: 1;
        font-size: 14px;
        padding: 0 4px;
      }
      &__count {
        color: #333;
        padding: 0 5px;
      }
      &__route {
        padding: 0 4px;
        color: #666;
      }
      &__inner {
        display: flex;
        flex: 1;
        padding: 18px 7px;
        align-items: center;
      }
      &:not(:last-child) &__inner {
        border-bottom: 1px solid #eee;
      }
      
    }
  }

  .add-overlay {
    background-color: rgba(220, 220, 220, 1);
  }


</style>