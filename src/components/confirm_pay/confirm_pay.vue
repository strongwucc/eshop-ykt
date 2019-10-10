<template>
  <div class="confirm-pay-page">
    <div class="steps">
      <div class="step in-progress">
        <div class="icon">1</div>
        <p class="txt">确认商品</p>
      </div>
      <div class="step in-progress">
        <div class="icon">2</div>
        <p class="txt">商户确认</p>
      </div>
      <div class="step in-progress">
        <div class="icon">
          <img src="../../assets/img/pay/order_step_ic_tick_pre@2x.png">
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

    <div class="deduction">
      <div class="coupon" @click="showUsableCoupon">
        <span class="label">
          优惠券
        </span>
        <div class="r">
          <span class="usable" v-if="couponCode">
            {{couponName}}
          </span>
          <span class="unusable" v-else-if="coupons.length === 0">
            无可用的优惠券
          </span>
          <span class="useble" v-else>
            {{coupons.length}}张
          </span>
          <img src="../../assets/img/common/arrow_right@2x.png">
        </div>
      </div>
      <div class="integral">
        <span class="label">积分</span>
        <div class="r" @click="showUsebleIntegral">
          <span class="unusable" v-if="!score">
            未使用积分（{{point.total_point}}可用）
          </span>
          <span class="usable" v-else>
            已使用{{score}}积分
          </span>
          <img src="../../assets/img/common/arrow_right@2x.png">
        </div>
      </div>
    </div>
    <div class="floating">
      <div class="plus-goods" @click="addDish">
        <img class="icon" src="../../assets/img/shop_cart/shop_icon_plus@2x.png">
        加菜
      </div>
      <div class="wait-pay">
        <div class="lump-sum">
          <span>合计</span>
          <span class="amount">￥{{pay_amount | formatActualMoney}}</span>
        </div>
        <button @click="goPay" v-if="payable == 1">确认支付</button>
      </div>
    </div>
    <use-coupons v-model="useCouponsViewVisible" :total-amount="total_amount" :coupons="coupons" @cancelUseCouponCallback="cancelUseCoupon" @useCouponCallback="useCoupon"></use-coupons>
    <use-integral :point="point" v-model="useIntegralViewVisible" @usePointCallback="useScore" @autoScroll="autoScroll"></use-integral>
  </div>
</template>

<script>
  import GoodsReadyPay from '../../base/goods_ready_pay'
  import UseIntegral from './use_integral'
  import UseCoupons from './use_coupon'
  import {mapState} from 'vuex'
  export default {
    name: "confirm_pay",
    data () {
      return {
        useIntegralViewVisible: false,
        useCouponsViewVisible: false,
        deskId: this.$route.params.deskId,
        cart: [],
        score: 0,
        couponCode: '',
        couponDiscount: 0,
        couponName: '',
        point: {
          total_point: 0,
          point_setting: 1
        },
        coupons: [],
        payable: 1,
        deskStatusTimer: null,
      }
    },
    components: {
      GoodsReadyPay, UseIntegral, UseCoupons
    },
    mounted () {
      this.getConfirmPayInfo()
      this.deskStatusTimer = setInterval(this.deskStatus, 5000)
    },
    beforeDestroy () {
      clearInterval(this.deskStatusTimer)
    },
    computed: {
      ...mapState({
        storeId: state => state.common.common_data.store_info.store_id
      }),
      total_amount: function () {
        let total_amount = 0
        this.cart.forEach(cartItem => {
          cartItem.dishes.forEach(dishItem => {
            total_amount += parseFloat(dishItem.member_subtotal*dishItem.num)
            total_amount += parseFloat(dishItem.adjunct_member_subtotal*dishItem.num)
          })
        })
        return this.NP.round(total_amount,2)
      },
      pay_amount: function () {
        let pay_amount = 0
        this.cart.forEach(cartItem => {
          cartItem.dishes.forEach(dishItem => {
            pay_amount += parseFloat(dishItem.member_subtotal*dishItem.num)
            pay_amount += parseFloat(dishItem.adjunct_member_subtotal*dishItem.num)
          })
        })
        pay_amount = pay_amount - this.score * this.point.point_rate
        pay_amount = pay_amount - this.couponDiscount

        pay_amount = pay_amount > 0 ? pay_amount : 0

        return this.NP.round(pay_amount,2)
      }
    },
    methods: {
      addDish () {
        let storeId = this.$store.state.common.common_data.store_info.store_id
        this.$router.push('/store/'+storeId+'/'+this.deskId+'?appending=1')
      },
      getConfirmPayInfo () {
        let storeId = this.$store.state.common.common_data.store_info.store_id
        this.$http.post(this.API.order.confirm_pay,{store_id: storeId, desk_id: this.deskId}).then(res => {
          if (res.return_code == '0000') {
            this.cart = res.data.cart
            this.point = res.data.point
            this.coupons = res.data.coupon
            this.payable = res.data.payable
          } else {
            this.$myToast(res.return_msg)
            return
          }
        })
      },
      showUsebleIntegral () {
        if (this.point.point_setting == 2 && this.point.total_point > 0) {
          this.useIntegralViewVisible = true
        } else {
          this.$myToast('没有可用积分或者商户未开启积分抵扣')
        }
      },
      showUsableCoupon () {
        if (this.coupons.length === 0) {
          return false
        }
        this.useCouponsViewVisible = true
      },
      useScore (score) {
        this.score = score
      },
      useCoupon (data) {
        this.couponCode = data.coupon.code
        this.couponDiscount = data.discount

        if (data.coupon.card_type === 'CASH') {
          if (data.coupon.least_cost > 0) {
            this.couponName = '满减券'+parseInt(data.coupon.reduce_cost)+'元'
          } else {
            this.couponName = '代金券'+parseInt(data.coupon.reduce_cost)+'元'
          }
        } else if (data.coupon.card_type === 'DISCOUNT') {
          this.couponName = '折扣券'+(100 - data.coupon.discount)/10+'折'
        }
      },
      cancelUseCoupon () {
        this.couponCode = ''
        this.couponDiscount = 0
      },
      goPay () {
        let payData = {desk_id: this.deskId, payment: 'wxpaynative'}
        if (this.score > 0) {
          payData.score = this.score
        }
        if (this.couponCode) {
          payData.coupon = this.couponCode
        }

        payData.store_id = this.storeId

        this.$http.post(this.API.order.order_create,payData).then(res => {
          if (res.return_code == '200') {
            this.$router.push('/pay_success/' + res.data.order_id)
          } else if (res.return_code == '0000') {
            this.$router.push('/pay/'+res.data.order_id)
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
              if (res.data.status == '3') {
                this.$router.push('/merchant_confirm/'+this.deskId)
              } else if (res.data.status == '4' || res.data.status == '5') {
                this.$router.push('/order_detail/dine_detail/'+res.data.order_id)
              } else if (res.data.status == '6') {
                this.$router.push('/order_detail/dine_detail/'+res.data.order_id)
              }
            }
          })
        }

      },
      autoScroll () {
        window.scroll(0,0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .confirm-pay-page{
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
    .deduction{
      margin-top: 10px;
      background-color: #ffffff;
      padding: 40px 30px;
      .integral{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 40px;
        .label{
          font-weight: 700;
        }
        .r{
          display: flex;
          align-items: center;
          .usable{
            color: #ff2e2e;
          }
          .unusable{
            color: #bbbbbb;
          }
          img{
            margin-left: 4px;
            width: 36px;
          }
        }
      }
      .coupon{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .label{
          font-weight: 700;
        }
        .r{
          display: flex;
          align-items: center;
          .unusable{
            color: #bbbbbb;
          }
          .usable{
            color: #ff2e2e;
          }
          img{
            margin-left: 4px;
            width: 36px;
          }
        }
      }
    }
    .floating{
      display: flex;
      justify-content: space-between;
      position: fixed;
      width: 690px;
      left: 50%;
      margin-left: -345px;
      bottom: 40px;
      .plus-goods{
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
      .wait-pay{
        width: 480px;
        height: 88px;
        background-color: #ffffff;
        border-radius: 44px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-shrink: 0;
        border:1px solid #F2F2F5;
        .lump-sum{
          flex-grow: 1;
          font-size: 28px;/*px*/
          display: flex;
          align-items: center;
          justify-content: center;
          .amount{
            font-size: 32px;/*px*/
            color: #ff2e2e;
            font-weight: 600;
          }
        }
        button{
          width: 220px;
          height: 88px;
          border-radius: 44px;
          background-color: $themeColor;
          font-size: 30px;
          font-weight: 700;
        }
      }
    }

  }
</style>
