<template>
  <div>
    <van-row type="flex" align="center" gutter="15" :class="inputClass" class="search-input">
      <van-col class="search-input__inner">
        <van-icon name="search" />
        <input
          class="search-input__input"
          type="search"
          placeholder="搜索"
          @focus="handleActive"
          @blur="handleUnactive">
      </van-col>
      <van-col v-if="active">
        <a href="javascript:;" @click="handleUnactive">取消</a>
      </van-col>
    </van-row>
    <div v-if="active" class="search-input__overlay" @click="handleUnactive"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false
    }
  },
  computed: {
    inputClass() {
      const arr = []
      if (this.active) {
        arr.push('search-input--active')
      }
      return arr
    }
  },
  methods: {
    handleActive() {
      this.active = true
    },
    handleUnactive() {
      this.active = false
    }
  }
}
</script>

<style lang="less" scoped>
  .search-input {
    position: relative;
    transition: all .3s;

    &--active {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 3;
      padding: 8px 10px;
      background-color: #f4f4f4;
      margin: 0!important;
      transition: all .5s;
    }

    &__overlay {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
      background-color: rgba(200, 200, 200, .4);

    }
    &__inner {
      flex: 1;
      display: flex;
      align-items: center;
      background-color: #e4e3ea;
      border-radius: 6px;
      padding: 3px;
      overflow: hidden;
      color: #aaa;
    }

    &__input {
      flex: 1;
      display: inline-block;
      appearance: none;
      padding: 4px;
      background-color: transparent;
      border: 0;
      outline: 0;
    }

  }
</style>
