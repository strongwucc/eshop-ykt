<template>
  <div class="my-balance-page">
    <div class="banner" ref="banner">
      <img class="bcg-img" src="../../assets/img/my_balance/yue_bg@2x.png">
      <div class="balance">
        <p class="num">{{userInfo.advance|formatMoney}}</p>
        <div class="txt">
          <i></i>
          <span>我的余额</span>
          <i></i>
        </div>
        <button class="instant-recharge" @click="goRecharge">立即充值</button>
      </div>
    </div>

    <div class="balance-detail">
      <div class="title" ref="title">
        <img src="../../assets/img/my_balance/yue_icon_yue@2x.png">
        会员卡交易明细
      </div>
      <div class="scroll-box" ref="scrollBox">
        <div v-show="Array.isArray(transactionList) && !transactionList.length" class="no-transaction" ref="noTrans">
          <img src="../../assets/img/my_balance/img_yue@2x.png">
          <p>还没有充值记录哦~</p>
        </div>
        <ul
          v-show="Array.isArray(transactionList) && transactionList.length"
          class="transaction-list"
          ref="transList"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="allLoaded"
          infinite-scroll-immediate-check="false"
          infinite-scroll-distance="50">
          <li class="transaction-info" v-for="item in transactionList">
            <div class="left">
              <h3 class="store-name">{{item.message}}</h3>
              <p class="order-NO">订单号：{{item.order_id}}</p>
              <p class="order-date">订单时间：{{item.mtime|toDate}}</p>
            </div>
            <div class="right" v-if="item.explode_money > 0">-{{item.explode_money|formatMoney}}</div>
            <div class="right" v-else-if="item.import_money > 0">+{{item.import_money|formatMoney}}</div>
          </li>
        </ul>
        <p class="load-more" v-show="!allLoaded"><i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;加载中...</p>
        <p class="no-more" v-show="allLoaded">已加载全部</p>
        <!--<div class="fill" v-show="allLoaded"></div>-->
      </div>
    </div>
    <back></back>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import back from '../../base/back'
  export default {
    name: "my_balance",
    data () {
      return {
        transactionList: [],//伪数据
        page: 1,
        pageLimit: 8,
        balanceDescViewVisible: false,
        loading: false,
        allLoaded: false
      }
    },
    components: {back},
    created () {

    },
    mounted () {
      setTimeout(() => {
        this.setScrollHeight()
        this.loadMore()
      }, 20)
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.user_info
      })
    },
    methods: {
      setScrollHeight () {
        let scrollHeight = window.innerHeight - (this.$refs.banner.offsetHeight + this.$refs.title.offsetHeight)
        this.$refs.scrollBox.style.height = scrollHeight + 'px'
        this.$refs.noTrans.style.height = scrollHeight - 80 + 'px'
      },

      loadMore () {
        this.loading = true
        this.$http.post(this.API.user.recharge_logs,{page: this.page, page_limit: this.pageLimit}).then(res => {
          this.loading = false
          if (res.return_code === '0000') {
            this.transactionList = this.transactionList.concat(res.data.list)
            if (res.data.total <= this.page) {
              this.allLoaded = true
            } else {
              this.page += 1
            }
          }
        })
      },
      goRecharge () {
        this.$router.push('/member_recharge')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .my-balance-page{
    height: 100%;
    .banner{
      position: relative;
      font-size: 0;
      height: 360px;
      .bcg-img{
        width: 100%;
      }
      .balance{
        position: absolute;
        width: 50%;
        top: 21%;
        left: 25%;
        .num{
          text-align: center;
          font-size: 76px;/*px*/
          font-weight: bold;
        }
        .txt{
          display: flex;
          width: 100%;
          justify-content: center;
          margin-top: 25px;
          align-items: center;
          i{
            width: 34px;
            height: 2px;
            background-color: #333333;
          }
          span{
            font-size: 28px;/*px*/
            padding: 0 10px;
          }
        }
        .instant-recharge{
          display: block;
          width: 240px;
          font-size: 28px;
          height: 70px;
          border-radius: 8px;
          background-color: #333333;
          margin: 40px auto 0 auto;
          color: #ffffff;
        }
      }
      .balance-description{
        position: absolute;
        background-color: rgba(255,0,0,0);
        font-size: 26px;/*px*/
        top: 25px;
        right: 23px;
      }
    }
    .balance-detail{
      position: relative;
      z-index: 9;
      -webkit-overflow-scrolling : touch;
      .title{
        display: flex;
        padding: 0 30px;
        height: 80px;/*px*/
        align-items: center;
        font-size: 28px;/*px*/
        img{
          width: 36px;
          margin-right: 5px;
        }
      }
      .scroll-box{
        background-color: #ffffff;
        overflow: scroll;
        .no-transaction{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          img{
            width: 256px;
          }
          p{
            margin-top: 75px;
            font-size: 28px;/*px*/
            color: #bbbbbb;
          }
        }
        .transaction-list{
          .transaction-info{
            display: flex;
            position: relative;
            justify-content: space-between;
            align-items: center;
            padding: 30px;
            .left{
              .store-name{
                margin-bottom: 20px;
              }
              .order-NO{
                font-size: 22px;/*px*/
                color: #999999;
                transform: scale(0.917);
                transform-origin: left;
                margin-bottom: 10px;
              }
              .order-date{
                font-size: 22px;/*px*/
                color: #999999;
                transform: scale(0.917);
                transform-origin: left;
              }
            }
            .right{
              font-size: 38px;/*px*/
              color: #8f740d;
            }
            &:after{
              @include border-1px(#e5e5e5, bottom);
            }
          }
        }
        .load-more{
          line-height: 60px;
          text-align: center;
          color: #999999;
          background-color: #ffffff;
          font-size: 24px;/*px*/
        }
        .no-more{
          line-height: 60px;
          text-align: center;
          color: #999999;
          background-color: #ffffff;
          font-size: 24px;/*px*/
        }
        .fill{
          height: 80px;
        }
      }
    }
    .mint-popup{
      background-color: rgba(0,0,0,0);
      .balance-desc-view{
        position: relative;
        width: 560px;
        .view-main{
          border-radius: 8px;
          overflow: hidden;
          .title{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 74px;
            background-color: $themeColor;
            font-size: 32px;/*px*/
            i{
              width: 6px;
              height: 6px;
              background-color: #333333;
              border-radius: 50%;
            }
            span{
              padding: 0 12px;
            }
          }
          .main{
            padding: 50px 75px;
            background-color: #ffffff;
            font-size: 28px;/*px*/
            p{
              text-align: left;
              line-height: 1.3;
              margin: 18px 0;
              span{
                color: #8f740d;
              }
            }
          }
        }
        .hide-view{
          position: absolute;
          left: 50%;
          margin-left: -30px;
          bottom: -100px;
          width: 60px;
          img{
            width: 100%;
          }
        }
      }
    }
    .support{
      position: absolute;
      background-color: rgb(242,242,245);
      bottom: 0;
      line-height: 80px;
      width: 100%;
      text-align: center;
      color: #c1c1c1;
      font-size: 26px;/*px*/
    }
  }
</style>
