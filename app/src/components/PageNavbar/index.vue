<template>
  <header>
    <div class="left" @click="handleRouteBack">
      <i class="icon-zuo"></i>
      <span class="left-text">{{ leftText }}</span>
    </div>
    <div class="title">
      {{ title }}
    </div>
    <div class="right">
      <slot name="right"/>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    leftText: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleRouteBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '@/styles/var.less';
  header {
    display: flex;
    align-items: center;
    height: 40px;
    position: relative;
    line-height: 1.5;
    background-color: #fff;
    .left, .right {
      display: flex;
      align-items: center;
      padding: 0 6px;
      position: absolute;
      top: 0;
      bottom: 0;
      font-size: 16px;
    }
    .left {
      left: 0;
      color: @color-darkblue;
      .icon-zuo {
        font-size: 20px;
      }
    }
    .right {
      right: 0;
    }
    .title {
      max-width: 60%;
      margin: 0 auto;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
