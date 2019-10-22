<template>
  <div class="confirm-pay-page">
    <div class="addr-area" @click="showAddr">
      <div class="selected" v-if="usedAddr.addr_id > 0">
        <div class="title">订单将配送至</div>
        <div class="addr">
          <div class="icon-left"><img src="../../assets/img/common/arrow_right@2x.png"></div>
          <div class="content">{{usedAddr.area + usedAddr.addr}}</div>
          <div class="icon-right"><img src="../../assets/img/common/arrow_right@2x.png"></div>
        </div>
        <div class="contact">
          <div class="name">{{usedAddr.name}}</div>
          <div class="tel">{{usedAddr.mobile}}</div>
        </div>
      </div>
      <div class="empty" v-else></div>
    </div>
    <div class="goods-ready-pay" :style="{visibility: 'visible'}">
      <div class="base-info">
        <div class="l">
          <img v-if="storeLogo" src="../../assets/img/pay/order_img_shop@2x.png">
          <img v-else src="../../assets/img/pay/order_img_shop@2x.png">
          <span class="title">{{storeName}}</span>
        </div>
      </div>

      <div class="goods-category">
        <ul class="goods-list">
          <li v-for="(item, index) in cartList">
            <img class="goods-pic" v-if="item.image_url" v-lazy="item.image_url">
            <img class="goods-pic" v-else src="../../assets/img/common/goods_img_default_100@2x.png">
            <div class="goods-info">
              <div class="l">
                <p class="goods-name">{{item.name | longStrFormat(17)}}<span class="unit">/{{item.unit}}</span></p>
                <p class="adjuncts">
                  <template v-if="item.taste.length > 0">
                    <template v-for="(props, index) in item.taste">
                      <span v-for="(taste, i) in props.items">
                        {{taste.props_name}}
                        <template>{{i === item.taste.length - 1 ? '；' : '，'}}</template>
                      </span>
                    </template>
                  </template>
                  <template v-if="item.adjunct.length > 0">
                      <span v-for="(adjunct, j) in item.adjunct">
                        {{adjunct.name + '×' + adjunct.num}}
                        <template>{{j === item.adjunct.length - 1 ? '；' : '，'}}</template>
                      </span>
                  </template>
                </p>
              </div>
              <div class="r">
                <div class="price">
                  <p class="finally-price">￥{{item.member_price | formatActualMoney}}</p>
                  <p class="original-price" v-if="NP.round(parseFloat(item.price) - parseFloat(item.member_price),2) > 0">￥{{item.price | formatActualMoney}}</p>
                </div>
              </div>
              <p class="single-total">×{{item.num}}</p>
            </div>

          </li>
        </ul>
      </div>
      <div class="extra-area">
        <div class="pack-area">
          <div class="title">打包盒</div>
          <div class="content">￥3</div>
        </div>
        <div class="delivery-area">
          <div class="title">配送费</div>
          <div class="content">￥6</div>
        </div>
      </div>
      <div class="remark">
        <span>备注：</span>
      </div>

      <div class="sum-up">
        <div class="l">
          商品共{{totalData.num}}份
        </div>
        <div class="r">
          <div class="member-discount">
            <div class="member-label">{{lvName}}</div>
            <div class="discount-amount">
              <span class="txt">已优惠</span>
              <span class="num">￥{{totalData.discount | formatActualMoney}}</span>
            </div>
          </div>
          <div class="lump-sum">
            <span class="txt">小计</span>
            <span class="num">￥{{totalData.total | formatActualMoney}}</span>
          </div>
        </div>
      </div>
    </div>

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
      <div class="features">
        <div class="title" @click="featuresViewtoggle">
          <img class="icon" src="../../assets/img/home/icon_function@2x.png">
          功能
        </div>
        <ul class="list" v-show="featuresViewVisible">
          <li @click="$router.push('/center')">会员中心</li>
          <li @click="$router.push('/my_order/dine')">我的订单</li>
          <li @click="$router.push('/my_coupons')">我的优惠券</li>
          <li @click="$router.push('/shop_cart')">购物车</li>
        </ul>
      </div>
      <div class="wait-pay">
        <div class="lump-sum">
          <span>合计</span>
          <span class="amount">￥{{pay_amount | formatActualMoney}}</span>
        </div>
        <button @click="goPay">提交订单</button>
      </div>
    </div>
    <my-address :addrs="addrs" v-model="useAddrViewVisible" @useAddrCallback="useAddr"></my-address>
    <use-integral :point="point" v-model="useIntegralViewVisible" @usePointCallback="useScore"></use-integral>
    <use-coupons v-model="useCouponsViewVisible" :total-amount="total_amount" :coupons="coupons" @cancelUseCouponCallback="cancelUseCoupon" @useCouponCallback="useCoupon"></use-coupons>
  </div>
</template>

<script>
  import MyAddress from './use_addr'
  import UseIntegral from './use_integral'
  import UseCoupons from './use_coupon'
  import {mapState} from 'vuex'
  export default {
    name: "take_out_confirm",
    data () {
      return {
        useAddrViewVisible: false,
        useIntegralViewVisible: false,
        useCouponsViewVisible: false,
        score: 0,
        couponCode: '',
        couponDiscount: 0,
        couponName: '',
        point: {
          total_point: 0,
          point_setting: 1
        },
        coupons: [],
        featuresViewVisible: false,//显示功能列表
        addrs: [],
        usedAddr: {
          addr_id: '',
          area: '',
          addr: '',
          name: '',
          mobile: '',
          def_addr: ''
        }
      }
    },
    components: {
      MyAddress, UseIntegral, UseCoupons
    },
    mounted () {
      this.getConfirmPayInfo()
    },
    beforeDestroy () {
      clearInterval(this.deskStatusTimer)
    },
    computed: {
      ...mapState({
        storeId: state => state.common.common_data.store_info.store_id,
        storeName: state => state.common.common_data.store_info.store_name,
        storeLogo: state => state.common.common_data.store_info.store_log,
        lvName: state => state.user.user_info.lv_name,
        cartList: state => state.cart.cart.cartList,
      }),
      //商品总金额
      totalData: function () {
        let total = 0
        let discount = 0
        let num = 0
        let cartList = this.$store.state.cart.cart.cartList
        cartList.forEach(cartItem => {
          num += parseInt(cartItem.num)
          total += cartItem.price*cartItem.num
          discount += (cartItem.price - cartItem.member_price) * cartItem.num
          cartItem.adjunct.forEach(adjunctItem => {
            total += adjunctItem.price*adjunctItem.num
            discount += (adjunctItem.price - adjunctItem.member_price) * adjunctItem.num
          })
        })
        return {num: num, total: this.NP.round(total,2), discount: this.NP.round(discount,2)}
      },
      total_amount: function () {
        let total_amount = 0
        let cartList = this.$store.state.cart.cart.cartList
        cartList.forEach(cartItem => {
          total_amount += parseFloat(cartItem.member_price*cartItem.num)
          cartItem.adjunct.forEach(adjunctItem => {
            total_amount += parseFloat(adjunctItem.member_price*adjunctItem.num)
          })
        })
        return this.NP.round(total_amount,2)
      },
      pay_amount: function () {
        let pay_amount = 0
        let cartList = this.$store.state.cart.cart.cartList
        cartList.forEach(cartItem => {
          pay_amount += parseFloat(cartItem.member_price*cartItem.num)
          cartItem.adjunct.forEach(adjunctItem => {
            pay_amount += parseFloat(adjunctItem.member_price*adjunctItem.num)
          })
        })
        pay_amount = pay_amount - this.score * this.point.point_rate
        pay_amount = pay_amount - this.couponDiscount

        pay_amount = pay_amount > 0 ? pay_amount : 0

        return this.NP.round(pay_amount,2)
      }
    },
    methods: {
      getConfirmPayInfo () {
        let storeId = this.$store.state.common.common_data.store_info.store_id
        this.$http.post(this.API.order.out_confirm_pay,{store_id: storeId, total_amount: this.total_amount}).then(res => {
          if (res.return_code == '0000') {
            this.point = res.data.point
            this.coupons = res.data.coupon
            this.addrs = res.data.addrs

            this.addrs.every(addrItem => {
              if (addrItem.def_addr === '1') {
                this.usedAddr = Object.assign({},addrItem)
                return false
              }
              return true
            })

          } else {
            this.$myToast(res.return_msg)
            return
          }
        })
      },
      showAddr () {
        // if (this.addrs.length === 0) {
        //   return false
        // }
        this.useAddrViewVisible = true
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
          this.couponName = '代金券'+parseInt(data.coupon.reduce_cost)+'元'
        } else if (data.coupon.card_type === 'REDUCE') {
          this.couponName = '满减券'+parseInt(data.coupon.reduce_cost)+'元'
        } else if (data.coupon.card_type === 'DISCOUNT') {
          this.couponName = '折扣券'+(100 - data.coupon.discount)/10+'折'
        }
      },
      useAddr (selectedIndex) {
        let addrs = this.addrs
        addrs.forEach((addrItem, addrIndex) => {
          if (selectedIndex == addrIndex) {
            addrs[addrIndex].def_addr = '1'
          } else {
            addrs[addrIndex].def_addr = '0'
          }
        })
        this.addrs = addrs
        this.usedAddr = Object.assign({},addrs[selectedIndex])
        this.useAddrViewVisible = false
      },
      cancelUseCoupon () {
        this.couponCode = ''
        this.couponDiscount = 0
      },
      goPay () {

      },
      //功能菜单显示
      featuresViewtoggle () {
        this.featuresViewVisible = !this.featuresViewVisible
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
    .addr-area {
      background-color: #ffffff;
      padding: 0 30px;
      margin-bottom: 10px;
      .empty {

      }
      .selected {
        margin-top: 40px;
        .title {
          font-size: 28px;
          color: #999999;
        }
        .addr {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          .icon-left, .icon-right {
            flex-grow: 1;
            img {
              width: 30px;
              height: 30px;
            }
          }
          .icon-right {
            display: flex;
            justify-content: flex-end;
          }
          .content {
            flex-grow: 8;
            font-size: 36px;
            line-height: 50px;
            text-align: left;
            color: #333333;
            font-weight: 600;
            padding: 0 10px;
          }
        }
        .contact {
          padding: 20px 0 40px 40px;
          display: flex;
          font-size: 28px;
          .tel {
            margin-left: 20px;
          }
        }
      }
    }
    .goods-ready-pay{
      .base-info{
        display: flex;
        justify-content: flex-start;
        height: 100px;
        background-color: #ffffff;
        padding: 0 30px;
        .l{
          position: relative;
          flex-grow: 1;
          display: flex;
          height: 100%;
          align-items: center;
          img{
            width: 44px;
            margin-right: 10px;
          }
          &:after {
            @include border-1px(#e5e5e5, bottom);
          }
        }
      }
      .goods-category{
        background-color: #ffffff;
        padding: 0 30px;
        .head{
          display: flex;
          position: relative;
          justify-content: space-between;
          align-items: center;
          height: 70px;
          font-size: 24px;/*px*/
          .category-total{
            color: #666666;
          }
          &:after{
            @include border-1px(#e5e5e5, bottom);
          }
        }
        .goods-list{
          position: relative;
          padding-top: 40px;
          li{
            padding-bottom: 30px;
            display: flex;

            .goods-pic{
              width: 100px;
              height: 100px;
              flex-shrink: 0;
              margin-right: 20px;
              border-radius: 8px;
            }
            .goods-info{
              position: relative;
              flex-grow: 1;
              display: flex;
              justify-content: space-between;
              min-height: 100px;
              padding-bottom: 26px;
              .l{
                width: 340px;
                .goods-name{
                  font-weight: 600;
                  line-height: 36px;
                  margin-top: -4px;
                  margin-bottom: 6px;
                  .unit{
                    font-size: 24px;
                    color: #999999;
                  }
                }
                .adjuncts{
                  font-size: 24px;/*px*/
                  color: #999999;
                  transform: scale(0.917);
                  transform-origin: top left;
                  line-height: 30px;
                }
              }
              .r{
                .price{
                  text-align: right;
                  .finally-price{
                    font-size: 30px;
                    font-weight: 600;
                    margin-bottom: 10px;
                  }
                  .original-price{
                    font-size: 24px;
                    color: #999999;
                    text-decoration: line-through;
                  }
                }
              }

              .single-total{
                position: absolute;
                font-size: 24px;/*px*/
                color: #999999;
                bottom: 0;
                left: 0;
              }
            }
          }
          &:after{
            @include border-1px(#e5e5e5, bottom);
          }
        }
      }
      .extra-area{
        height: 160px;
        padding: 0 30px;
        background-color: #ffffff;
        font-size: 28px;/*px*/
        .pack-area, .delivery-area {
          display: flex;
          justify-content: space-between;
          height: 80px;
          line-height: 80px;
          .content {
            font-weight: 600;
          }
        }
        .delivery-area {
          position: relative;
          &:after{
            @include border-1px(#e5e5e5, bottom);
          }
        }
      }
      .remark{
        height: 100px;
        padding: 0 30px;
        line-height: 100px;
        background-color: #ffffff;
        font-size: 26px;/*px*/
        span{
          font-weight: 700;
          font-size: 28px;/*px*/
        }
      }
      .sum-up{
        display: flex;
        justify-content: space-between;
        background-color: #ffffff;
        margin-top: 10px;
        padding: 40px 30px;

        .r{
          .member-discount{
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-bottom: 24px;
            .member-label{
              font-size: 24px;/*px*/
              padding: 6px;
              position: relative;
              color: #666666;
              transform: scale(0.833);
              transform-origin: center;
              margin-right: 10px;
              &:after{
                @include all-border-1px(#666666, 4px);
              }
            }
            .discount-amount{
              .num{
                display: inline-block;
                margin-left: 20px;
                text-align: right;
              }
            }
          }
          .lump-sum{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .num{
              font-size: 32px;
              display: inline-block;
              font-size: 38px;
              font-weight: bold;
              /*color: #ff2e2e;*/
              margin-left: 20px;
              text-align: right;
            }
          }
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
        background-color: $themeColor;
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
            font-weight: 600;
          }
        }
        button{
          width: 180px;
          height: 88px;
          border-radius: 0 44px 44px 0;
          background-color: rgba(51,51,51,.9);
          font-size: 28px;
          color: $themeColor;
        }
      }
    }

  }
</style>
