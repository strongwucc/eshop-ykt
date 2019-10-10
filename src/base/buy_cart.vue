<template>
  <div class="buy-cart" :class="{gray_bg: foodNum}">
    <transition name="showReduce">
        <i class="remove-icon" @click.stop="removeOutCart(foods)" v-if="foodNum && foods">
          <img src="../assets/img/home/btn_gray@2x.png">
        </i>
    </transition>
    <transition name="fade">
      <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
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
    name: "buy_cart",
    data () {
      return {
        appending: this.$route.query.appending,
        showMoveDot: [], // 控制下落的小圆点显示隐藏
        removing: false,
        adding: false
      }
    },
    props: ['foods','type','memberId'],
    inheritAttrs: false,
    computed: {
      ...mapState({
        userCart: state => state.user.user_cart,
        storeId: state => state.common.common_data.store_info.store_id,
        deskId: state => state.common.common_data.desk_info.desk_id,
        deskInfo: state => state.common.common_data.desk_info
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
        if (this.type == 0) {
          if (this.userCart.goods_list) {
            this.userCart.goods_list.every((cartItem) => {
              if (cartItem.goods_bn == this.foods.product.bn) {
                num = cartItem.num
                return false
              }
              return true
            })
          }
        } else {
          num = this.foods.num
        }

        return num
      }
    },
    methods: {
      ...mapMutations([
        'set_user_cart'
      ]),
      // 移出购物车
      removeOutCart (goods) {
        if (this.removing) {
          return false
        }
        this.removing = true

        if (this.foodNum > 0 && this.deskInfo.info.info_id) {
          let bn = goods.product ? goods.product.bn : goods.goods_bn
          let deleteData = {store_id: this.storeId, info_id: this.deskInfo.info.info_id, goods_bn: bn}
          if (goods.taste) {
            deleteData.taste = goods.taste
          }
          if (goods.adjunct) {
            deleteData.adjunct = []
            goods.adjunct.forEach(adjunctItem => {
              let newItem = {}
              newItem.goods_bn = adjunctItem.goods_bn
              newItem.num = adjunctItem.num
              deleteData.adjunct.push(newItem)
            })
          }
          this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
          this.$http.post(this.API.cart.cart_delete,deleteData).then(res => {
            this.$myLoading.close()
            this.removing = false
            if (res.return_code === '0000') {
              this.set_user_cart(res.data.user_cart);
              if (this.type == '1') {
                this.$emit('refreshCart')
              }
            } else if (res.return_code === '5000') {
              this.$myToast(res.return_msg)
            } else {
              this.$myToast('哎呀！出错啦')
            }
          })
        }
      },
      // 加入购物车，计算按钮位置。
      addToCart (goods,event) {
        if (this.adding) {
          return false
        }
        this.adding = true

        if (this.type == 2) {
          this.adding = false
          Bus.$emit('shakeNotice')
          return
        }

        if (goods.adjunct_exist === '1' || goods.props_exist === '1' || goods.spec_count > 1) {
          this.adding = false
          this.$emit('showSpecs')
          return
        }

        let bn = goods.product ? goods.product.bn : goods.goods_bn
        let addData = {store_id: this.storeId, desk_id: this.deskId, goods_bn: bn, num: 1}
        if (goods.taste) {
          addData.taste = goods.taste
        }
        if (goods.adjunct) {
          addData.adjunct = []
          goods.adjunct.forEach(adjunctItem => {
            let newItem = {}
            newItem.goods_bn = adjunctItem.goods_bn
            newItem.num = adjunctItem.num
            addData.adjunct.push(newItem)
          })
        }

        if (this.memberId) {
          addData.member_id = this.memberId
        }

        let addUrl = this.appending === '1' ? this.API.cart.cart_append : this.API.cart.cart_add
        this.$http.post(addUrl,addData).then(res => {
          this.adding = false
          if (res.return_code === '0000') {
            this.set_user_cart(res.data.user_cart);
            let elLeft = event.target.getBoundingClientRect().left
            let elBottom = event.target.getBoundingClientRect().bottom
            this.showMoveDot.push(true)
            this.$emit('showMoveDot', this.showMoveDot, elLeft, elBottom)
            if (this.type == '1') {
              this.$emit('refreshCart')
            }
          } else {
            this.$myToast(res.return_msg)
          }
        })
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
