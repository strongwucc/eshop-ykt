<template>
  <div class="cart-specification" ref="cartSpecification">
    <div class="title" ref="title">
      <div class="left">购物车（共{{cartNum}}件）</div>
      <div class="right" @click.stop="clearCart(storeId)"><img src="../assets/img/shop_cart/shop_icon_del@2x.png"/><span>清空购物车</span></div>
    </div>
    <div class="wrapper" ref="wrapper">
      <div class="specification" ref="specification">
        <ul class="order-list">
          <li v-for="cartItem in cartList">
            <div class="main">
              <p class="goods-name">{{cartItem.name | longStrFormat(11)}}<span class="unit">/{{cartItem.unit}}</span></p>
              <div class="r">
                <div class="price">
                  <p class="finally-price"><span class="member-tip" v-if="NP.round(parseFloat(cartItem.price) - parseFloat(cartItem.member_price),2) > 0">会员价</span>￥{{cartItem.member_price | formatActualMoney}}</p>
                  <p class="original-price" v-if="NP.round(parseFloat(cartItem.price) - parseFloat(cartItem.member_price),2) > 0">￥{{cartItem.price | formatMoney | formatActualMoney}}</p>
                </div>
                <buy-cart :foods="cartItem" :type="1"></buy-cart>
              </div>
            </div>
            <div class="minor">
              <p class="adjuncts">
                <template v-if="cartItem.taste.length > 0">
                  <template v-for="(props, index) in cartItem.taste">
                      <span v-for="(taste, i) in props.items">
                        {{taste.props_name}}
                        <template>{{i === cartItem.taste.length - 1 ? '；' : '，'}}</template>
                      </span>
                  </template>
                </template>
                <template v-if="cartItem.adjunct.length">
                    <span v-for="(adjunct, j) in cartItem.adjunct">{{adjunct.name + '×' + adjunct.num}}<template>{{j === cartItem.adjunct.length - 1 ? '；' : '，'}}</template></span>
                </template>
              </p>
              <div class="r">
              </div>
            </div>
          </li>
        </ul>
        <div class="filler"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import BuyCart from './take_out_buy_cart'
  export default {
    name: "quick_meal_cart_info",
    components: {BuyCart},
    data () {
      return {
      }
    },
    props: [],
    watch: {
    },
    mounted () {
      this.$nextTick(() => {
        // this.wrapperAttr()
      })

    },
    computed: {
      ...mapState({
        cartList: state => state.cart.cart.cartList,
        storeId: state => state.common.common_data.store_info.store_id
      }),
      cartNum () {
        let cartList = this.$store.state.cart.cart.cartList
        let totalNum = 0
        cartList.forEach((cartItem, cartIndex) => {
          totalNum += cartItem.num
        })
        return totalNum
      }
    },
    methods: {
      ...mapMutations([
        'addCart',
        'reduceCart',
        'clearCart'
      ]),
      //当规格列表过长时，外层包裹框固定高度，使之可以滚动
      wrapperAttr () {
        if (this.cartItem) {
          const maxHeight = this.$refs.cartSpecification.offsetHeight
          const headHeight = this.$refs.title.offsetHeight
          const scrollHeight = this.$refs.specification.offsetHeight
          if (scrollHeight > maxHeight - headHeight) {
            this.$refs.wrapper.style.height = maxHeight - headHeight + 'px'
          }
        }
      },
      addToCart () {
        let storeId = this.common.common_data.store_info.store_id

        let goods = {}
        goods.product_id = this.cartItem.product.product_id
        goods.goods_bn = this.cartItem.bn
        goods.bn = this.cartItem.product.bn
        goods.name = this.cartItem.product.name
        goods.image_url = this.cartItem.image_url
        goods.price = this.cartItem.price
        goods.member_price = this.cartItem.member_price
        goods.num = 1
        goods.unit = this.cartItem.unit
        goods.catId = this.cartItem.cat_id

        let adjunctData = [];
        this.adjunctsData.forEach(adjunctItem => {
          var adjunct = {goods_bn: adjunctItem.bn, num: adjunctItem.num, price: adjunctItem.price, member_price: adjunctItem.member_price}
          adjunctData.push(adjunct)
        })

        goods.adjunct = adjunctData
        goods.taste = this.tastesData

        this.addCart({storeId: storeId, catId: this.cartItem.cat_id, goods: goods})

        this.$emit('closeCart')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/mixin";
  @import "../assets/css/common";
  .cart-specification{
    /*max-height: 1100px;*/
    background-color: #ffffff;
    /*padding: 0 30px;*/
    ::-webkit-scrollbar {
      display: none;
    }
    /*border-radius: 20px 20px 0 0;*/
    .title{
      display: flex;
      justify-content: space-between;
      padding: 20px;
      font-size:28px;
      font-weight:400;
      color:rgba(51,51,51,1);
      background-color: #F2F2F5;
      /*border-radius: 20px 20px 0 0;*/
      .left {
        height: 36px;
        line-height: 36px;
        text-align: center;
      }
      .right {
        display: flex;
        height: 36px;
        line-height: 36px;
        text-align: center;
        img {
          width: 36px;
          height: 36px;
          margin-right: 5px;
        }
        span {
          /*font-weight: 700;*/
        }
      }
    }
    &:after{
      @include border-1px(#e5e5e5, bottom);
    }
  }
  .wrapper{
    overflow-y: scroll;
    -webkit-overflow-scrolling : touch;
    height: 800px;
    .specification{
      .order-list{
        padding: 30px 30px 0 30px;
        li{
          padding-bottom: 30px;
          .main{
            display: flex;
            align-items: flex-start;
            min-height: 50px;
            .goods-name{
              font-weight: 400;
              line-height: 1.5;
              width: 45%;
              padding-right: 16px;
              .unit{
                font-size: 24px;/*px*/
                color: #999999;
              }
            }
            .r{
              position: relative;
              width: 55%;
              display: flex;
              justify-content: flex-end;
              align-items: flex-start;
              .price{
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                padding-right: 20px;
                margin-right: 170px;
                .finally-price{
                  position: relative;
                  font-size: 32px;/*px*/
                  font-weight: 400;
                  line-height: 1.5;
                  .member-tip{
                    position: absolute;
                    width: 100px;
                    height: 37px;
                    font-size: 24px;/*px*/
                    background: url("../assets/img/shop_cart/shop_label@2x.png");
                    background-size: 100% 100%;
                    text-align: left;
                    padding-left: 10px;
                    line-height: 37px;
                    transform: scale(0.75);
                    transform-origin: center;
                    left: -90px;
                    top: 50%;
                    margin-top: -18px;
                  }
                }
                .original-price{
                  font-size: 24px;/*px*/
                  line-height: 1.5;
                  color: #999999;
                  text-decoration: line-through;
                }
              }

            }
          }
          .minor {
            display: flex;
            .adjuncts{
              font-size: 24px;/*px*/
              color: #999999;
              transform: scale(0.917);
              transform-origin: top left;
              line-height: 1.5;
              padding-right: 16px;
              width: 45%;
            }

          }
        }
      }
      .filler{
        height: 188px;
      }
    }

  }
</style>
