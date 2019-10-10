<template>
  <div class="buy-cart" :class="{gray_bg: foodNum.num}">
    <transition name="showReduce">
        <i class="remove-icon" @click.stop="removeOutCart(foodNum.itemId)" v-if="foodNum.num && foods">
          <img src="../assets/img/home/btn_gray@2x.png">
        </i>
    </transition>
    <transition name="fade">
      <span class="cart_num" v-if="foodNum.num">{{foodNum.num}}</span>
    </transition>
    <i class="add-icon" @click.stop="addToCart(foods,$event)">
      <img src="../assets/img/home/btn_yellow@2x.png">
    </i>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import Bus from '../utils/bus'
  export default {
    name: "quick_meal_buy_cart",
    data () {
      return {
        appending: this.$route.query.appending,
        showMoveDot: [], // 控制下落的小圆点显示隐藏
        removing: false,
        adding: false
      }
    },
    props: ['foods','type'],
    inheritAttrs: false,
    computed: {
      ...mapState({
        cartInfo: state => state.cart.cart,
        storeId: state => state.common.common_data.store_info.store_id
      }),
      /**
       * 监听cartList变化，更新当前商铺的购物车信息shopCart，同时返回一个新的对象
       */
      shopCart: function () {
        return Object.assign({}, this.cartList)
      },
      // shopCart变化的时候重新计算当前商品的数量
      foodNum: function () {
        let num = 0
        let itemId = -1
        if (this.type == 0) {
          if (this.cartInfo.cartList) {
            this.cartInfo.cartList.every((cartItem, itemIndex) => {
              if (cartItem.goods_bn == this.foods.bn) {
                num += cartItem.num
                itemId = itemIndex
                return true
              }
              return true
            })
          }
        } else {
          if (this.cartInfo.cartList) {
            this.cartInfo.cartList.every((cartItem, itemIndex) => {
              if (cartItem.goods_bn == this.foods.goods_bn) {
                num += cartItem.num
                itemId = itemIndex
                return true
              }
              return true
            })
          }
        }

        return {num: num, itemId: itemId}
      }
    },
    methods: {
      ...mapMutations([
        'addCart',
        'reduceCart'
      ]),
      // 移出购物车
      removeOutCart (itemId) {
        if (itemId >= 0 ) {
          this.reduceCart({storeId: this.storeId, itemId: itemId})
        }
      },
      // 加入购物车，计算按钮位置。
      addToCart (goodsData,event) {
        if (this.type == 2) {
          Bus.$emit('shakeNotice')
          return
        }

        if (goodsData.adjunct_exist === '1' || goodsData.props_exist === '1' || goodsData.spec_count > 1) {
          this.$emit('showSpecs')
          return
        }

        let goods = {}
        let catId = -1

        if (this.type == 1) {
          goods = Object.assign(goods, goodsData)
          catId = goodsData.catId
        } else {
          goods.product_id = goodsData.product.product_id
          goods.goods_bn = goodsData.bn
          goods.bn = goodsData.product.bn
          goods.name = goodsData.product.name
          goods.image_url = goodsData.image_url
          goods.price = goodsData.price
          goods.member_price = goodsData.member_price
          goods.num = 1
          goods.unit = goodsData.unit
          goods.catId = goodsData.cat_id

          goods.adjunct = []
          goods.taste = []

          catId = goodsData.cat_id
        }

        this.addCart({storeId: this.storeId, catId: catId, goods: goods})

        let elLeft = event.target.getBoundingClientRect().left
        let elBottom = event.target.getBoundingClientRect().bottom
        this.showMoveDot.push(true)
        this.$emit('showMoveDot', this.showMoveDot, elLeft, elBottom)
      },

    }
  }
</script>

<style lang="scss" scoped>
  .buy-cart{
    position: absolute;
    width: 170px;
    height: 50px;
    top: 0;
    right: 0;
    text-align: center;
    border-radius: 25px;
    transition: background-color 0.3s;
    i{
      position: absolute;
      display: block;
      width: 50px;
      height: 50px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .cart_num{
      position: absolute;
      display: block;
      width: 70px;
      line-height: 50px;
      top: 0;
      left: 50px;
    }
    .remove-icon{
      top: 0;
      left: 0;
    }
    .add-icon{
      top: 0;
      right: 0;
    }
  }


  //动画样式
  .gray_bg{
    background-color: #f7f7f7;
  }
  .showReduce-enter-active, .showReduce-leave-active {
    transition: all .3s ease-out;
  }
  .showReduce-enter, .showReduce-leave-active {
    opacity: 0;
    transform: translateX(24px);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .fadeBounce-enter-active, .fadeBounce-leave-active {
    transition: all .3s;
  }
  .fadeBounce-enter, .fadeBounce-leave-active {
    opacity: 0;
    transform: scale(.7);
  }
</style>
