<template>
  <div class="floating-box">
    <div class="features">
      <div class="title" @click="featuresViewtoggle">
        <img class="icon" src="../assets/img/home/icon_function@2x.png">
        功能
      </div>
      <ul class="list" v-show="featuresViewVisible">
        <!--<li @click="$router.push({name: 'store', params: {storeId: storeId, deskId: deskId, people}})">点餐首页</li>-->
        <li @click="$router.push('/center')">会员中心</li>
        <li @click="$router.push('/my_order/dine')">我的订单</li>
        <li @click="$router.push('/my_coupons')">我的优惠券</li>
        <li @click="$router.push('/shop_cart')">购物车</li>
        <li v-if="appending" @click="$router.push({name: 'confirm_pay', params: {deskId: deskId}})">结账</li>
      </ul>
    </div>

    <div class="shopping-cart" @click="goShopCart">
      <div class="circle" ref="cartContainer">
        <div class="num" v-if="totalNum">{{totalNum}}</div>
      </div>
      <p class="total">￥<span>{{totalPrice | formatActualMoney}}</span></p>
    </div>

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "floating",
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
        userCart: state => state.user.user_cart,
        deskId: state => state.common.common_data.desk_info.desk_id,
        storeId: state => state.common.common_data.store_info.store_id,
        people: state => state.common.common_data.desk_info.info.people,
      }),
      // 购物车中总共商品的数量
      totalNum: function () {
        let num = 0
        if (this.userCart.goods_list) {
          this.userCart.goods_list.forEach(cartItem => {
            num += parseInt(cartItem.num)
          })
        }
        return num
      },

      //商品总金额
      totalPrice: function () {
        let goodsPrice = 0
        let adjunctsPrice = 0

        if (this.userCart.goods_list) {
          this.userCart.goods_list.forEach(goodsItem => {
            goodsPrice += goodsItem.num * goodsItem.price
          })
        }

        if (this.userCart.adjunct_list) {
          let adjunctIndex;
          for (adjunctIndex in this.userCart.adjunct_list) {
            this.userCart.adjunct_list[adjunctIndex].forEach(adjunctGoodsItem => {
              adjunctGoodsItem.forEach(adjunctItem => {
                adjunctsPrice += adjunctItem.num * adjunctItem.price
              })
            })
          }
        }

        let price = this.NP.round(goodsPrice + adjunctsPrice,2)
        return price
      }
    },
    created () {
    },

    methods: {
      //功能菜单显示
      featuresViewtoggle () {
        this.featuresViewVisible = !this.featuresViewVisible
      },

      goShopCart () {
        if (this.appending) {
          this.$router.push('/shop_cart?appending=1')
        } else {
          this.$router.push('/shop_cart')
        }
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
    }
  }
</style>
