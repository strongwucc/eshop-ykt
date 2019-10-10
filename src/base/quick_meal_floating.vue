<template>
  <div class="floating-box" ref="floatingBox">
    <div class="features">
      <div class="title" @click="featuresViewtoggle">
        <img class="icon" src="../assets/img/home/icon_function@2x.png">
        功能
      </div>
      <ul class="list" v-show="featuresViewVisible">
        <li @click="$router.push('/quick_meal_center')">会员中心</li>
        <li @click="$router.push('/quick_meal_order')">我的订单</li>
        <li @click="$router.push('/my_coupons')">我的优惠券</li>
      </ul>
    </div>

    <div class="shopping-cart">
      <div class="circle" ref="cartContainer" @click="showCart">
        <div class="num" v-if="totalNum">{{totalNum}}</div>
      </div>
      <p class="total" v-if="totalNum > 0" @click="showCart">￥<span>{{totalPrice | formatActualMoney}}</span></p>
      <p class="empty" v-else @click="showCart"><span>空空如也</span></p>
      <p class="action" @click.stop="goSettle">去结算</p>
      <!--<p class="action" v-if="totalPrice >= minimum" @click.stop="goSettle">去结算</p>-->
      <!--<p class="action" v-else>起送￥{{minimum}}</p>-->
    </div>

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "quick_meal_floating",
    data () {
      return {
        featuresViewVisible: false,//显示功能列表
      }
    },

    props: {
      appending: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState({
        cartInfo: state => state.cart.cart,
        storeInfo: state => state.common.common_data.store_info,
      }),
      // 购物车中总共商品的数量
      totalNum: function () {
        let num = 0
        if (this.cartInfo.cartList.length > 0) {
          this.cartInfo.cartList.forEach(cartItem => {
            num += parseInt(cartItem.num)
          })
        }
        return num
      },

      //商品总金额
      totalPrice: function () {
        let goodsPrice = 0
        let adjunctsPrice = 0

        if (this.cartInfo.cartList.length > 0) {
          this.cartInfo.cartList.forEach(goodsItem => {
            goodsPrice += goodsItem.num * goodsItem.member_price
            if (goodsItem.adjunct.length > 0) {
              goodsItem.adjunct.forEach(adjunctItem => {
                adjunctsPrice += adjunctItem.num * adjunctItem.member_price
              })
            }
          })
        }

        let price = this.NP.round(goodsPrice + adjunctsPrice,2)
        return price
      },

      minimum () {
        let storeInfo = this.$store.state.common.common_data.store_info
        return storeInfo.minimum ? storeInfo.minimum : 0.01
      }
    },
    created () {
    },

    methods: {
      //功能菜单显示
      featuresViewtoggle () {
        this.featuresViewVisible = !this.featuresViewVisible
      },

      showCart () {
        this.$emit('showCart')
      },
      goSettle () {
        if (this.totalNum <= 0) {
          this.$myToast('空空如也')
          return false
        }
        this.$router.push('/quick_meal_confirm')
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
      width: 490px;
      height: 88px;
      margin-left: 24px;
      border-radius: 44px;
      background-color: rgba(255,215,59,.9);
      .circle{
        flex-shrink: 0;
        position: relative;
        width: 82px;
        height: 82px;
        border-radius: 50%;
        background: url("../assets/img/home/icon_cart@2x.png") no-repeat;
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
          font-size: 36px;/*px*/
          font-weight: 700;
          color: #333333;
        }
      }
      .empty {
        flex-grow: 1;
        text-align: center;
        font-size: 24px;/*px*/
        span {
          font-size: 28px;
          font-weight: 700;
          color: #333333;
        }
      }
      .action{
        /*flex-grow: 1;*/
        width: 180px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        font-size: 28px;/*px*/
        background-color: #474747;
        border-radius: 0 44px 44px 0;
        color: rgba(255,215,59,.9);;
      }
    }
  }
</style>
