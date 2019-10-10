<template>
  <div class="order-detail-page">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "order_detail"
  }

</script>

<style lang="scss" scoped>
  .order-detail-page{
    position: relative;
    height: 100%;
    z-index: 9;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
</style>
