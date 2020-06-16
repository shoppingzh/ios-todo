<template>
  <transition :name="slide">
    <keep-alive>
      <router-view />
    </keep-alive>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      slide: ''
    }
  },
  watch: {
    $route(to, from) {
      // TODO 暂时使用这种解决办法，但不是最优美的解决办法
      let offset = 0
      if (to.meta && from.meta) {
        offset = (to.meta.index || 0) - (from.meta.index || 0)
      }
      if (offset > 0) {
        this.slide = 'slide-right'
      } else if (offset < 0) {
        this.slide = 'slide-left'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .slide-right {
    &-enter-active {
      animation: slideInRight .3s;
    }
  }
  .slide-left {
    &-enter-active {
      animation: slideInLeft .3s;
    }
  }
</style>