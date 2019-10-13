<template>
  <div class="pay-success-page">
    <div class="head">
      <img src="../../assets/img/pay/order_success_img@2x.png">
      <div class="txt">
        <p class="success">支付成功</p>
        <p class="lump-num">￥{{payed|formatMoney}}</p>
      </div>
    </div>
    <div class="balance-integral" v-if="account">
      <div class="wrapper">
        <div class="balance">
          <span class="label">卡内余额</span>
          <span v-if="account.card_balance">￥{{account.card_balance / 100 | formatMoney}}</span>
          <span v-else>￥{{account.advance|formatMoney}}</span>
        </div>
        <div class="integral">
          <span class="label">获得积分</span>
          <span>{{account.point}}</span>
        </div>
      </div>
    </div>
    <div class="receive-coupon">
      <img src="../../assets/img/pay/ad_img@2x.png">
    </div>
    <button class="btn" @click="goDetail">
      查看订单
    </button>
    <div class="advertising-space" @click.stop="viewAd">
      <img src="../../assets/img/pay_status/ad.png" alt="广告位">
    </div>
  </div>
</template>

<script>
  export default {
    name: "pay_success",
    data () {
      return {
        orderId: this.$route.params.orderId,
        payed: 0.0,
        account: null,
        refer: 'local',
        type: 'normal',
      }
    },
    mounted () {
      this.getSuccessInfo()
    },
    methods: {
      getSuccessInfo () {
        let orderId = this.orderId.substring(0, 15)
        this.$http.post(this.API.order.pay_success,{order_id: orderId}).then(res => {
          if (res.return_code == '0000') {
            this.payed = res.data.payed
            this.account = res.data.account
            this.refer = res.data.refer
            this.type = res.data.type
          } else {
            this.$toast(res.return_msg)
            return
          }
        })
      },
      goDetail () {
        let orderId = this.orderId.substring(0, 15)
        if (this.type === 'recharge') {
          this.$router.push('/order_detail/recharge_detail/'+orderId)
        } else if (this.refer === 'quick') {
          this.$router.push('/order_detail/quick_meal_detail/'+orderId)
        } else {
          this.$router.push('/order_detail/dine_detail/'+orderId)
        }
      },
      viewAd () {
        window.location.href = 'https://shop.haiercash.com/static/gh/fkks.html?source=yitongzhifu_1'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .pay-success-page{
    height: 100%;
    background-color: #ffffff;
    .head{
      display: flex;
      margin: 60px 0 72px 70px;
      align-items: center;
      img{
        width: 234px;
        margin-right: 94px;
      }
      .txt{
        .success{
          font-size: 36px;
          color: #a18b35;
          margin-bottom: 32px;
        }
        .lump-num{
          font-size: 44px;
          font-weight: bold;
        }
      }
    }
    .balance-integral{
      padding: 0 54px;
      .wrapper{
        position: relative;
        width: 100%;
        padding: 16px 0;
        div{
          padding: 16px 0;
          display: flex;
          justify-content: space-between;
          color: #999999;
        }
        &:before{
          @include border-1px(#e5e5e5, top);
        }
        &:after{
          @include border-1px(#e5e5e5, bottom);
        }

      }
    }
    .receive-coupon{
      font-size: 0;
      img{
        width: 100%;
      }
    }

    .btn{
      display: block;
      width: 640px;
      background-color: $themeColor;
      border-radius: 44px;
      height: 88px;
      margin: 68px auto;
      font-size: 30px;
    }
    .advertising-space {
      position: absolute;
      bottom: 80px;
      img {
        height: 260px;
      }
    }
  }
</style>
