<template>
  <div class="order-info">
    <h4 class="title">订单信息</h4>
    <div class="wrapper">
      <div class="order-NO same-style">
        <span class="l">订单号</span>
        <span>{{orderInfo.order_id}}</span>
      </div>
      <div class="order-time same-style">
        <span class="l">下单时间</span>
        <span>{{orderInfo.createtime}}</span>
      </div>
      <div class="order-time same-style">
        <span class="l">支付时间</span>
        <span>{{orderInfo.last_modified}}</span>
      </div>
      <div class="payment-way same-style">
        <span class="l">支付方式</span>
        <span>{{orderInfo.payment|paymentFormat}}</span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "order_info_type02",
    props: [
      'orderInfo'
    ]
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/common";
  .order-info{
    background-color: #ffffff;
    width: 94.66%;
    margin: 20px auto 98px auto;
    border-radius: 8px;
    padding: 0 30px;
    .title{
      position: relative;
      font-size: 30px;/*px*/
      font-weight: 600;
      padding: 34px 0;
      &:after{
        @include border-1px(#e5e5e5, bottom);
      }
    }
    .wrapper{
      padding-top: 40px;
      .same-style{
        display: flex;
        justify-content: space-between;
        padding-bottom: 40px;
      }
    }

  }
</style>
