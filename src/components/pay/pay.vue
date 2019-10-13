<template>
  <div class="pay-page">
    <div class="head">
      <p class="store-name">{{storeName}}</p>
      <p class="lump-num">￥{{amount | formatActualMoney}}</p>
      <p class="notice" v-if="showNotice">您需要先完成支付,商家才会看到您的订单哦</p>
    </div>
    <div class="pay-way">
      <h4 class="title">选择支付方式</h4>
      <div class="way-list">

        <template v-for="(payMethod) in methods">
          <template v-if="payMethod.pay_type == '1'">
            <div class="way weixin" @click.stop="selectPayWay('wx')">
              <div class="l" v-if="userAgent === 'alipay'">
                <img class="icon" src="../../assets/img/pay/pay_icon_zhifubao@2x.png">
                <span>支付宝支付</span>
              </div>
              <div class="l" v-else>
                <img class="icon" src="../../assets/img/pay/pay_icon_weixin@2x.png">
                <span>微信支付</span>
              </div>
              <i class="selected" v-show="payType == 'wx'">
                <img src="../../assets/img/pay/option_select_yellow@2x.png">
              </i>
              <i class="unselected" v-show="payType != 'wx'">
                <img src="../../assets/img/pay/option_select_normal@2x.png">
              </i>
            </div>
          </template>
          <!--<template v-if="payMethod.pay_type == '2'">-->
            <!--<div class="way member-card" @click.stop="selectPayWay('advance')">-->
              <!--<div class="l">-->
                <!--<img class="icon" src="../../assets/img/pay/pay_icon_membercard@2x.png">-->
                <!--<span class="txt">-->
              <!--<p>会员卡支付</p>-->
              <!--<p class="balance">卡内余额：￥{{advance | formatActualMoney}}</p>-->
            <!--</span>-->
              <!--</div>-->
              <!--<i class="selected" v-show="payType == 'advance'">-->
                <!--<img src="../../assets/img/pay/option_select_yellow@2x.png">-->
              <!--</i>-->
              <!--<i class="unselected" v-show="payType != 'advance'">-->
                <!--<img src="../../assets/img/pay/option_select_normal@2x.png">-->
              <!--</i>-->
            <!--</div>-->
          <!--</template>-->
          <template v-if="payMethod.pay_type == '2'">
            <div v-for="card in cards" class="way member-card" @click.stop="selectCard(card)">
              <div class="l">
                <img class="icon" src="../../assets/img/pay/pay_icon_membercard@2x.png">
                <span class="txt">
              <p>会员卡 NO.{{card.card_no | cardNoFormat}}</p>
              <p class="balance">卡内余额：￥{{card.card_balance / 100 | formatMoney(2)}}</p>
            </span>
              </div>
              <i class="selected" v-show="payType == 'card' && selectedCard.card_no == card.card_no">
                <img src="../../assets/img/pay/option_select_yellow@2x.png">
              </i>
              <i class="unselected" v-show="payType != 'card' || selectedCard.card_no != card.card_no">
                <img src="../../assets/img/pay/option_select_normal@2x.png">
              </i>
            </div>
          </template>
        </template>
      </div>
    </div>
    <button class="btn" v-if="payable == 1" @click="goPay">确认支付：￥{{amount | formatActualMoney}}</button>
    <button class="btn" v-else >等待支付中...</button>
    <back :url="'/order_detail/quick_meal_detail/' + orderId"></back>

    <mt-popup
      v-model="payViewVisible"
      popup-transition="popup-fade"
    >
      <div class="pay-pwd-view">
        <div class="view-main">
          <div class="title">
            请输入支付密码
          </div>
          <p class="lump-num">￥{{amount | formatActualMoney}}</p>
          <ul class="pwd-wrapper">
            <li>
              <i v-if="secret.length >= 1"></i>
            </li>
            <li>
              <i v-if="secret.length >= 2"></i>
            </li>
            <li>
              <i v-if="secret.length >= 3"></i>
            </li>
            <li>
              <i v-if="secret.length >= 4"></i>
            </li>
            <li>
              <i v-if="secret.length >= 5"></i>
            </li>
            <li>
              <i v-if="secret.length >= 6"></i>
            </li>
          </ul>
          <div class="secret_notice">默认密码为手机号后6位</div>
        </div>
        <i class="close" @click="payViewVisible = false"><img src="../../assets/img/common/pop_off_black@2x.png"></i>
      </div>
    </mt-popup>
    <mt-popup
      v-model="cardPayViewVisible"
      popup-transition="popup-fade"
    >
      <div class="card-pay-pwd-view">
        <div class="view-main">
          <div class="title">
            请输入支付密码
          </div>
          <div class="lump-num">
            <input class="default" type="tel" maxlength="6" id="kb1" v-model="password" placeholder=""/>
          </div>
          <div class="action-btn">
            <span class="cancel-btn" @click.stop="cardPayViewVisible = false">
              取消
            </span>
            <span class="pay-btn" @click.stop="cardPay">
              去支付
            </span>
          </div>
        </div>
      </div>
    </mt-popup>
    <keyboard @secretCompleted="saveSecret" :paying="paying" :visible="payViewVisible"></keyboard>
  </div>
</template>

<script>
  import Keyboard from '../../base/keyboard'
  import Encrypt from '../../assets/js/encrypt/encrypt'
  import back from '../../base/back'
  import $ from 'jquery'
  export default {
    name: "pay",
    data () {
      return {
        selectIndex: 0,
        orderId: this.$route.params.orderId,
        amount: 0.0,
        methods: [],
        advance: 0.0,
        payType: 'wx',
        payViewVisible: false,
        cardPayViewVisible: false,
        password: '',
        storeName: this.$store.state.common.common_data.store_info.store_name,
        secret: '',
        paying: false,
        payable: 1,
        deskStatusTimer: null,
        showNotice: false,
        userAgent: 'weixin',
        cards: [],
        selectedCard: null
      }
    },
    components: {
      Keyboard,
      back
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (from.name === 'quick_meal_confirm' || from.name === 'quick_meal_order' || from.name === 'quick_meal_detail') {
          vm.showNotice = true
        }
      })
    },
    beforeDestroy () {
      clearInterval(this.deskStatusTimer)
    },
    mounted () {
      this.getPayMethod()
      this.getCards()
      this.checkAgent()
      this.$nextTick(() => {
        window.kb = new keyBoard({
          "chaosMode" : 1,// 混乱模式,0:无混乱;1:打开时乱一次;2:每输入一个字符乱一次,默认值0
          "pressStatus" :1,// 按键状态,0:按下、抬起按键无变化;1:按下后有放大镜效果;2:按下、抬起按键的颜色变化,默认值0
          "kbType" : 0,// 键盘类型,0:全键盘;1:纯数字键盘,默认值0
          "svg":"static/svg"//svg图片的地址
        })
        window.kb.generate()
        window.passGuard1 = new passGuard({
          "mappurl" : "http://ceshi4.sdykt.com.cn:1280/demo/send_mapping",
          "maxLength" : 6,// 最大输入长度
          "regExp1" : "[\\S\\s]",// 输入过程限制的正则
          "regExp2": "[0-9]{6,12}",
          "displayMode" : 0,// 显示形式,0:星号;1:明文,默认值0
          "callBack":this.cb1,//成功回调
          "errorCallBack":this.cb2,//失败回调3081890281810092d9d8d04fb5f8ef9b8374f21690fd46fdbf49b40eeccdf416b4e2ac2044b0cfe3bd67eb4416b26fd18c9d3833770a526fd1ab66a83ed969af74238d6c900403fc498154ec74eaf420e7338675cad7f19332b4a56be4ff946b662a3c2d217efbe4dc646fb742b8c62bfe8e25fd5dc59e7540695fa8b9cd5bfd9f92dfad009d230203010001
          // "rsaPublicKey" : "3081890281810092d9d8d04fb5f8ef9b8374f21690fd46fdbf49b40eeccdf416b4e2ac2044b0cfe3bd67eb4416b26fd18c9d3833770a526fd1ab66a83ed969af74238d6c900403fc498154ec74eaf420e7338675cad7f19332b4a56be4ff946b662a3c2d217efbe4dc646fb742b8c62bfe8e25fd5dc59e7540695fa8b9cd5bfd9f92dfad009d230203010001"// rsa公钥
          "rsaPublicKey" : "30818902818100d17951540859261bcbb00fc61a9e2fb8be1f5794dabd87e87bbac84e975ac7f6f77a094c6b642b3a799bdbdf13841a47943cfb0831578b2e4d82f177b9350e211db3dc84111eb4f0b92bc7d1379436a0f631be371682839461a11d6d2e65cb0c45c526d15429b706ff14498e3fd6c4683ca1092054f5ac95f679ba699fd789d50203010001"// rsa公钥
        })
        window.passGuard1.generate("kb1",window.kb,1)
      })
      // this.deskStatusTimer = setInterval(this.deskStatus,5000)
    },
    methods: {
      getPayMethod () {
        this.$http.post(this.API.order.pay_method,{order_id: this.orderId}).then(res => {
          if (res.return_code == '0000') {
            this.amount = res.data.amount
            this.methods = res.data.methods
            this.advance = res.data.advance
            this.payable = res.data.payable
          } else {
            this.$myToast(res.return_msg)
            return
          }
        })
      },
      goPay () {
        if (this.payType == 'advance' && this.secret.length == 0) {
          this.payViewVisible = true
        } else if (this.payType == 'card') {
          this.cardPayViewVisible = true
        } else {

          if (this.paying) {
            return
          }

          this.paying = true
          this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
          let storeId = this.$store.state.common.common_data.store_info.store_id
          this.$http.post(this.API.order.pay,{store_id: storeId, order_id: this.orderId, pay_type: this.payType,payment_code: Encrypt.encrypt(this.secret)}).then(res => {
            this.paying = false
            this.$myLoading.close()
            if (res.return_code == '0000') {
              window.location.href = res.data.pay_url
            } else if (res.return_code == '2000') {
              this.$router.push('/pay_success/'+res.data.order_id)
            } else {
              if (res.return_code == '9000') {
                this.secret = ''
                this.payViewVisible = true
              }
              this.$myToast(res.return_msg)
              return
            }
          })
        }

      },
      selectPayWay (type) {
        this.payType = type
      },
      saveSecret (secret) {
        this.secret = secret
        if (secret.length >= 6) {
          this.goPay()
        }
      },
      deskStatus () {

        let deskId = this.$store.state.common.common_data.desk_info.desk_id

        if (deskId) {
          this.$http.post(this.API.seller.desk_status,{desk_id: deskId}).then(res => {
            if (res.return_code === '0000') {
              if (res.data.status == '6') {
                this.$router.push('/pay_success/'+res.data.order_id)
              }
            }
          })
        }

      },
      checkAgent () {
        if (/MicroMessenger/.test(window.navigator.userAgent)) {
          this.userAgent = 'weixin'
        } else if (/AlipayClient/.test(window.navigator.userAgent)) {
          this.userAgent = 'alipay'
        }
      },
      getCards () {
        this.$http.post(this.API.user.member_cards,{}).then(res => {
          if (res.return_code === '0000') {
            this.cards = this.cards.concat(res.data.list)
          }
        })
      },
      selectCard (card) {
        if (card.card_balance / 100 < this.amount) {
          this.$myToast('余额不足')
          return false
        }
        this.selectedCard = card
        this.payType = 'card'
      },
      cb1 () {
        console.log('cb1')
      },
      cb2 () {
        console.log('cb2')
      },
      get_time () {
        return new Date().getTime().toString();
      },
      cardPay () {
        if (this.loading) {
          return false
        }

        if(window.passGuard1.getValid() == 1){
          this.$myToast('请输入密码')
          return false
        }

        console.log(window.passGuard1.getHash())

        let _this = this

        $.ajax( {
          url : "http://ceshi4.sdykt.com.cn:1280/demo/send_randkey?" + this.get_time(),
          type : "GET",
          async : false,
          success : function(ranKey) {
            console.log(ranKey)
            window.passGuard1.setRandKey(ranKey);
            let password = window.passGuard1.getOutput()
            _this.cardPayViewVisible = false
            console.log(password)
            _this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
            _this.loading = true
            _this.$http.post(_this.API.order.card_pay,{order_id: _this.orderId, card_no: _this.selectedCard.card_no, password: password, key: ranKey}).then(res => {
              _this.$myLoading.close()
              _this.loading = false
              if (res.return_code === '0000') {
                _this.$router.push('/pay_success/'+_this.orderId)
                return true
              } else {
                _this.$myToast(res.return_msg)
                return false
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common";
  @import "../../assets/css/mixin";
  .pay-page{
    height: 100%;
    position: relative;
    background-color: rgb(242,242,245);
    z-index: 9;
    .head{
      background-color: #ffffff;
      height: 320px;
      text-align: center;
      .store-name{
        font-size: 36px;/*px*/
        padding-top: 100px;
      }
      .lump-num{
        font-size: 60px;/*px*/
        font-weight: 600;
        margin-top: 38px;
      }
      .notice {
        height:44px;
        font-size:24px;
        font-weight:400;
        line-height:34px;
        color:rgba(153,153,153,1);
        margin-top: 20px;
      }
    }
    .pay-way{

      .title{
        padding: 0 30px;
        font-size: 26px;/*px*/
        color: #999999;
        line-height: 80px;
      }
      .way-list{
        padding: 0 30px;
        background-color: #ffffff;
        .way{
          display: flex;
          position: relative;
          height: 120px;
          justify-content: space-between;
          align-items: center;
          .l{
            display: flex;
            align-items: center;
            .icon{
              width: 64px;
              margin-right: 26px;
            }
            span{

            }
          }
          .selected{
            width: 38px;
            height: 38px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .unselected{
            width: 38px;
            height: 38px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          &:after{
            @include border-1px(#e5e5e5, bottom);
          }
        }
        .member-card{
          .l{
            .txt{
              .balance{
                font-size: 24px;/*px*/
                color: #666666;
                margin-top: 12px;
              }
            }
          }
        }
      }
    }
    .btn{
      position: absolute;
      width: 640px;
      height: 88px;
      background-color: $themeColor;
      font-size: 30px;/*px*/
      font-weight: 600;
      border-radius: 44px;
      left: 50%;
      margin-left: -320px;
      bottom: 40px;
    }
  }
  .mint-popup{
    background-color: rgba(0,0,0,0);
    top: 34%;
    .pay-pwd-view{
      position: relative;
      width: 670px;
      .view-main{
        background-color: #ffffff;
        text-align: center;
        border-radius: 8px;
        overflow: hidden;
        .title{
          font-size: 32px;/*px*/
          line-height: 88px;
          background-color: $themeColor;
        }
        .lump-num{
          font-size: 60px;/*px*/
          font-weight: 600;
          padding: 50px 0 40px 0;
        }
        .pwd-wrapper{
          display: flex;
          justify-content: space-between;
          padding: 0 50px 0 50px;
          li{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 86px;
            height: 86px;
            background-color: #f2f2f5;
            border-radius: 6px;
            i{
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background-color: #333333;
            }
          }
        }
        .secret_notice{
          margin: 40px 0;
          font-size: 26px;
          color: #999999;
        }
      }
      .close{
        display: block;
        position: absolute;
        width: 44px;
        top: 20px;
        right: 20px;
        img{
          width: 100%;
        }
      }
    }
    .card-pay-pwd-view{
      position: relative;
      width: 670px;
      .view-main{
        background-color: #ffffff;
        text-align: center;
        border-radius: 8px;
        overflow: hidden;
        .title{
          font-size: 32px;/*px*/
          line-height: 88px;
        }
        .lump-num{
          font-size: 60px;/*px*/
          font-weight: 600;
          padding: 20px 0 40px 0;
          input{
            width: 400px;
            height: 60px;
            font-size: 26px;
            border: 1px #999999 solid;
            padding: 0 5px;
          }
        }
        .action-btn{
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            width:50%;
            height:88px;
            line-height: 88px;
            text-align: center;
            font-size:30px;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
          .cancel-btn{
            background:rgba(238,238,238,1);
            border-radius: 0px 0px 0px 8px;
          }
          .pay-btn{
            background:rgba(255,215,38,1);
            border-radius: 0px 0px 8px 0px;
          }
        }
      }
    }
  }
</style>
