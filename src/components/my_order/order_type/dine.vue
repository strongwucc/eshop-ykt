<template>
  <div class="dine-page">
    <ul class="order-status" @click="switchStatus($event)">
      <li data-index="0" :class="{activity: currentIndex === '0'}">全部</li>
      <li data-index="1" :class="{activity: currentIndex === '1'}">待付款</li>
      <li data-index="2" :class="{activity: currentIndex === '2'}">已退款</li>
      <li data-index="3" :class="{activity: currentIndex === '3'}">已取消</li>
    </ul>
    <scroll class="scroll-wrapper" :data="orderList" :bounce="bounce" :pullup="!allLoaded" @scrollToEnd="getDineList">
      <div class="scroll-content">
        <div class="order-item" v-for="orderItem in orderList">
          <div class="top">
            <span class="table" v-if="orderItem.promotion_type === 'normal' && orderItem.desk">
              {{orderItem.desk.name}} {{orderItem.desk.type_name}}
            </span>
            <span class="table" v-else>

            </span>
            <img v-if="orderItem.status == 'dead'" class="completed" src="../../../assets/img/my_order/order_img_cancel@2x.png" />
            <span class="pay-status will-pay" v-else-if="orderItem.pay_status == '0' || orderItem.pay_status == '3'" >
              等待付款
            </span>
            <img v-else-if="orderItem.pay_status == '1'" class="completed" src="../../../assets/img/my_order/order_img_complete@2x.png" />
            <span class="pay-status refunded" v-else-if="orderItem.pay_status >= 4" >
              已退款
            </span>
          </div>

          <div class="center" v-if="orderItem.promotion_type === 'normal'" @click="$router.push('/order_detail/dine_detail/'+orderItem.order_id)">
            <ul class="pic-list">
              <li v-for="orderItemObj in orderItem.items.slice(0, 4)">
                <img v-if="orderItemObj.goods_image" v-lazy="orderItemObj.goods_image">
                <img v-else src="../../../assets/img/common/goods_img_default_100@2x.png">
              </li>
            </ul>
            <span class="txt">
              共{{orderItem.items.length}}件商品
              <img src="../../../assets/img/common/arrow_right@2x.png"/>
            </span>
          </div>
          <div class="center" v-else-if="orderItem.promotion_type === 'recharge'" @click="$router.push('/order_detail/recharge_detail/'+orderItem.order_id)">
            <ul class="pic-list">
              <li class="pic-recharge">
                <img src="../../../assets/img/common/img_chongzhi@2x.png">
              </li>
            </ul>
            <span class="recharge-face">
                  充值面额：{{orderItem.items[0].face}}
                </span>
            <span class="txt">
                  共{{orderItem.items.length}}件商品
                  <img src="../../../assets/img/common/arrow_right@2x.png"/>
                </span>
          </div>
          <div class="bottom">
            <span class="total-price">
              订单总计
              <span>￥{{orderItem.total_amount | formatMoney | formatActualMoney}}</span>
            </span>
            <div class="other-features" >
              <button class="buy-now" v-if="orderItem.status == 'active' && (orderItem.pay_status == '0' || orderItem.pay_status == '3')" @click="goPay(orderItem)">
                立即付款
              </button>
              <button class="go-detail" v-if="orderItem.promotion_type === 'normal' && orderItem.pay_status != '0' && orderItem.pay_status != '3'" @click="$router.push('/order_detail/dine_detail/'+orderItem.order_id)">
                <!--<img src="../../../assets/img/"/>-->
                查看详情
              </button>
              <button class="go-detail" v-if="orderItem.promotion_type === 'recharge' && orderItem.pay_status != '0' && orderItem.pay_status != '3'" @click="$router.push('/order_detail/recharge_detail/'+orderItem.order_id)">
                <!--<img src="../../assets/img/"/>-->
                查看详情
              </button>
              <!--<button class="buy-again" v-if="orderItem.pay_status == '1'">-->
                <!--再次下单-->
              <!--</button>-->
            </div>
          </div>
        </div>
        <p class="load-more" v-if="!allLoaded"><i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;加载中...</p>
        <p class="no-more" v-if="allLoaded">已加载全部</p>
      </div>
    </scroll>
    <back :url="'/center'"></back>
  </div>
</template>

<script>
  import Scroll from '../../../base/scroll'
  import back from '../../../base/back'
  export default {
    name: "dine",
    data () {
      return {
        currentIndex: '0',
        bounce: false, //禁止滚动列表回弹效果
        orderList: [], //订单列表
        orderTypeList: [
          'all',
          'unpay',
          'refunded',
          'dead'
        ],
        page: 1,
        pageLimit: 10,
        allLoaded: false
      }
    },

    components: {
      back,
      Scroll
    },
    created () {
      this.getDineList()
    },
    mounted () {
      setTimeout(() => {
        this.setStyle()
        // this.orderList = ['dd']
      }, 30)
    },
    methods: {
      switchStatus (e) {
        const index = e.target.getAttribute('data-index')
        if (index !== null) {
          if (this.currentIndex != index) {
            this.currentIndex = index
            this.page = 1
            this.orderList = []
            this.allLoaded = false
            this.getDineList()
          }
        } else {
          return
        }
      },

      setStyle () {
        const navigation = document.querySelector('.navigation')
        const orderStatus = document.querySelector('.order-status')

        document.querySelector('.scroll-wrapper').style.height = window.innerHeight - navigation.offsetHeight - orderStatus.offsetHeight + 'px'
      },
      getDineList () {
        this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
        let order_type = this.orderTypeList[this.currentIndex]
        this.$http.post(this.API.user.member_orders, {order_type: order_type, page: this.page, page_limit: this.pageLimit}).then(res => {
          this.$myLoading.close()
          if (res.return_code == '0000') {
            this.orderList = this.orderList.concat(res.data.list)
            if (res.data.total <= this.page) {
              this.allLoaded = true
            } else {
              this.page += 1
            }
          }
        })
      },
      goPay (orderItem) {
        this.$router.push('/pay/'+orderItem.order_id)
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/common";
  .dine-page{
    height: 100%;
    .order-status{
      display: flex;
      width: 100%;
      justify-content: space-around;
      font-size: 26px;/*px*/
      color: #999999;
      padding: 0 20px;
      li{
        height: 90px;
        line-height: 90px;
        padding: 0 10px;
      }
      .activity{
        color: #333333;
        border-bottom: 4px solid $themeColor;
      }
    }
    .scroll-wrapper{
      overflow-y: hidden;
      .scroll-content{
        .order-item{
          background-color: #ffffff;
          margin-bottom: 20px;
          .top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 30px;
            height: 100px;
            .table{
              font-size: 32px;/*px*/
            }
            .will-pay{
              color: #ba9a1f;
            }
            .completed{
              width: 126px;
              margin-top: 40px;
            }
            .cancelled{
              width: 126px;
              margin-top: 40px;
            }
          }
          .center{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 180px;
            background-color: #f7f7fa;
            padding: 0 30px;
            .pic-list{
              display: flex;
              li{
                margin-right: 20px;
                img{
                  width: 100px;
                  height: 100px;
                }
              }
            }
            .txt{
              display: flex;
              align-items: center;
              img{
                width: 36px;
                margin-bottom: 2px;
              }
            }
          }
          .bottom{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 150px;
            padding: 0 30px;
            .total-price{
              span{
                font-weight: 600;
                height: 50px;
                line-height: 50px;
              }
            }
            .other-features{
              display: flex;
              button{
                height: 60px;
                border-radius: 30px;
                padding: 0 24px;
                font-size: 28px;/*px*/
                background-color: #ffffff;
                margin-left: 20px;
              }
              .add-goods{
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                  width: 40px;
                }
                &:after{
                  @include all-border-1px(#999999, 30px);
                }
              }
              .buy-now{
                background-color: $themeColor;
              }
              .go-detail{
                position: relative;
                &:after{
                  @include all-border-1px(#999999, 30px);
                }
              }
              .buy-again{
                position: relative;
                &:after{
                  @include all-border-1px(#999999, 30px);
                }
              }
            }
          }
        }
        .load-more{
          line-height: 60px;
          text-align: center;
          color: #999999;
          background-color: rgb(242,242,245);
          font-size: 24px;/*px*/
        }
        .no-more{
          line-height: 60px;
          text-align: center;
          color: #999999;
          background-color: rgb(242,242,245);
          font-size: 24px;/*px*/
        }
      }
    }
  }
</style>
