<template>
  <div class="coupon-code-page">
    <div style="height: 2px"></div>
    <div class="wrapper" v-if="couponDetail">
      <div class="head">
        <span class="store-name">{{couponDetail.title}}</span>
        <span class="duihuan-icon" v-if="couponDetail.card_type === 'GIFT'">兑换券</span>
        <span class="manjian-icon" v-else-if="couponDetail.card_type === 'CASH'">满减券</span>
        <span class="zhekou-icon" v-else-if="couponDetail.card_type === 'DISCOUNT'">折扣券</span>
      </div>
      <div class="value">
        {{couponDetail.title}}
      </div>
      <p class="use-condition">
        {{couponDetail.sub_title}}
      </p>
      <div class="barcode">
        <barcode :value="couponCode" :options="barcodeOption" style="width: 100%; height: 100%;"></barcode>
      </div>
      <p class="code-txt">{{couponCode}}</p>
      <div class="qrcode" id="qrcode" ref="qrcode"></div>
      <div class="other-wrapper">
        <div class="other use-period">
          <span class="l">使用期限</span>
          <span class="r">{{couponDetail.validate_time}}</span>
        </div>
        <div class="other applicable-store" @click="$router.push('/applicable_store/'+couponDetail.cid)">
          <span class="l">适用门店</span>
          <i><img src="../../assets/img/common/arrow_right@2x.png"/></i>
        </div>
        <div class="other use-notice">
          <span class="l">使用须知</span>
          <i><img src="../../assets/img/common/arrow_right@2x.png"/></i>
        </div>
      </div>
    </div>
    <back></back>
  </div>
</template>

<script>
  //条形码组件
  import barcode from '@xkeshi/vue-barcode'
  //二维码组件
  import QRCode from 'qrcodejs2'
  import back from '../../base/back'
  export default {
    name: "use_coupon",
    data () {
      return {
        couponCode: this.$route.params.couponCode,
        barcodeOption: {
          displayValue: false, //是否默认显示条形码数据
          // textPosition  :'top', //条形码数据显示的位置
          background: '#fff', //条形码背景颜色
          valid: function (valid) {

          },
        },
        couponDetail:{},
        codeTimer: null,
      }
    },
    components: {
      barcode,
      back
    },
    created () {
      this.getCouponDetail()
    },
    beforeDestroy () {
      clearInterval(this.codeTimer)
    },
    methods: {
      //生成二维码
      generateQRcode () {
        this.$refs.qrcode.innerHTML = ''
        const boxH = this.$refs.qrcode.offsetHeight
        const boxW = this.$refs.qrcode.offsetWidth
        let qrcode = new QRCode(document.getElementById("qrcode"), {
          width: boxW,
          height: boxH, // 高度
          text: this.couponCode // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        })

        let vm = this
        this.codeTimer = setInterval(function () {
          vm.queryCouponStatus()
        }, 5000);
      },
      getCouponDetail () {
        this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
        this.$http.post(this.API.user.coupon_detail,{code:this.couponCode}).then(res => {
          this.$myLoading.close()
          if (res.return_code === '0000') {
            this.couponDetail = res.data
            this.generateQRcode()
          } else {
            this.$myToast(res.return_msg)
            return false
          }
        })
      },
      queryCouponStatus () {
        this.$http.post(this.API.user.coupon_status,{code:this.couponCode}).then(res => {
          if (res.return_code === '0000') {
            if (res.data.use_status !== '0') {
              this.$myToast('已使用')
              clearInterval(this.codeTimer)
              setTimeout(() => {
                this.$router.replace('/my_coupons')
              }, 1000)
              return false
            }
          } else {
            this.$myToast(res.return_msg)
            clearInterval(this.codeTimer)
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .coupon-code-page{
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 9;
    background-color: #f3d75b;
    .wrapper{
      width: 710px;
      border-radius: 8px;
      background-color: #ffffff;
      margin: 20px auto;
      overflow: hidden;
      .head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;
        background-color: #f6f6f6;
        height: 80px;
        .duihuan-icon{
          position: relative;
          width: 100px;
          height: 32px;
          font-size: 24px;/*px*/
          line-height: 32px;
          text-align: center;
          color: #3cc7b2;
          background-color: #f5fffd;
        }
        .manjian-icon{
          color: #567fe4;
          background-color: #f5f8ff;
        }
        .zhekou-icon{
          color: #f87148;
          background-color: #fff7f5;
        }
      }
      .value{
        text-align: center;
        font-size: 50px;/*px*/
        font-weight: 700;
        margin: 40px 0 25px 0;
      }
      .use-condition{
        color: #333333;
        margin-bottom: 70px;
        text-align: center;
      }
      .barcode{
        width: 510px;
        height: 140px;
        margin: 0 auto;
      }
      .code-txt{
        font-size: 26px;/*px*/
        color: #999999;
        text-align: center;
        margin-bottom: 50px;
      }
      .qrcode{
        width: 280px;
        height: 280px;
        margin: 0 auto 65px auto;
      }
      .other-wrapper{
        padding: 0 30px;
        .other{
          position: relative;
          display: flex;
          height: 100px;
          align-items: center;
          justify-content: space-between;
          i{
            width: 30px;
            height: 30px;
            img{
              width: 100%;
            }
          }
          &:after{
            @include border-1px(#e5e5e5, top);
          }
        }
        .use-period{
          .r{
            color: #666666;
          }
        }
      }

    }
  }
</style>
