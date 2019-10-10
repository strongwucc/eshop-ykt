<template>
  <div class="confirm-order-page">
    <div class="steps">
      <div class="step in-progress">
        <div class="icon">1</div>
        <p class="txt">确认商品</p>
      </div>
      <div class="step">
        <div class="icon">2</div>
        <p class="txt">商户确认</p>
      </div>
      <div class="step">
        <div class="icon">
          <img src="../../assets/img/pay/order_step_ic_tick_nor@2x.png">
        </div>
        <p class="txt">确认支付</p>
      </div>
      <ul class="points">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>

    <goods-ready-pay :cart-info="cart"></goods-ready-pay>

    <button class="confirm-btn" @click="confirmOrder">
      确认商品
    </button>
  </div>
</template>

<script>
  import GoodsReadyPay from '../../base/goods_ready_pay'
  export default {
    name: "confirm_order",
    data () {
      return {
        cart: [],
        payable: 0,
        deskId: this.$route.params.deskId,
        deskStatusTimer: null,
        posting: false,
        refreshTimer: null,
        appending: false
      }
    },
    components: {
      GoodsReadyPay
    },
    beforeDestroy () {
      clearInterval(this.deskStatusTimer)
      clearInterval(this.refreshTimer)
    },
    created () {
      this.getConfirmInfo()
      if (this.$route.query.appending) {
        this.appending = true
      } else {
        this.deskStatusTimer = setInterval(this.deskStatus, 5000)
      }
    },
    methods : {
      reFreshList () {
        this.$http.post(this.API.cart.cart_confirm,{desk_id: this.deskId}).then(res => {
          if (res.return_code == '0000') {
            this.cart = res.data.cart
            this.payable = res.data.payable
          }
        })
      },
      getConfirmInfo () {
        this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
        this.$http.post(this.API.cart.cart_confirm,{desk_id: this.deskId}).then(res => {
          this.$myLoading.close()
          if (res.return_code == '0000') {
            this.cart = res.data.cart
            this.payable = res.data.payable
            this.refreshTimer = setInterval(this.reFreshList, 5000)
          } else {
            this.$myToast(res.return_msg)
            return
          }
        })
      },
      confirmOrder () {

        if (this.posting == true) {
          return false
        }

        this.posting = true
        this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})

        let desk_info = this.$store.state.common.common_data.desk_info.info
        this.$http.post(this.API.cart.cart_order,{desk_id: this.deskId, mark_text: desk_info.mark_text, people: desk_info.people}).then(res => {
          this.posting = false
          this.$myLoading.close()
          if (res.return_code == '0000') {
            this.$router.push('/merchant_confirm/'+this.deskId)
          } else {
            this.$myToast(res.return_msg)
            return
          }
        })
      },
      deskStatus () {
        if (this.deskId) {
          this.$http.post(this.API.seller.desk_status,{desk_id: this.deskId}).then(res => {
            if (res.return_code === '0000') {
              if (res.data.status == '2') {
                this.$router.push('/confirm_pay/'+this.deskId)
              } else if (res.data.status == '3') {
                this.$router.push('/merchant_confirm/'+this.deskId)
              } else if (res.data.status == '4' || res.data.status == '5') {
                this.$router.push('/order_detail/dine_detail/'+res.data.order_id)
              } else if (res.data.status == '6') {
                this.$router.push('/order_detail/dine_detail/'+res.data.order_id)
              }
            }
          })
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .confirm-order-page{
    position: relative;
    min-height: 100%;
    padding-bottom: 168px;
    background-color: rgb(242,242,245);
    z-index: 9;
    .steps{
      position: relative;
      padding: 30px 80px;
      display: flex;
      justify-content: space-between;
      background-color: #ffffff;
      .step{
        position: relative;
        z-index: 9;
        .icon{
          width: 48px;
          height: 48px;
          border-radius: 50%;
          box-shadow: 0 12px 13px rgba(204,204,204,0.3);
          margin: 0 auto 20px auto;
          text-align: center;
          line-height: 48px;
          color: #cccccc;
          background-color: #e5e5e5;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .txt{
          font-size: 24px;/*px*/
          color: #999999;
        }
      }
      .in-progress{
        .icon{
          background-color: $themeColor;
          box-shadow: 0 12px 13px rgba(255,217,42,0.3);
          color: #333333;
        }
        .txt{
          color: #333333;
        }
      }
      .points{
        position: absolute;
        display: flex;
        width: 90%;
        left: 5%;
        top: 30px;
        padding: 0 80px;
        height: 48px;
        align-items: center;
        justify-content: space-between;
        li{
          width: 6px;
          height: 6px;
          background-color: $themeColor;
          border-radius: 50%;
        }
      }
    }
    .confirm-btn{
      position: absolute;
      bottom: 40px;
      left: 50%;
      margin-left: -120px;
      width: 240px;
      height: 88px;
      background-color: $themeColor;
      border-radius: 44px;
      font-size: 30px;/*px*/
    }
  }
</style>
