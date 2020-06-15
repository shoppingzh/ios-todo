<template>
  <div class="todo-card" :class="'todo-card--' + color">
    <div class="todo-card__main">
      <div class="todo-card__icon" :class="'bg--' + color">
        <i :class="'icon-' + icon"></i>
      </div>
      <div class="todo-card__title">{{ title }}</div>
    </div>
    <div class="todo-card__count">{{ count }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less">
  @import '@/styles/var.less';

  .todo-card {
    display: flex;
    align-items: top;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 8px;
    padding: 8px 12px;

    &--darkblue:active {
      background-color: @color-darkblue;
      color: #fff;
    }
    &--orange:active {
      background-color: @color-orange;
      color: #fff;
    }
    &--darkgray:active {
      background-color: @color-darkgray;
      color: #fff;
    }
    &--red:active {
      background-color: @color-red;
      color: #fff;
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;
      padding: 5px;
      i {
        color: #fff;
        font-size: 24px;
      }
    }
    &__title {
      margin-top: 6px;
      font-size: 16px;
      color: #666;
    }
    &__count {
      font-size: 24px;
      font-weight: 700;
    }
  }
</style>
