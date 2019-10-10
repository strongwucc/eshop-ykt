<template>
  <div class="pending-payment">
    <div class="base-info">
      <div class="l">
        <img src="../../../assets/img/pay/order_img_shop@2x.png">
        <span class="title">{{storeName}}</span>
      </div>
      <div class="r" v-if="deskInfo">
        <span class="table-num">
          {{deskInfo.type_name}} {{deskInfo.name}}
        </span>
        <span class="diners">
          <img src="../../../assets/img/pay/order_step_ic_people@2x.png">
          <span>人数 {{deskInfo.people}}</span>
        </span>
      </div>
    </div>
    <div class="goods-time-sort">
      <div class="wrapper">
        <ul class="goods-list">
          <li v-for="(item, orderIndex) in orderItems" v-show="orderIndex < 4 || isShowMore">
            <img class="goods-pic" v-if="item.goods_image" v-lazy="item.goods_image">
            <img class="goods-pic" v-else src="../../../assets/img/common/goods_img_default_100@2x.png">
            <div class="goods-info">
              <div class="l">
                <p class="goods-name">{{item.name}}<span class="unit">/{{item.unit}}</span></p>
                <p class="adjuncts">
                  <template v-if="item.tastes.length > 0">
                    <template v-for="(props, index) in item.tastes">
                      <span v-for="(taste, i) in props.items">
                        {{taste.props_name}}
                        <template>{{i === item.tastes.length - 1 ? '；' : '，'}}</template>
                      </span>
                    </template>
                  </template>
                  <template v-if="item.adjuncts.length > 0">
                      <span v-for="(adjunct, j) in item.adjuncts">
                        {{adjunct.name + '×' + adjunct.nums}}
                        <template>{{j === item.adjuncts.length - 1 ? '；' : '，'}}</template>
                      </span>
                  </template>
                </p>
              </div>
              <div class="r">
                <div class="price">
                  <p class="finally-price">￥{{item.price | formatMoney | formatActualMoney}}</p>
                  <p class="original-price" v-if="NP.round(item.original_price - item.price) > 0">￥{{item.original_price | formatMoney | formatActualMoney}}</p>
                </div>
              </div>
              <p class="single-total">×{{item.nums}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="show-more-list" v-if="orderItems && orderItems.length > 4 && isShowMore === false" @click="showMore">
        <span>查看更多</span>
        <img src="../../../assets/img/order_detail/arrow_down_gray@2x.png">
      </div>
      <div class="show-more-list" v-if="orderItems && orderItems.length > 4 && isShowMore === true" @click="hideMore">
        <span>收起更多</span>
        <img src="../../../assets/img/order_detail/arrow_up_gray@2x.png">
      </div>
    </div>
  </div>

</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    name: "pending_payment",
    data () {
      return {
        isShowMore: false
      }
    },
    props: [
      'orderItems',
      'deskInfo'
    ],
    computed: {
      ...mapState({
        storeName: state => state.common.common_data.store_info.store_name,
        lvName: state => state.user.user_info.lv_name
      }),
    },
    methods: {
      ...mapMutations([
      ]),
      showMore () {
        this.isShowMore = true
      },
      hideMore () {
        this.isShowMore = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/common";
  .pending-payment{
    .base-info{
      display: flex;
      position: relative;
      justify-content: space-between;
      height: 88px;
      .l{
        display: flex;
        height: 100%;
        align-items: center;
        img{
          width: 44px;
          margin-right: 10px;
        }
      }
      .r{
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 26px;/*px*/
        .table-num{

          margin-right: 20px;
        }
        .diners{
          display: flex;
          align-items: center;
          img{
            width: 34px;
          }
        }
      }
      &:after{
        @include border-1px(#e5e5e5, bottom);
      }
    }
    .goods-time-sort{
      position: relative;
      .jiacai{
        padding-top: 30px;
      }
      .wrapper{
        .goods-list{
          position: relative;
          padding-top: 50px;
          &:first-child{
            padding-top: 30px;
          }
          &:last-child{
            &:after{
              @include border-1px(#ffffff, bottom);
            }
          }
          li{
            padding-bottom: 50px;
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
                    font-size: 24px;/*px*/
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
                    font-size: 30px;/*px*/
                    font-weight: 600;
                    margin-bottom: 10px;
                  }
                  .original-price{
                    font-size: 24px;/*px*/
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
      .show-more-list{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;/*px*/
        color: #999999;
        padding-bottom: 50px;
        img{
          width: 32px;
        }
      }
      &:after{
        @include border-1px(#e5e5e5, bottom);
      }
    }
  }
</style>
