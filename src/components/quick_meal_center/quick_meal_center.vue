<template>
  <div class="center-page" ref="centerPage">
    <div class="head-ipad">
      <div class="head" v-cloak>
        <img class="member-bg" src="../../assets/img/center/member_bg@2x.png" @load="memberBgImageLoaded" @error="memberBgImageError">
        <img class="avatar" :src="userInfo.headimgurl | avatar">
        <p class="member-name">{{ userInfo.nickname }}</p>
        <p class="member-NO">NO.{{ userInfo.mobile }}</p>
        <div class="code-btn" @touchstart="codeViewShow">
          <img class="code-icon" src="../../assets/img/center/erweima@2x.png">
          <span>会员码</span>
        </div>
      </div>
    </div>
    <div class="member-icb">
      <div class="integral" @click="$router.push('/my_scores')">
        <p class="num">{{ userInfo.point }}</p>
        <p class="txt">我的积分</p>
      </div>
      <div class="coupon" @click="$router.push('/my_coupons')">
        <p class="num">{{ userInfo.coupon_count.unused }}</p>
        <p class="txt">优惠券</p>
      </div>
      <div class="balance" @click="$router.push('/my_balance')">
        <p class="num">{{ userInfo.advance | formatMoney }}</p>
        <p class="txt">余额（元）</p>
      </div>
    </div>
    <div class="mian-list">
      <ul>
        <li @click="$router.push('/member_info')">
          <div class="l">
            <img class="icon" src="../../assets/img/center/member_icon_huiyuan@2x.png">
            <span class="txt">会员信息</span>
          </div>
          <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
        </li>
        <li @click="$router.push('/member_recharge')">
          <div class="l">
            <img class="icon" src="../../assets/img/center/member_icon_chongzhi@2x.png">
            <span class="txt">会员充值</span>
          </div>
          <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
        </li>
        <li @click="$router.push('/quick_meal_order')">
          <div class="l">
            <img class="icon" src="../../assets/img/center/member_icon_order@2x.png">
            <span class="txt">我的订单</span>
          </div>
          <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
        </li>
      </ul>
    </div>
    <div class="features">
      <div class="title" @click="featuresViewtoggle">
        <img class="icon" src="../../assets/img/home/icon_function@2x.png">
        功能
      </div>
      <ul class="list" v-show="featuresViewVisible">
        <li v-if="storeInfo" @click="$router.push({name: 'quick_meal', params: {storeId: storeInfo.store_id}})">下单首页</li>
        <!--<li @click="$router.push('/center')">会员中心</li>-->
        <li @click="$router.push('/quick_meal_order')">我的订单</li>
        <li @click="$router.push('/my_coupons')">我的优惠券</li>
      </ul>
    </div>
    <mt-popup
      v-model="codeViewVisible"
      popup-transition="popup-fade"
    >
      <div class="code-view">
        <div class="view-main">
          <div class="t-color"></div>
          <h3 class="title">动态会员码</h3>
          <p class="tip01">会员余额支付，请向店员展示</p>
          <div class="barcode">
            <barcode :value="codeTxt" :options="barcodeOption" style="width: 100%; height: 100%;"></barcode>
            <p>{{codeTxt}}</p>
          </div>
          <div class="qrcode" id="qrcode" ref="qrcode"></div>
          <p class="tip02">每60s自动刷新</p>
          <p class="tip03">如遇扫码失败<br/>请将屏幕调至最亮重新扫码</p>
          <div class="manual-refresh" @click="codeViewShow">
            <span>手动刷新动态码</span>
            <img src="../../assets/img/center/popup_icon_refurbish@2x.png">
          </div>
        </div>
        <div class="hide-view" @click="codeViewVisible = false">
          <img src="../../assets/img/common/popup_icon_close@2x.png">
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  //条形码组件
  import barcode from '@xkeshi/vue-barcode'
  //二维码组件
  import QRCode from 'qrcodejs2'
  import { mapState } from 'vuex'

  export default {
    name: "quick_meal_center",
    data () {
        return {
          codeViewVisible: false,
          codeTxt: ' ',//会员码
          barcodeOption: {
            displayValue: false, //是否默认显示条形码数据
            // textPosition  :'top', //条形码数据显示的位置
            background: '#fff', //条形码背景颜色
            valid: function (valid) {

            },
          },
          codeTimer: null,
          featuresViewVisible: false,//显示功能列表

        }
    },
    components: {
        barcode
    },
    mounted () {
      this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
    },

    beforeDestroy () {
      // this.$refs.centerPage.addEventListener('touchmove', function (e) {
      //   e.preventDefault()
      // })
      clearInterval(this.codeTimer)
    },

    computed: {
      // ...mapState([
      //   'user', 'common'
      // ])
      ...mapState({
        deskInfo: state => state.common.common_data.desk_info,
        storeInfo: state => state.common.common_data.store_info,
        userInfo: state => state.user.user_info
      })
    },
    methods: {
      featuresViewtoggle () {
        this.featuresViewVisible = !this.featuresViewVisible
      },
      codeViewShow () {
        this.$http.post(this.API.user.member_code,{}).then(res => {
          if (res.return_code === '0000') {
            this.codeTxt = res.data.brcode
            this.codeViewVisible = true
              this.$nextTick(() => {
                this.qrcode()
              })
          } else {
            this.$myToast(res.return_msg)
            return
          }
        });
      },
      //生成二维码
      qrcode () {
        this.$refs.qrcode.innerHTML = ''
        const boxH = this.$refs.qrcode.offsetHeight
        const boxW = this.$refs.qrcode.offsetWidth
        let qrcode = new QRCode(document.getElementById("qrcode"), {
          width: boxW,
          height: boxH, // 高度
          text: this.codeTxt // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        })
      },
      memberBgImageLoaded () {
        this.$myLoading.close()
      },
      memberBgImageError () {
        this.$myLoading.close()
      }
    },
    watch: {
      codeViewVisible: function (val) {
        let vm = this
        if (val === true) {
          this.codeTimer = setInterval(function () {
            vm.codeViewShow()
          }, 60000);
        } else {
          clearInterval(vm.codeTimer)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";

  $color01: #604d06;
  $color02: #ff6a59;
  .center-page{
    height: 100%;
  }
  .head-ipad{
    width: 100%;
    background-color: #ffffff;

  }
  .head{
    position: relative;
    width: 10rem;
    margin: 0 auto;
    padding-top: 30px;
    text-align: center;
    height: 5.5rem;
    .member-bg{
      width: 730px;
      height: auto;
    }
    .avatar{
      width: 145px;
      border-radius: 50%;
      height: auto;
      position: absolute;
      left: 88px;
      top: 65px;
    }
    .member-name{
      position: absolute;
      color: $color01;
      top: 252px;
      left: 88px;
    }
    .member-NO{
      position: absolute;
      color: $color01;
      top: 295px;
      left: 88px;
    }
    .code-btn{
      display: flex;
      position: absolute;
      align-items: center;
      width: 210px;
      height: 80px;
      top: 249px;
      right: 29px;
      border-top-left-radius: 40px;
      border-bottom-left-radius: 40px;
      background-color: rgba(0,0,0,.4);
      color: #ffffff;
      font-size: 26px;/*px*/
      letter-spacing: 1px;
      .code-icon{
        width: 38px;
        margin: 0 14px 0 43px;
      }
    }
  }
  .member-icb{
    display: flex;
    width: 100%;
    background-color: #ffffff;
    padding: 20px 30px 30px 30px;
    div{
      position: relative;
      text-align: center;
      flex-grow: 1;
      .num{
        font-size: 34px;/*px*/
        color: $color02;
        margin-bottom: 20px;
      }
      .txt{
        font-size: 26px;/*px*/
      }
    }
    .integral{
      &:after{
        @include border-1px(rgb(229,229,229), right);
      }
    }
    .coupon{
      &:after{
        @include border-1px(rgb(229,229,229), right);
      }
    }
  }
  .mian-list{
    margin-top: 20px;
    background-color: #ffffff;
    li{
      position: relative;
      display: flex;
      height: 96px;
      padding: 0 30px;
      justify-content: space-between;
      align-items: center;
      .l{
        height: 60px;
        display: flex;
        align-items: center;
        .icon{
          width: 40px;
          margin-right: 18px;
        }
      }
      .arrow-r{
        width: 30px;
      }
      &:after{
        @include border-1px(rgb(229,229,229), bottom);
      }
    }
  }
  .mint-popup{
    background-color: rgba(0,0,0,0);
    .code-view{
      position: relative;
      width: 670px;
      .view-main{
        background-color: #ffffff;
        text-align: center;
        border-radius: 8px;
        overflow: hidden;
        .t-color{
          height: 20px;
          background-color: $themeColor;
        }
        .title{
          font-size: 34px;/*px*/
          margin-top: 35px;
        }
        .tip01{
          font-size: 24px;/*px*/
          color: #999999;
          margin-top: 14px;
        }
        .barcode{
          width: 460px;
          height: 140px;
          margin: 0 auto;
          margin-top: 27px;
          p{
            position: relative;
            top: -8px;
            font-size: 28px;/*px*/
          }
        }
        .qrcode{
          width: 302px;
          height: 302px;
          margin: 0 auto;
          margin-top: 64px;
        }
        .tip02{
          font-size: 28px;/*px*/
          color: #666666;
          margin-top: 19px;
        }
        .tip03{
          font-size: 24px;/*px*/
          color: #999999;
          line-height: 32px;/*px*/
          margin-top: 22px;
          margin-bottom: 48px;
        }
        .manual-refresh{
          display: flex;
          justify-content: center;
          align-items: center;
          height: 88px;
          background-color: #eeeeee;
          color: #8f740d;
          font-size: 28px;/*px*/
          img{
            width: 34px;
          }
        }
      }
      .hide-view{
        position: absolute;
        left: 50%;
        margin-left: -30px;
        bottom: -100px;
        width: 60px;
        img{
          width: 100%;
        }
      }
    }
  }
  .features{
    position: fixed;
    left: 30px;
    bottom: 40px;
    z-index: 99;
    .title{
      position: relative;
      z-index: 9;
      display: flex;
      width: 180px;
      height: 88px;
      background-color: rgba(51,51,51,.9);
      border-radius: 44px;
      justify-content: center;
      align-items: center;
      font-size: 28px;/*px*/
      color: #ffffff;
      .icon{
        width: 40px;
        margin-right: 6px;
      }
    }
    .list{
      position: absolute;
      left: 0;
      bottom: 0;
      padding-bottom: 88px;
      li{
        width: 180px;
        height: 88px;
        border-radius: 44px;
        background-color: rgba(70,70,70,.8);
        font-size: 26px;/*px*/
        color: #ffffff;
        margin-bottom: 10px;
        text-align: center;
        line-height: 88px;
      }
    }
  }
</style>
