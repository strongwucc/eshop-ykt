<template>
  <div class="center-page" ref="centerPage">
    <!--<div class="head-ipad">-->
      <!--<div class="head" v-cloak>-->
        <!--<img class="member-bg" src="../../assets/img/quick_meal_center/member_card_bg@2x.png" @load="memberBgImageLoaded" @error="memberBgImageError">-->
        <!--<img class="avatar" :src="userInfo.headimgurl | avatar">-->
        <!--<p class="member-name">{{ userInfo.nickname }}</p>-->
        <!--<p class="member-NO">NO.{{ userInfo.mobile }}</p>-->
        <!--<div class="code-btn" @touchstart="codeViewShow">-->
          <!--<img class="code-icon" src="../../assets/img/center/erweima@2x.png">-->
          <!--<span>付款码</span>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="member-icb">-->
      <!--<div class="integral" @click="$router.push('/my_scores')">-->
        <!--<p class="num">{{ userInfo.point }}</p>-->
        <!--<p class="txt">我的积分</p>-->
      <!--</div>-->
      <!--<div class="coupon" @click="$router.push('/my_coupons')">-->
        <!--<p class="num">{{ userInfo.coupon_count.unused }}</p>-->
        <!--<p class="txt">优惠券</p>-->
      <!--</div>-->
      <!--<div class="balance" @click="$router.push('/my_balance')">-->
        <!--<p class="num">{{ userInfo.advance | formatMoney }}</p>-->
        <!--<p class="txt">余额（元）</p>-->
      <!--</div>-->
    <!--</div>-->
    <div class="member-info">
      <div class="member-bg"><img src="../../assets/img/quick_meal_center/member_card_bg@2x.png"/></div>
      <div class="member-account">
        <div class="avatar"><img :src="userInfo.headimgurl | avatar"></div>
        <div class="account">
          <div class="account-info">
            <div class="name">{{ userInfo.nickname }}</div>
            <div class="mobile">
              <img src="../../assets/img/quick_meal_center/icon_phone@2x.png"/><span>{{ userInfo.mobile }}</span>
            </div>
          </div>
          <div class="account-code" @click.stop="codeViewShow" v-if="userInfo.card_info.cardNum > 0">
            <img src="../../assets/img/quick_meal_center/icon_huiyuanma@2x.png"/><span class="notice">付款码</span>
          </div>
        </div>
      </div>
      <div class="member-icb">
        <div class="integral" @click="$router.push('/my_scores')">
          <span class="num">{{ userInfo.point }}</span>
          <span class="txt">我的积分</span>
        </div>
        <div class="coupon" @click="$router.push('/my_coupons')">
          <span class="num">{{ userInfo.coupon_count.unused }}</span>
          <span class="txt">优惠券</span>
        </div>
        <div class="balance" @click="$router.push('/my_balance_new')">
          <!--<span class="num">{{ userInfo.advance | formatMoney }}</span>-->
          <span class="num">{{ userInfo.card_info.balance / 100 | formatMoney }}</span>
          <span class="txt">余额（元）</span>
        </div>
      </div>
    </div>
    <div class="mian-list">
      <ul>
        <li @click="$router.push('/my_card_holder')">
          <div class="l">
            <img class="icon" src="../../assets/img/quick_meal_center/member_icon_cardcase@2x.png">
            <span class="txt"><span>我的卡包</span><span class="count">{{userInfo.card_info.cardNum}}张</span></span>
          </div>
          <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
        </li>
        <li @click="$router.push('/member_info')">
          <div class="l">
            <img class="icon" src="../../assets/img/quick_meal_center/member_icon_huiyuan@2x.png">
            <span class="txt">会员信息</span>
          </div>
          <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
        </li>
        <!--<li @click="$router.push('/member_recharge')">-->
          <!--<div class="l">-->
            <!--<img class="icon" src="../../assets/img/center/member_icon_chongzhi@2x.png">-->
            <!--<span class="txt">会员充值</span>-->
          <!--</div>-->
          <!--<img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">-->
        <!--</li>-->
        <li @click="$router.push('/quick_meal_order')">
          <div class="l">
            <img class="icon" src="../../assets/img/quick_meal_center/member_icon_order@2x.png">
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
          <!--<p class="tip03">如遇扫码失败<br/>请将屏幕调至最亮重新扫码</p>-->
          <div class="manual-refresh" @click="codeViewShow">
            <span>手动刷新动态码</span>
            <img src="../../assets/img/center/popup_icon_refurbish@2x.png">
          </div>
          <div class="selected-card" @click.stop="showCardList" v-if="cards.length > 0">
            <template v-if="cards[0].member_card_type === '0'">
              <div class="card-no">
                <img class="icon" src="../../assets/img/quick_meal_center/member_icon_cardcase@2x.png"/>
                <span class="number">虚拟卡 NO.{{cards[0].card_no | cardNoFormat}}</span>
                <img class="drop-down" src="../../assets/img/common/arrow_right@2x.png"/>
              </div>
              <div class="card-money">
                余额:￥{{cards[0].card_balance / 100 | formatMoney(2)}}
              </div>
            </template>
            <template v-if="cards[0].member_card_type === '1'">
              <div class="card-no">
                <img class="icon" src="../../assets/img/quick_meal_center/member_icon_cardcase@2x.png"/>
                <span class="number">虚拟卡 NO.{{cards[0].card_no | cardNoFormat}}</span>
                <img class="drop-down" src="../../assets/img/common/arrow_right@2x.png"/>
              </div>
              <div class="card-money">
                余额:￥{{cards[0].card_balance /1000 | formatMoney(2)}}
              </div>
            </template>
          </div>
        </div>
        <div class="hide-view" @click="codeViewVisible = false">
          <img src="../../assets/img/common/popup_icon_close@2x.png">
        </div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="cardListVisible"
      position="bottom">
      <div class="card-list-area">
        <div class="title">选择会员卡</div>
        <div class="list">
          <div class="list-item" v-for="card in cards" @click.stop="selectCard(card)">
            <div class="left">
              <div class="card-no">
                <img class="icon" src="../../assets/img/quick_meal_center/member_icon_cardcase@2x.png"/>
                <span class="number" v-if="card.member_card_type === '0'">会员卡 NO.{{card.card_no | cardNoFormat}}</span>
                <span class="number" v-if="card.member_card_type === '1'">实体卡 NO.{{card.card_no | cardNoFormat}}</span>
              </div>
              <div class="card-money">
                余额:￥{{card.card_balance / 100 | formatMoney(2)}}
              </div>
            </div>
            <div class="right"><img v-if="selectedCard.card_no = card.card_no" src="../../assets/img/quick_meal_center/icon_choose@2x.png"/></div>
          </div>
        </div>
        <div class="bind-card" @click.stop="$router.push('/bind_card')">
          <img class="icon" src="../../assets/img/quick_meal_center/icon_bangka@2x.png"/>
          <span class="txt">绑卡</span>
          <img class="drop-down" src="../../assets/img/common/arrow_right@2x.png"/>
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
          cardListVisible: false,
          cards: [],
          selectedCard: null
        }
    },
    components: {
        barcode
    },
    mounted () {
      this.getCards()
      // this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
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
        if (!this.selectedCard) {
          this.$myToast('对不起，您还没有会员卡！')
          return false
        }
        let card_no = this.selectedCard.card_no
        this.$http.post(this.API.user.card_code,{card_no: card_no}).then(res => {
          console.log(res)
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
      },
      showCardList () {
        this.cardListVisible = true
      },
      getCards () {
        this.$http.post(this.API.user.member_cards,{}).then(res => {
          if (res.return_code === '0000') {
            this.cards = this.cards.concat(res.data.list)
            if (this.cards.length > 0) {
              this.selectedCard = this.cards[0]
            }
          }
        })
      },
      selectCard (card) {
        this.selectedCard = card
        this.cardListVisible = false
        this.codeViewShow()
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
  .member-info{
    width: 100%;
    height: 535px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .member-bg{
      position: absolute;
      z-index: 5;
      top: -20px;
      left: -30px;
      width: 100%;
      img{
        width: 810px;
        height: auto;
      }
    }
    .member-account{
      z-index: 9;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: left;
      .avatar{
        margin-top: 70px;
        margin-left: 80px;
        img{
          width: 120px;
          height: 120px;
          border-radius: 50%;
        }
      }
      .account{
        margin-top: 31px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .account-info{
          display: flex;
          flex-direction: column;
          .name{
            height:56px;
            font-size:40px;
            font-weight:bold;
            line-height:56px;
            color:rgba(51,51,51,1);
            margin-left: 87px;
            text-align: left;
          }
          .mobile{
            display: flex;
            justify-content: left;
            align-items: center;
            margin-left: 82px;
            margin-top: 5px;
            img{
              width: 32px;
              height: 32px;
            }
            span{
              height:42px;
              font-size:30px;
              font-weight:400;
              line-height:42px;
              color:rgba(51,51,51,1);
            }
          }
        }
        .account-code{
          width:220px;
          height:70px;
          background:rgba(51,51,51,1);
          border-radius:34px 0px 0px 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 30px;
          img{
            width: 48px;
            height: 48px;
            margin-right: 13px;
          }
          span{
            height:37px;
            font-size:26px;
            font-weight:400;
            line-height:37px;
            color:rgba(255,255,255,1);
          }
        }
      }
    }
    .member-icb{
      display: flex;
      width: 100%;
      background-color: #ffffff;
      height: 133px;
      div{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .num{
          height:56px;
          font-size:40px;
          font-weight:400;
          line-height:56px;
          color:rgba(255,106,89,1);
        }
        .txt{
          height:37px;
          font-size:26px;
          font-weight:400;
          line-height:37px;
          color:rgba(102,102,102,1);
        }
        &:nth-child(1){
          width: 260px;
        }
        &:nth-child(2){
          width: 230px;
        }
        &:nth-child(3){
          width: 258px;
        }
      }
      .integral,.coupon{
        &:after{
          content: '';
          position: absolute;
          width:1px;
          height:74px;
          background:rgba(229,229,229,1);
          right: 0;
        }
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
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .icon{
          width: 40px;
          margin-right: 18px;
        }
        .txt{
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        .count{
          /*width: 100%;*/
          /*text-align: right;*/
          font-size:28px;
          font-weight:400;
          color:rgba(153,153,153,1);
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
          margin-top: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            height:40px;
            font-size:28px;
            font-weight:400;
            line-height:40px;
            color:rgba(143,116,13,1);
          }
          img{
            width: 34px;
          }
        }
        .selected-card{
          margin-top: 21px;
          position: relative;
          height: 133px;
          .card-no{
            padding: 24px 19px 0 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon{
              width: 36px;
              height: 29px;
            }
            .number{
              padding-left: 20px;
              width: 100%;
              text-align: left;
              height:40px;
              font-size:28px;
              font-weight:bold;
              line-height:40px;
              color:rgba(51,51,51,1);
            }
            .drop-down{
              width: 40px;
              height: 40px;
            }
          }
          .card-money{
            height:40px;
            font-size:28px;
            font-weight:400;
            line-height:40px;
            color:rgba(143,116,13,1);
            text-align: left;
            padding-left: 86px;
          }
          &:before{
            content: '';
            position: absolute;
            width:608px;
            height:1px;
            top: 0px;
            left: 30px;
            background:rgba(229,229,229,1);
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
    .card-list-area{
      width:747px;
      background-color: #ffffff;
      .title{
        height:99px;
        font-size:36px;
        font-weight:400;
        line-height:99px;
        color:rgba(51,51,51,1);
        text-align: center;
        border-bottom: 1px rgba(229,229,229,1) solid;
      }
      .list{
        .list-item{
          height: 135px;
          margin: 0 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px rgba(229,229,229,1) solid;
          .left{
            .card-no{
              display: flex;
              justify-content: center;
              align-items: center;
              .icon{
                width: 36px;
                height: 30px;
              }
              .number{
                margin-left: 19px;
                height:40px;
                font-size:28px;
                font-weight:bold;
                line-height:40px;
                color:rgba(51,51,51,1);
              }
            }
            .card-money{
              margin-top: 11px;
              padding-left: 56px;
              height:40px;
              font-size:28px;
              font-weight:400;
              line-height:40px;
              color:rgba(143,116,13,1);
            }
          }
          .right{
            img{
              width: 48px;
              height: 48px;
            }
          }
        }
      }
      .bind-card{
        height: 136px;
        margin: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
          width: 37px;
          height: 31px;
        }
        .txt{
          height:40px;
          font-size:28px;
          font-weight:bold;
          line-height:40px;
          color:rgba(51,51,51,1);
          width: 100%;
          text-align: left;
          padding-left: 19px;
        }
        .drop-down{
          width: 48px;
          height: 48px;
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
