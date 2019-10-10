<template>
  <div class="floating-box">
    <div class="features">
      <div class="title" @click="featuresViewtoggle">
        <img class="icon" src="../assets/img/home/icon_function@2x.png">
        功能
      </div>
      <ul class="list" v-show="featuresViewVisible">
        <li @click="$router.push('/center')">会员中心</li>
        <li @click="$router.push('/my_order/dine')">我的订单</li>
        <li @click="$router.push('/my_coupons')">我的优惠券</li>
      </ul>
    </div>

    <jitter :start.sync="beginZ" :range="{ z: 28 }" class="form-group" @endJitter="endJitter">
      <div class="shopping-cart" @click="scanQrcode">
        <div class="circle" ref="cartContainer">
        </div>
        <p class="total"><span>扫码点餐</span></p>
      </div>
    </jitter>

  </div>
</template>

<script>
  import jitter from './jitter'
  import Bus from '../utils/bus'
  import wx from 'weixin-js-sdk'
  import Base64 from '../assets/js/encrypt/base64'
  export default {
    name: "floating",
    data () {
      return {
        featuresViewVisible: false,//显示功能列表
        shaking: false,
        beginZ: false,
        isWechatClient: false,
        scanable: false
      }
    },
    components: {
      jitter
    },
    props: {
      appending: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this.isWeiXin()
      Bus.$on('shakeNotice', () => {
        this.shakeNotice()
      })
    },
    beforeDestroy () {
      Bus.$off('shakeNotice')
    },
    methods: {
      isWeiXin(){
        let ua = window.navigator.userAgent.toLowerCase()
        let matchRes = ua.match(/MicroMessenger/i)
        if(matchRes && (matchRes[0] == 'micromessenger')){
          this.isWechatClient = true
          let url = Base64.encode(location.href.split('#')[0])
          this.$http.post(this.API.seller.wx_config,{url:url}).then(res => {
            if (res.return_code === '0000') {
              this.wxConfig(res.data)
            }
          })
        }else{
          this.isWechatClient = false
        }
      },
      wxConfig (data) {

        let vm = this

        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature,// 必填，签名
          jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
        })
        wx.ready(function(){
          wx.checkJsApi({
            jsApiList : ['scanQRCode'],
            success : function(res) {
              vm.scanable = true
            }
          })
        })
        wx.error(function(res){

        })
      },
      //功能菜单显示
      featuresViewtoggle () {
        this.featuresViewVisible = !this.featuresViewVisible
      },
      shakeNotice () {
        if (this.shaking) {
          return false
        }
        this.shaking = true
        this.beginZ = true
      },
      endJitter () {
        this.shaking = false
      },
      scanQrcode () {

        if (this.scanable === false) {
          this.$myToast('请您打开微信扫一扫')
          return false
        }

        wx.scanQRCode({
          needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            console.log(res)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .floating-box{
    display: flex;
    position: fixed;
    left: 30px;
    bottom: 40px;
    z-index: 99;
    .features{
      position: relative;
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
    .shopping-cart{
      display: flex;
      align-items: center;
      width: 250px;
      height: 88px;
      margin-left: 64px;
      border-radius: 44px;
      background-color: rgba(255,215,59,.9);
      .circle{
        flex-shrink: 0;
        position: relative;
        width: 82px;
        height: 82px;
        border-radius: 50%;
        background: url("../assets/img/home/icon_saoma@2x.png") no-repeat;
        background-size: 100% 100%;
        .num {
          position: absolute;
          top: 4px;
          left: 38px;
          width: 38px;
          height: 38px;
          background-color: #ff2e2e;
          border-radius: 50%;
          font-size: 24px;/*px*/
          color: #ffffff;
          text-align: center;
          line-height: 38px;
          transform: scale(0.75);
        }
      }
      .total{
        flex-grow: 1;
        text-align: center;
        font-size: 24px;/*px*/
        span{
          font-size: 28px;/*px*/
          font-weight: 700;
          color: #333333;
        }
      }
    }
  }
</style>
