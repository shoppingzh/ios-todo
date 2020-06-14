<template>
  <div class="page">

    <header class="top-bar">
      <a href="javascript:;">编辑</a>
    </header>

    <main>
      <search-input />

      <div class="todo-card-list">
        <div class="todo-card-wrap">
          <todo-card title="今天" color="darkblue" icon="rili" count="2"/>
        </div>
        <div class="todo-card-wrap">
          <todo-card title="计划" color="orange" icon="shijian" count="2"/>
        </div>
        <div class="todo-card-wrap">
          <todo-card title="全部" color="darkgray" icon="konghezi" count="7"/>
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
          tag="div"
          class="category__item">
          <div class="category__item__icon" :class="'bg--' + category.color">
            <i :class="'icon-' + category.icon"></i>
          </div>
          <div class="category__item__inner">
            <div class="category__item__name">{{ category.name }}</div>
            <!-- <div class="category__item__count">0</div>
            <div class="category__item__route"></div> -->
          </div>
        </router-link>
      </div>
    </main>

    <footer class="foot-bar">
      <a href="javascript:;" @click="handleAddCategory">添加列表</a>
    </footer>

    <md-popup
      v-model="adding"
      has-mask
      position="bottom"
      @show="$refs.addCategory.focus()">
      <add-category
        ref="addCategory"
        @cancel="adding = false"
        @done="handleAddDone"
      />
    </md-popup>

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
      adding: false
    }
  },
  mounted() {
    this.loadAll()
  },
  methods: {
    loadAll() {
      this.categories = api.listAll()
    },
    handleAddCategory() {
      this.adding = true
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
  .search-input {
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
  }
  .category {
    &__item {
      display: flex;
      align-items: center;
      padding: 8px;

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
        font-size: 14px;
        padding: 0 4px;
      }
      &__inner {
        flex: 1;
        padding: 14px 7px;
        align-items: center;
      }
      &:not(:last-child) &__inner {
        border-bottom: 1px solid #eee;
      }
      
    }
  }



</style>