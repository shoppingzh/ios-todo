<template>
  <div class="app">
    <header class="header">
      <div class="header__left">
        <a href="javascript:;" @click="handleCancel()">取消</a>
      </div>
      <div class="header__title">新建列表</div>
      <div class="header__right">
        <a href="javascript:;" :class="canDone ? '' : 'disabled'" @click="handleDone()">完成</a>
      </div>
    </header>
    <main>
      <div class="view-box">
        <div class="view-box__icon" :class="'bg--' + currentCategory.color + '--linear'">
          <i :class="'icon-' + currentCategory.icon"></i>
        </div>
      </div>
      <div class="title_input">
        <input ref="addInput" v-model="currentCategory.name" type="text" placeholder="">
      </div>
      <div class="choosers">
        <div
          v-for="color in colors"
          :key="color"
          class="chooser"
          :class="color === currentCategory.color ? 'chooser--active' : ''"
          @click="currentCategory.color = color"
        >
          <div class="chooser__inner" :class="'bg--' + color"></div>
        </div>
      </div>

      <div class="choosers">
        <div
          v-for="icon in icons"
          :key="icon"
          class="chooser"
          :class="icon === currentCategory.icon ? 'chooser--active' : ''"
          @click="currentCategory.icon = icon"
        >
          <div class="chooser__inner chooser__icon">
            <i :class="'icon-' + icon"></i>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'darkblue', 'purple']
const icons = ['list', 'tag', 'liwu', 'dangao', 'xuewei', 'shubao', 'wenju', 'kabao', 'xinyongka', 'qian', 'yaling', 
'yundong', 'canyin', 'jiubei', 'yao', 'tingzhenqi', 'yizi', 'jia', 'diannao', 'yinyue', 'youxi', 'huanbao', 
'huluobo', 'zhuazi', 'zuqiu', 'wangqiu', 'feiji', 'fanchuan']

import * as api from '@/api/category'

export default {
  props: {
    category: {
      type: Object,
      required: false,
      default: () => {
        return {
          name: '',
          color: colors[5],
          icon: icons[0]
        }
      }
    }
  },
  data() {
    this.colors = colors
    this.icons = icons
    return {
      currentCategory: Object.create(this.category)
    }
  },
  computed: {
    canDone() {
      return this.currentCategory.color && this.currentCategory.icon && this.currentCategory.name.trim()
    }
  },
  watch: {
    category(newVal) {
      this.currentCategory = Object.create(newVal)
    }
  },
  methods: {
    focus() {
      this.$nextTick(() => {
        this.$refs.addInput.focus()
      })
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleDone() {
      const category = Object.create(this.currentCategory)
      const cat = {
        name: category.name,
        icon: category.icon,
        color: category.color
      }
      if (category.id) {
        api.update(category.id, cat)
      } else {
        api.add(cat)
      }
      this.$emit('done', category)
      this.currentCategory = this.category
    }
  }
}
</script>

<style lang="less" scoped>
  .app {
    padding: 8px;
    overflow-y: auto;
  }

  .header {
    display: flex;
    align-items: center;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0 12px;
    line-height: 40px;
    overflow: hidden;
    &__title {
      flex: 1;
      text-align: center;
      font-size: 14px;
      font-weight: 700;
    }
  }

  main {
    margin-top: 40px;
  }

  // 预览
  .view-box {
    padding: 24px;

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
      margin: auto;
      border-radius: 50%;
      color: #fff;
      font-size: 54px;
      transition: background .3s;
    }
  }

  // 标题输入
  .title_input {
    background-color: #e4e3ea;
    border-radius: 4px;
    overflow: hidden;
    margin: 20px 10px;
    input {
      display: block;
      width: 100%;
      appearance: none;
      background: transparent;
      border: 0;
      outline: 0;
      padding: 10px 8px;
      font-size: 16px;
      text-align: center;
    }
  }

  // 选择集
  .choosers {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;

    .chooser {
      padding: 6px;
      border-radius: 50%;

      &__inner {
        width: 38px;
        height: 38px;
        border-radius: 50%;
      }
      &--active .chooser__inner{
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px #ccc;
      }
    } // .chooser

  }

  .choosers {
    .chooser {
      &__icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        color: #666;
        background-color: #f2f1f6;
      }
    }
  }

</style>
