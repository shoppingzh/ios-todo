<template>
  <div>
    <!-- <page-navbar /> -->
    <main>
      <div class="block">
        <img src="/404.png">
        <div class="tips">页面未找到！</div>
        <van-button type="warning" icon="wap-home-o" plain hairline :to="{ path: '/' }">回到首页</van-button>
      </div>
    </main>
  </div>
</template>

<script>
// import PageNavbar from '@/components/PageNavbar'

export default {
}
</script>

<style lang="less" scoped>
  main {
    position: relative;
  }
  .block {
    margin-top: 15%;
    text-align: center;
    img {
      width: 100%;
    }
    button {
      margin-top: 12px;
    }
    .tips {
      margin-top: 15px;
      color: #999;
      text-align: center;
    }
  }
</style>
