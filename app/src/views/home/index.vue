<template>
  <div class="page">
    <div class="category">
      <div
        v-for="category in categories"
        :key="category.name"
        class="category__item">
        <div class="category__item__icon" :class="'category__item__icon--' + category.color">
          <i :class="'icon-' + category.icon"></i>
        </div>
        <div class="category__item__inner">
          <div class="category__item__name">{{ category.name }}</div>
          <div class="category__item__count">0</div>
          <div class="category__item__route"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [{
        icon: 'list',
        color: 'red',
        name: '提醒'
      }, {
        icon: '',
        color: '',
        name: '工作'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
  .page {
    padding: 12px;
  }
  .category {
    background-color: #fff;
    border-radius: 10px;
    &__item {
      padding: 8px;
      &__icon {
        width: 20px;
        height: 20px;
        overflow: hidden;
        float: left;
        padding: 5px;
        border-radius: 50%;
        &--red {
          background-color: @color-red;
        }
        &--orange {
          background-color: @color-orange;
        }
        &--yellow {
          background-color: @color-yellow;
        }
        &--green {
          background-color: @color-green;
        }
        &--blue {
          background-color: @color-blue;
        }
        &--darkblue {
          background-color: @color-darkblue;
        }
        &--pink {
          background-color: @color-pink;
        }
        &--purple {
          background-color: @color-purple;
        }
        &--brown {
          background-color: @color-brown;
        }
        &--darkgray {
          background-color: @color-darkgray;
        }
      }
      &__inner {
        float: left;
        border-bottom: 1px solid #eee;
      }
      &:after{
        content: '';
        display: table;
        clear: both;
        visibility: hidden;
        width: 0;
        height: 0;
      }
    }
  }



</style>