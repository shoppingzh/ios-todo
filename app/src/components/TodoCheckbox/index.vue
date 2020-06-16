<template>
  <div class="todo-checkbox" :class="defaultClass" @click="handleToggle">
    
  </div>
</template>

<script>
const sizes = ['small', 'medium', 'large']
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    color: {
      type: String,
      default: 'blue'
    }
  },
  computed: {
    defaultClass() {
      const arr = []
      if (sizes.indexOf(this.size) >= 0) {
        arr.push(`todo-checkbox--${this.size}`)
      }
      if (this.value) {
        arr.push('todo-checkbox--active')
      }
      if (this.color) {
        arr.push(`todo-checkbox--${this.color}`)
      }
      return arr
    },
    checked: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  mounted() {
  },
  methods: {
    handleToggle() {
      this.checked = !this.checked
    }
  }
}
</script>

<style lang="less" scoped>
  @import '@/styles/var.less';
  .todo-checkbox {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: relative;
    border: 2px solid #ccc;
    overflow: hidden;

    &:after{
      content: '';
      display: inline-block;
      position: absolute;
      z-index: 0;
      width: 75%;
      height: 75%;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    &--active:after {
      transition: all .3s;
    }

    // sizes
    &--small {
      width: 20px;
      height: 20px;
    }
    &--medium {
      width: 24px;
      height: 24px;
    }
    &--large {
      width: 30px;
      height: 30px;
    }
  
    // colors
    &--active&--red {
      border-color: @color-red;
      &:after {
        background-color: @color-red;
      }
    }
    &--active&--orange {
      border-color: @color-orange;
      &:after {
        background-color: @color-orange;
      }
    }
    &--active&--yellow {
      border-color: @color-yellow;
      &:after {
        background-color: @color-yellow;
      }
    }
    &--active&--green {
      border-color: @color-green;
      &:after {
        background-color: @color-green;
      }
    }
    &--active&--blue {
      border-color: @color-blue;
      &:after {
        background-color: @color-blue;
      }
    }
    &--active&--darkblue {
      border-color: @color-darkblue;
      &:after {
        background-color: @color-darkblue;
      }
    }
    &--active&--pink {
      border-color: @color-pink;
      &:after {
        background-color: @color-pink;
      }
    }
    &--active&--purple {
      border-color: @color-purple;
      &:after {
        background-color: @color-purple;
      }
    }
    &--active&--brown {
      border-color: @color-brown;
      &:after {
        background-color: @color-brown;
      }
    }
    &--active&--darkgray {
      border-color: @color-darkgray;
      &:after {
        background-color: @color-darkgray;
      }
    }

  }
</style>
