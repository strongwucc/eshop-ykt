<template>
  <ul class="goods-list">
    <li v-for="item in items" class="goods-item">
      <div class="pic-wrapper" @click="goodsDetail(item.image_url)">
        <img class="goods-pic" v-if="item.image_url" v-lazy="item.image_url">
        <img class="goods-pic" v-else src="../assets/img/common/goods_img_default_100@2x.png">
        <img class="member-tip" v-if="NP.round(item.price - item.member_price, 2) > 0" src="../assets/img/home/member@2x.png">
      </div>
      <div class="goods-info">
        <p class="name">
          {{item.name | longStrFormat(15)}}
          <span class="unit">{{'/' + item.unit}}</span>
        </p>
        <div class="b">
          <p class="price">
            <span class="finally-price"><span>￥</span>{{item.member_price ? item.member_price : item.price | formatActualMoney}}</span>
            <span class="original-price" v-if="NP.round(item.price - item.member_price, 2) > 0">￥{{item.price | formatMoney | formatActualMoney}}</span>
          </p>
          <p class="sold-out" v-if="item.marketable === 'false'">已售罄</p>
          <buy-cart v-else :foods='item' @showSpecs="showSpecs(item)" @moveInCart="moveInCart" @showMoveDot="showMoveDot" :type="type"></buy-cart>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import BuyCart from './buy_cart'
  export default {
    name: "goods",
    props: {
      items: Array
    },
    data () {
      return {
        type: 0,
        specificationInfo: [] // 商品规格页信息
      }
    },
    components: {
      BuyCart
    },

    created () {
      if (this.$attrs.needShake == 1) {
        this.type = 2
      }
    },

    methods: {
      //显示商品规格菜单
      // showSpecsList (goodsItem) {
      //
      //   this.specificationInfo = goodsItem
      // },
      showSpecs (goodsItem) {
        this.$emit('showSpecs', goodsItem)
      },

      moveInCart () {

      },
      showMoveDot (point, x, y) {
        this.$emit('showMoveDot', point, x, y)
      },

      goodsDetail (goodsPic) {
        this.$emit('showGoodsDetail', goodsPic)
      }

    }
  }
</script>

<style lang="scss" scoped>
  .goods-list{
    .goods-item{
      display: flex;
      height: 170px;
      margin-bottom: 50px;
      .pic-wrapper{
        position: relative;
        flex-shrink: 0;
        width: 170px;
        height: 170px;
        border-radius: 8px;
        overflow: hidden;
        .goods-pic{
          width: 100%;
          height: 100%;
        }
        .member-tip{
          position: absolute;
          width: 50%;
          height: 50%;
          top: 0;
          left: 0;
          z-index: 2;
        }
      }

      .goods-info{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 20px;
        .name{
          font-size: 32px;/*px*/
          line-height: 1.3;
          font-weight: 600;
          .unit{
            font-size: 24px;/*px*/
            color: #999999;
          }
        }
        .b{
          position: relative;
          display: flex;
          justify-content: space-between;
          height: 50px;
          align-items: center;
          .price{
            margin-left: -4px;
            .finally-price{
              color: #ff2e2e;
              font-size: 36px;/*px*/
              font-weight: 500;
              span{
                font-weight: normal;
                display: inline-block;
                font-size: 24px;/*px*/
                transform: scale(0.833);
              }
            }
            .original-price{
              display: inline-block;
              margin-left: -6px;
              color: #999999;
              font-size: 24px;/*px*/
              transform: scale(0.833);
              text-decoration: line-through;
            }
          }
          .sold-out{
            color: #ff2e2e;
          }
        }
      }
    }
  }
</style>
