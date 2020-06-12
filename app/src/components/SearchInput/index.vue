<template>
  <div class="search-input">
    <md-icon name="search" size="xs" color="#666"></md-icon>
    <input class="search-input__input" type="search" placeholder="搜索">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
  .search-input {
    display: flex;
    align-items: center;
    background-color: #e4e3ea;
    border-radius: 6px;
    padding: 3px;

    &__input {
      flex: 1;
      appearance: none;
      background-color: transparent;
      border: 0;
      outline: 0;
      padding: 6px;
    }

  }
</style>
