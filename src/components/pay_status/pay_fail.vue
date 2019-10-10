<template>
  <div class="pay-fail-page">
    <img class="tip-icon" src="../../assets/img/pay/order_fail_img@2x.png">
    <p class="tip-txt">支付失败</p>
    <p class="fail-reason">支付出错啦</p>
    <button class="rescan-code">重新支付</button>
  </div>
</template>

<script>
  export default {
      name: "pay_fail"
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common";
  .pay-fail-page{
    text-align: center;
    height: 100%;
    background-color: #ffffff;
    .tip-icon{
      width: 232px;
      padding-top: 120px;
    }
    .tip-txt{
      font-size: 36px;/*px*/
      color: #dc4a28;
      margin-top: 80px;
    }
    .fail-reason{
      margin-top: 28px;
    }
    .rescan-code{
      width: 600px;
      height: 88px;
      border-radius: 44px;
      font-size: 30px;/*px*/
      background-color: $themeColor;
      margin-top: 168px;
    }
  }
</style>
