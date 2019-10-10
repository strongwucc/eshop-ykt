<template>
  <div class="dine-detail">
    <div class="head">
      <div class="color01"></div>
      <div class="color02"></div>
      <div class="order-status" v-if="order.status == 'dead'">
        <img src="../../../assets/img/order_detail/order_ic_cancel@2x.png">
        <span>订单已取消</span>
      </div>
      <div class="order-status" v-else-if="order.status == 'active' && (order.pay_status == '0' || order.pay_status == '3')">
        <img src="../../../assets/img/order_detail/order_ic_zhifu@2x.png">
        <span>订单待付款</span>
      </div>
      <div class="order-status" v-else-if="order.status == 'active' && order.pay_status == '1' && order.confirm_status == '0'">
        <span>商家待接单</span>
      </div>
      <div class="order-status" v-else-if="order.status == 'active' && order.pay_status == '1' && order.confirm_status == '1'">
        <img src="../../../assets/img/order_detail/order_finish@2x.png">
        <span>订单已完成</span>
      </div>
      <div class="order-status" v-else-if="order.status == 'active' && order.pay_status == '5'">
        <img src="../../../assets/img/order_detail/order_ic_zhifu@2x.png">
        <span>卖家已拒绝</span>
      </div>
      <p class="notice" v-if="order.status == 'active' && (order.pay_status == '0' || order.pay_status == '3')">您需要先完成支付,商家才会看到您的订单</p>
      <p class="notice" v-if="order.status == 'active' && order.pay_status == '1' && order.confirm_status == '0'">请耐心等待一下哦</p>
      <p class="notice" v-if="order.status == 'active' && order.pay_status == '1' && order.confirm_status == '1'">欢迎下次光临</p>
      <p class="notice" v-if="order.status == 'active' && order.pay_status == '5'">退款金额：{{(order.total_amount - order.discount) | formatMoney | formatActualMoney}}</p>
    </div>
    <div class="main">
      <pending-payment :order-items="order.items" :order-id="order.order_id"></pending-payment>
      <div class="remark">
        <span>备注：</span>
        {{order.mark_text}}
      </div>
      <div class="sum-up">
        <div class="l">
          商品共{{order.items ? order.items.length : 0}}份
        </div>
        <div class="r">
          <div class="member-discount">
            <div class="member-label">{{lvName}}</div>
            <div class="discount-amount">
              <span class="txt">已优惠</span>
              <span class="num">￥{{order.pmt_goods | formatMoney | formatActualMoney}}</span>
            </div>
          </div>
          <div class="lump-sum">
            <span class="txt">小计</span>
            <span class="num">￥{{NP.plus(order.total_amount, order.score_discount)}}</span>
          </div>
        </div>
      </div>
      <div class="deduction">
        <div class="integral same-style clearfloat">
          <div class="icon">
            <span>积</span>
          </div>
          <div class="txt">积分抵扣</div>
          <div class="deduction-amount">-￥{{order.score_discount | formatMoney | formatActualMoney}}</div>
        </div>
        <div class="coupon same-style clearfloat">
          <div class="icon">
            <span>惠</span>
          </div>
          <div class="txt">优惠券</div>
          <div class="deduction-amount">-￥{{order.discount | formatMoney | formatActualMoney}}</div>
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
  import PendingPayment from './quick_meal_pending_payment'
  import OrderInfoOne from './order_info_type01'
  import OrderInfoTwo from './order_info_type02'
  import back from '../../../base/back'
  import {mapState} from 'vuex'
  export default {
    name: "quick_meal_detail",
    data () {
      return {
        orderId: this.$route.params.orderId,
        order: {}
      }
    },
    components: {
      PendingPayment,
      OrderInfoOne,
      OrderInfoTwo,
      back
    },
    computed: {
      ...mapState({
        lvName: state => state.user.user_info.lv_name
      }),
      totalDiscount: function () {
        let pmt_order = isNaN(parseFloat(this.order.pmt_order)) ? 0 : parseFloat(this.order.pmt_order)
        let pmt_goods = isNaN(parseFloat(this.order.pmt_goods))? 0 : parseFloat(this.order.pmt_goods)
        let score_u = isNaN(parseFloat(this.order.score_discount)) ? 0 : parseFloat(this.order.score_discount)
        let discount = isNaN(parseFloat(this.order.discount)) ? 0 : parseFloat(this.order.discount)
        let totalDiscount = score_u + pmt_order + pmt_goods + discount
        return this.NP.round(totalDiscount,2)
      }
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
    /*position: relative;*/
    /*height: 100%;*/
    /*z-index: 9;*/
    /*overflow-y: scroll;*/
    /*-webkit-overflow-scrolling: touch;*/
    .head{
      position: absolute;
      width: 100%;
      height: 330px;
      top: 0;
      left: 0;
      .color01{
        background-color: #fedd4d;
        height: 120px;
      }
      .color02{
        height: 210px;
        background: linear-gradient(#fedd4d, #f2f2f5);
      }
      .order-status{
        position: absolute;
        display: flex;
        align-items: center;
        top: 49px;
        left: 50%;
        transform: translateX(-50%);
        img{
          width: 50px;
        }
        span{
          margin-left: 20px;
          font-size: 44px;/*px*/
          font-weight:400;
        }
      }
      .notice{
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 111px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .main{
      position: relative;
      z-index: 9;
      background-color: #ffffff;
      width: 94.66%;
      margin: 196px auto 0 auto;
      border-radius: 8px;
      padding: 0 30px;
      .deduction{
        position: relative;
        padding-top: 40px;
        .same-style{
          padding-bottom: 40px;
          .icon{
            width: 34px;
            height: 34px;
            border-radius: 8px;
            margin-right: 20px;
            float: left;
            span{
              display: block;
              width: 100%;
              height: 100%;
              font-size: 24px;/*px*/
              color: #ffffff;
              line-height: 34px;
              text-align: center;
              transform: scale(0.917);
              transform-origin: center;
            }
          }
          .txt{
            float: left;
            line-height: 34px;
          }
          .deduction-amount{
            float: right;
            line-height: 34px;
            color: #ff2e2e;
            font-weight: 600;
          }
        }
        .integral{
          .icon{
            background-color: #d1ae14;
          }
        }
        .coupon{
          .icon{
            background-color: #ff2e2e;
          }
        }
        &:after{
          @include border-1px(#e5e5e5, bottom);
        }
      }
      .remark{

        padding: 40px 0;
        border-bottom: 0.5px solid #F3F3F3;
        span{
          font-weight: 600;
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
