<template>
  <div class="merchant-confirm-page">
    <div class="steps">
      <div class="step in-progress">
        <div class="icon">1</div>
        <p class="txt">确认商品</p>
      </div>
      <div class="step in-progress">
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
    <div class="tip" v-cloak>
      <img src="../../assets/img/pay/order_img_confirm@2x.png" @load="bgImageLoaded" @error="bgImageError">
      <p class="txt">商家确认中，客官请稍等~</p>
    </div>
    <p class="support">易通金服提供支持</p>
  </div>
</template>

<script>
  export default {
    name: "merchant_confirm",
    data () {
      return {
        deskId: this.$route.params.deskId,
        queryTimer: null
      }
    },
    mounted () {
      this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
      this.queryTimer = setInterval(this.getConfirmStatus,5000)
    },
    beforeDestroy () {
      clearInterval(this.queryTimer)
    },
    methods: {
      getConfirmStatus () {
        if (this.deskId) {
          this.$http.post(this.API.order.confirm_status,{desk_id: this.deskId}).then(res => {
            if (res.return_code == '0000' && res.data.status == 'active') {
              clearInterval(this.queryTimer)
              if (res.data.refuse_reason) {
                this.$router.replace('/merchant_refuse/' + this.deskId + '?reason=' + res.data.refuse_reason)
              } else {
                this.$myToast({type:'success','msg':'商家确认成功'})
                this.$router.replace('/confirm_pay/' + this.deskId)
              }
            }
          })
        }
      },
      bgImageLoaded () {
        this.$myLoading.close()
      },
      bgImageError () {
        this.$myLoading.close()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common";
  .merchant-confirm-page{
    position: relative;
    height: 100%;
    background-color: #ffffff;
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
    .tip{
      margin-top: 29%;
      text-align: center;
      height: 343px;
      img{
        width: 388px;
        height: 263px;
        margin-bottom: 80px;
      }
      .txt{
        font-size: 32px/*px*/
      }
    }
    .support{
      position: absolute;
      bottom: 0;
      line-height: 80px;
      width: 100%;
      text-align: center;
      color: #c1c1c1;
      font-size: 26px;/*px*/
    }
  }
</style>
