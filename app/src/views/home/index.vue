<template>
  <div class="page">

    <header class="top-bar">
      <a href="javascript:;">编辑</a>
    </header>

    <main>
      <search-input class="index-search-input" />

      <div class="todo-card-list">
        <div class="todo-card-wrap">
          <todo-card title="今天" color="darkblue" icon="rili" :count="2"/>
        </div>
        <div class="todo-card-wrap">
          <todo-card title="计划" color="orange" icon="shijian" :count="2"/>
        </div>
        <div class="todo-card-wrap">
          <todo-card title="全部" color="darkgray" icon="konghezi" :count="7"/>
        </div>
        <div class="todo-card-wrap">
          <todo-card title="旗标" color="red" icon="qizhi"/>
        </div>
      </div>

      <div class="heading">我的列表</div>
      <div class="category-list">
        <router-link 
          v-for="category in categories"
          :key="category.name"
          :to="{ path: '/todo', query: { category: category.id } }"
          tag="div">
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
                style="height:100%;font-size: 20px;"
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

    <van-popup
      v-model="adding"
      position="bottom"
      round>
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

export default {
  components: {
    TodoCard,
    SearchInput,
    AddCategory
  },
  data() {
    return {
      categories: [],
      adding: false,
      updateCategory: undefined
    }
  },
  mounted() {
  },
  activated() {
    this.loadAll()
  },
  methods: {
    loadAll() {
      this.categories = [...api.listAll(true)]
    },
    handleAddCategory() {
      this.updateCategory = undefined
      this.adding = true
    },
    handleUpdateCategory(category) {
      this.updateCategory = category
      this.adding = true
    },
    handleRemoveCategory(category) {
      api.remove(category.id)
      const index = this.categories.findIndex((o) => {
        return o.id === category.id
      })
      if (index >= 0) {
        this.categories.splice(index, 1)
      }
    },
    handleAddDone() {
      this.adding = false
      this.loadAll()
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



</style>