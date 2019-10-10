<template>
  <div class="dine-detail">
    <div class="main">
      <div class="pending-payment">
        <div class="base-info">
          <div class="l">
            <img src="../../../assets/img/pay/order_img_shop@2x.png">
            <span class="title">{{storeName}}</span>
          </div>
          <div class="r">
          </div>
        </div>
        <div class="goods-time-sort">
          <div class="wrapper">
            <ul class="goods-list">
              <li>
                <img class="goods-pic" src="../../../assets/img/common/img_chongzhi@2x.png">
                <div class="goods-info">
                  <div class="l">
                    充值面值：{{order.items.face | formatMoney}}
                  </div>
                  <div class="r">
                    ￥ {{order.items.amount | formatMoney}}
                  </div>
                  <p class="single-total">×1</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="remark">
      </div>
      <div class="sum-up">
        <div class="l">
          商品共1份
        </div>
        <div class="r">
          <div class="member-discount">
            <div class="member-label"></div>
            <div class="discount-amount">
            </div>
          </div>
          <div class="lump-sum">
            <span class="txt">小计</span>
            <span class="num">￥{{NP.plus(order.total_amount, order.score_discount)}}</span>
          </div>
        </div>
      </div>
      <div class="sum-up">
        <div class="l">
        </div>
        <div class="r">
          <div class="lump-sum">
            <span class="txt">
              <template v-if="order.status == 'active' && (order.pay_status == '0' || order.pay_status == '3')">
                需付金额
              </template>
              <template v-else>
                实付
              </template>
            </span>
            <span class="num">￥{{(order.total_amount - order.discount)  | formatMoney | formatActualMoney}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <!--订单待付款时订单信息样式-->
      <order-info-one :order-info="order" v-if="order.status === 'active' && order.pay_status === '0'"></order-info-one>

      <!--其他订单信息样式-->
      <order-info-two v-else :order-info="order"></order-info-two>
    </div>
    <div class="go-pay" v-if="order.status == 'active' && (order.pay_status === '0' || order.pay_status === '3')">
      <div class="total">
        合计：
        <span>￥{{(order.total_amount - order.discount) | formatMoney | formatActualMoney}}</span>
      </div>
      <button class="confirm" v-if="order.payable == 1" @click="$router.push('/pay/'+order.order_id)">付款</button>
    </div>
    <back :url="'/quick_meal_order'"></back>
  </div>
</template>

<script>
  import OrderInfoOne from './order_info_type01'
  import OrderInfoTwo from './order_info_type02'
  import back from '../../../base/back'
  import {mapState} from 'vuex'
  export default {
    name: "recharge_detail",
    data () {
      return {
        orderId: this.$route.params.orderId,
        order: {
          items: {
            face: 0,
            amount: 0
          }
        }
      }
    },
    components: {
      OrderInfoOne,
      OrderInfoTwo,
      back
    },
    computed: {
      ...mapState({
        storeName: state => state.common.common_data.store_info.store_name,
        lvName: state => state.user.user_info.lv_name
      })
    },
    created () {
      this.getOrderDetail()
    },
    methods: {
      getOrderDetail () {
        if (this.orderId) {
          this.$http.post(this.API.user.order_detail, {order_id: this.orderId}).then(res => {
            if (res.return_code == '0000') {
              this.order = res.data
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/common";
  .dine-detail{
    .main{
      position: relative;
      z-index: 9;
      background-color: #ffffff;
      width: 94.66%;
      margin: 21px auto 0 auto;
      border-radius: 8px;
      padding: 0 30px;
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
                  margin-right: 50px;
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
      .sum-up{
        display: flex;
        justify-content: space-between;
        padding: 40px 0;
        font-size: 24px;/*px*/
        .l{
          font-size: 26px;/*px*/
        }
        .r{
          .member-discount{
            font-size: 24px;/*px*/
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
              font-size: 32px;/*px*/
              display: inline-block;
              font-size: 38px;/*px*/
              /*color: #ff2e2e;*/
              font-weight: 600;
              margin-left: 20px;
              text-align: right;
            }
          }
        }

      }
    }
    .go-pay{
      position: fixed;
      z-index: 99;
      display: flex;
      bottom: 0;
      left: 0;
      background-color: #ffffff;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      width: 100%;
      height: 98px;
      box-shadow: 0 0 20px 0 rgba(51,51,51,0.2);
      .total{
        display: flex;
        align-items: flex-end;
        span{
          margin-left: -10px;
          margin-bottom: -4px;
          font-weight: 600;
          font-size: 40px;/*px*/
          color: #ff2e2e;
        }
      }
      .confirm{
        width: 190px;
        height: 66px;
        border-radius: 33px;
        background-color: $themeColor;
        font-size: 30px;/*px*/
      }
    }
    .features{
      bottom: 110px !important;
    }
  }
</style>
